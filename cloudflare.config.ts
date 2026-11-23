import { bindings, defineConfig, triggers } from 'cf/config';

const name = 'scc-emdash-staging';
const stagingUrl = process.env.SCC_STAGING_URL;

if (
  stagingUrl &&
  !/^https:\/\/scc-emdash-staging\.[a-z0-9-]+\.workers\.dev$/.test(stagingUrl)
) {
  throw new Error(
    'SCC_STAGING_URL must be the staging Worker origin on workers.dev.',
  );
}

export default defineConfig({
  worker: {
    name,
    entrypoint: './src/worker.ts',
    compatibilityDate: '2026-11-23',
    compatibilityFlags: ['nodejs_compat'],
    workersDev: Boolean(stagingUrl),
    previewUrls: false,
    env: {
      ASSETS: bindings.assets(),
      DB: bindings.d1({ name }),
      MEDIA: bindings.r2({ name: `${name}-media` }),
      SESSION: bindings.kv(),
      IMAGES: bindings.images(),
      EMDASH_SITE_URL: stagingUrl && bindings.text(stagingUrl),
    },
    triggers: [triggers.scheduled({ schedule: '* * * * *' })],
    observability: { enabled: true, traces: { enabled: true } },
  },
});
