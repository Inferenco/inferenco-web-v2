import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Plugin } from "vite";
import {
  canonicalPath,
  defaultShareImage,
  notFoundMetadata,
  siteMetadata,
  siteOrigin,
  type PageMetadata,
} from "./metadata";

type PublishedArticle = {
  id: string;
  title: string;
  excerpt?: string;
  assets?: { public_url?: string | null }[];
};

type PosterPage = {
  blogs: PublishedArticle[];
  pagination: { pages: number };
};

function articleImage(baseUrl: string, image: string | null | undefined): string | undefined {
  if (!image) return undefined;
  const url = new URL(image, baseUrl + "/");
  return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
}

async function publishedArticles(apiUrl: string): Promise<Map<string, PageMetadata>> {
  const articles = new Map<string, PageMetadata>();
  if (!apiUrl) return articles;

  const baseUrl = apiUrl.replace(/\/+$/, "");
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    const response = await fetch(`${baseUrl}/api/blogs?page=${page}&limit=100`, {
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      throw new Error(`Poster API page ${page} returned HTTP ${response.status}`);
    }

    const result = await response.json() as PosterPage;
    if (!Array.isArray(result.blogs) || !Number.isSafeInteger(result.pagination?.pages) || result.pagination.pages < 0) {
      throw new Error("Poster API returned an invalid published article list");
    }
    if (page === 1) totalPages = result.pagination.pages;

    for (const article of result.blogs) {
      if (typeof article.id !== "string" || !/^[a-zA-Z0-9_-]+$/.test(article.id) ||
          typeof article.title !== "string" || !article.title.trim()) {
        throw new Error("Poster API returned an article without a valid ID and title");
      }
      articles.set(`/blogs/${article.id}/`, {
        title: article.title + " | Inferenco",
        description: article.excerpt?.trim() || "Read this article on the Inferenco blog.",
        image: articleImage(baseUrl, article.assets?.[0]?.public_url),
        article: true,
      });
    }
  }
  return articles;
}

function renderDocument(template: string, metadata: PageMetadata, path: string | null) {
  const meta = (name: string, content: string) => createElement("meta", { name, content });
  const og = (property: string, content: string) => createElement("meta", { property, content });
  const image = new URL(metadata.image ?? defaultShareImage, siteOrigin).href;
  const url = path && siteOrigin + path;
  const forestPreloads = path === "/" ? [
    { file: "blue-hour-forest-small.webp", media: "(max-width: 760px)" },
    { file: "blue-hour-forest.webp", media: "(width > 760px)" },
  ].map(({ file, media }) => createElement("link", {
    rel: "preload", as: "image", href: "/img/redesign/" + file, media, fetchPriority: "high",
  })) : [];
  const head = [
    createElement("title", null, metadata.title),
    meta("description", metadata.description),
    ...forestPreloads,
    ...(url ? [
      createElement("link", { rel: "canonical", href: url }),
      og("og:url", url),
      og("og:site_name", "Inferenco"),
      og("og:type", metadata.article ? "article" : "website"),
      og("og:title", metadata.title),
      og("og:description", metadata.description),
      og("og:image", image),
      meta("twitter:card", "summary_large_image"),
      meta("twitter:title", metadata.title),
      meta("twitter:description", metadata.description),
      meta("twitter:image", image),
    ] : [meta("robots", "noindex")]),
  ].map((element) => renderToStaticMarkup(element)).join("\n    ");

  const fallback = renderToStaticMarkup(createElement("noscript", null,
    createElement("main", null,
      createElement("h1", null, metadata.title.replace(/ \| Inferenco$/, "")),
      createElement("p", null, metadata.description),
      createElement("p", null, createElement("a", { href: "/" }, "Inferenco home")),
    ),
  ));

  return template
    .replace("<title>Inferenco</title>", () => head)
    .replace("</body>", () => `  ${fallback}\n  </body>`);
}

function renderSitemap(paths: Iterable<string>) {
  const urls = [...paths].map((path) => `  <url><loc>${siteOrigin}${path}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function sitePages(apiUrl: string, legalPaths: readonly string[]): Plugin {
  return {
    name: "inferenco-site-pages",
    configurePreviewServer(server) {
      const output = resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((request, response, next) => {
        if (request.method !== "GET" && request.method !== "HEAD") return next();

        const url = request.url ?? "";
        const [path] = url.split("?", 1);
        const canonical = canonicalPath(path);
        if (path === canonical) return next();

        // Pages redirects directory URLs to the trailing-slash form.
        const isDirectoryRoute = Object.hasOwn(siteMetadata, canonical) ||
          canonical === "/utility-apps/" || /^\/blogs\/[a-zA-Z0-9_-]+$/.test(path);
        if (!isDirectoryRoute || !existsSync(resolve(output, "." + canonical, "index.html"))) return next();

        response.writeHead(301, { Location: canonical + url.slice(path.length) });
        response.end();
      });
    },
    generateBundle: {
      order: "post",
      async handler(_options, bundle) {
        const index = bundle["index.html"];
        if (index?.type !== "asset" || typeof index.source !== "string" ||
            !index.source.includes("<title>Inferenco</title>")) {
          this.error("Missing built Inferenco app shell");
        }
        const template = index.source;
        const articles = await publishedArticles(apiUrl);
        const routes = new Map([...Object.entries(siteMetadata), ...articles]);

        for (const [path, metadata] of routes) {
          const source = renderDocument(template, metadata, path);
          if (path === "/") index.source = source;
          else this.emitFile({ type: "asset", fileName: `${path.slice(1)}index.html`, source });
        }

        this.emitFile({
          type: "asset",
          fileName: "404.html",
          source: renderDocument(template, notFoundMetadata, null),
        });
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: renderSitemap([...routes.keys(), ...legalPaths]),
        });
      },
    },
  };
}
