import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const githubService = readFileSync(resolve(root, "src/services/github.ts"), "utf8");

describe("Infer Desk published download URLs", () => {
  test("binary assets use the infer-desk-releases v0.6.2 tag with InferDesk- names", () => {
    assert.match(githubService, /REPO_NAME = "infer-desk-releases"/);
    // The download base is templated from RELEASE_TAG, so assert the pin and
    // the template shape rather than a literal expanded URL.
    assert.match(githubService, /RELEASE_TAG = "v0\.6\.2"/);
    assert.match(githubService, /releases\/download\/\$\{RELEASE_TAG\}/);
    assert.match(githubService, /InferDesk-Windows-x64\.exe/);
    assert.match(githubService, /InferDesk-x86_64\.AppImage/);
    assert.match(githubService, /InferDesk-aarch64\.AppImage/);
    assert.match(githubService, /InferDesk-FreeBSD-x86_64/);
    // No stale Nova asset names may remain.
    assert.doesNotMatch(githubService, /NovaDesk-/);
  });

  test("macOS downloads are the v0.6.2 zips attached to the main tag", () => {
    assert.match(githubService, /InferDesk-macOS-x86_64\.zip/);
    assert.match(githubService, /InferDesk-macOS-aarch64\.zip/);
    // The "mac" fallback case still links to the releases listing.
    assert.match(githubService, /REPO_NAME\}\/releases`;/);
    // No dmg/universal builds exist; no separate macOS tag was ever published.
    assert.doesNotMatch(githubService, /InferDesk-macOS-[^"`']+\.dmg/);
    assert.doesNotMatch(githubService, /MACOS_RELEASE_TAG/);
  });
});
