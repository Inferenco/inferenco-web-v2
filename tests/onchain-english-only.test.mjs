// Exclusion-by-construction guard: the onchain product pages, the docs hub,
// every docs page and the legal sources stay English-only and must never
// import the i18n runtime. If one of them ever does, the localization scope
// has silently widened beyond what was agreed.
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const ENGLISH_ONLY = [
  "src/pages/Infer.tsx",
  "src/pages/InferWalletPage.tsx",
  "src/pages/InferDesk.tsx",
  "src/pages/InferMcp.tsx",
  "src/pages/Docs.tsx",
];

const docsDir = "src/pages/docs";
for (const file of readdirSync(docsDir)) {
  if (file.endsWith(".tsx")) ENGLISH_ONLY.push(`${docsDir}/${file}`);
}

const LEGAL_DIR = "src/legal";
const LEGAL_FILES = [
  `${LEGAL_DIR}/build.ts`,
  `${LEGAL_DIR}/page.html`,
  `${LEGAL_DIR}/page.css`,
  `${LEGAL_DIR}/nemesis-go/privacy.md`,
  `${LEGAL_DIR}/nemesis-go/terms.md`,
];

const FORBIDDEN = [
  /from\s+["']react-i18next["']/,
  /from\s+["']i18next["']/,
  /import\s+[^;]*\bi18n\b/,
  /\buseTranslation\s*\(/,
  /i18nKey=/,
  /<Trans\b/,
];

test("no onchain page, docs page or docs component imports the i18n runtime", () => {
  assert.ok(ENGLISH_ONLY.length >= 15, "expected the docs directory to be covered, got " + ENGLISH_ONLY.length);
  for (const file of ENGLISH_ONLY) {
    const source = readFileSync(file, "utf8");
    for (const pattern of FORBIDDEN) {
      assert.ok(!pattern.test(source), `${file} must not reference i18n (${pattern})`);
    }
  }
});

test("the legal sources are English v1 and untouched by localization", () => {
  for (const file of LEGAL_FILES) {
    const source = readFileSync(file, "utf8");
    assert.ok(!/react-i18next|useTranslation|i18nKey/.test(source), `${file} must not reference i18n`);
  }
  // mediaProducts keeps the canonical EN pair as the fallback; the SPA builds
  // per-locale URLs client-side via nemesisLegalUrl (src/i18n/index.ts),
  // matching the per-locale pages emitted since 50aaed2.
  const media = JSON.parse(readFileSync("src/i18n/locales/en.json", "utf8")).media;
  assert.equal(media.modal.nemesis.privacy, "Privacy Policy");
  assert.ok(
    readFileSync("src/data/mediaProducts.ts", "utf8").includes('privacy: "/nemesis-go/privacy/"'),
    "the Nemesis Go legal paths must stay the single EN pair",
  );
});
