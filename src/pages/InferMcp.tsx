const MCP_RELEASE_TAG = "mcp-bridge-v0.1.0";
const MCP_ASSET = (name: string) =>
  `https://github.com/Inferenco/infer-desk-releases/releases/download/${MCP_RELEASE_TAG}/${name}`;

const LINUX_X86_64_ASSET = "InferDeskMCPBridge-Linux-x86_64";
const LINUX_ARM64_ASSET = "InferDeskMCPBridge-Linux-aarch64";
const FREEBSD_X86_64_ASSET = "InferDeskMCPBridge-FreeBSD-x86_64";

export default function InferMcp() {
  return (
    <div id="infer-mcp-page" className="page-section">
      <section className="hero infer-hero" role="banner">
        <div className="hero-content">
          <div className="infer-logo-container" style={{ marginBottom: "2rem" }}>
            <img
              src="/assets/logos/flame.png"
              alt="Infer MCP logo"
              style={{
                width: "140px",
                maxWidth: "100%",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 178, 255, 0.4)",
              }}
            />
          </div>
          <h1>Infer MCP</h1>
          <p>
            The Model Context Protocol server that lets AI coding agents operate the Infer Desk
            wallet — connect, check health, list sessions, and submit typed token transfers —
            with every sensitive action approved on the wallet&apos;s screen.
          </p>
          <div className="download-buttons">
            <a
              id="download-infer-mcp-linux-x86_64"
              href={MCP_ASSET(LINUX_X86_64_ASSET)}
              className="cta-button"
              aria-label="Download the Infer MCP bridge for Linux x86_64"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linux"></i> Linux x86_64
            </a>
            <a
              id="download-infer-mcp-linux-arm64"
              href={MCP_ASSET(LINUX_ARM64_ASSET)}
              className="cta-button"
              aria-label="Download the Infer MCP bridge for Linux ARM64"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linux"></i> Linux ARM64
            </a>
            <a
              id="download-infer-mcp-freebsd"
              href={MCP_ASSET(FREEBSD_X86_64_ASSET)}
              className="cta-button"
              aria-label="Download the Infer MCP bridge for FreeBSD"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-freebsd"></i> FreeBSD
            </a>
            <a
              id="download-infer-mcp-windows"
              href="/docs#mcp-installation"
              className="cta-button"
              aria-label="Infer MCP bridge install guide for Windows via WSL2"
            >
              <i className="fab fa-windows"></i> Windows (via WSL2)
            </a>
          </div>
          <p>
            Windows runs the Linux x86_64 build inside WSL2 — the{" "}
            <a href="/docs#mcp-installation">installation guide</a> walks you through it step by
            step.
          </p>
          <div className="important-note">
            <strong>⚠ Prerelease — not a wallet release.</strong>{" "}
            <code>{MCP_RELEASE_TAG}</code> is a bridge prerelease and does not appear under{" "}
            <code>releases/latest</code>. Do not install it over a wallet release.
          </div>
        </div>
      </section>

      <section id="infer-mcp-features" className="section">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <article className="feature-card">
              <span className="emoji">🔌</span>
              <h4>Any MCP client</h4>
              <p>
                Works with any agent that speaks Streamable-HTTP MCP, including the setups on the{" "}
                <a href="/docs#mcp-connecting-agents">Connect Code Agents</a> page.
              </p>
            </article>
            <article className="feature-card">
              <span className="emoji">🔐</span>
              <h4>Bearer + SPKI security</h4>
              <p>
                A token authenticates the agent to the bridge; SPKI-pinned mTLS (or NIP-44 Nostr
                DMs) authenticates the bridge to the wallet.
              </p>
            </article>
            <article className="feature-card">
              <span className="emoji">✅</span>
              <h4>Per-request approval</h4>
              <p>
                The wallet shows an approval sheet for every sensitive call. Nothing is auto-signed,
                not even for a repeated prompt.
              </p>
            </article>
            <article className="feature-card">
              <span className="emoji">🪙</span>
              <h4>Typed transfers</h4>
              <p>
                <code>send_token</code> builds a typed entry-function transfer, so the wallet can
                show intent instead of an opaque blind-signing blob.
              </p>
            </article>
            <article className="feature-card">
              <span className="emoji">🌐</span>
              <h4>Two transports</h4>
              <p>
                Mutual-TLS over loopback (default) or encrypted Nostr direct messages for wallets
                that are not on the same machine.
              </p>
            </article>
            <article className="feature-card">
              <span className="emoji">🖥️</span>
              <h4>Cross-platform</h4>
              <p>
                Prebuilt for Linux x86_64 and ARM64 and FreeBSD; Windows runs the Linux build under
                WSL2.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="infer-mcp-developers" className="section">
        <div className="container">
          <h2 className="section-title">For Developers</h2>
          <div className="developer-content">
            <p>
              Point any MCP client at <code>http://127.0.0.1:21986/mcp</code> with the Bearer
              token, and the agent can drive your Infer Desk wallet — while you keep approving
              every sensitive action on the wallet&apos;s own screen.
            </p>
            <p>
              The documentation covers how the bridge works, how to install it on your operating
              system, how to configure each supported code agent, and what to do when a call does
              not go through.
            </p>
            <a href="/docs#mcp-introduction" className="cta-button">
              Read the docs — install per OS and connect your agent
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}