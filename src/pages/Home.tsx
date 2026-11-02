import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowSideNav(heroBottom < 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="home-page" className="page-section active">
      {/* Floating Side Navigation */}
      <nav className={`side-nav ${showSideNav ? "visible" : ""}`} aria-label="Quick navigation">
        <div className="side-nav-items">
          <button
            onClick={() => scrollToSection("portfolio")}
            className="side-nav-item"
            aria-label="Go to Products section"
            title="Products"
          >
            <i className="fas fa-box-open"></i>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="side-nav-item"
            aria-label="Go to About section"
            title="About"
          >
            <i className="fas fa-info-circle"></i>
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="side-nav-item"
            aria-label="Go to Capabilities section"
            title="Capabilities"
          >
            <i className="fas fa-cogs"></i>
          </button>
          <button
            onClick={() => scrollToSection("methodology")}
            className="side-nav-item"
            aria-label="Go to How We Build section"
            title="How We Build"
          >
            <i className="fas fa-project-diagram"></i>
          </button>
          <button
            onClick={() => scrollToSection("approach")}
            className="side-nav-item"
            aria-label="Go to Approach section"
            title="Approach"
          >
            <i className="fas fa-lightbulb"></i>
          </button>
          <button
            onClick={() => setShowContactModal(true)}
            className="side-nav-item contact-item"
            aria-label="Contact Us"
            title="Contact"
          >
            <i className="fas fa-envelope"></i>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" role="banner" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-logo">
            <img
              src="assets/logos/flame.png"
              alt="Inferenco logo"
              className="main-logo-animated"
            />
          </div>
          <h1>Software Products, Built In-House</h1>
          <p>
            We design, build, and ship our own products — from on-chain wallets and
            developer tools to free, everyday web utilities.
          </p>
          <div className="hero-navigation">
            <nav className="hero-nav-index" aria-label="Inferenco products">
              <Link
                to="/infer-desk"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-desktop"></i>
                <span>Infer Desk</span>
              </Link>
              <Link
                to="/infer-wallet"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-wallet"></i>
                <span>Infer Wallet</span>
              </Link>
              <Link
                to="/utility-apps"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-toolbox"></i>
                <span>Utility Apps</span>
              </Link>
              <Link
                to="/infer-mcp"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-terminal"></i>
                <span>Infer MCP</span>
              </Link>
              <Link
                to="/docs#infer-connect-introduction"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-plug"></i>
                <span>Infer Connect</span>
              </Link>
              <button
                onClick={() => setShowContactModal(true)}
                className="nav-pill contact-pill"
                aria-label="Contact Us"
              >
                <i className="fas fa-envelope"></i>
                <span>Contact</span>
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="portfolio" className="section">
        <div className="container">
          <h2 className="section-title">
            Our <span>Products</span>
          </h2>
          <p className="section-subtitle">
            Everything we build and ship ourselves — wallets, developer tools, and free utilities
          </p>
          <div className="features-grid">
            {/* Infer Desk Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt="Infer Desk logo"
                className="portfolio-logo"
              />
              <h4>Infer Desk</h4>
              <p>
                Desktop application for Cedra blockchain interactions and workflow management.
                Cross-platform, secure, and built for professional users and enterprises.
              </p>
              <div className="portfolio-tags">
                <span className="tag">Desktop App</span>
                <span className="tag">Cedra</span>
                <span className="tag">Cross-Platform</span>
                <span className="tag">Enterprise</span>
              </div>
              <Link to="/infer-desk" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                Learn More
              </Link>
            </div>

            {/* Infer Wallet Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt="Infer Wallet logo"
                className="portfolio-logo"
              />
              <h4>Infer Wallet</h4>
              <p>
                Cryptocurrency wallet for mobile devices built on the Cedra blockchain.
                Secure asset management with built-in swaps, DeFi integrations, and
                enterprise-grade security.
              </p>
              <div className="portfolio-tags">
                <span className="tag">Mobile App</span>
                <span className="tag">Cedra</span>
                <span className="tag">DeFi</span>
              </div>
              <Link to="/infer-wallet" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                Learn More
              </Link>
            </div>

            {/* Utility Apps Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt="Utility Apps logo"
                className="portfolio-logo"
              />
              <h4>Utility Apps</h4>
              <p>
                Free, privacy-first web tools that run entirely in your browser — Make My
                Image Fit for resizing and compressing images, and Sound Flipper for
                converting audio. No uploads, no accounts, no installs.
              </p>
              <div className="portfolio-tags">
                <span className="tag">Web Tools</span>
                <span className="tag">Free</span>
                <span className="tag">On-Device</span>
                <span className="tag">Privacy-First</span>
              </div>
              <Link to="/utility-apps" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                Learn More
              </Link>
            </div>

            {/* Infer MCP Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt="Infer MCP logo"
                className="portfolio-logo"
              />
              <h4>Infer MCP</h4>
              <p>
                The Model Context Protocol server that lets AI coding agents operate the
                Infer Desk wallet — connect, check health, and submit typed token
                transfers, with every sensitive action approved on the wallet's screen.
              </p>
              <div className="portfolio-tags">
                <span className="tag">MCP</span>
                <span className="tag">AI Agents</span>
                <span className="tag">Developer Tool</span>
              </div>
              <Link to="/infer-mcp" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                Learn More
              </Link>
            </div>

            {/* Infer Connect Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt="Infer Connect logo"
                className="portfolio-logo"
              />
              <h4>Infer Connect</h4>
              <p>
                The wallet-standard adapter that connects Cedra dApps to Infer Desk and
                Infer Wallet — connection, transaction signing, and message signing
                through one plugin-style integration.
              </p>
              <div className="portfolio-tags">
                <span className="tag">Wallet Adapter</span>
                <span className="tag">dApps</span>
                <span className="tag">AIP-62</span>
              </div>
              <Link to="/docs#infer-connect-introduction" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                Read the Docs
              </Link>
            </div>

            {/* Infer Ecosystem Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt="Infer Ecosystem logo"
                className="portfolio-logo"
              />
              <h4>Infer Ecosystem</h4>
              <p>
                Browser-based dApp for the Cedra Network featuring events management,
                gaming hub with poker and casino, and community tools. Built with React
                and Move smart contracts for a seamless Web3 experience.
              </p>
              <div className="portfolio-tags">
                <span className="tag">dApp</span>
                <span className="tag">Cedra</span>
                <span className="tag">Gaming</span>
                <span className="tag">Events</span>
                <span className="tag">Web3</span>
              </div>
              <a
                href="https://app.inferenco.com"
                className="cta-button"
                style={{ marginTop: "1rem" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit dApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">
            About <span>Inferenco</span> &ndash; The Team Behind the Products
          </h2>
          <div className="two-col">
            <div className="text-col" style={{ maxWidth: "100%" }}>
              <p>
                <strong>Inferenco</strong> is a software company formed through the
                collaboration of <strong>Singularity Shift Ltd</strong> and{" "}
                <strong>Spielcrypto Ltd</strong>. We build products, not client projects —
                everything on this site is designed, built, and shipped by us.
              </p>
              <p>
                Our product line spans on-chain wallets, dApps, and developer tooling
                alongside free, everyday web utilities — all backed by
                security reviews and signed releases.
              </p>
              <p>
                Every product is maintained by the same team that wrote it — with
                documentation, install guides, and a direct line to the developers.
              </p>
              <div className="services-list">
                <h4>What we build:</h4>
                <ul className="values-list">
                  <li>
                    <i className="fas fa-code"></i>Desktop &amp; Mobile Wallets
                  </li>
                  <li>
                    <i className="fas fa-link"></i>On-Chain Products for Cedra (Wallets, dApps &amp; Adapter)
                  </li>
                  <li>
                    <i className="fas fa-terminal"></i>Developer Tooling &amp; MCP Integrations
                  </li>
                  <li>
                    <i className="fas fa-globe"></i>Free Browser Utilities
                  </li>
                  <li>
                    <i className="fas fa-brain"></i>AI-Powered Assistants
                  </li>
                  <li>
                    <i className="fas fa-shield-alt"></i>Security Reviews &amp; Signed Releases
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="services" className="section">
        <div className="container">
          <h2 className="section-title">
            Product <span>Capabilities</span>
          </h2>
          <p className="section-subtitle">
            What our products deliver out of the box
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <span className="emoji">💻</span>
              <h4>Manage Assets with Infer Desk</h4>
              <p>
                A desktop wallet for Cedra: send, receive, swap, and manage tokens and
                NFTs with enterprise-grade security.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">📱</span>
              <h4>Take Your Wallet Anywhere</h4>
              <p>
                Infer Wallet brings Cedra to mobile with biometric protection, built-in
                swaps, and DeFi integrations.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🤖</span>
              <h4>Let AI Agents Do the Work</h4>
              <p>
                Infer MCP connects AI coding agents to your Infer Desk wallet, with every
                sensitive action approved on-screen.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🔗</span>
              <h4>Connect dApps in One Click</h4>
              <p>
                Infer Connect gives Cedra dApps a standard wallet adapter for connections,
                transaction signing, and message signing.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🖼️</span>
              <h4>Fix Files Without Uploads</h4>
              <p>
                Make My Image Fit and Sound Flipper resize, compress, and convert entirely
                on your device — nothing is uploaded.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🎮</span>
              <h4>Play and Connect in the Ecosystem</h4>
              <p>
                The Infer Ecosystem dApp offers events management, a gaming hub, and
                community tools on the Cedra Network.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🔐</span>
              <h4>Security-First by Default</h4>
              <p>
                Audited releases, signed and notarized binaries, and on-device processing
                across the product line.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🧩</span>
              <h4>Built on Open Standards</h4>
              <p>
                AIP-62, MCP, and Move smart contracts — our on-chain products interoperate
                instead of locking you in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="section">
        <div className="container">
          <h2 className="section-title">
            Our <span>Methodology</span> &ndash; How We Build and Release
          </h2>
          <p className="section-subtitle">
            From an idea to a signed release you can verify
          </p>
          <div className="methodology-steps">
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">01</span>
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="step-content">
                <h4>We Scope It</h4>
                <p>Every product starts as a focused idea: one job, done properly, with no feature bloat.</p>
              </div>
            </div>
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">02</span>
                <i className="fas fa-code"></i>
              </div>
              <div className="step-content">
                <h4>We Build It In-House</h4>
                <p>Our own team designs, implements, and tests every product — no outsourcing, no hand-offs.</p>
              </div>
            </div>
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">03</span>
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="step-content">
                <h4>We Put It Through Security Review</h4>
                <p>New wallet and bridge releases go through audits and internal review before anything ships.</p>
              </div>
            </div>
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">04</span>
                <i className="fas fa-file-signature"></i>
              </div>
              <div className="step-content">
                <h4>We Sign and Publish</h4>
                <p>Releases are signed, notarized where applicable, and published with signatures you can verify.</p>
              </div>
            </div>
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">05</span>
                <i className="fas fa-headset"></i>
              </div>
              <div className="step-content">
                <h4>We Support What We Ship</h4>
                <p>Documentation, install guides, and a direct line to the team back every product.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="section">
        <div className="container">
          <h2 className="section-title">
            Our <span>Approach</span> &ndash; Why Our Products Are Different
          </h2>
          <p>
            We build software the way we want to use it: <strong>transparent</strong>,{" "}
            <strong>private by design</strong>, and <strong>verifiable</strong>.
            Our approach focuses on:
          </p>
          <ul className="values-list">
            <li>
              <i className="fas fa-file-signature"></i>Verifiable software — every
              release is signed and documented
            </li>
            <li>
              <i className="fas fa-lock"></i>Privacy by default — on-device processing
              wherever possible
            </li>
            <li>
              <i className="fas fa-check-circle"></i>Quality and reliability in
              every line of code
            </li>
            <li>
              <i className="fas fa-lightbulb"></i>Innovation combined with
              practical, usable tools
            </li>
            <li>
              <i className="fas fa-clock"></i>Timely releases without
              compromising on quality
            </li>
            <li>
              <i className="fas fa-cubes"></i>Interoperable products that
              work better together
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Questions About Our Products?</h2>
          <p>
            Want to know more about a product, report an issue, or discuss something
            custom? Get in touch with the team that builds the software.
          </p>
          <button
            onClick={() => setShowContactModal(true)}
            className="cta-button secondary"
            aria-label="Contact Us"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowContactModal(false)}>
              <i className="fas fa-times"></i>
            </button>
            <h2>Contact Us</h2>
            <p>
              Get in touch with the team behind our products — questions, issues, or
              custom work.
            </p>
            <div className="contact-emails">
              <a
                href="mailto:spielcrypto@inferenco.com"
                className="contact-email"
              >
                <i className="fas fa-envelope"></i>
                spielcrypto@inferenco.com
              </a>
              <a
                href="mailto:singularityshift@inferenco.com"
                className="contact-email"
              >
                <i className="fas fa-envelope"></i>
                singularityshift@inferenco.com
              </a>
            </div>
            <p className="modal-note">We'll get back to you as soon as possible.</p>
          </div>
        </div>
      )}
    </div>
  );
}
