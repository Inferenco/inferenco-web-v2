import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const layout = readFileSync("src/components/Layout.tsx", "utf8");
const styles = readFileSync("src/components/chrome.css", "utf8");
const switcher = readFileSync("src/components/LanguageSwitcher.tsx", "utf8");
const locale = JSON.parse(readFileSync("src/i18n/locales/en.json", "utf8"));
const { chrome } = locale;

test("desktop and mobile share Apps & Games, Our story, Blogs, Onchain and Support", () => {
  assert.equal(layout.match(/<PrimaryNav\b/g)?.length, 2);
  const nav = layout.match(/<nav className="studio-nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav);
  const entries = [
    'to="/games-and-apps/"',
    'to="/#about"',
    'to="/blogs/"',
    't("nav.onchain")',
    'href={supportUrl()}',
  ];
  const positions = entries.map((entry) => nav.indexOf(entry));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
  assert.equal(chrome.nav.media, "Apps & Games");
  assert.equal(chrome.nav.blogs, "Blogs");
  assert.equal(chrome.nav.onchain, "Onchain");
});

test("the Onchain disclosure provides all six destinations and Docs", () => {
  const onchain = layout.match(/const onchainLinks = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(onchain);
  const links = [...onchain.matchAll(/label: "([^"]+)", path: "([^"]+)"/g)].map((match) => match.slice(1));
  assert.deepEqual(links, [
    ["inferDesk", "/infer-desk/"],
    ["inferWallet", "/infer-wallet/"],
    ["inferMcp", "/infer-mcp/"],
    ["inferConnect", "/docs/#infer-connect-introduction"],
    ["inferEcosystem", "https://app.inferenco.com"],
    ["inferBot", "/infer/"],
    ["docs", "/docs/"],
  ]);
  assert.match(layout, /aria-expanded=\{open\}\s+aria-controls=\{panelId\}/);
  assert.match(layout, /id=\{panelId\}[^>]+hidden=\{!open\}/);
});

test("the footer links to the catalogue and its three detail pages ahead of Onchain", () => {
  const firstColumn = layout.indexOf('t("footer.mediaColumn")');
  const onchainColumn = layout.indexOf('t("footer.onchainColumn")');
  assert.ok(firstColumn >= 0 && onchainColumn > firstColumn);
  const column = layout.slice(firstColumn, onchainColumn);
  for (const target of [
    "/games-and-apps/",
    "/games-and-apps/nemesis-go/",
    "/games-and-apps/sound-flipper/",
    "/games-and-apps/resize-and-compress/",
  ]) {
    assert.ok(column.includes('to="' + target + '"'), "missing footer target " + target);
  }
  assert.doesNotMatch(JSON.stringify(chrome), /Enterprise Software Development|IT Solutions/);
});

test("narrow layouts expose the dialog trigger in place of desktop navigation", () => {
  assert.match(layout, /aria-controls="studio-menu"[\s\S]*?drawer\.current\?\.showModal\(\)/);
  assert.match(layout, /<dialog\s+id="studio-menu"[\s\S]*?t\("aria.closeMenu"\)/);
  assert.match(styles, /@container studio-chrome \(width <= 64rem\) \{\s*\.studio-nav-desktop \{\s*display: none;/);
  assert.match(styles, /\.studio-menu-trigger \{\s*display: inline-flex;/);
  assert.match(styles, /\.studio-drawer \{\s*position: fixed;\s*inset-block: 0;\s*inset-inline: auto 0;/);
});

test("a skip link and native language control are available from the shared header", () => {
  assert.match(layout, /href="#studio-main"[\s\S]*?<main id="studio-main"[^>]+tabIndex=\{-1\}/);
  assert.match(switcher, /<select[\s\S]*?aria-label=\{t\("aria.switchLanguage"\)\}/);
  assert.match(switcher, /SUPPORTED_LANGUAGES\.map\(\(code\) => [\s\S]*?<option[^>]+lang=\{code\}/);
});


test("the shared footer links to the website policies and Nemesis Go links to its own policies", () => {
  assert.match(layout, /href="\/privacy\/"\s+hrefLang="en"[^>]*>\{t\("footer.websitePrivacy"\)\}/);
  assert.match(layout, /href="\/terms\/"\s+hrefLang="en"[^>]*>\{t\("footer.websiteTerms"\)\}/);
  assert.doesNotMatch(layout, /nemesisLegalUrl/);
  const mediaProduct = readFileSync("src/pages/MediaProduct.tsx", "utf8");
  assert.match(mediaProduct, /href=\{nemesisLegalUrl\("privacy"\)\}/);
  assert.match(mediaProduct, /href=\{nemesisLegalUrl\("terms"\)\}/);
});
