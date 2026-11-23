// Locale catalogue integrity: the registry must match the Nemesis Go app
// exactly, and all 14 catalogues must be structurally identical.
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const localeDir = "src/i18n/locales";
const registrySource = readFileSync("src/i18n/languages.ts", "utf8");

const EXPECTED_ORDER = [
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
];

// Verbatim from nemesis-go-v3/mobile/src/i18n/languages.ts:59-74
const EXPECTED_ENDONYMS = {
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

const NAMESPACES = ["chrome", "home", "media", "blog"];

// Brands are never translated (Nemesis Go decision D6).
const BRANDS = [
  "Nemesis Go",
  "Sound Flipper",
  "Make My Image Fit",
  "Inferenco",
  "Onchain",
  "Google Play",
  "App Store",
];

function catalogue(code) {
  return JSON.parse(readFileSync(`${localeDir}/${code}.json`, "utf8"));
}

function flatten(value, prefix, out) {
  if (value === null || typeof value !== "object") {
    out.push(prefix);
    return out;
  }
  if (Array.isArray(value)) {
    out.push(prefix);
    return out;
  }
  for (const [k, v] of Object.entries(value)) flatten(v, `${prefix}.${k}`, out);
  return out;
}

function leaves(value, prefix, out) {
  if (Array.isArray(value)) {
    out.push([prefix, value]);
    return out;
  }
  if (value !== null && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) leaves(v, `${prefix}.${k}`, out);
    return out;
  }
  out.push([prefix, value]);
  return out;
}

test("SUPPORTED_LANGUAGES is the 14-tuple in the app's exact render order", () => {
  const m = registrySource.match(/SUPPORTED_LANGUAGES = \[([\s\S]*?)\] as const/);
  assert.ok(m, "could not find SUPPORTED_LANGUAGES in the registry");
  const codes = [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  assert.deepEqual(codes, EXPECTED_ORDER);
  // pt-PT must sit immediately after pt-BR, as the app pins it.
  assert.equal(codes.indexOf("pt-PT"), codes.indexOf("pt-BR") + 1);
});

test("endonyms and BCP 47 tags are copied exactly from the app registry", () => {
  const endonymBlock = registrySource.match(/LANGUAGE_ENDONYMS[^=]+= \{([\s\S]*?)\};/);
  assert.ok(endonymBlock, "LANGUAGE_ENDONYMS missing");
  const parsed = Object.fromEntries([...endonymBlock[1].matchAll(/^\s*"?([A-Za-z-]+)"?:\s*"([^"]+)",$/gm)].map((x) => [x[1], x[2]]));
  assert.deepEqual(parsed, EXPECTED_ENDONYMS);

  const tagBlock = registrySource.match(/LANGUAGE_TAGS[^=]+= \{([\s\S]*?)\};/);
  assert.ok(tagBlock, "LANGUAGE_TAGS missing");
  const tags = Object.fromEntries([...tagBlock[1].matchAll(/^\s*"?([A-Za-z-]+)"?:\s*"([^"]+)",$/gm)].map((x) => [x[1], x[2]]));
  assert.deepEqual(tags, Object.fromEntries(EXPECTED_ORDER.map((c) => [c, c])));
});

test("every locale file exists and carries exactly the 4 namespaces", () => {
  const files = readdirSync(localeDir).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""));
  assert.deepEqual(files.sort(), [...EXPECTED_ORDER].sort());
  for (const code of EXPECTED_ORDER) {
    const cat = catalogue(code);
    assert.deepEqual(Object.keys(cat).sort(), [...NAMESPACES].sort(), `${code}.json namespace set`);
  }
});

test("key sets are identical across all 14 locales, per namespace", () => {
  const reference = catalogue("en");
  for (const ns of NAMESPACES) {
    const expected = flatten(reference[ns], ns, []).sort();
    for (const code of EXPECTED_ORDER) {
      const actual = flatten(catalogue(code)[ns], ns, []).sort();
      assert.deepEqual(actual, expected, `${code} ${ns} key set differs from en`);
    }
  }
});

test("no catalogue value is empty and every leaf is a string or string array", () => {
  for (const code of EXPECTED_ORDER) {
    for (const ns of NAMESPACES) {
      for (const [key, value] of leaves(catalogue(code)[ns], ns, [])) {
        if (Array.isArray(value)) {
          assert.ok(value.length > 0, `${code} ${key} is an empty array`);
          for (const item of value) {
            assert.equal(typeof item, "string", `${code} ${key} has a non-string item`);
            assert.ok(item.trim().length > 0, `${code} ${key} has an empty item`);
          }
        } else {
          assert.equal(typeof value, "string", `${code} ${key} is not a string`);
          assert.ok(value.trim().length > 0, `${code} ${key} is empty`);
        }
      }
    }
  }
});

test("{{placeholder}} sets match English for every key in every locale", () => {
  const en = catalogue("en");
  for (const ns of NAMESPACES) {
    const enLeaves = new Map(leaves(en[ns], ns, []).map(([k, v]) => [k, v]));
    for (const code of EXPECTED_ORDER) {
      for (const [key, value] of leaves(catalogue(code)[ns], ns, [])) {
        const items = Array.isArray(value) ? value : [value];
        const enValue = enLeaves.get(key);
        const enItems = Array.isArray(enValue) ? enValue : [enValue];
        const expected = new Set(
          enItems.flatMap((s) => [...String(s).matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1])),
        );
        const actual = new Set(
          items.flatMap((s) => [...String(s).matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1])),
        );
        assert.deepEqual(
          [...actual].sort(),
          [...expected].sort(),
          `${code} ${key} placeholder mismatch (expected ${[...expected]}, got ${[...actual]})`,
        );
      }
    }
  }
});

