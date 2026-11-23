# Inferenco deployment

The Vite build publishes `dist/` to GitHub Pages for `inferenco.com`. The [deployment workflow](.github/workflows/deploy.yml) builds and tests pull requests. Its deployment step runs only for `refs/heads/main`, including the scheduled refresh and a manual run on main.

## Verify a release candidate locally

Use Node 22 and the repository’s pnpm lockfile. Run these commands from the project checkout.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm lint
pnpm run build
pnpm run test:legal
pnpm run test:routes
pnpm run preview
```

Set the public `VITE_POSTER_API_URL` build variable when testing live blog content. The configured build emits static entries for current published articles and fails if it cannot obtain the article index. The nightly or manual main workflow refreshes those entries and generates the latest MCP download manifest.

## Check the published site after release

Verify the domain and static routing from a fresh browser tab. Compare against the release candidate checks in the [redesign plan](docs/redesign/PLAN.md).

- Load the homepage, Apps & Games, each app page, the blog and a published article, Docs and an Onchain product by URL. Each published page should return HTTP 200 at its canonical address. An unknown address should return 404.
- Check that Docs section links and older Apps & Games links still reach their targets. The `/utility-apps/` redirect preserves the query and fragment.
- Check `/robots.txt`, `/sitemap.xml`, `/app-ads.txt`, `/downloads.json`, localized support and Nemesis Go policy pages. Verify that a product page’s share image loads and matches its metadata.
- Open the mobile drawer and a product page in Arabic. Check RTL layout, theme persistence and the appropriate platform links.

## Roll back an approved release

Record the last verified production source commit before release. If a release needs rollback, revert the release change on main through the normal review and Pages workflow. Verify the restored source commit and repeat the public checks once the workflow publishes.
