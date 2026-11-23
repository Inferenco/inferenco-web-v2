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

/**
 * Localised legal documents. App Store Connect asks for a privacy/terms URL
 * per localisation, so every supported site locale gets its own static pair at
 * `/nemesis-go/<lng>/<doc>/`. English keeps its canonical unlocalised paths and
 * its byte-identical output.
 *
 * Keys are the site locales (`SUPPORTED_LANGUAGES` minus `en`) and values are
 * the BCP 47 tags written to `<html lang>` — the same mapping as LANGUAGE_TAGS
 * in src/i18n/languages.ts, inlined here because this module is build-time
 * Node code that must not pull the browser i18n runtime into the Vite config.
 */
const localeTags: Readonly<Record<string, string>> = {
  ar: "ar",
  de: "de",
  es: "es",
  fr: "fr",
  it: "it",
  ja: "ja",
  kk: "kk",
  "pt-BR": "pt-BR",
  "pt-PT": "pt-PT",
  ru: "ru",
  tr: "tr",
  uk: "uk",
  zh: "zh",
};

/** Short nav labels per locale, used for the sibling-document related link. */
const localeLabels: Readonly<Record<string, { privacy: string; terms: string }>> = {
  ar: { privacy: "سياسة الخصوصية", terms: "شروط الاستخدام" },
  de: { privacy: "Datenschutzrichtlinie", terms: "Nutzungsbedingungen" },
  es: { privacy: "Política de privacidad", terms: "Condiciones de uso" },
  fr: { privacy: "Politique de confidentialité", terms: "Conditions d’utilisation" },
  it: { privacy: "Informativa sulla privacy", terms: "Condizioni d’uso" },
  ja: { privacy: "プライバシーポリシー", terms: "利用規約" },
  kk: { privacy: "Құпиялық саясаты", terms: "Пайдалану шарттары" },
  "pt-BR": { privacy: "Política de Privacidade", terms: "Termos de Uso" },
  "pt-PT": { privacy: "Política de Privacidade", terms: "Termos de Utilização" },
  ru: { privacy: "Политика конфиденциальности", terms: "Условия использования" },
  tr: { privacy: "Gizlilik Politikası", terms: "Kullanım Koşulları" },
  uk: { privacy: "Політика конфіденційності", terms: "Умови використання" },
  zh: { privacy: "隐私政策", terms: "使用条款" },
};

/** Label of the link back to the governing English text (locale pages only). */
const localeOriginalLabels: Readonly<Record<string, string>> = {
  ar: "النسخة الإنجليزية",
  de: "Englische Fassung",
  es: "Versión en inglés",
  fr: "Version anglaise",
  it: "Versione in inglese",
  ja: "英語版",
  kk: "Ағылшын нұсқасы",
  "pt-BR": "Versão em inglês",
  "pt-PT": "Versão em inglês",
  ru: "Английская версия",
  tr: "İngilizce sürüm",
  uk: "Англійська версія",
  zh: "英文版本",
};

type LegalPage = {
  path: string;
  source: string;
  lang: string;
  related: { path: string; label: string }[];
};

const pages: LegalPage[] = apps.flatMap((app) =>
  documents.flatMap((kind) => {
    const other = kind === "privacy" ? "terms" : "privacy";
    const english: LegalPage = {
      path: `/${app}/${kind}/`,
      source: `src/legal/${app}/${kind}.md`,
      lang: "en",
      related: [{ path: `/${app}/${other}/`, label: labels[other] }],
    };

    const localized = Object.entries(localeTags).map(([lng, tag]): LegalPage => ({
      path: `/${app}/${lng}/${kind}/`,
      source: `src/legal/${app}/${lng}/${kind}.md`,
      lang: tag,
      related: [
        { path: `/${app}/${lng}/${other}/`, label: localeLabels[lng][other] },
        { path: `/${app}/${other}/`, label: localeOriginalLabels[lng] },
      ],
    }));

    return [english, ...localized];
  }),
);

function renderPage(template: string, root: string, page: LegalPage) {
  const markdown = readFileSync(resolve(root, page.source), "utf8");
  const title = /^# (.+)/.exec(markdown)?.[1];
  if (!title) throw new Error(`Missing legal page title in ${page.source}`);

  return template
    // EN emits lang="en", which is the template's own value: a no-op that keeps
    // the English output byte-identical.
    .replace('<html lang="en"', () => `<html lang="${page.lang}"`)
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
      page.related
        .map((related) =>
          renderToStaticMarkup(createElement("a", { href: related.path }, related.label)),
        )
        .join(" · "),
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
