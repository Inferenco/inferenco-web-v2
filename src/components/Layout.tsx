import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { PageType, ProductDropdownItem } from "../types";
import { nemesisLegalUrl } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks: { labelKey: string; path: string; page: PageType }[] = [
  { labelKey: "nav.home", path: "/", page: "home" },
  { labelKey: "nav.media", path: "/utility-apps", page: "utility-apps" },
  { labelKey: "nav.blogs", path: "/blogs", page: "blogs" },
];

const productsDropdown: ProductDropdownItem[] = [
  { labelKey: "products.inferBot", path: "/infer", page: "infer" },
  { labelKey: "products.inferWallet", path: "/infer-wallet", page: "infer-wallet" },
  { labelKey: "products.inferDesk", path: "/infer-desk", page: "infer-desk" },
  { labelKey: "products.inferMcp", path: "/infer-mcp", page: "infer-mcp" },
  { labelKey: "products.inferEcosystem", path: "https://app.inferenco.com", external: true },
  { labelKey: "products.docs", path: "/docs", page: "docs" },
];

// Provider names are brands: `label` stays verbatim and is interpolated into
// the localized `aria.joinOn` sentence rather than being translated itself.
const socialLinks = [
  { label: "Telegram", href: "https://t.me/inferenco", icon: "fab fa-telegram" },
  { label: "Mastodon", href: "https://mastodon.social/@inferenco", icon: "fab fa-mastodon" },
  { label: "Fountain", href: "https://fountain.ink/u/inferenco", logo: "fountain.svg" },
  { label: "Farcaster", href: "https://farcaster.xyz/inferenco", logo: "farcaster.svg" },
  { label: "Soclly", href: "https://app.soclly.com/u/inferenco", logo: "sLogo.svg" },
  { label: "Bluesky", href: "https://bsky.app/profile/inferenco.bsky.social", icon: "fab fa-bluesky" },
  { label: "Lensforum", href: "https://www.lensforum.xyz/communities/0xF9Ae41ad49a5F240B8849Cd5f7c9BdeE6EB4b60a", icon: "fas fa-share-nodes" },
];

