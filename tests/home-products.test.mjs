// Home page product-focus invariants: Home must showcase Inferenco own
// products (including Utility Apps) and must not carry the old
// consulting / IT-services messaging.
import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const home = readFileSync("src/pages/Home.tsx", "utf8");
const app = readFileSync("src/App.tsx", "utf8");

test("Home links every product, including Utility Apps", () => {
  const targets = ["/infer-desk", "/infer-wallet", "/utility-apps", "/infer-mcp", "/docs#infer-connect-introduction"];
  for (const target of targets) {
    assert.ok(home.includes('to="' + target + '"'), "Home.tsx must link to " + target);
  }
});

test("Home no longer carries consulting/IT-services messaging", () => {
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
  ];
  for (const b of banned) {
    assert.ok(!home.match(b), "Home.tsx must not contain: " + b);
  }
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
