import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfm } from 'micromark-extension-gfm';
import { gfmFromMarkdown } from 'mdast-util-gfm';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = process.argv[2];
const read = async (file) =>
  JSON.parse(await fs.readFile(path.join(root, file), 'utf8'));
// Refresh only on explicit request. Never copy the old project's credentials.
if (source) {
  const env = await fs.readFile(path.join(source, '.env'), 'utf8');
  const match = env.match(/^PUBLIC_STRAPI_API_URL\s*=\s*(.+)$/m);
  if (!match)
    throw new Error('The source project has no PUBLIC_STRAPI_API_URL');
  const base = match[1]
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/\/$/, '');
  for (const collection of ['posts', 'events']) {
    const records = [];
    let page = 1,
      pageCount = 1;
    do {
      const url = new URL(`${base}/${collection}`);
      url.search = new URLSearchParams({
        populate: '*',
        'pagination[pageSize]': '100',
        'pagination[page]': String(page),
      }).toString();
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Strapi ${collection}: HTTP ${response.status}`);
      const result = await response.json();
      if (!Array.isArray(result.data))
        throw new Error(`Invalid Strapi ${collection} response`);
      records.push(...result.data);
      pageCount = result.meta.pagination.pageCount;
      page++;
    } while (page <= pageCount);
    await fs.writeFile(
      path.join(root, `migration/strapi-${collection}.json`),
      JSON.stringify({ data: records }, null, 2) + '\n',
    );
  }
}

let sequence = 0;
const key = () => `scc${++sequence}`;
const span = (text, marks = []) => ({
  _type: 'span',
  _key: key(),
  text,
  marks,
});
const block = (text, style = 'normal') => ({
  _type: 'block',
  _key: key(),
  style,
  children: [span(text)],
  markDefs: [],
});
const media = (url, alt = '', caption) => ({
  $media: {
    url,
    filename: decodeURIComponent(new URL(url).pathname.split('/').pop()),
    alt,
    ...(caption ? { caption } : {}),
  },
});
const localImage = (file, alt) => ({
  _type: 'image',
  _key: key(),
  asset: { _type: 'reference', url: `/assets/images/${file}` },
  alt,
  caption: alt,
});
const localField = (file, alt) => ({ src: `/assets/images/${file}`, alt });
const normalizeLink = (url) => {
  try {
    const parsed = new URL(url);
    return ['sccoalition.net', 'www.sccoalition.net'].includes(parsed.hostname)
      ? parsed.pathname + parsed.search + parsed.hash
      : url;
  } catch {
    return url;
  }
};

function markdown(markdownSource) {
  markdownSource = markdownSource.replace(
    /<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
    (_, url, label) => `[${label}](${url})`,
  );
  const tree = fromMarkdown(markdownSource, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  });
  function inline(nodes, definitions, marks = []) {
    return nodes.flatMap((node) => {
      if (node.type === 'text' || node.type === 'inlineCode')
        return [
          span(
            node.value,
            node.type === 'inlineCode' ? [...marks, 'code'] : marks,
          ),
        ];
      if (node.type === 'break') return [span('\n', marks)];
      if (node.type === 'footnoteReference')
        return [span(`[${node.label || node.identifier}]`, marks)];
      if (node.type === 'html' && /^<br\s*\/?\s*>$/i.test(node.value))
        return [span('\n', marks)];
      if (['strong', 'emphasis', 'delete'].includes(node.type))
        return inline(node.children, definitions, [
          ...marks,
          { strong: 'strong', emphasis: 'em', delete: 'strike-through' }[
            node.type
          ],
        ]);
      if (node.type === 'link' || node.type === 'linkReference') {
        const target = node.type === 'link' ? node : links.get(node.identifier);
        if (!target) return inline(node.children, definitions, marks);
        const id = key();
        definitions.push({
          _type: 'link',
          _key: id,
          href: normalizeLink(target.url),
        });
        return inline(node.children, definitions, [...marks, id]);
      }
      // Images are emitted as separate blocks by paragraph().
      if (node.type === 'image' || node.type === 'imageReference') return [];
      throw new Error(`Unsupported inline Markdown: ${node.type}`);
    });
  }
  const links = new Map(
    tree.children
      .filter((n) => n.type === 'definition')
      .map((n) => [n.identifier, n]),
  );
  function paragraph(node, style, extra = {}) {
    const result = [],
      pending = [];
    function flush() {
      if (!pending.length) return;
      const markDefs = [];
      result.push({
        _type: 'block',
        _key: key(),
        style,
        children: inline(pending.splice(0), markDefs),
        markDefs,
        ...extra,
      });
    }
    for (const child of node.children) {
      if (child.type === 'image' || child.type === 'imageReference') {
        flush();
        const target =
          child.type === 'image' ? child : links.get(child.identifier);
        if (!target) throw new Error('Unresolved image reference');
        result.push({
          _type: 'image',
          _key: key(),
          asset: media(target.url, child.alt || ''),
          alt: child.alt || '',
          ...(target.title ? { caption: target.title } : {}),
        });
      } else pending.push(child);
    }
    flush();
    return result;
  }
  function convert(nodes, extra = {}) {
    return nodes.flatMap((node) => {
      if (node.type === 'definition') return [];
      if (node.type === 'footnoteDefinition') {
        const result = convert(node.children);
        if (result[0]?.children)
          result[0].children.unshift(
            span(`[${node.label || node.identifier}] `),
          );
        return result;
      }
      if (node.type === 'paragraph')
        return paragraph(
          node,
          extra.quote ? 'blockquote' : 'normal',
          Object.fromEntries(
            Object.entries(extra).filter(([k]) => k !== 'quote'),
          ),
        );
      if (node.type === 'heading') return paragraph(node, `h${node.depth}`);
      if (node.type === 'blockquote')
        return convert(node.children, { quote: true });
      if (node.type === 'list')
        return node.children.flatMap((item) =>
          convert(item.children, {
            listItem: node.ordered ? 'number' : 'bullet',
            level: (extra.level || 0) + 1,
          }),
        );
      if (node.type === 'thematicBreak')
        return [{ _type: 'break', _key: key(), style: 'line' }];
      if (node.type === 'code')
        return [
          {
            _type: 'code',
            _key: key(),
            code: node.value,
            language: node.lang || 'text',
          },
        ];
      throw new Error(
        `Unsupported Markdown block: ${node.type}. Add a converter before migrating.`,
      );
    });
  }
  return convert(tree.children);
}

const commonFields = [
  {
    slug: 'title',
    label: 'Title',
    type: 'string',
    required: true,
    searchable: true,
  },
  { slug: 'lead', label: 'Introduction', type: 'text' },
  { slug: 'featured_image', label: 'Featured image', type: 'image' },
  { slug: 'content', label: 'Content', type: 'portableText', searchable: true },
];
const dateField = {
  slug: 'published_date',
  label: 'Original publication date',
  type: 'datetime',
  indexed: true,
};
const supports = [
  'drafts',
  'revisions',
  'preview',
  'scheduling',
  'search',
  'seo',
];
const seed = {
  $schema: 'https://emdashcms.com/seed.schema.json',
  version: '1',
  meta: {
    name: 'Scajaquada Corridor Coalition',
    description: 'Migrated from the SCC Remix and Strapi site.',
  },
  settings: {
    title: 'Scajaquada Corridor Coalition',
    tagline:
      'Our community vision for a revitalized Scajaquada Creek, a connected Delaware Park, and a restored Humboldt Parkway.',
    url: 'https://www.sccoalition.net',
    timezone: 'America/New_York',
  },
  collections: [
    {
      slug: 'posts',
      label: 'Posts',
      labelSingular: 'Post',
      urlPattern: '/blog/{slug}',
      supports,
      fields: [...commonFields, dateField],
    },
    {
      slug: 'events',
      label: 'Events',
      labelSingular: 'Event',
      urlPattern: '/events/{slug}',
      supports,
      fields: [
        ...commonFields,
        dateField,
        {
          slug: 'starting_at',
          label: 'Starts at',
          type: 'datetime',
          required: true,
          indexed: true,
        },
        { slug: 'ending_at', label: 'Ends at', type: 'datetime' },
        ...[
          ['location_title', 'Venue'],
          ['street_address', 'Street address'],
          ['city', 'City'],
          ['state', 'State'],
          ['zip_code', 'ZIP code'],
        ].map(([slug, label]) => ({ slug, label, type: 'string' })),
        { slug: 'maps_url', label: 'Directions URL', type: 'url' },
      ],
    },
    {
      slug: 'pages',
      label: 'Pages',
      labelSingular: 'Page',
      urlPattern: '/{slug}',
      supports,
      fields: [
        ...commonFields,
        { slug: 'petition_url', label: 'Petition URL', type: 'url' },
        { slug: 'petition_image', label: 'Petition image', type: 'image' },
        { slug: 'form_url', label: 'Support form URL', type: 'url' },
      ],
    },
  ],
  content: { posts: [], events: [], pages: [] },
};
for (const collection of ['posts', 'events']) {
  for (const entry of (await read(`migration/strapi-${collection}.json`))
    .data) {
    const a = entry.attributes,
      image = a.featuredImage?.data?.attributes;
    const data = {
      title: a.title,
      lead: a.lead || '',
      content: markdown(a.content),
      published_date: a.publishedAt,
    };
    if (image)
      data.featured_image = media(
        image.url,
        image.alternativeText || a.title,
        image.caption,
      );
    if (collection === 'events')
      Object.assign(data, {
        starting_at: a.startingAt,
        ending_at: a.endingAt,
        location_title: a.location?.title || '',
        street_address: a.location?.streetAddress || '',
        city: a.location?.city || '',
        state: a.location?.state || '',
        zip_code: a.location?.zipCode || '',
        maps_url: a.location?.googleMapsUrl || null,
      });
    seed.content[collection].push({
      id: `strapi-${collection}-${entry.id}`,
      slug: a.slug,
      status: a.publishedAt ? 'published' : 'draft',
      data,
    });
  }
}
seed.content.pages = [
  {
    id: 'home',
    slug: 'home',
    status: 'published',
    data: {
      title:
        'A Once-In-A-Lifetime Opportunity: Remove Our Urban Highway System',
      lead: seed.settings.tagline,
      featured_image: localField(
        'delaware_full1.webp',
        'A beautiful view of Hoyt Lake',
      ),
      petition_url: 'https://www.change.org/p/advance-region-central-now',
      petition_image: localField(
        'scc_petitions_graphic.jpg',
        "A petition directed to Kathy Hochul and NYSDOT Commissioner Marie Therese Dominguez: Advance Region Central. Honor Mayor Ryan's request. Give Buffalo a lead role. Fund the next step.",
      ),
      content: [
        block(
          "That's why we've designed and visualized a future for our region; to establish a plan that revitalizes and restores the dignity of our neighborhoods by promoting connectivity, improving accessibility to our parks and waterways, and developing a catalyst of economic development.",
        ),
        localImage(
          'a_render.jpg',
          'Aerial view facing North-West over the Scajaquada Expressway.',
        ),
        block('A Revitalized Black Rock Harbor', 'h2'),
        block(
          "The Scajaquada Expressway cut communities in half and destroyed economic opportunities. By restoring long-neglected neighborhoods, such as Black Rock, we can transform our community into the gateway of Buffalo's most important waterway.",
        ),
        localImage(
          'web/b_render.jpg',
          'Facing East on the Scajaquada Expressway, between Wegmans on Amherst Street and Buffalo State College.',
        ),
        block('A Restored Scajaquada Creek Corridor', 'h2'),
        block(
          "Scajaquada Creek is one of the most polluted and impaired. For too long, we've lived alongside a creek that is polluted, buried, hardened, industrialized, and mangled by road infrastructure that supports minimal vegetation and wildlife, and is choked by raw sewage every time it rains.",
        ),
        block(
          'Our vision transforms Scajaquada Creek into a waterfront landmark that our city deserves; providing direct access to the water, significantly increasing local green-space, and restoring natural habitats.',
        ),
        localImage(
          'web/c_render.jpg',
          'Facing North-West on the Kensington Expressway, between Sisters Hospital and Canisius College.',
        ),
        block('A Magnificent Humboldt Parkway', 'h2'),
        block(
          'Our vision restores Humboldt Parkway to its historic, lush, green promenade. Serving as a vibrant community gathering place by creating liveable neighborhoods around our cultural institutions like Buffalo Museum of Science, Olmsted-designed Delaware and MLK Parks, and Canisius College.',
        ),
        localImage(
          'web/d_render.jpg',
          'Facing South-West in Delaware Park, from the Point of the Meadow Shelter and Soccer Fields.',
        ),
        block('A Reconnected Delaware Park', 'h2'),
        block(
          "The Scajaquada Expressway erased significant portions of Delaware Park, slashing apart the Meadow and the Lake. Our vision reconnects the park, restores the historic stone bridge arched over Delaware Avenue, and celebrates the cornerstone of Buffalo's cultural institutions.",
        ),
      ],
    },
  },
  {
    id: 'support',
    slug: 'support',
    status: 'published',
    data: {
      title:
        "Sign the Letter of Support for GBNRTC's Proposed Scenario for the Scajaquada Corridor!",
      featured_image: localField(
        'delaware_full1.webp',
        'A beautiful view of Hoyt Lake',
      ),
      content: [
        localImage(
          'renderings_april_21.jpeg',
          'Community Vision for a Revitalized Scajaquada Creek Corridor',
        ),
      ],
      form_url:
        'https://docs.google.com/forms/d/e/1FAIpQLSd33ZxMvnw1hKFS99aU5zncv7vTitjYwvqv6_PFyIMwGciFzg/viewform?embedded=true',
    },
  },
];
await fs.writeFile(
  path.join(root, 'seed/seed.json'),
  JSON.stringify(seed, null, 2) + '\n',
);
console.log(
  `Seed generated: ${seed.content.posts.length} posts, ${seed.content.events.length} events, ${seed.content.pages.length} pages.`,
);
