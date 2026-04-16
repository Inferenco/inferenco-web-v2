import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div id="home-page" className="page-section active">
      {/* Hero Section */}
      <section className="hero" role="banner">
        <div className="hero-content">
          <div className="hero-logo">
            <img
              src="assets/logos/flame.png"
              alt="Inferenco platform logo"
              className="main-logo-animated"
            />
          </div>
          <h1>
            Developing blockchain&nbsp;& AI applications for Web3 leaders &
            Crypto Communities.
          </h1>
          <p>
            Transparent, pay‑per‑use AI tools built on existing blockchains with
            seamless Web3 integrations.
          </p>
          <Link to="/nova" className="cta-button" aria-label="Discover Nova">
            Discover Nova
          </Link>
          <Link to="/docs" className="cta-button" aria-label="Docs">
            Docs
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">
            About <span>Inferenco</span> – Building with Blockchain &amp; AI
          </h2>
          <div className="two-col">
            <div className="image-col">
              <img src="assets/logos/flame.png" alt="Inferenco blockchain and AI logo" />
            </div>
            <div className="text-col">
              <p>
                Inferenco is a pioneering collaboration between{" "}
                <strong>Singularity Shift Ltd</strong> and{" "}
                <strong>Spielcrypto Ltd</strong>. We build transparent
                applications that combine the power of blockchain and artificial
                intelligence. Our products offer:
              </p>
              <ul className="values-list">
                <li>
                  <i className="fas fa-brain"></i>AI inference on demand
                </li>
                <li>
                  <i className="fas fa-link"></i>Blockchain transparency
                </li>
                <li>
                  <i className="fas fa-cogs"></i>Integrations with Web3 workflows
                </li>
              </ul>
              <p style={{ marginTop: "2rem" }}>
                In addition to our flagship products, we also provide bespoke
                development services for web3 leaders, crypto communities and
                DeFi partners seeking custom blockchain and AI integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="section">
        <div className="container">
          <h2 className="section-title">
            Our <span>Mission</span> – Democratising AI Through Blockchain
          </h2>
          <p>
            We believe AI powered by blockchain should feel{" "}
            <strong>simple, fair and useful</strong> for everyone. Our
            transparent platform focuses on:
          </p>
          <ul className="values-list">
            <li>
              <i className="fas fa-eye"></i>Eliminating opaque costs
            </li>
            <li>
              <i className="fas fa-unlock"></i>Breaking free from rigid
              subscriptions
            </li>
            <li>
              <i className="fas fa-plug"></i>Bringing tools directly into the
              platforms people already use
            </li>
            <li>
              <i className="fas fa-users"></i>Building what our users want and
              need
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>
            Experience the Future of Blockchain &amp; AI with Inferenco
          </h2>
          <p>
            Discover how transparent, pay‑per‑use AI built on blockchain can
            revolutionise your web3 business, crypto community or DeFi project.
          </p>
          <Link to="/nova" className="cta-button" aria-label="Discover Nova">
            Discover Nova
          </Link>
          <Link to="/docs" className="cta-button" aria-label="Docs">
            Docs
          </Link>
        </div>
      </section>
    </div>
  );
}
