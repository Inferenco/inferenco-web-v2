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

/** Localised related-navigation and language labels for static pages. */
const relatedNavigation: Readonly<Record<string, { label: string; english: string }>> = {
  ar: { label: "صفحات ذات صلة", english: " (بالإنجليزية)" },
  de: { label: "Verwandte Seiten", english: " (auf Englisch)" },
  es: { label: "Páginas relacionadas", english: " (en inglés)" },
  fr: { label: "Pages connexes", english: " (en anglais)" },
  it: { label: "Pagine correlate", english: " (in inglese)" },
  ja: { label: "関連ページ", english: "（英語）" },
  kk: { label: "Қатысты беттер", english: " (ағылшын тілінде)" },
  "pt-BR": { label: "Páginas relacionadas", english: " (em inglês)" },
  "pt-PT": { label: "Páginas relacionadas", english: " (em inglês)" },
  ru: { label: "Связанные страницы", english: " (на английском)" },
  tr: { label: "İlgili sayfalar", english: " (İngilizce)" },
  uk: { label: "Пов’язані сторінки", english: " (англійською)" },
  zh: { label: "相关页面", english: "（英语）" },
};

type LegalPage = {
  path: string;
  source: string;
  lang: string;
  related: { path: string; label: string }[];
  relatedLabel?: string;
};

/** Related-nav labels for the support page's two links, per locale. */
const supportRelatedLabels: Readonly<Record<string, { apps: string; home: string }>> = {
  ar: { apps: "الألعاب والتطبيقات", home: "الرئيسية" },
  de: { apps: "Spiele & Apps", home: "Startseite" },
  es: { apps: "Juegos y apps", home: "Inicio" },
  fr: { apps: "Jeux et applis", home: "Accueil" },
  it: { apps: "Giochi e app", home: "Home" },
  ja: { apps: "ゲームとアプリ", home: "ホーム" },
  kk: { apps: "Ойындар мен қолданбалар", home: "Басты бет" },
  "pt-BR": { apps: "Jogos e apps", home: "Início" },
  "pt-PT": { apps: "Jogos e aplicações", home: "Início" },
  ru: { apps: "Игры и приложения", home: "Главная" },
  tr: { apps: "Oyunlar ve uygulamalar", home: "Ana sayfa" },
  uk: { apps: "Ігри та застосунки", home: "Головна" },
  zh: { apps: "游戏和应用", home: "首页" },
};

const supportEnglish: LegalPage = {
  path: "/support/",
  source: "src/legal/support.md",
  lang: "en",
  relatedLabel: "Related pages",
  related: [
    { path: "/games-and-apps/", label: "Games & Apps" },
    { path: "/", label: "Home" },
  ],
};

const supportLocalized = Object.entries(localeTags).map(([lng, tag]): LegalPage => ({
  path: `/support/${lng}/`,
  source: `src/legal/support/${lng}.md`,
  lang: tag,
  relatedLabel: relatedNavigation[lng].label,
  related: [
    { path: "/games-and-apps/", label: supportRelatedLabels[lng].apps },
    { path: "/", label: supportRelatedLabels[lng].home },
  ],
}));

const websitePages = documents.map((kind): LegalPage => {
  const other = kind === "privacy" ? "terms" : "privacy";
  return {
    path: `/${kind}/`,
    source: `src/legal/website/${kind}.md`,
    lang: "en",
    relatedLabel: "Related pages",
    related: [{ path: `/${other}/`, label: labels[other] }],
  };
});

const pages: LegalPage[] = [
  ...websitePages,
  ...apps.flatMap((app) =>
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
      relatedLabel: relatedNavigation[lng].label,
      related: [
        { path: `/${app}/${lng}/${other}/`, label: localeLabels[lng][other] },
        { path: `/${app}/${other}/`, label: localeLabels[lng][other] + relatedNavigation[lng].english },
      ],
    }));

    return [english, ...localized];
  }),
  ),
  supportEnglish,
  ...supportLocalized,
];

export const legalPagePaths = pages.map(({ path }) => path);

function renderPage(template: string, root: string, page: LegalPage) {
  const markdown = readFileSync(resolve(root, page.source), "utf8");
  const title = /^# (.+)/.exec(markdown)?.[1];
  if (!title) throw new Error(`Missing legal page title in ${page.source}`);

  return template
    // EN emits lang="en", which is the template's own value: a no-op that keeps
    // the English output byte-identical. Arabic (site-only D3 reversal) adds
    // dir="rtl"; the match excludes the closing '>' so the template's
    // ` class="dark">` suffix is preserved for every locale.
    .replace('<html lang="en"', () => `<html lang="${page.lang}"${page.lang === "ar" ? ' dir="rtl"' : ''}`)
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
    )
    // The English legal pages use the template label.
    .replace("<!-- legal:related-label -->", () => page.relatedLabel ?? "Related legal page");
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
