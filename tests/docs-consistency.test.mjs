import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsPage = readFileSync(resolve(root, "src/pages/Docs.tsx"), "utf8");
const inferConnectDocs = readFileSync(
  resolve(root, "src/pages/docs/InferConnectDocs.tsx"),
  "utf8"
);
const bridgeDocs = readFileSync(resolve(root, "src/pages/docs/BridgeDocs.tsx"), "utf8");
const payMeDocs = readFileSync(resolve(root, "src/pages/docs/PayMeDocs.tsx"), "utf8");
const migrationDocs = readFileSync(
  resolve(root, "src/pages/docs/MigrationDocs.tsx"),
  "utf8"
);
const auditDocs = readFileSync(resolve(root, "src/pages/docs/AuditDocs.tsx"), "utf8");
const inferMcpDocs = readFileSync(resolve(root, "src/pages/docs/InferMcpDocs.tsx"), "utf8");
const inferMcpPage = readFileSync(resolve(root, "src/pages/InferMcp.tsx"), "utf8");

function sectionIds(source) {
  return Array.from(source.matchAll(/<div id="([^"]+)"/g), (match) => match[1]);
}

describe("Infer Connect docs consistency", () => {
  test("every Infer Connect section has a unique sidebar link", () => {
    const ids = sectionIds(inferConnectDocs);
    assert.equal(new Set(ids).size, ids.length);

    for (const id of ids) {
      assert.match(docsPage, new RegExp(`id: "${id}"`));
    }

    const bridgeIds = sectionIds(bridgeDocs);
    assert.equal(new Set(bridgeIds).size, bridgeIds.length);
    for (const id of bridgeIds) {
      assert.match(docsPage, new RegExp(`id: "${id}"`));
    }

    for (const operation of [
      "connect",
      "sign_message",
      "sign_transaction",
      "sign_and_submit",
      "disconnect",
      "revoke_session",
      "list_sessions",
    ]) {
      assert.match(bridgeDocs, new RegExp(operation));
    }

    const payMeIds = sectionIds(payMeDocs);
    assert.equal(new Set(payMeIds).size, payMeIds.length);
    for (const id of payMeIds) {
      assert.match(docsPage, new RegExp(`id: "${id}"`));
    }

    for (const token of [
      "pay-me-receive-cta",
      "ephemeral_pair",
      "relay_hints",
      "0x1::cedra_account::transfer",
      "0x1::primary_fungible_store::transfer",
      "kind-20000",
      "@noble/*",
    ]) {
      assert.ok(payMeDocs.includes(token));
    }

    const migrationIds = sectionIds(migrationDocs);
    assert.equal(new Set(migrationIds).size, migrationIds.length);
    for (const id of migrationIds) {
      assert.match(docsPage, new RegExp(`id: "${id}"`));
    }

    for (const id of [
      "migration-introduction",
      "migration-data-directory",
      "migration-wallet-adapter",
      "migration-action-checklist",
    ]) {
      assert.ok(migrationIds.includes(id), `missing migration section: ${id}`);
    }

    const auditIds = sectionIds(auditDocs);
    assert.equal(new Set(auditIds).size, auditIds.length);
    for (const id of auditIds) {
      assert.match(docsPage, new RegExp(`id: "${id}"`));
    }
    for (const id of [
      "audits-overview",
      "audits-infer-desk",
      "audits-infer-wallet",
      "audits-themes",
      "audits-reporting",
    ]) {
      assert.ok(auditIds.includes(id), `missing audit section: ${id}`);
    }

    assert.ok(auditDocs.includes("spielcrypto@inferenco.com"));
    assert.ok(auditDocs.includes("singularityshift@inferenco.com"));
    assert.ok(!auditDocs.includes("security@inferenco.com"));
    assert.ok(!/Nova/i.test(auditDocs));
    assert.ok(!auditDocs.includes("CodeBlock"));

    const inferMcpIds = sectionIds(inferMcpDocs);
    assert.equal(new Set(inferMcpIds).size, inferMcpIds.length);
    for (const id of inferMcpIds) {
      assert.match(docsPage, new RegExp(`id: "${id}"`));
    }
    for (const id of [
      "mcp-introduction",
      "mcp-how-it-works",
      "mcp-installation",
      "mcp-connecting-agents",
      "mcp-prompt-examples",
      "mcp-security",
      "mcp-troubleshooting",
    ]) {
      assert.ok(inferMcpIds.includes(id), `missing Infer MCP section: ${id}`);
    }

    // Downloads and the feature grid live on the product page (/infer-mcp),
    // not in the docs. The docs must point there instead.
    assert.ok(!inferMcpDocs.includes('id="mcp-downloads"'));
    assert.ok(!inferMcpDocs.includes("DownloadButtons"));
    assert.ok(!inferMcpDocs.includes('className="features-grid"'));
    assert.ok(inferMcpDocs.includes('href="/infer-mcp"'));

    assert.ok(inferMcpDocs.includes("WSL2"));
    assert.ok(inferMcpDocs.includes("sha256sum -c"));
    assert.ok(inferMcpDocs.includes("127.0.0.1:21986"));
    assert.ok(!/Nova/i.test(inferMcpDocs));
    assert.ok(!inferMcpDocs.includes("detectOS"));
    assert.ok(!inferMcpDocs.includes("shouldShow"));

    // Downloads and release links live on the product page. The docs page must
    // not reference GitHub or a macOS build path.
    assert.ok(!/github/i.test(inferMcpDocs));
    assert.ok(!/macOS/.test(inferMcpDocs));

    // Mistral Vibe: local bridge goes through the CLI; Connectors needs public HTTPS.
    assert.ok(inferMcpDocs.includes("vibe mcp add"));
    assert.ok(inferMcpDocs.includes("streamable-http"));
    assert.ok(inferMcpDocs.includes("HTTPS"));
  });

  test("Infer MCP product page links downloads and routes Windows to the guide", () => {
    assert.ok(inferMcpPage.includes("/docs#mcp-installation"));
    assert.ok(inferMcpPage.includes("InferDeskMCPBridge-Linux-x86_64"));
    assert.ok(inferMcpPage.includes("InferDeskMCPBridge-Linux-aarch64"));
    assert.ok(inferMcpPage.includes("InferDeskMCPBridge-FreeBSD-x86_64"));
    assert.ok(!/macOS/.test(inferMcpPage));
  });

  test("configuration table documents every InferWalletOptions field", () => {
    const options = [
      "deeplinkBaseUrl",
      "deeplinkScheme",
      "websiteUrl",
      "forceRegistration",
      "desktopRegistration",
      "detectAliases",
      "networkOverride",
      "fullnodeUrl",
      "bridgeBaseUrl",
      "relayBaseUrl",
      "websocketBaseUrl",
      "bridgeConnectTimeoutMs",
      "bridgePollIntervalMs",
      "bridgePollTimeoutMs",
      "mobilePollIntervalMs",
      "mobileRequestTimeoutMs",
      "mobileSocketTimeoutMs",
      "expectedOrigin",
      "sessionLivenessIntervalMs",
    ];

    for (const option of options) {
      assert.match(inferConnectDocs, new RegExp(`<code>${option}</code>`));
    }

    assert.match(inferConnectDocs, /https:\/\/inferenco\.com\/infer-desk/);
    assert.match(inferConnectDocs, /https:\/\/inferenco\.com\/infer-wallet/);
  });

  test("API, errors, providers, and storage docs include adapter source-of-truth details", () => {
    for (const token of [
      "signTransaction",
      "signAndSubmitBCSTransaction",
      "signMessageAndVerify",
      "refreshProvider",
      "subscribe",
      "createInferAIP62Wallet",
      "tryResumeInferWalletConnection",
      "remapInferError",
      "UNSUPPORTED",
      "window.cedra",
      "window.infer",
      "window.nova",
      "window.aptos",
      "isInferWallet",
      "isNovaWallet",
      "inferenco:infer-callback-marker",
      "inferenco:nova-callback-marker",
      "sessionStorage",
    ]) {
      assert.match(inferConnectDocs, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
  });
});
