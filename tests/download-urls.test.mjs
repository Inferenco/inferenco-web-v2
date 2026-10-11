import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const githubService = readFileSync(resolve(root, "src/services/github.ts"), "utf8");
const inferMcpPage = readFileSync(resolve(root, "src/pages/InferMcp.tsx"), "utf8");

describe("Infer Desk published download URLs", () => {
  test("wallet binaries resolve via the always-latest redirect with stable asset names", () => {
    assert.match(githubService, /REPO_NAME = "infer-desk-releases"/);
    assert.match(githubService, /releases\/latest\/download/);
    assert.match(githubService, /InferDesk-Windows-x64\.exe/);
    assert.match(githubService, /InferDesk-x86_64\.AppImage/);
    assert.match(githubService, /InferDesk-aarch64\.AppImage/);
    assert.match(githubService, /InferDesk-FreeBSD-x86_64/);
    // No stale Nova asset names may remain.
    assert.doesNotMatch(githubService, /NovaDesk-/);
  });

  test("wallet downloads must never be pinned to a hardcoded release tag", () => {
    assert.doesNotMatch(githubService, /RELEASE_TAG\s*=/);
    assert.doesNotMatch(githubService, /releases\/download\/v\d/);
    assert.doesNotMatch(githubService, /v0\.6\.\d/);
    // The GitHub API round-trip is gone: nothing in the app resolves a tag at
    // runtime, so a new release needs no source edit.
    assert.doesNotMatch(githubService, /getLatestReleaseVersion/);
    assert.doesNotMatch(githubService, /api\.github\.com/);
  });

  test("macOS downloads are the always-latest zips; fallbacks point at the latest-release page", () => {
    assert.match(githubService, /InferDesk-macOS-x86_64\.zip/);
    assert.match(githubService, /InferDesk-macOS-aarch64\.zip/);
    // "mac"/"unknown"/default fall back to the latest-release page.
    assert.match(githubService, /REPO_NAME\}\/releases\/latest`;/);
    // No dmg/universal builds exist; no separate macOS tag was ever published.
    assert.doesNotMatch(githubService, /InferDesk-macOS-[^"`']+\.dmg/);
    assert.doesNotMatch(githubService, /MACOS_RELEASE_TAG/);
  });
});

describe("Infer MCP bridge download URLs", () => {
  test("bridge binaries are built from the resolved tag with stable asset names", () => {
    assert.match(inferMcpPage, /InferDeskMCPBridge-Linux-x86_64/);
    assert.match(inferMcpPage, /InferDeskMCPBridge-Linux-aarch64/);
    assert.match(inferMcpPage, /InferDeskMCPBridge-FreeBSD-x86_64/);
    // URLs are templated from the resolved tag, never a literal expanded pin:
    // the base stops at `/releases/download` and the tag/name are interpolated.
    assert.match(
      inferMcpPage,
      /MCP_DOWNLOAD_BASE = "https:\/\/github\.com\/[^"]+\/releases\/download"/
    );
    assert.match(inferMcpPage, /MCP_ASSET = \(tag: string, name: string\)/);
    assert.match(inferMcpPage, /\$\{MCP_DOWNLOAD_BASE\}\/\$\{tag\}\/\$\{name\}/);
    assert.doesNotMatch(inferMcpPage, /releases\/download\/mcp-bridge-v\d/);
  });

  test("the bridge tag comes from the CI-generated manifest, with a literal fallback", () => {
    // The bridge is a prerelease stream (excluded from releases/latest), so a
    // hardcoded primary pin would silently go stale — the tag must come from
    // /downloads.json, regenerated daily by CI.
    assert.match(inferMcpPage, /fetch\("\/downloads\.json"/);
    assert.match(inferMcpPage, /mcpTag\?\.startsWith\("mcp-bridge-v"\)/);
    assert.doesNotMatch(inferMcpPage, /MCP_RELEASE_TAG\s*=\s*"mcp-bridge-v/);
    // The fallback constant is the only allowed literal tag.
    assert.match(inferMcpPage, /MCP_FALLBACK_TAG = "mcp-bridge-v\d+\.\d+\.\d+"/);
    assert.deepEqual(inferMcpPage.match(/"mcp-bridge-v[\d.]+"/g), ['"mcp-bridge-v0.1.1"']);
  });
});