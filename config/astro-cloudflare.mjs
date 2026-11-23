import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  cleanBuildOutputDir,
  getWorkerBundleDir,
  writeAssets,
  writeRootConfig,
  writeWorkerConfig,
} from '@cloudflare/build-output-utils';
import {
  convertToWranglerConfig,
  resolveAndParseConfig,
} from '@cloudflare/config';
import cloudflareConfig from '../cloudflare.config.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const buildContext = { isPreview: false, mode: undefined };

export const adapterConfigPath = './.cloudflare/astro-worker.json';

export async function prepareCloudflareAdapter() {
  const parsed = await resolveAndParseConfig(cloudflareConfig, buildContext);
  if (!parsed.success) throw parsed.error;
  const config = parsed.data;
  const adapterConfig = convertToWranglerConfig(config);
  // The adapter resolves its source entrypoint relative to its config file.
  adapterConfig.main = resolve(root, adapterConfig.main);
  const configPath = resolve(root, adapterConfigPath);
  await mkdir(dirname(configPath), { recursive: true });
  await writeFile(configPath, JSON.stringify(adapterConfig));
  return config;
}

// Astro's Cloudflare adapter emits a bundled Worker and static assets. Expose
// those same files in the format cf expects until the adapter emits it itself.
export function cloudflareBuildOutput(config) {
  let server;
  return {
    name: 'scc-cloudflare-build-output',
    hooks: {
      'astro:config:done': ({ config }) => {
        server = fileURLToPath(config.build.server);
      },
      'astro:build:done': async () => {
        const { main, assets } = JSON.parse(
          await readFile(join(server, 'wrangler.json'), 'utf8'),
        );
        const files = await readdir(server, { recursive: true });
        const modules = Object.fromEntries(
          files
            .filter((file) => file.endsWith('.mjs'))
            .map((file) => [file, { type: 'esm' }]),
        );
        if (!Object.hasOwn(modules, main)) {
          throw new Error(
            `Astro Worker entrypoint missing from the bundle: ${main}`,
          );
        }

        await cleanBuildOutputDir(root);
        const bundle = getWorkerBundleDir(root);
        await Promise.all(
          Object.keys(modules).map(async (file) => {
            const target = join(bundle, file);
            await mkdir(dirname(target), { recursive: true });
            await cp(join(server, file), target);
          }),
        );
        await writeAssets({
          root,
          sourceDirectory: resolve(server, assets.directory),
        });
        await writeWorkerConfig({
          root,
          config: config.worker,
          manifest: { type: 'complete', mainModule: main, modules },
        });
        await writeRootConfig({ root, buildContext });
      },
    },
  };
}
