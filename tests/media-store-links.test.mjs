// Store-link invariants for the media & entertainment products.
// The four store URLs are user-supplied verbatim values, and two products
// deliberately have NO iOS link — an invented App Store URL is the failure
// mode this guards.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const data = readFileSync("src/data/mediaProducts.ts", "utf8");
const page = readFileSync("src/pages/UtilityApps.tsx", "utf8");

const SOUND_APP_STORE = "https://apps.apple.com/app/sound-flipper/id6830835335";

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(full)) out.push(full);
  }
  return out;
}

test("the four store URLs are pinned verbatim in mediaProducts.ts", () => {
  const urls = [
    "https://play.google.com/store/apps/details?id=com.inferenco.nemesisgo",
    "https://play.google.com/store/apps/details?id=com.soundflipper.app",
    SOUND_APP_STORE,
    "https://play.google.com/store/apps/details?id=com.inferenco.imagefit",
  ];
  for (const url of urls) {
    assert.ok(data.includes(url), "mediaProducts.ts must contain " + url);
  }
  for (const web of [
    "https://www.soundflipper.com",
    "https://www.resizeandcompress.app",
  ]) {
    assert.ok(data.includes(web), "mediaProducts.ts must contain " + web);
  }
});

test("iOS availability is expressed as data, not as invented links", () => {
  const nemesis = data.slice(data.indexOf("nemesis: {"), data.indexOf("sound: {"));
  const sound = data.slice(data.indexOf("sound: {"), data.indexOf("resize: {"));
  const resize = data.slice(data.indexOf("resize: {"));

  assert.match(nemesis, /ios:\s*"coming-soon"/, "Nemesis Go iOS must be the coming-soon marker");
  assert.ok(!nemesis.includes("apps.apple.com"), "Nemesis Go must carry no App Store URL");
  assert.match(sound, new RegExp('ios: "' + SOUND_APP_STORE.replace(/[/.]/g, (c) => "\\" + c) + '"'), "Sound Flipper iOS must be the App Store URL");
  assert.match(resize, /ios:\s*null/, "Make My Image Fit must have no iOS app at all");
  assert.ok(!resize.includes("apps.apple.com"), "Make My Image Fit must carry no App Store URL");
});

test("UtilityApps.tsx consumes mediaProducts instead of hardcoded URLs", () => {
  assert.match(page, /import\s*\{[^}]*mediaProducts[^}]*\}\s*from\s*"\.\.\/data\/mediaProducts"/);
  assert.match(page, /mediaProducts\.nemesis\.android/);
  assert.match(page, /mediaProducts\.sound\.ios/);
  assert.match(page, /mediaProducts\.resize\.android/);
  assert.match(page, /type ActiveApp = "nemesis" \| /, "the ActiveApp union must include nemesis");
  assert.match(page, /id="nemesis-go"/);
  assert.match(page, /id="sound-flipper"/);
  assert.match(page, /id="image-fit"/);
});

test("no apps.apple.com URL exists anywhere in src/ except Sound Flipper's", () => {
  const offenders = [];
  const hits = [];
  for (const file of walk("src")) {
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(/https:\/\/apps\.apple\.com[^\s"'`]*/g)) {
      hits.push(m[0]);
      if (m[0] !== SOUND_APP_STORE) offenders.push(file + " -> " + m[0]);
    }
  }
  assert.ok(hits.length > 0, "the Sound Flipper App Store URL must exist somewhere in src/");
  assert.deepEqual(offenders, [], "unexpected App Store URL(s): " + offenders.join(", "));

  // And neither product without an iOS build may link one from its own surface.
  const nemesisBlock = page.slice(page.indexOf('id="nemesis-go"'), page.indexOf('id="sound-flipper"'));
  const resizeBlock = page.slice(page.indexOf('id="image-fit"'));
  assert.ok(!nemesisBlock.includes("apps.apple.com"), "Nemesis Go card must not link the App Store");
  assert.ok(!resizeBlock.includes("apps.apple.com"), "Make My Image Fit card must not link the App Store");
});
