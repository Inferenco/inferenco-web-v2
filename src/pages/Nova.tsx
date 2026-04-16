import { Link } from "react-router-dom";

export default function Nova() {
  return (
    <div id="nova-page" className="page-section">
      {/* Hero Section */}
      <section className="hero nova-hero" role="banner">
        <div className="hero-content">
          <div className="nova-logo-container">
            <div className="nova-logo-circle">
              <img
                src="assets/logos/nova.png"
                alt="Nova logo"
                className="nova-logo-animated"
              />
            </div>
            <div className="orbit-ring"></div>
            <div className="orbit-ring orbit-ring-2"></div>
          </div>
          <h1>
            Nova — Your smart community manager and your personal assistant on Telegram
          </h1>
          <p>
            Transparent platform with pay‑per‑use pricing and reliable service.
          </p>
          <a
            href="https://t.me/NovaInferencoBot"
            className="cta-button"
            aria-label="Start with Nova Bot"
          >
            Start with Nova Bot
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="section">
        <div className="container">
          <h2 className="section-title">What Problem Are We Solving?</h2>
          <ul className="problem-list">
            <li>
              <span className="icon">🔒</span>
              <p>
                Lack of transparency hides true costs and payments, while project leaders need
                cost‑effective support 24/7 in Telegram.
              </p>
            </li>
            <li>
              <span className="icon">🛡️</span>
              <p>
                Moderators need protection against bad actors and real‑time info delivery.
              </p>
            </li>
            <li>
              <span className="icon">🏛️</span>
              <p>
                Communities lack tools for rewards and on‑chain actions like DAO votes, payments
                and wallet management.
              </p>
            </li>
            <li>
              <span className="icon">💸</span>
              <p>
                AI subscription costs are often misaligned with actual usage.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="section">
        <div className="container">
          <h2 className="section-title">How Nova Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Connect with Nova</h4>
                <p>
                  Start a conversation in Telegram and fund your account with Aptos tokens.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Use AI &amp; community tools</h4>
                <p>
                  Access inference, generate content or use built‑in tools for group management
                  and automation.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Transparent billing</h4>
                <p>
                  Costs are recorded directly on‑chain — pay only for what you consume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="emoji">📈</span>
              <h4>Price predictions</h4>
              <p>
                Get AI-powered cryptocurrency price forecasts and market insights.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🌐</span>
              <h4>Multi chain wallet</h4>
              <p>
                Manage wallets across multiple blockchains including Aptos, Solana, and 20+ EVM chains.
                Send tokens across networks seamlessly.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">📱</span>
              <h4>Social insights</h4>
              <p>
                Track trending tokens, mentions, and narratives on Twitter/X and Telegram.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🗳️</span>
              <h4>DAO vote proposals</h4>
              <p>
                Guide community direction through on‑chain proposals and voting.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🛡️</span>
              <h4>Sentinel protection</h4>
              <p>
                Guard your group from bad actors with automated moderation.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">💱</span>
              <h4>User payments</h4>
              <p>
                Send tokens seamlessly between group members in chat.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">📊</span>
              <h4>Real‑time info</h4>
              <p>
                Get live updates such as price feeds right inside the conversation.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">⏰</span>
              <h4>Scheduled AI prompts</h4>
              <p>
                Automatically deliver insights or reminders (e.g., price updates).
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🗓️</span>
              <h4>Scheduled payments</h4>
              <p>
                Automate moderator or community manager remuneration.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🤖</span>
              <h4>Automatic bot answers</h4>
              <p>
                Engage members with instant responses and helpful prompts.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🎁</span>
              <h4>Sponsorships</h4>
              <p>
                Let members sponsor access so others can use AI tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section id="integration" className="section">
        <div className="container">
          <h2 className="section-title">
            Integrate Nova in Your Applications
          </h2>
          <p>
            Nova's powerful AI and blockchain capabilities can
            be seamlessly integrated into your applications
            through our comprehensive API. Whether you're
            building web applications, mobile apps, trading
            platforms, or workflow automation tools, Nova
            provides the infrastructure you need.
          </p>
          <div className="features-grid" style={{ marginTop: "2rem" }}>
            <div className="feature-card">
              <span className="emoji">🔌</span>
              <h4>RESTful API</h4>
              <p>
                Simple, well-documented REST API endpoints
                for easy integration into any stack.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🔑</span>
              <h4>API Key Management</h4>
              <p>
                Generate and manage multiple API keys with
                granular permissions and tool access.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">⚡</span>
              <h4>Real-time Capabilities</h4>
              <p>
                Access live market data, token prices, and
                blockchain information in real-time.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🛠️</span>
              <h4>Tool Integration</h4>
              <p>
                Select specific tools and features your
                application needs for flexible integration.
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link
              to="/docs"
              className="cta-button"
              aria-label="View API Documentation"
            >
              View API Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section">
        <div className="container">
          <h2 className="section-title">Pricing</h2>
          <p>
            <strong>Usage Pricing (Nova)</strong><br />Prices
            shown in USD equivalent — billed in APT, USDC, or
            USDT at current market rate.
          </p>
          <div className="pricing-table">
            <div className="pricing-item">
              <h4>GPT‑5</h4>
              <p>$0.00410 per 1k tokens</p>
            </div>
            <div className="pricing-item">
              <h4>GPT‑5‑mini</h4>
              <p>$0.00082 per 1k tokens</p>
            </div>
            <div className="pricing-item">
              <h4>Sentinel (GPT‑5‑nano)</h4>
              <p>$0.00016 per 1k tokens</p>
            </div>
            <div className="pricing-item">
              <h4>Image Generation</h4>
              <p>$0.16 per image</p>
            </div>
            <div className="pricing-item">
              <h4>File Search</h4>
              <p>$0.004 per call</p>
            </div>
            <div className="pricing-item">
              <h4>Web Search Preview</h4>
              <p>$0.016 per call</p>
            </div>
            <div className="pricing-item">
              <h4>MCP Tools</h4>
              <p>$0.00082 per 1k tokens (output)</p>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.25rem" }}>
                Minimum charge per request
              </p>
            </div>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginTop: "1rem" }}>
            Note: final costs depend on model choice and tool
            complexity; Nova charges according to metered LLM
            token usage in real time from your account. MCP
            tools (market data, price predictions, social
            insights, etc.) are priced based on output tokens at
            the same rate as GPT-5-mini ($0.00082 per 1k
            tokens), with a minimum charge per request.
          </p>
        </div>
      </section>

      {/* Call to Action Section for Nova */}
      <section className="cta-section">
        <div className="container">
          <h2>
            Ready to experience AI &amp; blockchain together?
          </h2>
          <p>
            Join teams already using Nova's transparent,
            pay‑per‑use tools in Telegram.
          </p>
          <a
            href="https://t.me/NovaInferencoBot"
            className="cta-button"
            aria-label="Start with Nova Bot"
          >
            Start with Nova Bot
          </a>
        </div>
      </section>
    </div>
  );
}
