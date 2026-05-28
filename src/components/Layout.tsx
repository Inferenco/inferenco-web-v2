import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import type { PageType } from "../types";

const navLinks: { label: string; path: string; page: PageType }[] = [
  { label: "Home", path: "/", page: "home" },
  { label: "Nova", path: "/nova", page: "nova" },
  { label: "Nova Wallet", path: "/nova-wallet", page: "nova-wallet" },
  { label: "Nova Desk", path: "/nova-desk", page: "nova-desk" },
  { label: "Docs", path: "/docs", page: "docs" },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            {link.label}
          </Link>
        ))}
        <div className="social-links-mobile">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="social-link"
              aria-label={`Join Inferenco on ${link.label}`}
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
                {link.label}
              </Link>
            ))}
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

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"} />
          </button>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
              <p>Enterprise Software Development & IT Solutions</p>
            </div>
            <div className="footer-links">
              <h4>Products</h4>
              <Link to="/nova">Nova Bot</Link>
              <Link to="/nova-wallet">Nova Wallet</Link>
              <Link to="/nova-desk">Nova Desk</Link>
              <Link to="/docs">Documentation</Link>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <a href="https://t.me/inferenco" target="_blank" rel="noopener noreferrer">Telegram</a>
              <a href="https://mastodon.social/@inferenco" target="_blank" rel="noopener noreferrer">Mastodon</a>
              <a href="https://bsky.app/profile/inferenco.bsky.social" target="_blank" rel="noopener noreferrer">Bluesky</a>
            </div>
            <div className="footer-links">
              <h4>Contact</h4>
              <a href="mailto:spielcrypto@inferenco.com">spielcrypto@inferenco.com</a>
              <a href="mailto:singularityshift@inferenco.com">singularityshift@inferenco.com</a>
            </div>
            <div className="footer-links">
              <h4>Our Companies</h4>
              <a href="https://spielcrypto.com/" target="_blank" rel="noopener noreferrer">Spielcrypto Ltd</a>
              <a href="https://sshift.xyz/" target="_blank" rel="noopener noreferrer">Singularity Shift Ltd</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Inferenco. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
