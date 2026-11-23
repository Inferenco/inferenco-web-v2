// Nav & footer structure invariants for the Media & Entertainment restructure.
// Layout.tsx is deliberately invisible to docs-consistency.test.mjs, so these
// pins are the only automated guard on the nav restructure.
//
// Since the i18n pass the visible labels live in the `chrome` catalogue, so
// the pins split in two: the STRUCTURE (array order, keys, paths, column
// placement) is pinned against Layout.tsx source, and the rendered ENGLISH
// text is pinned against src/i18n/locales/en.json.
import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const layout = readFileSync("src/components/Layout.tsx", "utf8");
const chrome = JSON.parse(readFileSync("src/i18n/locales/en.json", "utf8")).chrome;

function arrayLiteral(name) {
  const m = layout.match(new RegExp("const " + name + ": [^=]+= \\[([\\s\\S]*?)\\n\\];"));
  assert.ok(m, "could not find the " + name + " array literal in Layout.tsx");
  return m[1];
}

function keysOf(source) {
  return [...source.matchAll(/labelKey:\s*"([^"]+)"/g)].map((m) => m[1]);
}

test("top-level nav is Home / Media & Entertainment / Blogs, with no Docs entry", () => {
  assert.deepEqual(keysOf(arrayLiteral("navLinks")), ["nav.home", "nav.media", "nav.blogs"]);
  const nav = arrayLiteral("navLinks");
  assert.ok(!nav.includes('path: "/docs"'), "Docs must not be a top-level nav item");
  assert.ok(
    nav.includes('{ labelKey: "nav.media", path: "/games-and-apps", page: "games-and-apps" }'),
    "Media & Entertainment must point at /games-and-apps with the games-and-apps PageType",
  );
  assert.equal(chrome.nav.media, "Media & Entertainment");
  assert.equal(chrome.nav.blogs, "Blogs");
  assert.equal(chrome.nav.home, "Home");
});

test("Onchain dropdown ends with Docs and no longer carries Utility Apps", () => {
  assert.deepEqual(keysOf(arrayLiteral("productsDropdown")), [
    "products.inferBot",
    "products.inferWallet",
    "products.inferDesk",
    "products.inferMcp",
    "products.inferEcosystem",
    "products.docs",
  ]);
  const dd = arrayLiteral("productsDropdown");
  assert.match(dd, /\{\s*labelKey:\s*"products\.docs",\s*path:\s*"\/docs",\s*page:\s*"docs"\s*\}/);
  assert.ok(!dd.includes("Utility Apps"), "Utility Apps must be gone from the dropdown");
  assert.equal(chrome.products.docs, "Docs");
});

test("the group label is Onchain everywhere and the old Products literal is gone", () => {
  const toggles = [...layout.matchAll(/\{t\("nav\.onchain"\)\} <i className="fas fa-chevron-down" \/>/g)];
  assert.equal(toggles.length, 2, "both mobile and desktop toggles must use the Onchain label");
  assert.match(layout, /<h4>\{t\("footer\.onchainColumn"\)\}<\/h4>/);
  // The visible label only — `productsDropdown` / `setProductsDropdownOpen`
  // are identifiers and keep their historical name.
  assert.ok(!layout.includes("Products <i"), "a Products toggle literal must not remain");
  assert.ok(!layout.includes("<h4>Products</h4>"), "the footer heading must not read Products");
  assert.ok(!layout.includes("Utility Apps"), 'the "Utility Apps" label must be gone from Layout.tsx');
  assert.equal(chrome.nav.onchain, "Onchain");
  assert.equal(chrome.footer.onchainColumn, "Onchain");
});

test("the footer carries a Media & Entertainment column before the Onchain column", () => {
  const meIdx = layout.indexOf('<h4>{t("footer.mediaColumn")}</h4>');
  const onchainIdx = layout.indexOf('<h4>{t("footer.onchainColumn")}</h4>');
  assert.ok(meIdx !== -1, "Media & Entertainment footer column missing");
  assert.ok(onchainIdx !== -1, "Onchain footer column missing");
  assert.ok(meIdx < onchainIdx, "Media & Entertainment must come before the Onchain column");

  const column = layout.slice(meIdx, onchainIdx);
  for (const target of [
    'to="/games-and-apps"',
    'to="/games-and-apps#nemesis-go"',
    'to="/games-and-apps#sound-flipper"',
    'to="/games-and-apps#image-fit"',
  ]) {
    assert.ok(column.includes(target), "M&E column must link to " + target);
  }
  for (const key of ["footer.allApps", "footer.nemesisGo", "footer.soundFlipper", "footer.imageFit"]) {
    assert.ok(column.includes(`{t("${key}")}`), "M&E column must carry " + key);
  }

  const onchainColumn = layout.slice(onchainIdx, layout.indexOf("<h4>{t(\"footer.resourcesColumn\")}</h4>"));
  assert.ok(onchainColumn.includes('to="/docs"'), "Onchain column must link Docs");
  assert.ok(!onchainColumn.includes("/games-and-apps"), "Onchain column must not link Games & Apps");

  assert.equal(chrome.footer.mediaColumn, "Media & Entertainment");
  assert.equal(chrome.footer.nemesisGo, "Nemesis Go");
  assert.equal(chrome.footer.soundFlipper, "Sound Flipper");
  assert.equal(chrome.footer.imageFit, "Make My Image Fit");
});

