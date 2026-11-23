// Route-rename guards for the /utility-apps -> /games-and-apps move.
//
// The legacy-redirect check is deliberately a SOURCE-LEVEL test (asserting the
// emitted public/utility-apps/index.html content) rather than a *.http.mjs
// fresh-build harness: pnpm test auto-globs tests/*.test.mjs and CI runs it,
// whereas a new *.http.mjs would need a package.json script + a deploy.yml step.
// Keeping it source-level gates CI coherently without touching the workflow.
import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

test("the legacy /utility-apps/ page redirects to /games-and-apps/ preserving hash and query", () => {
  const html = readFileSync("public/utility-apps/index.html", "utf8");
  assert.match(html, /<meta name="robots" content="noindex"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/inferenco\.com\/games-and-apps\/"/);
  assert.match(html, /<meta http-equiv="refresh" content="0; url=\/games-and-apps\/"/);
  // The script must preserve both the query and the fragment, which a
  // meta-refresh alone drops.
  assert.match(html, /location\.replace\("\/games-and-apps\/" \+ location\.search \+ location\.hash\)/);
});

test("CSS ids and the Utility Apps element ids renamed in lockstep", () => {
  const css = readFileSync("src/index.css", "utf8");
  const ua = readFileSync("src/pages/UtilityApps.tsx", "utf8");

  assert.ok(css.includes("#games-and-apps-page"), "index.css must scope the renamed page id");
  assert.ok(css.includes("#games-and-apps-gallery"), "index.css must scope the renamed gallery id");
  assert.ok(!css.includes("#utility-apps-page"), "no #utility-apps-page may remain in index.css");
  assert.ok(!css.includes("#utility-apps-gallery"), "no #utility-apps-gallery may remain in index.css");

  assert.ok(ua.includes('id="games-and-apps-page"'), "UtilityApps.tsx page id must be renamed");
  assert.ok(ua.includes('id="games-and-apps-gallery"'), "UtilityApps.tsx gallery id must be renamed");
  assert.ok(!ua.includes('id="utility-apps-page"'), "no utility-apps-page id may remain in UtilityApps.tsx");
  assert.ok(!ua.includes('id="utility-apps-gallery"'), "no utility-apps-gallery id may remain in UtilityApps.tsx");
});

test("the utility-apps asset directory negation stays in .gitignore", () => {
  const gitignore = readFileSync(".gitignore", "utf8");
  assert.ok(
    gitignore.includes("!public/img/infer-ecosystem/utility-apps/**"),
    "the asset-dir negation must survive the route rename (assets are not renamed)",
  );
});
