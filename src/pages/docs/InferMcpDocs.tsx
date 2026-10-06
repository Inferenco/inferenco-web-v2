import type { DocsProps } from "./types";
import CodeBlock from "../../components/CodeBlock";

const MCP_RELEASE_TAG = "mcp-bridge-v0.1.0";
const MCP_RELEASE_URL = `https://github.com/Inferenco/infer-desk-releases/releases/tag/${MCP_RELEASE_TAG}`;

export default function InferMcpDocs({ hash }: DocsProps) {
  return (
    <>
      <div id="mcp-introduction" className={`docs-section ${hash === "mcp-introduction" ? "active" : ""}`}>
        <h1>Infer MCP</h1>
        <p className="docs-lead">
          Infer MCP is a standalone Model Context Protocol (MCP) server that lets AI coding agents
          operate the Infer Desk wallet — connect, check health, list sessions, and submit typed
          token transfers — while every sensitive action is still approved on the wallet&apos;s own
          screen. It speaks Streamable-HTTP MCP on <code>127.0.0.1:21986</code>, implements MCP
          protocol revision <code>2025-11-25</code>, and authenticates every request with a Bearer
          token. The feature list and the per-OS download buttons live on the{" "}
          <a href="/infer-mcp">Infer MCP product page</a>; this documentation covers how it works,
          how to install and verify it, how to wire it into your code agent, and what to do when a
          call does not go through.
        </p>

        <a href="/infer-mcp" className="cta-button">
          Features and downloads <i className="fas fa-arrow-right"></i>
        </a>

        <div className="important-note">
          <strong>⚠ Prerelease — not a wallet release.</strong> <code>{MCP_RELEASE_TAG}</code> is
          a bridge prerelease and does not appear under <code>releases/latest</code>. Do not install
          it over a wallet release.
        </div>
      </div>

      <div id="mcp-how-it-works" className={`docs-section ${hash === "mcp-how-it-works" ? "active" : ""}`}>
        <h1>How It Works</h1>
        <p>
          The MCP bridge sits between your agent and the Infer Desk wallet. It is not a wallet and
          it holds no keys: it terminates the agent connection, forwards typed requests to the
          wallet over the selected Bridge transport, and returns the wallet&apos;s answer.
        </p>

        <h2>Two hops, three participants</h2>
        <p>
          A tool call travels across exactly two trust boundaries. Both are shown below with the
          authentication each one uses.
        </p>
        <div className="table-responsive">
          <table className="functions-table">
            <thead>
              <tr>
                <th>Hop</th>
                <th>Connection</th>
                <th>Authentication</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Hop">Agent → bridge</td>
                <td data-label="Connection">
                  Streamable HTTP, <code>POST /mcp</code> at <code>127.0.0.1:21986</code>
                </td>
                <td data-label="Authentication">
                  <code>Authorization: Bearer &lt;token&gt;</code> on every request
                </td>
              </tr>
              <tr>
                <td data-label="Hop">Bridge → wallet</td>
                <td data-label="Connection">
                  Mutual TLS at <code>127.0.0.1:21985</code> with SPKI pinning — or Nostr kind-4
                  direct messages, NIP-44-encrypted, fanned out over public relays
                </td>
                <td data-label="Authentication">
                  Pinned wallet certificate, or a paired-npub allow-list checked by the wallet
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Transport comparison</h2>
        <div className="table-responsive">
          <table className="functions-table">
            <thead>
              <tr>
                <th>Transport</th>
                <th>Use it when</th>
                <th>Trade-offs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Transport">
                  <code>mtls</code> (default)
                </td>
                <td data-label="Use it when">
                  The wallet and the bridge run on the same machine or the same LAN.
                </td>
                <td data-label="Trade-offs">
                  Lowest latency. Copy the SPKI pin from the wallet&apos;s Bridge card into{" "}
                  <code>INFER_DESK_MCP_WALLET_SPKI_PIN_B64</code> before the first run.
                </td>
              </tr>
              <tr>
                <td data-label="Transport">
                  <code>nostr</code>
                </td>
                <td data-label="Use it when">
                  The wallet is remote — a phone, or a machine behind NAT that cannot accept inbound
                  connections.
                </td>
                <td data-label="Trade-offs">
                  NIP-44-encrypted DMs over public relays, set up with a pairing QR. Every transfer
                  spends from a per-transfer shot budget.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Tools</h2>
        <p>
          The consumer tool set is identical on both transports. Nostr adds five pairing-management
          tools, and the mTLS transport can additionally expose an opt-in admin surface.
        </p>
        <div className="table-responsive">
          <table className="functions-table">
            <thead>
              <tr>
                <th>Group</th>
                <th>Tools</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Group">Consumer tools</td>
                <td data-label="Tools">
                  <code>health_proxy</code>, <code>list_sessions</code>, <code>connect</code>,{" "}
                  <code>disconnect</code>, <code>send_token</code>,{" "}
                  <code>list_all_sessions</code> (a cross-transport merged view of paired apps)
                </td>
                <td data-label="Availability">Always on, both transports</td>
              </tr>
              <tr>
                <td data-label="Group">Nostr pairing tools</td>
                <td data-label="Tools">
                  <code>nostr_status</code>, <code>nostr_list_paired</code>,{" "}
                  <code>nostr_revoke_paired</code>, <code>nostr_list_threshold_collections</code>,{" "}
                  <code>nostr_subscribe_events</code>
                </td>
                <td data-label="Availability">
                  <code>nostr</code> transport only
                </td>
              </tr>
              <tr>
                <td data-label="Group">Admin tools</td>
                <td data-label="Tools">
                  A separate administrative surface covering session and pair inspection,
                  revocation, and policy inspection
                </td>
                <td data-label="Availability">
                  <code>mtls</code> only, and only when{" "}
                  <code>INFER_DESK_MCP_ADMIN_BEARER_TOKEN</code> is set
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Note:</strong> <code>tools/list</code> advertises only the tools the active
          transport supports, so an agent never sees a tool it cannot call.
        </p>

        <h2>Setup flow</h2>
        <ol>
          <li>
            <strong>Pick a transport.</strong> <code>mtls</code> if the wallet is reachable on
            loopback or the LAN; <code>nostr</code> if it is remote.
          </li>
          <li>
            <strong>Enable the Bridge in the wallet.</strong> Open Settings → Bridge, turn on the
            Remote Bridge toggle, add the bridge&apos;s identity to <strong>Allowed addresses</strong>,
            and copy the <strong>Copy SPKI pin</strong> value. For <code>nostr</code>, generate the
            pairing QR instead.
          </li>
          <li>
            <strong>Generate the Bearer token.</strong>{" "}
            <code>openssl rand -hex 32</code> produces 32 bytes as 64 hex characters.
          </li>
          <li>
            <strong>Write the environment file.</strong> The minimum the bridge needs is:
            <CodeBlock language="bash">{`INFER_DESK_MCP_BEARER_TOKEN=<64-hex from openssl rand -hex 32>
INFER_DESK_MCP_TRANSPORT=mtls            # or nostr
# mTLS only — paste from "Copy SPKI pin" in the wallet Bridge card
INFER_DESK_MCP_WALLET_SPKI_PIN_B64=<paste>
# Nostr only
# INFER_DESK_MCP_NOSTR_RELAYS=wss://relay.damus.io,wss://nos.lol
# INFER_DESK_MCP_NOSTR_PAIR_QR=/tmp/infer-desk-nostr-pair.json`}</CodeBlock>
          </li>
          <li>
            <strong>Run the binary.</strong> The first line it prints should be:
            <CodeBlock language="bash">{`infer-desk-mcp-bridge INFO mcp-bridge listening 127.0.0.1:21986`}</CodeBlock>
          </li>
          <li>
            <strong>Wire up the agent.</strong> Point any MCP client at{" "}
            <code>http://127.0.0.1:21986/mcp</code> with the Bearer token — see{" "}
            <a href="/docs#mcp-connecting-agents">Connect Code Agents</a>.
          </li>
        </ol>
      </div>

      <div id="mcp-installation" className={`docs-section ${hash === "mcp-installation" ? "active" : ""}`}>
        <h1>Installation</h1>
        <p>
          The per-OS download buttons are on the{" "}
          <a href="/infer-mcp">Infer MCP product page</a>. The commands below fetch the same{" "}
          <code>{MCP_RELEASE_TAG}</code> artifacts directly, so you can script the whole install.
          Release notes:{" "}
          <a href={MCP_RELEASE_URL} target="_blank" rel="noopener noreferrer">
            {MCP_RELEASE_TAG}
          </a>
          .
        </p>
        <p>
          <strong>Note:</strong> each binary ships with a SHA-256 sidecar, and the{" "}
          <code>sha256sum -c</code> step below checks it before you run anything. These artifacts
          are SHA-256 verified but <strong>not signed</strong> — no minisign signature or MANIFEST
          exists for mcp-bridge releases yet, so treat the sidecar as a transfer-integrity check
          only: it proves the file arrived intact, not that it was published by us.
        </p>

        <h2>Linux (x86_64 and ARM64)</h2>
        <p>
          Download the binary and its checksum sidecar, verify, make it executable, and run it.
        </p>
        <CodeBlock language="bash">{`curl -LO https://github.com/Inferenco/infer-desk-releases/releases/download/${MCP_RELEASE_TAG}/InferDeskMCPBridge-Linux-x86_64{,.sha256}
sha256sum -c InferDeskMCPBridge-Linux-x86_64.sha256
chmod +x InferDeskMCPBridge-Linux-x86_64
./InferDeskMCPBridge-Linux-x86_64`}</CodeBlock>
        <p>
          The build targets glibc 2.35 or newer (it was produced in an{" "}
          <code>ubuntu:22.04</code> container). On an ARM machine, substitute{" "}
          <code>InferDeskMCPBridge-Linux-aarch64</code> everywhere in those four commands.
        </p>

        <h2>Windows with WSL2</h2>
        <p>
          There is no native Windows binary. Install WSL2 with an Ubuntu distribution from an
          elevated PowerShell prompt:
        </p>
        <CodeBlock language="bash">{`wsl --install -d Ubuntu`}</CodeBlock>
        <p>
          Inside the WSL2 Ubuntu shell, run the same Linux x86_64 download, checksum,{" "}
          <code>chmod</code>, and run commands shown above. WSL2 Ubuntu satisfies the glibc 2.35
          floor, so no extra runtime is needed.
        </p>
        <p>
          <strong>Note:</strong> if your Infer Desk wallet runs on the Windows host rather than
          inside WSL2, ensure the wallet&apos;s bridge bind is reachable from WSL2 — loopback is
          shared in WSL2&apos;s NAT mode on current Windows versions, but do not rely on it blindly.
          If it is not reachable, switch to the <code>nostr</code> transport, which needs no direct
          network path between the two.
        </p>

        <h2>macOS</h2>
        <p>
          No prebuilt macOS artifact is attached to this release. Build from source with the Rust
          toolchain and the <code>infer_desk</code> workspace sources:
        </p>
        <CodeBlock language="bash">{`cargo build --locked --release -p infer-desk-mcp-bridge
# result: target/release/infer-desk-mcp-bridge`}</CodeBlock>
        <p>
          Use{" "}
          <a href={MCP_RELEASE_URL} target="_blank" rel="noopener noreferrer">
            the {MCP_RELEASE_TAG} release page
          </a>{" "}
          as the reference for the expected artifact names and checksums while you build.
        </p>

        <h2>FreeBSD</h2>
        <p>Download, verify, and run — the same four commands as Linux:</p>
        <CodeBlock language="bash">{`curl -LO https://github.com/Inferenco/infer-desk-releases/releases/download/${MCP_RELEASE_TAG}/InferDeskMCPBridge-FreeBSD-x86_64{,.sha256}
sha256sum -c InferDeskMCPBridge-FreeBSD-x86_64.sha256
chmod +x InferDeskMCPBridge-FreeBSD-x86_64
./InferDeskMCPBridge-FreeBSD-x86_64`}</CodeBlock>
        <p>
          The FreeBSD artifact is a native build. mDNS LAN discovery can be degraded on FreeBSD —
          connecting by direct IP or a configured wallet address is unaffected. Run the binary with{" "}
          <code>--check-mdns</code> to inspect what discovery is seeing.
        </p>
      </div>

      <div id="mcp-connecting-agents" className={`docs-section ${hash === "mcp-connecting-agents" ? "active" : ""}`}>
        <h1>Connect Code Agents</h1>
        <p className="docs-lead">
          The bridge is a Streamable-HTTP MCP server. Every client below connects to{" "}
          <code>http://127.0.0.1:21986/mcp</code> and authenticates with{" "}
          <code>Authorization: Bearer &lt;your INFER_DESK_MCP_BEARER_TOKEN&gt;</code>. On the default
          loopback bind, non-browser clients may omit the <code>Origin</code> header; it is only
          required when the bridge is exposed to the LAN (<code>INFER_DESK_MCP_ALLOW_LAN=1</code>).
        </p>

        <h2>Mistral Vibe</h2>
        <p>
          Vibe is the verified reference setup and needs no config file. Open{" "}
          <strong>Connectors</strong> → <strong>Add MCP server</strong>, set the URL to{" "}
          <code>http://127.0.0.1:21986/mcp</code>, and for <strong>Authentication</strong> paste
          the value of <code>INFER_DESK_MCP_BEARER_TOKEN</code> — Vibe auto-detects that this is
          Bearer auth and sends the correct header.
        </p>

        <h2>Codex</h2>
        <p>
          Codex speaks stdio only today, so a remote Streamable-HTTP server is reached through a
          stdio-to-HTTP adapter (<code>mcp-remote</code>, a third-party package). Add it to{" "}
          <code>~/.codex/config.toml</code>:
        </p>
        <pre className="code-block">
          <code>{`[mcp_servers.infer-mcp]
command = "npx"
args = ["-y", "mcp-remote", "http://127.0.0.1:21986/mcp", "--header", "Authorization: Bearer <YOUR_TOKEN>"]`}</code>
        </pre>
        <p>
          <strong>Note:</strong> <code>mcp-remote</code> is a third-party adapter, not part of
          Codex. Check your Codex version — if it has gained native remote-MCP support, point it at
          the URL directly instead.
        </p>

        <h2>MiniMax</h2>
        <p>
          If your MiniMax version supports remote HTTP MCP servers, use the <code>url</code> plus{" "}
          <code>headers</code> form. If it only accepts <code>stdio</code> servers, wrap the bridge
          in the same adapter Codex uses:
        </p>
        <CodeBlock language="json">{`{
  "mcpServers": {
    "infer-mcp": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://127.0.0.1:21986/mcp", "--header", "Authorization: Bearer <YOUR_TOKEN>"]
    }
  }
}`}</CodeBlock>

        <h2>Qwen</h2>
        <p>
          Add the server to <code>~/.qwen/settings.json</code> (or run <code>qwen mcp add</code>).
          Qwen accepts remote servers directly:
        </p>
        <CodeBlock language="json">{`{
  "mcpServers": {
    "infer-mcp": {
      "url": "http://127.0.0.1:21986/mcp",
      "headers": { "Authorization": "Bearer <YOUR_TOKEN>" }
    }
  }
}`}</CodeBlock>
        <p>
          <strong>Note:</strong> verify that your Qwen build accepts the <code>url</code> and{" "}
          <code>headers</code> keys; if it rejects them, fall back to the{" "}
          <code>mcp-remote</code> wrapper form shown for MiniMax.
        </p>

        <h2>OpenCode</h2>
        <p>OpenCode takes remote servers under the top-level <code>mcp</code> key of{" "}
          <code>opencode.json</code>:</p>
        <CodeBlock language="json">{`{
  "mcp": {
    "infer-mcp": {
      "type": "remote",
      "url": "http://127.0.0.1:21986/mcp",
      "headers": { "Authorization": "Bearer <YOUR_TOKEN>" }
    }
  }
}`}</CodeBlock>

        <h2>Claude</h2>
        <p>Add the server to Claude Code from the CLI:</p>
        <CodeBlock language="bash">{`claude mcp add --transport http infer-mcp http://127.0.0.1:21986/mcp --header "Authorization: Bearer <YOUR_TOKEN>"`}</CodeBlock>
        <p>Or commit a project-scoped <code>.mcp.json</code> so the whole team gets it:</p>
        <CodeBlock language="json">{`{
  "mcpServers": {
    "infer-mcp": {
      "type": "http",
      "url": "http://127.0.0.1:21986/mcp",
      "headers": { "Authorization": "Bearer <YOUR_TOKEN>" }
    }
  }
}`}</CodeBlock>

        <h2>PI (pi-mono)</h2>
        <p>
          PI reads MCP servers from <code>~/.pi/agent/mcp.json</code> in the same{" "}
          <code>mcpServers</code> shape as Qwen:
        </p>
        <CodeBlock language="json">{`{
  "mcpServers": {
    "infer-mcp": {
      "url": "http://127.0.0.1:21986/mcp",
      "headers": { "Authorization": "Bearer <YOUR_TOKEN>" }
    }
  }
}`}</CodeBlock>
        <p>
          <strong>Note:</strong> confirm that your PI version reads <code>~/.pi/agent/mcp.json</code>
          and honours the remote <code>url</code> entry before assuming a connection failure is the
          bridge&apos;s fault.
        </p>

        <h2>Smoke test</h2>
        <p>
          Before debugging the agent, check the bridge directly. Liveness first, then a tool list
          over JSON-RPC:
        </p>
        <CodeBlock language="bash">{`curl -s http://127.0.0.1:21986/healthz
curl -X POST http://127.0.0.1:21986/mcp \\
  -H "Authorization: Bearer $INFER_DESK_MCP_BEARER_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`}</CodeBlock>
        <p>
          If <code>tools/list</code> returns six tools, the bridge is healthy and no admin token is
          configured. See <a href="/docs#mcp-troubleshooting">Troubleshooting</a> if it returns
          nothing or a 401.
        </p>
      </div>

      <div id="mcp-prompt-examples" className={`docs-section ${hash === "mcp-prompt-examples" ? "active" : ""}`}>
        <h1>Prompt Examples</h1>
        <p className="docs-lead">
          These are examples of what you can ask any connected agent. The agent picks the tool and
          fills in the arguments; you approve the action on the wallet. Nothing is signed before you
          say so.
        </p>

        <div className="table-responsive">
          <table className="functions-table">
            <thead>
              <tr>
                <th>Prompt</th>
                <th>What happens</th>
                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Prompt">
                  &ldquo;Check the health of my Infer Desk wallet through the bridge.&rdquo;
                </td>
                <td data-label="What happens">
                  The bridge reports wallet liveness without changing any state.
                </td>
                <td data-label="Tool"><code>health_proxy</code></td>
              </tr>
              <tr>
                <td data-label="Prompt">&ldquo;Connect to my Infer Desk wallet.&rdquo;</td>
                <td data-label="What happens">
                  The wallet shows an approval sheet. The session is created only after you accept.
                </td>
                <td data-label="Tool"><code>connect</code></td>
              </tr>
              <tr>
                <td data-label="Prompt">
                  &ldquo;What sessions are currently active on my wallet?&rdquo;
                </td>
                <td data-label="What happens">
                  A read-only listing of live sessions on the active transport.
                </td>
                <td data-label="Tool"><code>list_sessions</code></td>
              </tr>
              <tr>
                <td data-label="Prompt">
                  &ldquo;Show me everything paired to my wallet across both transports.&rdquo;
                </td>
                <td data-label="What happens">
                  A merged, read-only view of paired apps regardless of transport.
                </td>
                <td data-label="Tool"><code>list_all_sessions</code></td>
              </tr>
              <tr>
                <td data-label="Prompt">
                  &ldquo;Send 1 CEDRA to 0x&lt;recipient&gt; using my Infer Desk wallet.&rdquo;
                </td>
                <td data-label="What happens">
                  The wallet shows a per-request approval sheet describing the transfer. The typed
                  transfer path means you see the intent rather than a blind-sign blob.
                </td>
                <td data-label="Tool"><code>send_token</code></td>
              </tr>
              <tr>
                <td data-label="Prompt">&ldquo;Disconnect the current bridge session.&rdquo;</td>
                <td data-label="What happens">The active session ends on the wallet side.</td>
                <td data-label="Tool"><code>disconnect</code></td>
              </tr>
              <tr>
                <td data-label="Prompt">&ldquo;What&apos;s the Nostr pairing status of my wallet?&rdquo;</td>
                <td data-label="What happens">
                  Relay connectivity and pairing state for the Nostr transport.
                </td>
                <td data-label="Tool"><code>nostr_status</code></td>
              </tr>
              <tr>
                <td data-label="Prompt">
                  &ldquo;Show my wallet&apos;s paired Nostr apps and revoke the one named{" "}
                  <code>&lt;label&gt;</code>.&rdquo;
                </td>
                <td data-label="What happens">
                  Lists paired Nostr apps, then revokes the named one.
                </td>
                <td data-label="Tool">
                  <code>nostr_list_paired</code> / <code>nostr_revoke_paired</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Note:</strong> the two Nostr rows only work on the <code>nostr</code> transport.
          On the default <code>mtls</code> transport they are not advertised, so the agent will not
          see them at all. See <a href="/docs#mcp-security">Security</a> for what each of these
          costs you in authority.
        </p>
      </div>

      <div id="mcp-security" className={`docs-section ${hash === "mcp-security" ? "active" : ""}`}>
        <h1>Security</h1>
        <p>
          The bridge has two trust boundaries, and each one has its own credential. A compromise of
          one does not automatically yield the other.
        </p>

        <h2>Agent ↔ bridge: a Bearer token</h2>
        <p>
          The agent authenticates to the bridge with <code>INFER_DESK_MCP_BEARER_TOKEN</code> on
          every HTTP request. Anything holding that token can reach the MCP surface, which is why it
          should be treated like a password rather than a config detail. Generate it with{" "}
          <code>openssl rand -hex 32</code> and keep it out of shared repositories.
        </p>

        <h2>Bridge ↔ wallet: SPKI-pinned mTLS or Nostr</h2>
        <p>
          The bridge authenticates to the wallet with an SPKI pin copied from the wallet&apos;s
          Bridge card, or — on the <code>nostr</code> transport — with a paired-npub allow-list and
          NIP-44-encrypted direct messages. Neither credential is derived from the Bearer token.
        </p>
        <ul>
          <li>
            <strong>Fail closed by default.</strong> An empty wallet allow-list denies signing
            requests rather than allowing them.
          </li>
          <li>
            <strong>Add the bridge to Allowed addresses.</strong> Until the bridge identity is on the
            wallet&apos;s allow-list, every request is refused.
          </li>
          <li>
            <strong>SPKI pinning defends against port hijack.</strong> The pin proves the bridge
            reached the intended wallet and not something else that grabbed the port. Regenerating
            the wallet certificate invalidates the pin — re-copy it from{" "}
            <strong>Copy SPKI pin</strong> and update{" "}
            <code>INFER_DESK_MCP_WALLET_SPKI_PIN_B64</code>.
          </li>
        </ul>

        <h2>Per-request approval</h2>
        <p>
          The wallet shows an approval sheet for every sensitive call. There is no auto-approve mode
          and no session-wide signing grant: a repeated prompt gets a repeated sheet.{" "}
          <code>send_token</code> builds a typed entry-function transfer so the sheet can describe
          what is actually happening, rather than asking you to blind-sign an opaque payload.
        </p>

        <h2>Nostr shot budget</h2>
        <p>
          On the <code>nostr</code> transport, one <code>send_token</code> consumes exactly one
          shot from the ephemeral pair (<code>max_shots = 1</code>) with a 600-second TTL. A
          transfer cannot be silently retried on a stale authorization: each attempt is a new,
          separately approved request.
        </p>

        <h2>Admin tools are opt-in</h2>
        <p>
          The administrative surface is available on the <code>mtls</code> transport only, and only
          when <code>INFER_DESK_MCP_ADMIN_BEARER_TOKEN</code> is set. Without it the admin tools are
          not advertised in <code>tools/list</code> at all — an agent has no way to discover or call
          them.
        </p>

        <div className="important-note">
          <strong>⚠ The Bearer token is only the agent ↔ bridge secret.</strong> It is unrelated to
          the wallet&apos;s mTLS identity and Nostr credentials, and knowing it does not let anyone
          sign for the wallet. Treat it like a password anyway: it grants full access to the MCP
          tool surface from any process that can reach the loopback port.
        </div>
      </div>

      <div id="mcp-troubleshooting" className={`docs-section ${hash === "mcp-troubleshooting" ? "active" : ""}`}>
        <h1>Troubleshooting</h1>
        <p>
          Each row is the symptom you will actually see, what causes it, and the fix. Start with a{" "}
          <code>curl -s http://127.0.0.1:21986/healthz</code> to confirm the bridge itself is up.
        </p>

        <div className="table-responsive">
          <table className="functions-table">
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Cause</th>
                <th>Fix</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Symptom">
                  The process exits with <code>WalletError::MtlsNotBound</code>
                </td>
                <td data-label="Cause">The Bridge card is not enabled in the wallet.</td>
                <td data-label="Fix">
                  Open Settings → Bridge, turn on the Remote Bridge toggle, apply, and start the
                  bridge again.
                </td>
              </tr>
              <tr>
                <td data-label="Symptom">
                  The handshake fails with &ldquo;SPKI pin mismatch&rdquo;
                </td>
                <td data-label="Cause">The wallet certificate was regenerated.</td>
                <td data-label="Fix">
                  Re-copy <strong>Copy SPKI pin</strong> from the wallet Bridge card and update{" "}
                  <code>INFER_DESK_MCP_WALLET_SPKI_PIN_B64</code>.
                </td>
              </tr>
              <tr>
                <td data-label="Symptom">
                  The first DM publish fails with <code>WalletError::NostrNotBound</code>
                </td>
                <td data-label="Cause">The wallet&apos;s Nostr listener is off.</td>
                <td data-label="Fix">
                  Enable Nostr in the wallet, confirm relays are configured, then re-run the bridge.
                </td>
              </tr>
              <tr>
                <td data-label="Symptom">An Origin error, or a missing-Origin rejection</td>
                <td data-label="Cause">
                  The bridge is bound to the LAN via <code>INFER_DESK_MCP_ALLOW_LAN=1</code>.
                </td>
                <td data-label="Fix">
                  The client must send a valid <code>Origin</code> header matching the bind. On the
                  loopback bind, no <code>Origin</code> is required.
                </td>
              </tr>
              <tr>
                <td data-label="Symptom">
                  <code>tools/list</code> returns 6 tools on <code>mtls</code>, not the full set
                </td>
                <td data-label="Cause">No admin bearer token is configured.</td>
                <td data-label="Fix">
                  Set <code>INFER_DESK_MCP_ADMIN_BEARER_TOKEN</code> and{" "}
                  <code>INFER_DESK_MCP_ADMIN_ORIGINS</code>, then restart the bridge.
                </td>
              </tr>
              <tr>
                <td data-label="Symptom">An <code>admin_*</code> call returns 404 on Nostr</td>
                <td data-label="Cause">Admin tools are mTLS-only.</td>
                <td data-label="Fix">
                  Switch <code>INFER_DESK_MCP_TRANSPORT</code> to <code>mtls</code> to use them.
                </td>
              </tr>
              <tr>
                <td data-label="Symptom">The binary will not run on an older Linux host</td>
                <td data-label="Cause">glibc older than 2.35.</td>
                <td data-label="Fix">
                  Run it in a WSL2 Ubuntu environment, or move to a distribution with glibc 2.35 or
                  newer.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}