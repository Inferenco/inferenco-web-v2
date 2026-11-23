import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("home");
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

  const tags = (key: string): string[] => t(key, { returnObjects: true }) as string[];

  return (
    <div id="home-page" className="page-section active">
      {/* Floating Side Navigation */}
      <nav className={`side-nav ${showSideNav ? "visible" : ""}`} aria-label={t("sideNav.quickNav")}>
        <div className="side-nav-items">
          <button
            onClick={() => scrollToSection("portfolio")}
            className="side-nav-item"
            aria-label={t("sideNav.aria", { section: t("sideNav.sections.products") })}
            title={t("sideNav.sections.products")}
          >
            <i className="fas fa-box-open"></i>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="side-nav-item"
            aria-label={t("sideNav.aria", { section: t("sideNav.sections.about") })}
            title={t("sideNav.sections.about")}
          >
            <i className="fas fa-info-circle"></i>
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="side-nav-item"
            aria-label={t("sideNav.aria", { section: t("sideNav.sections.capabilities") })}
            title={t("sideNav.sections.capabilities")}
          >
            <i className="fas fa-cogs"></i>
          </button>
          <button
            onClick={() => scrollToSection("methodology")}
            className="side-nav-item"
            aria-label={t("sideNav.aria", { section: t("sideNav.sections.howWeBuild") })}
            title={t("sideNav.sections.howWeBuild")}
          >
            <i className="fas fa-project-diagram"></i>
          </button>
          <button
            onClick={() => scrollToSection("approach")}
            className="side-nav-item"
            aria-label={t("sideNav.aria", { section: t("sideNav.sections.approach") })}
            title={t("sideNav.sections.approach")}
          >
            <i className="fas fa-lightbulb"></i>
          </button>
          <button
            onClick={() => setShowContactModal(true)}
            className="side-nav-item contact-item"
            aria-label={t("sideNav.contactAria")}
            title={t("sideNav.sections.contact")}
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
              alt={t("hero.logoAlt")}
              className="main-logo-animated"
            />
          </div>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.tagline")}</p>
          <div className="hero-navigation">
            <nav className="hero-nav-index" aria-label={t("hero.pillsAria")}>
              <Link
                to="/utility-apps"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-toolbox"></i>
                <span>{t("hero.pillMedia")}</span>
              </Link>
              <Link
                to="/infer-desk"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-desktop"></i>
                <span>{t("hero.pillDesk")}</span>
              </Link>
              <Link
                to="/infer-wallet"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-wallet"></i>
                <span>{t("hero.pillWallet")}</span>
              </Link>
              <Link
                to="/infer-mcp"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-terminal"></i>
                <span>{t("hero.pillMcp")}</span>
              </Link>
              <Link
                to="/docs#infer-connect-introduction"
                className="nav-pill"
                onClick={() => window.scrollTo(0, 0)}
              >
                <i className="fas fa-plug"></i>
                <span>{t("hero.pillConnect")}</span>
              </Link>
              <button
                onClick={() => setShowContactModal(true)}
                className="nav-pill contact-pill"
                aria-label={t("hero.pillContact")}
              >
                <i className="fas fa-envelope"></i>
                <span>{t("hero.pillContact")}</span>
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="portfolio" className="section">
        <div className="container">
          <h2 className="section-title">
            <Trans i18nKey="portfolio.title" ns="home" components={{ span: <span /> }} />
          </h2>
          <p className="section-subtitle">{t("portfolio.subtitle")}</p>
          <div className="features-grid">
            {/* Nemesis Go Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/img/infer-ecosystem/utility-apps/nemesis-go-icon.webp"
                alt={t("portfolio.cards.nemesis.alt")}
                className="portfolio-logo"
                loading="lazy"
                decoding="async"
                width="256"
                height="256"
              />
              <h4>{t("portfolio.cards.nemesis.name")}</h4>
              <p>{t("portfolio.cards.nemesis.blurb")}</p>
              <div className="portfolio-tags">
                {tags("portfolio.cards.nemesis.tags").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link to="/utility-apps#nemesis-go" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                {t("portfolio.learnMore")}
              </Link>
            </div>

            {/* Sound Flipper Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/img/infer-ecosystem/utility-apps/sound-flipper.png"
                alt={t("portfolio.cards.sound.alt")}
                className="media-app-icon"
                loading="lazy"
                decoding="async"
                width="1200"
                height="630"
              />
              <h4>{t("portfolio.cards.sound.name")}</h4>
              <p>{t("portfolio.cards.sound.blurb")}</p>
              <div className="portfolio-tags">
                {tags("portfolio.cards.sound.tags").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link to="/utility-apps#sound-flipper" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                {t("portfolio.learnMore")}
              </Link>
            </div>

            {/* Make My Image Fit Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/img/infer-ecosystem/utility-apps/resize-and-compress-image.png"
                alt={t("portfolio.cards.image.alt")}
                className="media-app-icon"
                loading="lazy"
                decoding="async"
                width="1200"
                height="630"
              />
              <h4>{t("portfolio.cards.image.name")}</h4>
              <p>{t("portfolio.cards.image.blurb")}</p>
              <div className="portfolio-tags">
                {tags("portfolio.cards.image.tags").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link to="/utility-apps#image-fit" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                {t("portfolio.learnMore")}
              </Link>
            </div>

            <div className="portfolio-divider">{t("portfolio.divider")}</div>

            {/* Infer Desk Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt={t("portfolio.cards.desk.alt")}
                className="portfolio-logo"
              />
              <h4>{t("portfolio.cards.desk.name")}</h4>
              <p>{t("portfolio.cards.desk.blurb")}</p>
              <div className="portfolio-tags">
                {tags("portfolio.cards.desk.tags").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link to="/infer-desk" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                {t("portfolio.learnMore")}
              </Link>
            </div>

            {/* Infer Wallet Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt={t("portfolio.cards.wallet.alt")}
                className="portfolio-logo"
              />
              <h4>{t("portfolio.cards.wallet.name")}</h4>
              <p>{t("portfolio.cards.wallet.blurb")}</p>
              <div className="portfolio-tags">
                {tags("portfolio.cards.wallet.tags").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link to="/infer-wallet" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                {t("portfolio.learnMore")}
              </Link>
            </div>

            {/* Infer MCP Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt={t("portfolio.cards.mcp.alt")}
                className="portfolio-logo"
              />
              <h4>{t("portfolio.cards.mcp.name")}</h4>
              <p>{t("portfolio.cards.mcp.blurb")}</p>
              <div className="portfolio-tags">
                {tags("portfolio.cards.mcp.tags").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link to="/infer-mcp" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                {t("portfolio.learnMore")}
              </Link>
            </div>

            {/* Infer Connect Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt={t("portfolio.cards.connect.alt")}
                className="portfolio-logo"
              />
              <h4>{t("portfolio.cards.connect.name")}</h4>
              <p>{t("portfolio.cards.connect.blurb")}</p>
              <div className="portfolio-tags">
                {tags("portfolio.cards.connect.tags").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link to="/docs#infer-connect-introduction" className="cta-button" style={{ marginTop: "1rem" }} onClick={() => window.scrollTo(0, 0)}>
                {t("portfolio.readDocs")}
              </Link>
            </div>

            {/* Infer Ecosystem Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/assets/logos/flame.png"
                alt={t("portfolio.cards.ecosystem.alt")}
                className="portfolio-logo"
              />
              <h4>{t("portfolio.cards.ecosystem.name")}</h4>
              <p>{t("portfolio.cards.ecosystem.blurb")}</p>
              <div className="portfolio-tags">
                {tags("portfolio.cards.ecosystem.tags").map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <a
                href="https://app.inferenco.com"
                className="cta-button"
                style={{ marginTop: "1rem" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("portfolio.visitDapp")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">
            <Trans i18nKey="about.title" ns="home" components={{ span: <span /> }} />
          </h2>
          <div className="two-col">
            <div className="text-col" style={{ maxWidth: "100%" }}>
              <p>
                <Trans i18nKey="about.p1" ns="home" components={{ strong: <strong /> }} />
              </p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
              <div className="services-list">
                <h4>{t("about.buildHeading")}</h4>
                <ul className="values-list">
                  <li>
                    <i className="fas fa-gamepad"></i>{t("about.build.gamesMedia")}
                  </li>
                  <li>
                    <i className="fas fa-globe"></i>{t("about.build.browserUtilities")}
                  </li>
                  <li>
                    <i className="fas fa-code"></i>{t("about.build.wallets")}
                  </li>
                  <li>
                    <i className="fas fa-link"></i>{t("about.build.onchainCedra")}
                  </li>
                  <li>
                    <i className="fas fa-terminal"></i>{t("about.build.devTooling")}
                  </li>
                  <li>
                    <i className="fas fa-brain"></i>{t("about.build.ai")}
                  </li>
                  <li>
                    <i className="fas fa-shield-alt"></i>{t("about.build.security")}
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
            <Trans i18nKey="services.title" ns="home" components={{ span: <span /> }} />
          </h2>
          <p className="section-subtitle">{t("services.subtitle")}</p>
          <div className="features-grid">
            <div className="feature-card">
              <span className="emoji">🤖</span>
              <h4>{t("services.agents.title")}</h4>
              <p>{t("services.agents.text")}</p>
            </div>
            <div className="feature-card">
              <span className="emoji">🔐</span>
              <h4>{t("services.security.title")}</h4>
              <p>{t("services.security.text")}</p>
            </div>
            <div className="feature-card">
              <span className="emoji">🧩</span>
              <h4>{t("services.standards.title")}</h4>
              <p>{t("services.standards.text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="section">
        <div className="container">
          <h2 className="section-title">
            <Trans i18nKey="methodology.title" ns="home" components={{ span: <span /> }} />
          </h2>
          <p className="section-subtitle">{t("methodology.subtitle")}</p>
          <div className="methodology-steps">
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">01</span>
                <i className="fas fa-lightbulb"></i>
              </div>
              <div className="step-content">
                <h4>{t("methodology.steps.scope.title")}</h4>
                <p>{t("methodology.steps.scope.text")}</p>
              </div>
            </div>
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">02</span>
                <i className="fas fa-code"></i>
              </div>
              <div className="step-content">
                <h4>{t("methodology.steps.build.title")}</h4>
                <p>{t("methodology.steps.build.text")}</p>
              </div>
            </div>
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">03</span>
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="step-content">
                <h4>{t("methodology.steps.review.title")}</h4>
                <p>{t("methodology.steps.review.text")}</p>
              </div>
            </div>
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">04</span>
                <i className="fas fa-file-signature"></i>
              </div>
              <div className="step-content">
                <h4>{t("methodology.steps.sign.title")}</h4>
                <p>{t("methodology.steps.sign.text")}</p>
              </div>
            </div>
            <div className="methodology-step">
              <div className="step-icon">
                <span className="step-number">05</span>
                <i className="fas fa-headset"></i>
              </div>
              <div className="step-content">
                <h4>{t("methodology.steps.support.title")}</h4>
                <p>{t("methodology.steps.support.text")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="section">
        <div className="container">
          <h2 className="section-title">
            <Trans i18nKey="approach.title" ns="home" components={{ span: <span /> }} />
          </h2>
          <p>
            <Trans i18nKey="approach.intro" ns="home" components={{ strong: <strong /> }} />
          </p>
          <ul className="values-list">
            <li>
              <i className="fas fa-file-signature"></i>{t("approach.values.verifiable")}
            </li>
            <li>
              <i className="fas fa-lock"></i>{t("approach.values.privacy")}
            </li>
            <li>
              <i className="fas fa-check-circle"></i>{t("approach.values.quality")}
            </li>
            <li>
              <i className="fas fa-lightbulb"></i>{t("approach.values.innovation")}
            </li>
            <li>
              <i className="fas fa-clock"></i>{t("approach.values.timely")}
            </li>
            <li>
              <i className="fas fa-cubes"></i>{t("approach.values.interoperable")}
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>{t("cta.title")}</h2>
          <p>{t("cta.text")}</p>
          <button
            onClick={() => setShowContactModal(true)}
            className="cta-button secondary"
            aria-label={t("cta.button")}
          >
            {t("cta.button")}
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
            <h2>{t("modal.title")}</h2>
            <p>{t("modal.text")}</p>
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
            <p className="modal-note">{t("modal.note")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