test("brand names are never translated", () => {
  const en = catalogue("en");
  for (const code of EXPECTED_ORDER) {
    for (const ns of NAMESPACES) {
      for (const [key, value] of leaves(catalogue(code)[ns], ns, [])) {
        const items = Array.isArray(value) ? value : [value];
        const enValue = leaves(en[ns], ns, []).find(([k]) => k === key)[1];
        const enItems = Array.isArray(enValue) ? enValue : [enValue];
        items.forEach((item, i) => {
          const reference = String(enItems[i]);
          // A value that IS a brand must stay byte-identical.
          if (BRANDS.includes(reference)) {
            assert.equal(item, reference, `${code} ${key}[${i}] translated a brand`);
          }
          // A value that CONTAINS a brand must still contain it.
          for (const brand of BRANDS) {
            if (reference.includes(brand)) {
              assert.ok(item.includes(brand), `${code} ${key}[${i}] dropped the brand "${brand}"`);
            }
          }
        });
      }
    }
  }
});

test("Trans markup tags survive translation", () => {
  const en = catalogue("en");
  const tagCount = (s) => [...String(s).matchAll(/<(\/?)([a-zA-Z][\w-]*)>/g)].length;
  for (const code of EXPECTED_ORDER) {
    for (const ns of NAMESPACES) {
      const enLeaves = leaves(en[ns], ns, []);
      for (const [key, value] of leaves(catalogue(code)[ns], ns, [])) {
        const reference = String(enLeaves.find(([k]) => k === key)[1]);
        assert.equal(
          tagCount(value),
          tagCount(reference),
          `${code} ${key}: Trans tag count drifted (${tagCount(reference)} -> ${tagCount(value)})`,
        );
      }
    }
  }
});

test("the five Romance locales no longer use press/news-media terms for the category", () => {
  const PRESS = {
    es: /\bmedios\b/i,
    fr: /\bmédias?\b/i,
    it: /\bmedia\b/i,
    "pt-BR": /\bmídias?\b/i,
    "pt-PT": /\bmedia\b/i,
  };
  const values = (o, out = []) => {
    if (Array.isArray(o)) o.forEach((v) => values(v, out));
    else if (o && typeof o === "object") Object.values(o).forEach((v) => values(v, out));
    else if (typeof o === "string") out.push(o);
    return out;
  };
  for (const [code, rx] of Object.entries(PRESS)) {
    for (const v of values(catalogue(code))) {
      assert.ok(!rx.test(v), `${code}.json value must not use press-media term ${rx}: ${v}`);
    }
  }
});
