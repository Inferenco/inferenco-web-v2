// Browser-language acceptance criteria: first visit follows the browser's
// language, an unsupported language falls back to English, regional variants
// resolve exactly like the Nemesis Go app, and an explicit switcher choice
// wins over detection on later visits.
//
// The modules are loaded through Vite's SSR pipeline (same technique as
// tests/code-block.test.mjs) so the real TypeScript sources are exercised,
// not a reimplementation.
import assert from "node:assert/strict";
import { after, beforeEach, test } from "node:test";
import { createServer } from "vite";

const vite = await createServer({ configFile: false, server: { middlewareMode: true }, appType: "custom" });
after(() => vite.close());

const { resolveLanguageFromTag, matchLanguage, SUPPORTED_LANGUAGES } = await vite.ssrLoadModule("/src/i18n/languages.ts");
const { initialLanguage, detectBrowserLanguage, LOCALE_STORAGE_KEY } = await vite.ssrLoadModule("/src/i18n/detect.ts");

const store = new Map();
// Node exposes `navigator` as a getter-only accessor, so it must be replaced
// with defineProperty (and the original descriptor restored at the end).
const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, "navigator");
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");

function setBrowserLanguages(languages) {
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    writable: true,
    value: {
      localStorage: {
        getItem: (k) => (store.has(k) && store.get(k) !== null ? store.get(k) : null),
        setItem: (k, v) => store.set(k, String(v)),
      },
    },
  });
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    writable: true,
    value: { languages, language: languages[0] },
  });
}

after(() => {
  if (originalNavigator) Object.defineProperty(globalThis, "navigator", originalNavigator);
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
});

beforeEach(() => {
  store.clear();
  setBrowserLanguages(["en-US", "en"]);
});

test("the registry ladder maps tags exactly as the app does", () => {
  const cases = [
    ["pt-PT", "pt-PT"],
    ["pt-BR", "pt-BR"],
    ["pt", "pt-BR"],
    ["PT", "pt-BR"],
    ["zh-TW", "zh"],
    ["zh-HK", "zh"],
    ["zh-CN", "zh"],
    ["zh", "zh"],
    ["de-AT", "de"],
    ["de-DE", "de"],
    ["en-US", "en"],
    ["fr-CA", "fr"],
    ["kk-KZ", "kk"],
    ["tr-TR", "tr"],
    ["uk-UA", "uk"],
    ["es-MX", "es"],
    ["it-IT", "it"],
    ["ru-RU", "ru"],
    ["ja-JP", "ja"],
    ["ar-EG", "ar"],
  ];
  for (const [tag, expected] of cases) {
    assert.equal(resolveLanguageFromTag(tag), expected, `resolveLanguageFromTag(${tag})`);
  }
  // Unsupported → English, and matchLanguage reports "no match" instead.
  for (const tag of ["hi", "ko", "vi", "th", "id", "nl", "sv-SE", ""]) {
    assert.equal(resolveLanguageFromTag(tag), "en", `resolveLanguageFromTag(${tag}) must fall back to en`);
    assert.equal(matchLanguage(tag), null, `matchLanguage(${tag || "<empty>"}) must report no match`);
  }
  assert.equal(resolveLanguageFromTag(null), "en");
  assert.equal(resolveLanguageFromTag(undefined), "en");
});

test("first visit renders in the browser language, English only as last resort", () => {
  const cases = [
    [["de-AT", "de", "en"], "de"],
    [["hi"], "en"],
    [["pt"], "pt-BR"],
    [["pt-PT"], "pt-PT"],
    [["pt-BR"], "pt-BR"],
    [["zh-TW"], "zh"],
    [["zh-HK", "zh-CN"], "zh"],
    [["en-US", "en"], "en"],
    [["kk-KZ"], "kk"],
    [["ar-SA"], "ar"],
    [["ja"], "ja"],
    [["ru"], "ru"],
    [["uk"], "uk"],
    [["tr-TR"], "tr"],
    [["es-419", "es"], "es"],
    [["fr-FR"], "fr"],
    [["it-IT"], "it"],
    // An unsupported first preference must fall through to the next one.
    [["hi", "de", "en"], "de"],
    [["ko", "ja"], "ja"],
    [["vi"], "en"],
  ];
  for (const [languages, expected] of cases) {
    setBrowserLanguages(languages);
    assert.equal(initialLanguage(), expected, `navigator.languages=${JSON.stringify(languages)}`);
    assert.equal(detectBrowserLanguage(), expected, `detectBrowserLanguage(${JSON.stringify(languages)})`);
  }
});

test("an explicit switcher choice takes precedence over browser detection", () => {
  setBrowserLanguages(["de"]);
  store.set(LOCALE_STORAGE_KEY, "ja");
  assert.equal(initialLanguage(), "ja");

  // A stale or tampered value must not stick — detection wins again.
  store.set(LOCALE_STORAGE_KEY, "xx");
  assert.equal(initialLanguage(), "de");
  store.set(LOCALE_STORAGE_KEY, null);
  assert.equal(initialLanguage(), "de");

  assert.equal(LOCALE_STORAGE_KEY, "inferenco.locale");
});

test("the registry is the 14-locale set the app ships", () => {
  assert.deepEqual([...SUPPORTED_LANGUAGES], [
    "en", "ar", "de", "es", "fr", "it", "ja", "kk", "pt-BR", "pt-PT", "ru", "tr", "uk", "zh",
  ]);
});
