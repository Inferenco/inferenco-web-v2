import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const githubService = readFileSync(resolve(root, "src/services/github.ts"), "utf8");

describe("Nova Desk download URLs", () => {
  test("macOS downloads match the published zip release assets", () => {
    assert.match(githubService, /releases\/latest\/download/);
    assert.match(githubService, /NovaDesk-macOS-x86_64\.zip/);
    assert.match(githubService, /NovaDesk-macOS-aarch64\.zip/);
    assert.doesNotMatch(githubService, /NovaDesk-macOS-[^"`']+\.dmg/);
  });
});
