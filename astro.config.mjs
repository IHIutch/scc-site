import cloudflare from '@astrojs/cloudflare';
import { d1, r2 } from '@emdash-cms/cloudflare';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import emdash from 'emdash/astro';
import {
  adapterConfigPath,
  cloudflareBuildOutput,
  prepareCloudflareAdapter,
} from './config/astro-cloudflare.mjs';

const cloudflareConfig = await prepareCloudflareAdapter();

export default defineConfig({
  output: 'server',
  adapter: cloudflare({ configPath: adapterConfigPath }),
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  integrations: [
    react(),
    emdash({
      database: d1({ binding: 'DB', session: 'auto', coalesce: true }),
      storage: r2({ binding: 'MEDIA' }),
    }),
    cloudflareBuildOutput(cloudflareConfig),
  ],
  vite: {
    environments: {
      ssr: {
        build: {
          rolldownOptions: {
            output: {
              // EmDash's HTML sanitizer loads Node built-ins through CommonJS.
              banner:
                'import { createRequire as createWorkerRequire } from "node:module"; const require = createWorkerRequire(import.meta.url);',
            },
          },
        },
      },
    },
  },
  devToolbar: { enabled: false },
});
