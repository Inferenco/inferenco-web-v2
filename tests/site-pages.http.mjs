import { after, test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build, preview } from "vite";
import { JSDOM } from "jsdom";

const output = await mkdtemp(join(tmpdir(), "inferenco-site-pages-"));
after(() => rm(output, { recursive: true, force: true }));

const posterRequests = [];
const poster = createServer((request, response) => {
  posterRequests.push(request.url);
  const secondPage = request.url === "/api/blogs?page=2&limit=100";
  const articles = secondPage
    ? [{ id: "a-second-article", title: 'A <b>carefully</b> "written" article', excerpt: "Second & last." }]
    : [{ id: "a-first-article", title: "Release notes", excerpt: "What changed.", assets: [{ public_url: "/public/assets/cover" }] }];
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ blogs: articles, pagination: { pages: 2 } }));
});
poster.listen(0, "127.0.0.1");
await once(poster, "listening");
const posterOrigin = `http://127.0.0.1:${poster.address().port}`;
const inheritedPosterUrl = process.env.VITE_POSTER_API_URL;
process.env.VITE_POSTER_API_URL = posterOrigin;
try {
  await build({ logLevel: "error", build: { outDir: output, emptyOutDir: true } });
} finally {
  await new Promise((resolve) => poster.close(resolve));
  if (inheritedPosterUrl === undefined) delete process.env.VITE_POSTER_API_URL;
  else process.env.VITE_POSTER_API_URL = inheritedPosterUrl;
}

const server = await preview({
  logLevel: "error",
  build: { outDir: output },
  preview: { host: "127.0.0.1", port: 0 },
});
after(() => server.close());
const origin = `http://127.0.0.1:${server.httpServer.address().port}`;

async function html(path) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type"), /^text\/html\b/);
  return new JSDOM(await response.text());
}

const site = "https://inferenco.com";
const staticRoutes = new Map([
  ["/", "Inferenco | Independent Apps, Games & Media Tools"],
  ["/games-and-apps/", "Apps & Games | Inferenco"],
  ["/games-and-apps/nemesis-go/", "Nemesis Go | Inferenco"],
  ["/games-and-apps/sound-flipper/", "Sound Flipper | Inferenco"],
  ["/games-and-apps/resize-and-compress/", "Image: Resize & Compress | Inferenco"],
  ["/blogs/", "Blogs | Inferenco"],
  ["/docs/", "Documentation | Inferenco"],
  ["/infer/", "Infer Bot | Inferenco"],
  ["/infer-wallet/", "Infer Wallet | Inferenco"],
  ["/infer-desk/", "Infer Desk | Inferenco"],
  ["/infer-mcp/", "Infer MCP | Inferenco"],
]);

test("published application pages respond directly with self-canonical metadata", async () => {
  for (const [path, title] of staticRoutes) {
    const dom = await html(path);
    try {
      const { document } = dom.window;
      assert.equal(document.title, title);
      assert.equal(document.querySelector('link[rel="canonical"]').href, site + path);
      assert.equal(document.querySelector('meta[property="og:title"]').content, title);
      assert.ok(document.querySelector('meta[name="description"]').content);
      const image = new URL(document.querySelector('meta[property="og:image"]').content);
      assert.equal(image.origin, site);
      const asset = await fetch(origin + image.pathname, { method: "HEAD" });
      assert.equal(asset.status, 200, image.pathname);
      assert.match(asset.headers.get("content-type"), /^image\//);

      const script = document.querySelector('script[type="module"][src]').getAttribute("src");
      assert.match(script, /^\/assets\//);
      assert.equal((await fetch(origin + script, { method: "HEAD" })).status, 200);
    } finally {
      dom.window.close();
    }
  }
});

test("Poster article IDs from every page get direct URLs and escaped metadata", async () => {
  assert.deepEqual(posterRequests, ["/api/blogs?page=1&limit=100", "/api/blogs?page=2&limit=100"]);
  const first = await html("/blogs/a-first-article/");
  const second = await html("/blogs/a-second-article/");
  try {
    const firstPage = first.window.document;
    const secondPage = second.window.document;
    assert.equal(firstPage.querySelector('meta[property="og:type"]').content, "article");
    assert.equal(firstPage.querySelector('meta[property="og:image"]').content, posterOrigin + "/public/assets/cover");
    assert.equal(secondPage.title, 'A <b>carefully</b> "written" article | Inferenco');
    assert.equal(secondPage.querySelector('meta[name="description"]').content, "Second & last.");
    assert.equal(secondPage.querySelector('link[rel="canonical"]').href, site + "/blogs/a-second-article/");
  } finally {
    first.window.close();
    second.window.close();
  }
});

test("the sitemap covers published routes and the robots directive points to it", async () => {
  const sitemap = await fetch(origin + "/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const dom = new JSDOM(await sitemap.text(), { contentType: "application/xml" });
  try {
    const urls = [...dom.window.document.querySelectorAll("loc")].map((loc) => loc.textContent);
    for (const path of [
      ...staticRoutes.keys(), "/blogs/a-first-article/", "/blogs/a-second-article/",
      "/support/", "/support/ar/", "/privacy/", "/terms/", "/nemesis-go/ar/privacy/",
    ]) {
      assert.ok(urls.includes(site + path), path);
    }
    assert.equal(new Set(urls).size, urls.length, "canonical locations are unique");
    for (const missing of ["/utility-apps/", "/404.html", "/app.html", "/nova.html"]) {
      assert.ok(!urls.includes(site + missing), missing);
    }
  } finally {
    dom.window.close();
  }
  const robots = await fetch(origin + "/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /^Sitemap: https:\/\/inferenco\.com\/sitemap\.xml$/m);
});

test("existing redirects and verification files remain available while missing routes return 404", async () => {
  for (const path of ["/games-and-apps", "/blogs", "/blogs/a-first-article", "/docs", "/utility-apps"]) {
    const response = await fetch(origin + path + "?source=direct", { redirect: "manual" });
    assert.equal(response.status, 301, path);
    assert.equal(response.headers.get("Location"), path + "/?source=direct");
  }
  for (const path of ["/some-absent-path/", "/blogs/unpublished-id/", "/games-and-apps/missing-app/"]) {
    assert.equal((await fetch(origin + path)).status, 404, path);
  }

  const legacy = await html("/utility-apps/?source=legacy");
  const missing = await html("/404.html");
  try {
    assert.match(legacy.serialize(), /location\.search \+ location\.hash/);
    assert.equal(missing.window.document.querySelector('meta[name="robots"]').content, "noindex");
    assert.equal(missing.window.document.querySelector('link[rel="canonical"]'), null);
  } finally {
    legacy.window.close();
    missing.window.close();
  }

  for (const path of ["/app-ads.txt", "/support/ar/", "/nemesis-go/ar/terms/"]) {
    assert.equal((await fetch(origin + path)).status, 200, path);
  }
});