test("the stale consulting tagline is gone, in source and in the catalogue", () => {
  assert.ok(!layout.includes("Enterprise Software Development"));
  assert.ok(!/IT Solutions/.test(layout));
  assert.ok(!JSON.stringify(chrome).includes("Enterprise Software Development"));
  assert.equal(chrome.footer.tagline, "Games, media & everyday apps — built in-house.");
});

test("the navbar keeps its single-row contract in the 1025-1299px band", () => {
  // E2E round 1: at 1025-1199px the top-level labels wrapped to two lines
  // (navbar 97px vs the 75px baseline) and .nav-container overflowed
  // (scrollWidth 953 > clientWidth 923), worst in ja where CJK breaks between
  // any two characters. E2E round 2: ja still wrapped at 1280-1298px, once the
  // social cluster came back. Two guards, both pinned here — the pin must fail
  // if either guard is deleted or narrowed.
  const css = readFileSync("src/index.css", "utf8");

  // Guard 1: drop the 328px social cluster below 1280px.
  const socialGuard = css.match(/@media \(max-width: 1279px\) \{([\s\S]*?)\n\}/);
  assert.ok(socialGuard, "the max-width: 1279px social-cluster guard is missing from index.css");
  assert.ok(
    /\.nav-social\s*\{\s*display:\s*none;/.test(socialGuard[1]),
    "the guard must hide .nav-social (7 x 40px + 6 x 8px = 328px of the row)",
  );

  // Guard 2: the 1025-1299px band. Tighten the bar by 3 x 0.75rem = 36px and
  // pin the labels to one line. ja's single-line demand is bracketed by the
  // browser itself — it fits at 1299 and wraps at 1298 with the 2rem gap, so
  // demand is in (1104, 1105]px — and the narrowest budget in the band is
  // 90% x 1280 - 64 = 1088px. Worst deficit 17px, covered by 36px, leaving
  // >=19px of slack: that is what makes nowrap safe rather than a trade of the
  // vertical wrap for a horizontal scrollbar.
  const barGuard = css.match(
    /@media \(min-width: 1025px\) and \(max-width: 1299px\) \{([\s\S]*?)\n\}/,
  );
  assert.ok(barGuard, "the 1025-1299px navbar band is missing from index.css");
  assert.ok(
    /\.nav-links \{\n\s+gap: 1\.25rem;\n\s+\}/.test(barGuard[1]),
    ".nav-links gap must tighten to 1.25rem in the band",
  );
  assert.match(
    barGuard[1],
    /\.nav-links \.nav-link,\s*\n\s*\.nav-links \.dropdown-toggle \{\n\s*white-space: nowrap;/,
    "the top-level nav links must be pinned to one line in the band",
  );
  // The band must not reach mobile: below 1025px `.nav-links` is display:none
  // and the drawer layout must not shift by even 8px.
  assert.ok(
    !/@media \(max-width: 1299px\) \{/.test(css),
    "the tightening band must be guarded with min-width: 1025px, not max-width alone",
  );

  // The row must never be allowed to wrap, and the pre-existing <=1024px rule
  // (which also hides .nav-social) must survive.
  const container = css.match(/\.nav-container \{([\s\S]*?)\n\}/);
  assert.ok(container, ".nav-container rule missing");
  assert.ok(!/flex-wrap/.test(container[1]), ".nav-container must stay single-row (no flex-wrap)");

  const mobile = css.match(
    /@media \(max-width: 1024px\) \{[\s\S]*?\n    \.nav-social \{\n        display: none;\n    \}/,
  );
  assert.ok(mobile, "the <=1024px .nav-social hide must stay in place");
});

test("the navbar keeps its single-row contract at >=1300px (kk wide-font guard)", () => {
  // kk's wider default fonts overflow the unreduced 2rem row even at >=1300px,
  // so the band's two levers are extended here and the 328px social cluster is
  // reclaimed. This is a NEW min-width block; the 1025-1299 band and the
  // <=1279 social guard above stay byte-intact.
  const css = readFileSync("src/index.css", "utf8");

  const wideGuard = css.match(/@media \(min-width: 1300px\) \{([\s\S]*?)\n\}/);
  assert.ok(wideGuard, "the min-width: 1300px navbar guard is missing from index.css");
  assert.ok(
    /\.nav-links \{\n\s+gap: 1\.25rem;\n\s+\}/.test(wideGuard[1]),
    ".nav-links gap must tighten to 1.25rem at >=1300px",
  );
  assert.match(
    wideGuard[1],
    /\.nav-links \.nav-link,\s*\n\s*\.nav-links \.dropdown-toggle \{\n\s*white-space: nowrap;/,
    "the top-level nav links must be pinned to one line at >=1300px",
  );
  assert.ok(
    /\.nav-social\s*\{\s*display:\s*none;/.test(wideGuard[1]),
    "the >=1300px guard must hide the 328px .nav-social cluster",
  );
});
