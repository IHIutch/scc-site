# Scajaquada Corridor Coalition

The Scajaquada Corridor Coalition website uses Astro and EmDash. Cloudflare Workers serves the site, D1 stores content, and a private R2 bucket stores media. The staging deployment contains the migrated blog posts, events, homepage, and support page.

## Build and run locally

Use Node.js 24.22 or later in the 24.x line and pnpm 11.21.

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm exec cf build
pnpm exec cf deploy --prebuilt --dry-run
pnpm preview --port 4333
```

The preview uses local D1, R2, KV, and Images bindings. To prepare an empty local transfer target, start `pnpm dev --port 4333` and open `/_emdash/api/setup/dev-bypass?content=0&redirect=/_emdash/admin` on that localhost server. Import the package from the admin. Stop the dev server before starting the built preview on the same port to reuse the local state.

Astro builds the Worker with its Cloudflare adapter. The integration in `config/astro-cloudflare.mjs` writes the adapter's Worker bundle and assets to `.cloudflare/output/v1/` so `cf` can validate and deploy them. Edit `cloudflare.config.ts` to change Worker bindings and triggers. The adapter's generated configuration is a build artifact.

## Set up hosted staging

Enable R2 in the Cloudflare dashboard. Protect the `scc-emdash-staging` workers.dev hostname with a Cloudflare Access application before using it for EmDash setup or import. The build defaults to having its workers.dev and preview URLs disabled. Set `SCC_STAGING_URL` to the protected workers.dev origin before you build and deploy the staging Worker.

Generate a separate `EMDASH_ENCRYPTION_KEY` and supply it in a private file using `pnpm exec cf deploy --prebuilt --secrets-file /path/to/private/staging-secrets.env`. The file must contain the staging key. Keep the original SQLite database, uploads, and key with the Node deployment. For the first deploy, `cf` resolves or provisions the staging bindings listed in `cloudflare.config.ts`. It uses `DB` for EmDash, `MEDIA` for uploads, and `SESSION` for Astro sessions. The scheduled handler runs once a minute.

Open `/_emdash/admin` on staging. Create the staging administrator and its passkey. Leave **sample content** unchecked so the target is eligible for site transfer.

## Transfer the site

From a backup of the Node site, use **Settings → Transfer → Export site** to produce an `.emdash` package. Store the export under the ignored `.emdash/transfer/` directory or with the private database backups. In the staging admin, open **Settings → Transfer**, upload the package, review the author mappings and import plan, and confirm the import. Save the verified receipt. EmDash transfers entries, revisions, and media. Set up each editor's access and passkey on the destination.

The Strapi snapshots under `migration/` and the generated seed document the original import. `pnpm migrate:strapi` regenerates the seed from those snapshots. Pass the path to a legacy Remix checkout with its Strapi configuration to refresh the snapshots first. Use the site package to carry EmDash edits and media onto staging.

## Verify before cutover

Run the verifier with a read-only SQLite snapshot from the Node source and a running copy of that site for rendered text comparison.

```sh
pnpm verify:migration http://localhost:4333 \
  --database /path/to/source-snapshot.db \
  --baseline http://localhost:4332
```

It checks the 15 posts and 11 events against the original snapshots, compares rendered content, and tests public routes, rendered assets, redirects, and 404s. It writes `migration/verification.json`. For staging behind Access, supply an approved service token via `CF_ACCESS_CLIENT_ID` and `CF_ACCESS_CLIENT_SECRET`. The verifier sends these headers only to the destination origin. Confirm that an editor can sign in, preview an unpublished entry, publish it, and see the published page while signed out.

Leave the public domain on Vercel and keep Strapi online through QA. Coordinate Vercel’s production-branch deployment settings before merging this migration. Use a fresh package from staging for the production transfer so it includes staging edits and media. Switch DNS only after staging passes and the site owner has completed QA. Preserve the apex redirect to `www.sccoalition.net`.

[EmDash Cloudflare deployment](https://docs.emdashcms.com/deployment/cloudflare/) · [EmDash site transfer](https://docs.emdashcms.com/guides/site-transfer/) · [Cloudflare Access for Workers](https://developers.cloudflare.com/workers/configuration/cloudflare-access/)
