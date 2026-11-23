/**
 * The Inferenco site locale registry.
 *
 * The 14 codes, their **render order**, the endonyms and the BCP 47 tags are
 * copied verbatim from the Nemesis Go app registry at
 * `nemesis-go-v3/mobile/src/i18n/languages.ts` (`SUPPORTED_LANGUAGES` :25-40,
 * `LANGUAGE_ENDONYMS` :59-74, `LANGUAGE_TAGS` :146-161). That order is a
 * **cross-repo contract**: the app pins it with an exact ordered `toEqual`
 * (`nemesis-go-v3/mobile/__tests__/languages.test.ts:21-41`, plus a second
 * case asserting `pt-PT` immediately after `pt-BR`), and it is the order the
 * in-app picker renders. A site that sorted this list alphabetically or by
 * market size would diverge from the product.
 *
 * `zh` means **Simplified** Chinese. `ar` ships **LTR-retained** (Nemesis Go
 * decision D3) — this site must not set `dir="rtl"` on its behalf.
 */
export const SUPPORTED_LANGUAGES = [
  "en",
  "ar",
  "de",
  "es",
  "fr",
  "it",
  "ja",
  "kk",
  "pt-BR",
  "pt-PT",
  "ru",
  "tr",
  "uk",
  "zh",
] as const;

/** One of the 14 supported locales. */
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * The **endonym** of every locale — the language's name **in that language**.
 *
 * Locale-independent constants, copied from `languages.ts:59-74`: a user who
 * cannot read the current UI language must still find their own.
 */
export const LANGUAGE_ENDONYMS: Readonly<Record<SupportedLanguage, string>> = {
  en: "English",
  ar: "العربية",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  ja: "日本語",
  kk: "Қазақша",
  "pt-BR": "Português (Brasil)",
  "pt-PT": "Português (Portugal)",
  ru: "Русский",
  tr: "Türkçe",
  uk: "Українська",
  zh: "简体中文",
};

/**
 * The **BCP 47** tag of each locale, for `Intl` / `toLocaleDateString` and for
 * `document.documentElement.lang`. Copied from `languages.ts:146-161`.
 */
export const LANGUAGE_TAGS: Readonly<Record<SupportedLanguage, string>> = {
  en: "en",
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

export function isSupportedLanguage(
  value: string | null | undefined,
): value is SupportedLanguage {
  return typeof value === "string" && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

/**
 * The same ladder as `resolveLanguageFromTag`, but it reports **no match**
 * instead of defaulting to English.
 *
 * This is what makes a browser *preference list* work: `navigator.languages`
 * is ordered, so `['hi', 'de', 'en']` must skip the unsupported `hi` and land
 * on `de`, not fall straight through to English. The terminal `en` fallback
 * belongs to the caller, after every candidate has been tried.
 *
 * Mapping rules are unchanged and still mirror the app: exact tag → language
 * subtag → bare `pt` is Brazilian → any `zh-*` is Simplified.
 */
export function matchLanguage(
  languageTag: string | null | undefined,
): SupportedLanguage | null {
  if (typeof languageTag !== "string") return null;
  const tag = languageTag.trim();
  if (!tag) return null;

  if (isSupportedLanguage(tag)) return tag;

  const language = tag.toLowerCase().split(/[-_]/)[0];
  if (language === "pt") return "pt-BR";
  if (language === "zh") return "zh";
  if (isSupportedLanguage(language)) return language;

  return null;
}

/**
 * Resolve a BCP 47 language tag to one of the 14 supported locales.
 *
 * Mirrors the app's ladder (`languages.ts:114-137`) so the site and the app
 * pick the same variant for the same browser: exact tag → language subtag →
 * a bare `pt` is Brazilian → any `zh-*` is Simplified → unknown is English.
 */
export function resolveLanguageFromTag(
  languageTag: string | null | undefined,
): SupportedLanguage {
  if (typeof languageTag !== "string") return "en";
  const tag = languageTag.trim();
  if (!tag) return "en";

  // 1. The exact tag (`pt-BR`, `pt-PT`).
  if (isSupportedLanguage(tag)) return tag;

  // 2. The language subtag alone (`de-DE` → `de`).
  const lower = tag.toLowerCase();
  const language = lower.split(/[-_]/)[0];

  // 3. A bare Portuguese is Brazilian Portuguese.
  if (language === "pt") return "pt-BR";

  // 4. Any Chinese variant is Simplified Chinese.
  if (language === "zh") return "zh";

  // 2 (continued). The language subtag, when it is one of the 14.
  if (isSupportedLanguage(language)) return language;

  // 5. Unsupported → English.
  return "en";
}
