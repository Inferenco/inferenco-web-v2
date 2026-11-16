import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Markdown from "react-markdown";
import type { Plugin } from "vite";

export const legalTemplate = "src/legal/page.html";

// Each app supplies its own privacy.md and terms.md, including platform
// publishers, contacts, data handling, ads, and purchases as applicable.
const apps = ["nemesis-go"];
const documents = ["privacy", "terms"] as const;
const labels = { privacy: "Privacy Policy", terms: "Terms of Use" };

const pages = apps.flatMap((app) =>
  documents.map((kind) => {
    const other = kind === "privacy" ? "terms" : "privacy";
    return {
      path: `/${app}/${kind}/`,
      source: `src/legal/${app}/${kind}.md`,
      relatedPath: `/${app}/${other}/`,
      relatedLabel: labels[other],
    };
  }),
);

function renderPage(template: string, root: string, page: (typeof pages)[number]) {
  const markdown = readFileSync(resolve(root, page.source), "utf8");
  const title = /^# (.+)/.exec(markdown)?.[1];
  if (!title) throw new Error(`Missing legal page title in ${page.source}`);

  return template
    .replace("<!-- legal:title -->", () => renderToStaticMarkup(title))
    .replace("<!-- legal:canonical -->", () =>
      renderToStaticMarkup(createElement("link", {
        rel: "canonical",
        href: `https://inferenco.com${page.path}`,
      })),
    )
    .replace("<!-- legal:content -->", () =>
      renderToStaticMarkup(createElement(Markdown, null, markdown)),
    )
    .replace("<!-- legal:related -->", () =>
      renderToStaticMarkup(createElement("a", { href: page.relatedPath }, page.relatedLabel)),
    );
}

export function legalPages(): Plugin {
  return {
    name: "inferenco-legal-pages",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = request.url?.split("?")[0];
        const page = pages.find(({ path }) => path === pathname || path.slice(0, -1) === pathname);
        if (!page || (request.method !== "GET" && request.method !== "HEAD")) return next();

        try {
          const { root } = server.config;
          const template = readFileSync(resolve(root, legalTemplate), "utf8");
          const html = await server.transformIndexHtml(`/${legalTemplate}`, renderPage(template, root, page));
          response.setHeader("Content-Type", "text/html; charset=utf-8");
          response.end(html);
        } catch (error) {
          next(error);
        }
      });
    },
    configurePreviewServer(server) {
      // GitHub Pages redirects slashless directory URLs to their index.
      server.middlewares.use((request, response, next) => {
        if (request.method !== "GET" && request.method !== "HEAD") return next();

        const url = request.url ?? "";
        const [pathname] = url.split("?", 1);
        const page = pages.find(({ path }) => path.slice(0, -1) === pathname);
        if (!page) return next();

        response.writeHead(301, { Location: page.path + url.slice(pathname.length) });
        response.end();
      });
    },
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const template = bundle[legalTemplate];
        if (template?.type !== "asset" || typeof template.source !== "string") {
          this.error(`Missing built legal template: ${legalTemplate}`);
        }

        for (const page of pages) {
          this.emitFile({
            type: "asset",
            fileName: `${page.path.slice(1)}index.html`,
            source: renderPage(template.source, this.environment.config.root, page),
          });
        }
        delete bundle[legalTemplate];
      },
    },
  };
}
