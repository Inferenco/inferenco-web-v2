import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigationType } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supportUrl } from "../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { canonicalPath, notFoundMetadata, siteMetadata } from "../site/metadata";
import "./chrome.css";

const onchainLinks = [
  { label: "inferDesk", path: "/infer-desk/" },
  { label: "inferWallet", path: "/infer-wallet/" },
  { label: "inferMcp", path: "/infer-mcp/" },
  { label: "inferConnect", path: "/docs/#infer-connect-introduction" },
  { label: "inferEcosystem", path: "https://app.inferenco.com", external: true },
  { label: "inferBot", path: "/infer/" },
  { label: "docs", path: "/docs/" },
];

const socialLinks = [
  { label: "telegram", href: "https://t.me/inferenco" },
  { label: "bluesky", href: "https://bsky.app/profile/inferenco.bsky.social" },
  { label: "fountain", href: "https://fountain.ink/u/inferenco" },
  { label: "farcaster", href: "https://farcaster.xyz/inferenco" },
  { label: "soclly", href: "https://app.soclly.com/u/inferenco" },
  { label: "lensforum", href: "https://www.lensforum.xyz/communities/0xF9Ae41ad49a5F240B8849Cd5f7c9BdeE6EB4b60a" },
];

const flame = "/img/redesign/inferenco-flame.webp";
const themePreference = "(prefers-color-scheme: light)";
type Theme = "light" | "dark";

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem("theme");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function BrandLink({ onFollow }: { onFollow?: () => void }) {
  return (
    <Link to="/" className="studio-brand" onClick={onFollow}>
      <img src={flame} width="42" height="42" alt="" />
      <bdi>Inferenco</bdi>
    </Link>
  );
}

