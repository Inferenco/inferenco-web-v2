import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import {
  LANGUAGE_TAGS,
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  type SupportedLanguage,
} from "./languages";
import { initialLanguage, saveLanguage } from "./detect";

/**
 * The catalogue namespaces. `chrome` is site chrome (nav, footer, 404,
 * switcher), `home` is the landing page, `media` is the media & entertainment
 * page, `blog` is the blog **chrome only** — Poster-API content is never
 * localized.
 *
 * The onchain product pages, the docs hub, every docs page and the legal
 * sources are excluded by construction: they do not import this module.
 */
export const NAMESPACES = ["chrome", "home", "media", "blog"] as const;
export type CatalogueNamespace = (typeof NAMESPACES)[number];

type NamespaceResources = Record<string, unknown>;
type Catalogue = Record<CatalogueNamespace, NamespaceResources>;

/**
 * English is eager-imported (it is the fallback, so it must always be
 * present). The other 13 are lazy per-locale chunks, resolved through
 * `import.meta.glob` and added to i18next **before** the language change
 * resolves, so a switch never renders a key.
 *
 * There is deliberately no `i18next-http-backend` and no `public/locales/`:
 * the catalogues are build-time modules, not runtime fetches.
 */
const lazyCatalogues = import.meta.glob<{ default: Catalogue }>("./locales/*.json");

/**
 * Locales whose resources are already known to the instance. Tracked locally
 * because i18next only attaches `hasResourceBundle`/`addResourceBundle` to the
 * instance *during* `init()` (both are forwarded to the resource store), so
 * neither can be called while the detected locale is being preloaded.
 */
const loadedCatalogues = new Set<string>(["en"]);

async function readCatalogue(language: SupportedLanguage): Promise<Catalogue | null> {
  const loader = lazyCatalogues[`./locales/${language}.json`];
  if (!loader) return null;
  const module = await loader();
  return module.default ?? null;
}

/** Add a lazy catalogue to the already-initialized instance. */
async function ensureCatalogue(language: SupportedLanguage): Promise<void> {
  if (loadedCatalogues.has(language)) return;

  const catalogue = await readCatalogue(language);
  if (!catalogue) return;

  for (const namespace of NAMESPACES) {
    const resources = catalogue[namespace];
    if (resources) {
      i18n.addResourceBundle(language, namespace, resources, true, true);
    }
  }
  loadedCatalogues.add(language);
}

function applyDocumentLang(language: string): void {
  const supported = isSupportedLanguage(language);
  const tag = supported ? LANGUAGE_TAGS[language] : "en";
  document.documentElement.lang = tag;
  // D3 reversal (site-only): Arabic renders RTL; every other locale LTR.
  // English-only islands (/docs, /infer*) carry static dir="ltr" wrappers.
  // The Nemesis Go app itself remains LTR — this divergence is intentional
  // and documented. Never touch the theme classes or `data-theme`.
  document.documentElement.dir = supported && language === "ar" ? "rtl" : "ltr";
}

/**
 * Switch locale: fetch the catalogue first, then change the language, then
 * persist the choice. Only an explicit switcher call reaches this function, so
 * detection never writes storage.
 */
export async function setLanguage(language: SupportedLanguage): Promise<void> {
  await ensureCatalogue(language);
  await i18n.changeLanguage(language);
  saveLanguage(language);
}

/**
 * Initialize i18next. `main.tsx` awaits this **before** `createRoot`, so the
 * first paint is already in the resolved language and no key flashes.
 */
export async function initI18n(): Promise<typeof i18n> {
  const language = initialLanguage();
  // The detected locale's catalogue is awaited *before* init and handed to it
  // as resources: i18next cannot accept resource bundles until it is
  // initialized, and waiting for `languageChanged` would paint English first.
  const detected = language === "en" ? null : await readCatalogue(language);

  await i18n.use(initReactI18next).init({
    resources: {
      en: {
        chrome: en.chrome,
        home: en.home,
        media: en.media,
        blog: en.blog,
      },
      ...(detected ? { [language]: detected } : {}),
    },
    lng: language,
    fallbackLng: "en",
    supportedLngs: [...SUPPORTED_LANGUAGES],
    defaultNS: "chrome",
    ns: [...NAMESPACES],
    interpolation: {
      // React escapes rendered text already.
      escapeValue: false,
    },
    react: {
      // Catalogues are awaited before render, so suspense is not needed and
      // would suspend the whole tree.
      useSuspense: false,
    },
  });

  if (detected) loadedCatalogues.add(language);

  i18n.on("languageChanged", applyDocumentLang);
  applyDocumentLang(i18n.resolvedLanguage ?? "en");

  return i18n;
}

/**
 * The BCP 47 tag of the active locale, for `Intl` / `toLocaleDateString`.
 * Unknown resolutions fall back to `en`, matching the registry ladder.
 */
export function currentLocaleTag(): string {
  const resolved = i18n.resolvedLanguage ?? i18n.language;
  return isSupportedLanguage(resolved) ? LANGUAGE_TAGS[resolved] : "en";
}

/**
 * Per-locale Nemesis Go legal URL. EN (and any unknown resolution) uses the
 * canonical unlocalized pair; the 13 other locales use /nemesis-go/<lng>/<doc>/
 * emitted by src/legal/build.ts. Relative so it works on dev/preview/prod.
 */
export function nemesisLegalUrl(doc: "privacy" | "terms"): string {
  const resolved = i18n.resolvedLanguage ?? i18n.language;
  const lng = isSupportedLanguage(resolved) && resolved !== "en" ? resolved : null;
  return lng ? `/nemesis-go/${lng}/${doc}/` : `/nemesis-go/${doc}/`;
}

/** Per-locale support URL: EN (and unknown) → /support/, others → /support/<lng>/. */
export function supportUrl(): string {
  const resolved = i18n.resolvedLanguage ?? i18n.language;
  const lng = isSupportedLanguage(resolved) && resolved !== "en" ? resolved : null;
  return lng ? `/support/${lng}/` : `/support/`;
}

export default i18n;
