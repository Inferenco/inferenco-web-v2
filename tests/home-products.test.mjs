// Home page product-focus invariants: Home must showcase Inferenco own
// products (including the media & entertainment line) and must not carry the
// old consulting / IT-services messaging.
//
// Since the i18n pass the Home copy lives in the locale catalogues, so the
// positive copy pins and the ban-scan read `src/i18n/locales/*.json`; the
// structural pins (Link targets, anchor ids, route integrity) still read the
// Home.tsx/App.tsx source, because those attributes stay in JSX by design.
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const home = readFileSync("src/pages/Home.tsx", "utf8");
const app = readFileSync("src/App.tsx", "utf8");

const localeDir = "src/i18n/locales";
const localeFiles = readdirSync(localeDir).filter((f) => f.endsWith(".json"));

function homeCopy(file) {
  const catalogue = JSON.parse(readFileSync(`${localeDir}/${file}`, "utf8"));
  return JSON.stringify(catalogue.home ?? {});
}

test("Home links every product, including Utility Apps", () => {
  const targets = ["/infer-desk", "/infer-wallet", "/utility-apps", "/infer-mcp", "/docs#infer-connect-introduction"];
  for (const target of targets) {
    assert.ok(home.includes('to="' + target + '"'), "Home.tsx must link to " + target);
  }
});

test("Home no longer carries consulting or open-source messaging", () => {
  const banned = [
    /consulting/i,
    /consultanc/i,
    "Enterprise Software Development",
    "IT Consulting",
    /partner with us/i,
    "Your Software Development Partner",
    "Jump to section",
    "You Get Your Invoice",
    "We Schedule an Interview",
    "You Receive a Detailed Proposal",
    "We Sign the Contract",
    /tailored to your business/i,
    /open development/i,
    /public code/i,
    /build in the open/i,
    /in the open/i,
    /public repositories/i,
    /public issues/i,
  ];
  // The source must stay copy-free (all prose goes through t()).
  for (const b of banned) {
    assert.ok(!home.match(b), "Home.tsx must not contain: " + b);
  }
  // And the ban must hold for the copy itself, in every locale.
  assert.ok(localeFiles.length === 14, "expected 14 locale catalogues, found " + localeFiles.length);
  for (const file of localeFiles) {
    const copy = homeCopy(file);
    for (const b of banned) {
      assert.ok(!copy.match(b), file + " home catalogue must not contain: " + b);
    }
  }
  // Positive pins, retargeted to the English catalogue (they moved out of the
  // JSX with the extraction).
  const en = homeCopy("en.json");
  assert.match(en, /security reviews and signed releases/);
  assert.match(en, /Verifiable software/);
});

test("Home section anchors and side-nav targets resolve to real ids", () => {
  const ids = new Set([...home.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  for (const m of home.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.has(m[1]), 'href="#' + m[1] + '" has no matching id');
  }
  for (const m of home.matchAll(/scrollToSection\("([^"]+)"\)/g)) {
    assert.ok(ids.has(m[1]), 'side-nav target "' + m[1] + '" has no matching id');
  }
});

test("Home Link targets exist as routes in App.tsx", () => {
  const routes = [...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);
  for (const m of home.matchAll(/to="\/([^"#]+)/g)) {
    const target = m[1];
    const exists = routes.some((r) => r === target || r.startsWith(target + "/"));
    assert.ok(exists, 'Link to="/' + target + '" has no route in App.tsx');
  }
});
