import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { parseArgs } from 'node:util';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown } from 'mdast-util-gfm';

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    database: { type: 'string', default: 'data.db' },
    baseline: { type: 'string' },
  },
});
const base = new URL(positionals[0] || 'http://localhost:4322');
const accessId = process.env.CF_ACCESS_CLIENT_ID;
const accessSecret = process.env.CF_ACCESS_CLIENT_SECRET;
assert.equal(
  Boolean(accessId),
  Boolean(accessSecret),
  'Set both Cloudflare Access service token variables',
);
const headers = accessId
  ? { 'CF-Access-Client-Id': accessId, 'CF-Access-Client-Secret': accessSecret }
  : undefined;
if (headers)
  assert.equal(base.protocol, 'https:', 'Cloudflare Access requires HTTPS');

function fetchTarget(path) {
  const url = new URL(path, base);
  assert.equal(
    url.origin,
    base.origin,
    'Expected a same-origin route or asset',
  );
  return fetch(url, { headers, redirect: 'manual' });
}
const database = new DatabaseSync(values.database, { readOnly: true });
const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const routes = new Set(['/', '/blog', '/events', '/support', '/sitemap.xml']);
let records = 0,
  textSegments = 0;

for (const collection of ['posts', 'events']) {
  const source = JSON.parse(
    await fs.readFile(`migration/strapi-${collection}.json`, 'utf8'),
  ).data;
  const rows = database
    .prepare(`SELECT * FROM ec_${collection} WHERE deleted_at IS NULL`)
    .all();
  assert.equal(rows.length, source.length, `${collection} count`);
  for (const { attributes: original } of source) {
    const migrated = rows.find((row) => row.slug === original.slug);
    assert.ok(migrated, `Missing ${collection}/${original.slug}`);
    assert.equal(migrated.title, original.title);
    assert.equal(migrated.lead, original.lead || '');
    assert.equal(migrated.status, original.publishedAt ? 'published' : 'draft');
    assert.equal(migrated.published_date, original.publishedAt);
    if (collection === 'events') {
      assert.equal(migrated.starting_at, original.startingAt);
      assert.equal(migrated.ending_at, original.endingAt);
      for (const [field, sourceField] of Object.entries({
        location_title: 'title',
        street_address: 'streetAddress',
        city: 'city',
        state: 'state',
        zip_code: 'zipCode',
        maps_url: 'googleMapsUrl',
      })) {
        assert.equal(
          migrated[field] || '',
          original.location?.[sourceField] || '',
          `${original.slug}: ${field}`,
        );
      }
    }
    const content = JSON.parse(migrated.content);
    const text = normalize(
      content
        .flatMap((block) => block.children?.map((span) => span.text) || [])
        .join(''),
    );
    const tree = fromMarkdown(original.content, {
      extensions: [gfm()],
      mdastExtensions: [gfmFromMarkdown()],
    });
    let imageCount = 0;
    function inspect(node) {
      if (node.type === 'text') {
        assert.ok(
          text.includes(normalize(node.value)),
          `Missing text in ${original.slug}: ${node.value.slice(0, 100)}`,
        );
        textSegments++;
      }
      if (node.type === 'image') imageCount++;
      node.children?.forEach(inspect);
    }
    inspect(tree);
    assert.equal(
      content.filter((block) => block._type === 'image').length,
      imageCount,
      `${original.slug}: image count`,
    );
    for (const image of content.filter((block) => block._type === 'image'))
      assert.ok(
        image.asset.url.startsWith('/_emdash/api/media/file/'),
        `${original.slug}: image not copied`,
      );
    if (original.featuredImage?.data)
      assert.equal(JSON.parse(migrated.featured_image).provider, 'local');
    routes.add(
      `/${collection === 'posts' ? 'blog' : 'events'}/${original.slug}`,
    );
    records++;
  }
}
database.close();
const assets = new Set();
const failures = [];
const mediaPath = /^\/_emdash\/api\/media\/(?:file|asset)\//;
// Compare rendered editorial text while allowing different asset URLs and CSS hashes.
function mainText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert.ok(main, 'Missing <main> in page');
  return normalize(main.replace(/<[^>]+>/g, ' '));
}

for (const route of routes) {
  const response = await fetchTarget(route);
  assert.equal(response.status, 200, `${route}: HTTP ${response.status}`);
  const html = await response.text();
  if (values.baseline && route !== '/sitemap.xml') {
    const baseline = await fetch(new URL(route, values.baseline));
    assert.equal(
      baseline.status,
      200,
      `${route}: baseline HTTP ${baseline.status}`,
    );
    assert.equal(
      mainText(html),
      mainText(await baseline.text()),
      `${route}: rendered text`,
    );
  }
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const value = match[1].replace(/&amp;/g, '&');
    if (
      !value.startsWith('/') ||
      value.startsWith('//') ||
      value.startsWith('/@') ||
      value.startsWith('/src/') ||
      value.startsWith('/node_modules/') ||
      (value.includes('/_emdash/') && !mediaPath.test(value))
    )
      continue;
    const url = new URL(value, base);
    if (
      /\.(?:png|jpe?g|webp|ico|pdf|css|js|woff2?)(?:$|\?)/.test(url.href) ||
      url.pathname === '/_image' ||
      mediaPath.test(url.pathname)
    )
      assets.add(url.href);
  }
  // The content image URLs are also checked directly, without image optimization.
  for (const match of html.matchAll(/\/_emdash\/api\/media\/file\/[\w.-]+/g))
    assets.add(new URL(match[0], base).href);
}
for (const asset of assets) {
  const response = await fetchTarget(asset);
  if (!response.ok) failures.push(`${asset}: HTTP ${response.status}`);
  else if (!(await response.arrayBuffer()).byteLength)
    failures.push(`${asset}: empty response`);
}
assert.deepEqual(failures, [], 'Broken assets');
for (const route of [
  '/missing-page',
  '/blog/missing-post',
  '/events/missing-event',
]) {
  assert.equal(
    (await fetchTarget(route)).status,
    404,
    `${route}: expected 404`,
  );
}
for (const [source, destination] of [
  ['/home', '/'],
  ['/sitemap/index.xml', '/sitemap.xml'],
]) {
  const redirect = await fetchTarget(source);
  assert.equal(redirect.status, 301, `${source}: expected 301`);
  assert.equal(
    new URL(redirect.headers.get('location'), base).pathname,
    destination,
  );
}
const sitemaps = {
  posts: [...routes].filter((route) => route.startsWith('/blog/')),
  events: [...routes].filter((route) => route.startsWith('/events/')),
  pages: ['/home', '/support'],
};
for (const [collection, expected] of Object.entries(sitemaps)) {
  const path = `/sitemap-${collection}.xml`;
  const response = await fetchTarget(path);
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  const xml = await response.text();
  const listed = new Set(
    Array.from(
      xml.matchAll(/<loc>([^<]+)<\/loc>/g),
      ([, loc]) => new URL(loc).pathname,
    ),
  );
  for (const route of expected)
    assert.ok(listed.has(route), `${path}: missing ${route}`);
}
const report = {
  verifiedAt: new Date().toISOString(),
  base: base.origin,
  ...(values.baseline && { baseline: new URL(values.baseline).origin }),
  records,
  textSegments,
  routes: routes.size,
  assets: assets.size,
  missingRoutes: 3,
  collectionSitemaps: Object.keys(sitemaps).length,
  result: 'passed',
};
await fs.writeFile(
  'migration/verification.json',
  JSON.stringify(report, null, 2) + '\n',
);
console.log(JSON.stringify(report, null, 2));