export default function Layout() {
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  // Read theme synchronously on first render to prevent blink
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme) return savedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  });

  useEffect(() => {
    // Apply theme class to html element - toggle both classes
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <div className="app">
      <div
        className={`mobile-menu-overlay-global ${mobileMenuOpen ? "active" : ""}`}
        id="globalMenuOverlay"
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`} id="globalMobileMenu">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${isActive(link.path) ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t(link.labelKey)}
          </Link>
        ))}
        <div className="mobile-dropdown">
          <button
            className="mobile-dropdown-toggle"
            onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
            aria-expanded={productsDropdownOpen}
            aria-controls="mobile-products-dropdown"
          >
            {t("nav.onchain")} <i className="fas fa-chevron-down" />
          </button>
          {productsDropdownOpen && (
            <div className="mobile-dropdown-content" id="mobile-products-dropdown">
              {productsDropdown.map((product) => (
                product.external ? (
                  <a
                    key={product.path}
                    href={product.path}
                    className="nav-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProductsDropdownOpen(false);
                    }}
                  >
                    {t(product.labelKey)}
                  </a>
                ) : (
                  <Link
                    key={product.path}
                    to={product.path}
                    className={`nav-link ${isActive(product.path) ? "active" : ""}`}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setProductsDropdownOpen(false);
                    }}
                  >
                    {t(product.labelKey)}
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
        <LanguageSwitcher variant="mobile" />
        <div className="social-links-mobile">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="social-link"
              aria-label={t("aria.joinOn", { provider: link.label })}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon ? (
                <i className={link.icon} />
              ) : (
                <img
                  src={`assets/logos/${link.logo}`}
                  alt={link.label}
                  style={{ width: "1.5em", height: "1.5em", verticalAlign: "middle" }}
                />
              )}
            </a>
          ))}
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/">
              <img src="assets/logos/flame.png" alt="Inferenco" className="nav-logo" />
              <span className="nav-brand-text">Inferenco</span>
            </Link>
          </div>

          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <div className="dropdown">
              <button className="dropdown-toggle">
                {t("nav.onchain")} <i className="fas fa-chevron-down" />
              </button>
              <div className="dropdown-content">
                {productsDropdown.map((product) => (
                  product.external ? (
                    <a
                      key={product.path}
                      href={product.path}
                      className="nav-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t(product.labelKey)}
                    </a>
                  ) : (
                    <Link
                      key={product.path}
                      to={product.path}
                      className={`nav-link ${isActive(product.path) ? "active" : ""}`}
                    >
                      {t(product.labelKey)}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>

          <div className="nav-social">
            <a href="https://t.me/inferenco" className="social-link" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-telegram" />
            </a>
            <a href="https://mastodon.social/@inferenco" className="social-link" aria-label="Mastodon" target="_blank" rel="me noopener noreferrer">
              <i className="fab fa-mastodon" />
            </a>
            <a href="https://fountain.ink/u/inferenco" className="social-link" aria-label="Fountain" target="_blank" rel="noopener noreferrer">
              <img src="/assets/logos/fountain.svg" alt="Fountain" style={{ width: "1.2em", height: "1.2em" }} />
            </a>
            <a href="https://farcaster.xyz/inferenco" className="social-link" aria-label="Farcaster" target="_blank" rel="noopener noreferrer">
              <img src="/assets/logos/farcaster.svg" alt="Farcaster" style={{ width: "1.2em", height: "1.2em" }} />
            </a>
            <a href="https://app.soclly.com/u/inferenco" className="social-link" aria-label="Soclly" target="_blank" rel="noopener noreferrer">
              <img src="/assets/logos/sLogo.svg" alt="Soclly" style={{ width: "1.2em", height: "1.2em" }} />
            </a>
            <a href="https://bsky.app/profile/inferenco.bsky.social" className="social-link" aria-label="Bluesky" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-bluesky" />
            </a>
            <a href="https://www.lensforum.xyz/communities/0xF9Ae41ad49a5F240B8849Cd5f7c9BdeE6EB4b60a" className="social-link" aria-label="Lensforum" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-share-nodes" />
            </a>
          </div>

          <LanguageSwitcher variant="desktop" />

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={t("aria.toggleTheme")}
            title={theme === "light" ? t("theme.toDark") : t("theme.toLight")}
          >
            <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"} />
          </button>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("aria.toggleMenu")}
          >
            <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"} />
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-animation" aria-hidden="true">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
          <div className="orb orb-5"></div>
          <div className="orb orb-6"></div>
          <div className="orb orb-7"></div>
          <div className="orb orb-8"></div>
        </div>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="assets/logos/flame.png" alt="Inferenco" />
              <p>{t("footer.tagline")}</p>
            </div>
            <div className="footer-links">
              <h4>{t("footer.mediaColumn")}</h4>
              <Link to="/utility-apps">{t("footer.allApps")}</Link>
              <Link to="/utility-apps#nemesis-go">{t("footer.nemesisGo")}</Link>
              <Link to="/utility-apps#sound-flipper">{t("footer.soundFlipper")}</Link>
              <Link to="/utility-apps#image-fit">{t("footer.imageFit")}</Link>
            </div>
            <div className="footer-links">
              <h4>{t("footer.onchainColumn")}</h4>
              <Link to="/infer">{t("footer.inferBot")}</Link>
              <Link to="/infer-wallet">{t("footer.inferWallet")}</Link>
              <Link to="/infer-desk">{t("footer.inferDesk")}</Link>
              <Link to="/infer-mcp">{t("footer.inferMcp")}</Link>
              <a href="https://app.inferenco.com" target="_blank" rel="noopener noreferrer">{t("footer.inferEcosystem")}</a>
              <Link to="/docs">{t("footer.docs")}</Link>
            </div>
            <div className="footer-links">
              <h4>{t("footer.resourcesColumn")}</h4>
              <Link to="/docs">{t("footer.documentation")}</Link>
              <Link to="/blogs">{t("footer.blog")}</Link>
            </div>
            <div className="footer-links">
              <h4>{t("footer.companyColumn")}</h4>
              <a href="https://t.me/inferenco" target="_blank" rel="noopener noreferrer">{t("social.telegram")}</a>
              <a href="https://mastodon.social/@inferenco" target="_blank" rel="noopener noreferrer">{t("social.mastodon")}</a>
              <a href="https://bsky.app/profile/inferenco.bsky.social" target="_blank" rel="noopener noreferrer">{t("social.bluesky")}</a>
            </div>
            <div className="footer-links">
              <h4>{t("footer.contactColumn")}</h4>
              <a href="mailto:spielcrypto@inferenco.com">spielcrypto@inferenco.com</a>
              <a href="mailto:singularityshift@inferenco.com">singularityshift@inferenco.com</a>
            </div>
            <div className="footer-links">
              <h4>{t("footer.ourCompaniesColumn")}</h4>
              <a href="https://spielcrypto.com/" target="_blank" rel="noopener noreferrer">{t("footer.spielcrypto")}</a>
              <a href="https://sshift.xyz/" target="_blank" rel="noopener noreferrer">{t("footer.singularityShift")}</a>
            </div>
            <div className="footer-links">
              <h4>{t("footer.nemesisGoColumn")}</h4>
              <a href={nemesisLegalUrl("privacy")}>{t("footer.nemesisPrivacy")}</a>
              <a href={nemesisLegalUrl("terms")}>{t("footer.nemesisTerms")}</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
