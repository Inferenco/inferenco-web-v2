// Source-level guards for the localized /support/ page (auto-globbed by
// `pnpm test`). The fresh-build HTTP behaviour is covered by the support block
// in tests/legal-pages.http.mjs; these pins check the markdown sources and the
// contact-email consistency without needing a build.
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const LOCALES = ["ar", "de", "es", "fr", "it", "ja", "kk", "pt-BR", "pt-PT", "ru", "tr", "uk", "zh"];
const files = ["src/legal/support.md", ...LOCALES.map((l) => `src/legal/support/${l}.md`)];

test("all 14 support sources exist and start with an H1", () => {
  assert.equal(files.length, 14);
  for (const f of files) {
    assert.ok(existsSync(f), `${f} is missing`);
    assert.match(readFileSync(f, "utf8"), /^# /, `${f} must start with '# '`);
  }
});

test("the EN support page carries both platform contacts", () => {
  const en = readFileSync("src/legal/support.md", "utf8");
  assert.ok(en.includes("mailto:singularityshift@inferenco.com"));
  assert.ok(en.includes("mailto:spielcrypto@inferenco.com"));
  assert.ok(en.includes("Android — Singularity Shift Ltd."));
  assert.ok(en.includes("iOS — Spielcrypto LLC."));
});

test("no support source uses a stray or personal contact domain", () => {
  for (const f of files) {
    const c = readFileSync(f, "utf8");
    assert.ok(!c.includes("security@"), `${f} must not use security@`);
    assert.ok(!c.includes("@gmail"), `${f} must not use a @gmail address`);
    // The publisher domain is inferenco.com; a bare spielcrypto.com is wrong.
    assert.ok(!c.includes("spielcrypto.com"), `${f} must not use spielcrypto.com`);
  }
});

test("the support EN email pair matches the footer and the terms page", () => {
  const emails = (s) => [...s.matchAll(/mailto:([a-z0-9.@-]+)/gi)].map((m) => m[1]).sort();
  const support = emails(readFileSync("src/legal/support.md", "utf8"));
  const footer = emails(readFileSync("src/components/Layout.tsx", "utf8"));
  const terms = emails(readFileSync("src/legal/nemesis-go/terms.md", "utf8"));
  assert.deepEqual(support, ["singularityshift@inferenco.com", "spielcrypto@inferenco.com"]);
  assert.deepEqual(support, footer, "support pair must equal the footer pair");
  assert.deepEqual(support, terms, "support pair must equal the terms pair");
});
