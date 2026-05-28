import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div id="home-page" className="page-section active">
      {/* Hero Section */}
      <section className="hero" role="banner">
        <div className="hero-content">
          <div className="hero-logo">
            <img
              src="assets/logos/flame.png"
              alt="Inferenco logo"
              className="main-logo-animated"
            />
          </div>
          <h1>
            Enterprise Software Development &amp; IT Solutions
          </h1>
          <p>
            Building custom software solutions for businesses. From web applications
            to blockchain platforms, AI systems to mobile apps&mdash;we deliver
            quality at scale.
          </p>
          <a href="#portfolio" className="cta-button" aria-label="View Our Portfolio">
            View Our Portfolio
          </a>
          <button
            onClick={() => setShowContactModal(true)}
            className="cta-button secondary"
            aria-label="Contact Us"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">
            About <span>Inferenco</span> &ndash; Your Software Development Partner
          </h2>
          <div className="two-col">
            <div className="text-col" style={{ maxWidth: "100%" }}>
              <p>
                <strong>Inferenco</strong> is a leading software development company,
                formed through the collaboration of <strong>Singularity Shift Ltd</strong> and
                <strong> Spielcrypto Ltd</strong>. We specialize in building custom
                software solutions that drive business growth and innovation.
              </p>
              <p>
                With deep expertise in full-stack development, blockchain technology,
                artificial intelligence, and enterprise applications, we deliver
                high-quality software that meets your exact requirements.
              </p>
              <p>
                Our approach combines technical excellence with business acumen,
                ensuring that every solution we build aligns with your strategic
                objectives and delivers measurable value.
              </p>
              <div className="services-list">
                <h4>Our Core Expertise:</h4>
                <ul className="values-list">
                  <li>
                    <i className="fas fa-code"></i>Full-Stack Development
                  </li>
                  <li>
                    <i className="fas fa-cubes"></i>Custom Software Solutions
                  </li>
                  <li>
                    <i className="fas fa-link"></i>Blockchain &amp; Web3 Integration
                  </li>
                  <li>
                    <i className="fas fa-brain"></i>AI &amp; Machine Learning
                  </li>
                  <li>
                    <i className="fas fa-mobile-alt"></i>Mobile Application Development
                  </li>
                  <li>
                    <i className="fas fa-server"></i>Enterprise System Architecture
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section">
        <div className="container">
          <h2 className="section-title">
            Our <span>Portfolio</span>
          </h2>
          <p className="section-subtitle">
            Proven track record of delivering innovative software solutions
          </p>
          <div className="features-grid">
            {/* Nova Bot Card */}
            <div className="feature-card portfolio-card">
              <img
                src="assets/logos/nova.png"
                alt="Nova Bot logo"
                className="portfolio-logo"
              />
              <h4>Nova Bot</h4>
              <p>
                AI-powered community manager and personal assistant for Telegram.
                Features transparent pay-per-use pricing, blockchain integration,
                and 24/7 automated community support.
              </p>
              <div className="portfolio-tags">
                <span className="tag">AI Assistant</span>
                <span className="tag">Telegram Bot</span>
                <span className="tag">Blockchain</span>
              </div>
              <Link to="/nova" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                Learn More
              </Link>
            </div>

            {/* Nova Wallet Card */}
            <div className="feature-card portfolio-card">
              <img
                src="assets/logos/nova.png"
                alt="Nova Wallet logo"
                className="portfolio-logo"
              />
              <h4>Nova Wallet</h4>
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
              <Link to="/nova-wallet" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                Learn More
              </Link>
            </div>

            {/* Nova Desk Card */}
            <div className="feature-card portfolio-card">
              <img
                src="assets/logos/nova.png"
                alt="Nova Desk logo"
                className="portfolio-logo"
              />
              <h4>Nova Desk</h4>
              <p>
                Desktop application for blockchain interactions and workflow management.
                Cross-platform, secure, and built for professional users and enterprises.
              </p>
              <div className="portfolio-tags">
                <span className="tag">Desktop App</span>
                <span className="tag">Cross-Platform</span>
                <span className="tag">Enterprise</span>
              </div>
              <Link to="/nova-desk" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <h2 className="section-title">
            Our <span>Services</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive software development services tailored to your business needs
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <span className="emoji">💻</span>
              <h4>Custom Application Development</h4>
              <p>
                Bespoke software solutions designed and built to your exact specifications,
                ensuring perfect fit for your business processes.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🌐</span>
              <h4>Web Development & Design</h4>
              <p>
                Modern, responsive web applications with intuitive UX/UI design that engage
                users and drive conversions.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">📱</span>
              <h4>Mobile App Development</h4>
              <p>
                Native and cross-platform mobile applications for iOS and Android that
                deliver seamless experiences.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">⛓️</span>
              <h4>Blockchain & Web3 Development</h4>
              <p>
                Smart contract development, decentralized applications, and Web3 integrations
                that leverage the power of blockchain technology.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🤖</span>
              <h4>AI & Machine Learning Solutions</h4>
              <p>
                Intelligent systems that automate processes, provide insights, and create
                competitive advantages through artificial intelligence.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">☁️</span>
              <h4>Cloud & DevOps Solutions</h4>
              <p>
                Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices that
                ensure reliability and performance.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🎯</span>
              <h4>IT Consulting & Strategy</h4>
              <p>
                Expert guidance on technology selection, architecture design, and digital
                transformation strategies.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🔧</span>
              <h4>Legacy System Modernization</h4>
              <p>
                Upgrade and modernize outdated systems to improve performance, security,
                and maintainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="section">
        <div className="container">
          <h2 className="section-title">
            Our <span>Approach</span> &ndash; Building What Businesses Need
          </h2>
          <p>
            We believe software development should be <strong>transparent</strong>,
            <strong> collaborative</strong>, and <strong>results-driven</strong>.
            Our approach focuses on:
          </p>
          <ul className="values-list">
            <li>
              <i className="fas fa-users"></i>Client-centered development with
              continuous communication
            </li>
            <li>
              <i className="fas fa-eye"></i>Transparent processes and honest
              pricing
            </li>
            <li>
              <i className="fas fa-check-circle"></i>Quality and reliability in
              every line of code
            </li>
            <li>
              <i className="fas fa-lightbulb"></i>Innovation combined with
              practical, business-focused solutions
            </li>
            <li>
              <i className="fas fa-clock"></i>Timely delivery without
              compromising on quality
            </li>
            <li>
              <i className="fas fa-cogs"></i>Scalable architectures that
              grow with your business
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Partner With Us For Your Next Software Project</h2>
          <p>
            From concept to deployment, we build software that drives your business
            forward. Let's discuss how we can help you achieve your technology goals.
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
              Get in touch with us to discuss your software development needs.
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