function PrimaryNav({ onFollow }: { onFollow?: () => void }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const disclosure = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const onchainIsCurrent = onchainLinks.some(({ path, external }) =>
    !external && path.split("#")[0].replace(/\/$/, "") === pathname.replace(/\/$/, ""),
  );

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !disclosure.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  function follow() {
    setOpen(false);
    onFollow?.();
  }

  return (
    <nav className="studio-nav" aria-label={t("aria.primaryNavigation")}>
      <NavLink to="/games-and-apps/" onClick={follow}>{t("nav.media")}</NavLink>
      <Link to="/#about" onClick={follow}>{t("nav.story")}</Link>
      <NavLink to="/blogs/" onClick={follow}>{t("nav.blogs")}</NavLink>
      <div
        className="studio-onchain"
        ref={disclosure}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault();
            setOpen(false);
            trigger.current?.focus();
          }
        }}
      >
        <button
          type="button"
          ref={trigger}
          className={onchainIsCurrent ? "studio-onchain-trigger is-current" : "studio-onchain-trigger"}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          {t("nav.onchain")}<i className="fas fa-chevron-down" aria-hidden="true" />
        </button>
        <ul id={panelId} className="studio-onchain-panel" hidden={!open}>
          {onchainLinks.map(({ label, path, external }) => (
            <li key={label}>
              {external ? (
                <a href={path} target="_blank" rel="noopener noreferrer" onClick={follow}>
                  <bdi>{t(`products.${label}`)}</bdi>
                </a>
              ) : (
                <Link to={path} onClick={follow}><bdi>{t(`products.${label}`)}</bdi></Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <a href={supportUrl()} onClick={follow}>{t("footer.support")}</a>
    </nav>
  );
}

function StudioFooter() {
  const { t } = useTranslation();

  return (
    <footer className="studio-footer">
      <div className="studio-footer-inner">
        <div className="studio-footer-identity">
          <BrandLink />
          <p>{t("footer.tagline")}</p>
        </div>
        <div className="studio-footer-links">
          <h2>{t("footer.mediaColumn")}</h2>
          <Link to="/games-and-apps/">{t("footer.allApps")}</Link>
          <Link to="/games-and-apps/nemesis-go/"><bdi>{t("footer.nemesisGo")}</bdi></Link>
          <Link to="/games-and-apps/sound-flipper/"><bdi>{t("footer.soundFlipper")}</bdi></Link>
          <Link to="/games-and-apps/resize-and-compress/"><bdi>{t("footer.imageFit")}</bdi></Link>
        </div>
        <div className="studio-footer-links">
          <h2>{t("footer.onchainColumn")}</h2>
          {onchainLinks.map(({ label, path, external }) =>
            external ? (
              <a key={label} href={path} target="_blank" rel="noopener noreferrer">
                <bdi>{t(`footer.${label}`)}</bdi>
              </a>
            ) : (
              <Link key={label} to={path}><bdi>{t(`footer.${label}`)}</bdi></Link>
            ),
          )}
        </div>
        <div className="studio-footer-links">
          <h2>{t("footer.resourcesColumn")}</h2>
          <Link to="/blogs/">{t("footer.blog")}</Link>
          <a href={supportUrl()}>{t("footer.support")}</a>
          <a href="/privacy/" hrefLang="en">{t("footer.websitePrivacy")}</a>
          <a href="/terms/" hrefLang="en">{t("footer.websiteTerms")}</a>
        </div>
        <div className="studio-footer-links">
          <h2>{t("footer.contactColumn")}</h2>
          <a href="mailto:spielcrypto@inferenco.com"><bdi>spielcrypto@inferenco.com</bdi></a>
          <a href="mailto:singularityshift@inferenco.com"><bdi>singularityshift@inferenco.com</bdi></a>
          <a href="https://spielcrypto.com/" target="_blank" rel="noopener noreferrer"><bdi>{t("footer.spielcrypto")}</bdi></a>
          <a href="https://sshift.xyz/" target="_blank" rel="noopener noreferrer"><bdi>{t("footer.singularityShift")}</bdi></a>
        </div>
      </div>
      <div className="studio-footer-base">
        <p>{t("footer.copyright")}</p>
        <ul>
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <bdi>{t(`social.${label}`)}</bdi>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function useRouteScroll(main: RefObject<HTMLElement | null>) {
  const { pathname, key, hash } = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef(new Map<string, number>());
  const previousPath = useRef<string | null>(null);

  useLayoutEffect(() => {
    const originalRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => { window.history.scrollRestoration = originalRestoration; };
  }, []);

  useLayoutEffect(() => {
    const restoredPosition = navigationType === "POP" ? scrollPositions.current.get(key) : undefined;
    if (restoredPosition !== undefined) {
      window.scrollTo(0, restoredPosition);
    } else {
      const target = hash && document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    }
    if (navigationType !== "POP" && previousPath.current !== pathname) {
      main.current?.focus({ preventScroll: true });
    }
    previousPath.current = pathname;

    function recordScroll() {
      scrollPositions.current.set(key, window.scrollY);
    }
    recordScroll();
    window.addEventListener("scroll", recordScroll, { passive: true });
    return () => window.removeEventListener("scroll", recordScroll);
  }, [hash, key, main, navigationType, pathname]);
}

export default function Layout() {
  const location = useLocation();
  const { t } = useTranslation();
  const drawer = useRef<HTMLDialogElement>(null);
  const closeMenu = useRef<HTMLButtonElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [choice, setChoice] = useState<Theme | null>(savedTheme);
  const [systemTheme, setSystemTheme] = useState<Theme>(() =>
    window.matchMedia(themePreference).matches ? "light" : "dark",
  );
  const theme = choice ?? systemTheme;

  useLayoutEffect(() => {
    if (drawer.current?.open) drawer.current.close();
  }, [location.key]);

  useRouteScroll(main);

  useLayoutEffect(() => {
    const pathname = canonicalPath(location.pathname);
    const entry = siteMetadata[pathname];
    if (entry) document.title = entry.title;
    else if (pathname.startsWith("/blogs/")) {
      const builtArticleTitle = document.querySelector<HTMLMetaElement>('meta[property="og:type"]')?.content === "article";
      if (location.key !== "default" || !builtArticleTitle) document.title = siteMetadata["/blogs/"].title;
    } else if (pathname.startsWith("/docs/")) {
      document.title = siteMetadata["/docs/"].title;
    } else document.title = notFoundMetadata.title;
  }, [location.pathname, location.key]);

  useEffect(() => {
    const preference = window.matchMedia(themePreference);
    const updateSystemTheme = () => setSystemTheme(preference.matches ? "light" : "dark");
    preference.addEventListener("change", updateSystemTheme);
    return () => {
      preference.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  useLayoutEffect(() => {
    const headerElement = header.current;
    const triggerElement = menuTrigger.current;
    const shellElement = shell.current;
    if (!headerElement || !triggerElement || !shellElement) return;
    function syncHeader() {
      if (!headerElement || !triggerElement || !shellElement) return;
      shellElement.style.setProperty("--studio-chrome-measured-height", headerElement.offsetHeight + "px");
      if (!triggerElement.offsetWidth && drawer.current?.open) drawer.current.close();
    }
    syncHeader();
    const observer = new ResizeObserver(syncHeader);
    observer.observe(headerElement);
    observer.observe(triggerElement);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setChoice(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // The in-memory choice still works when storage is unavailable.
    }
  }

  const themeAction = t(theme === "dark" ? "theme.toLight" : "theme.toDark");

  return (
    <div className="app studio-shell" ref={shell}>
      <a
        className="studio-skip"
        href="#studio-main"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus({ preventScroll: true });
          window.scrollTo(0, 0);
        }}
      >{t("aria.skipToContent")}</a>
      <header className="studio-header" ref={header}>
        <div className="studio-header-inner">
          <BrandLink />
          <div className="studio-nav-desktop">
            <PrimaryNav key={location.key} />
          </div>
          <div className="studio-header-tools">
            <LanguageSwitcher />
            <button type="button" className="studio-icon-button" onClick={toggleTheme} aria-label={themeAction} title={themeAction}>
              <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="studio-icon-button studio-menu-trigger"
              ref={menuTrigger}
              aria-label={t("aria.toggleMenu")}
              aria-haspopup="dialog"
              aria-expanded={drawerOpen}
              aria-controls="studio-menu"
              onClick={() => {
                drawer.current?.showModal();
                closeMenu.current?.focus();
                setDrawerOpen(true);
              }}
            >
              <i className="fas fa-bars" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <dialog
        id="studio-menu"
        className="studio-drawer"
        aria-label={t("aria.primaryNavigation")}
        ref={drawer}
        onClose={() => setDrawerOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="studio-drawer-panel">
          <div className="studio-drawer-top">
            <BrandLink onFollow={() => drawer.current?.close()} />
            <button
              type="button"
              className="studio-icon-button"
              aria-label={t("aria.closeMenu")}
              onClick={() => drawer.current?.close()}
              ref={closeMenu}
            ><i className="fas fa-times" aria-hidden="true" /></button>
          </div>
          <PrimaryNav key={location.key} onFollow={() => drawer.current?.close()} />
        </div>
      </dialog>

      <main id="studio-main" className="main-content studio-main" tabIndex={-1} ref={main}>
        <Outlet />
      </main>
      <StudioFooter />
    </div>
  );
}
