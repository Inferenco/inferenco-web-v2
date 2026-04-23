import { useEffect, useState } from "react";
import { getDownloadUrl, getLatestReleaseVersion, type OS } from "../services/github";

const detectOS = (): OS => {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  if (ua.includes("win") || platform.includes("win")) return "windows";
  if (ua.includes("mac") || platform.includes("mac")) return "mac";
  if (ua.includes("linux")) {
    if (ua.includes("arm64") || ua.includes("aarch64") || platform.includes("arm64")) {
      return "linux-arm64";
    }
    return "linux";
  }
  return "unknown";
};

export default function NovaDesk() {
  const [version, setVersion] = useState<string>("v0.2.0");
  const detectedOS = detectOS();
  const isUnknownOS = detectedOS === "unknown";
  const isMacOS = detectedOS === "mac";
  const showAllButtons = isUnknownOS || isMacOS;

  useEffect(() => {
    getLatestReleaseVersion().then(setVersion);
  }, []);

  // On Linux, always show both x64 and ARM64 buttons since we can't reliably
  // detect architecture from browser (Raspberry Pi OS reports x86_64 in userAgent
  // even when running on ARM64 hardware)
  const shouldShow = (os: OS): boolean => {
    if (detectedOS === "linux" && (os === "linux" || os === "linux-arm64")) return true;
    return detectedOS === os || showAllButtons;
  };

  return (
    <div id="nova-desk-page" className="page-section">
      <section className="hero nova-hero" role="banner">
        <div className="hero-content">
          <div className="nova-logo-container" style={{ marginBottom: "2rem" }}>
            <img
              src="assets/logos/nova.png"
              alt="Nova Desk logo"
              style={{
                width: "180px",
                maxWidth: "100%",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 178, 255, 0.4)",
              }}
            />
          </div>
          <h1>Nova Desk — Secure Desktop Cryptocurrency Wallet</h1>
          <p>
            A production-ready desktop wallet for the Cedra Network. Manage assets,
            connect to dApps, and securely store your crypto with advanced security features.
          </p>
          <div className="download-buttons">
            {shouldShow("windows") && (
              <a
                href={getDownloadUrl("windows", version)}
                className="cta-button"
                aria-label="Download for Windows"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-windows"></i> Windows
              </a>
            )}
            {shouldShow("mac") && (
              <span
                className="cta-button disabled"
                aria-label="macOS coming soon"
                style={{ opacity: 0.6, cursor: "not-allowed" }}
              >
                <i className="fab fa-apple"></i> macOS (Coming Soon)
              </span>
            )}
            {shouldShow("linux") && (
              <a
                href={getDownloadUrl("linux", version)}
                className="cta-button"
                aria-label="Download for Linux x64"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linux"></i> Linux x64
              </a>
            )}
            {shouldShow("linux-arm64") && (
              <a
                href={getDownloadUrl("linux-arm64", version)}
                className="cta-button"
                aria-label="Download for Linux ARM64"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linux"></i> Linux ARM64
              </a>
            )}
          </div>
        </div>
      </section>

      <section id="nova-desk-features" className="section">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="emoji">🔐</span>
              <h4>Security First</h4>
              <p>
                Non-Custodial wallet with AES-GCM encryption, Argon2 key derivation,
                and brute-force protection. You own your keys.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">💰</span>
              <h4>Asset Management</h4>
              <p>
                Send and receive assets across the network. Manage CEDRA coins and
                custom tokens with real-time balances.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🔄</span>
              <h4>Auto Updates</h4>
              <p>
                Automatic update checks on startup. Download and install updates
                directly from GitHub releases.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🎮</span>
              <h4>Gaming &amp; NFTs</h4>
              <p>
                View and manage digital collectibles. Native support for Cedra-based
                games like decentralized Poker.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🛡️</span>
              <h4>Audit Logging</h4>
              <p>
                Comprehensive security logging for all operations. Track all wallet
                activity for security monitoring.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🔗</span>
              <h4>Nova Connect Integration</h4>
              <p>
                Use your favorite browser or the internal browser with Nova Connect.
                Seamlessly connect external browsers to Nova Desk for dApp access.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">💾</span>
              <h4>External Device Storage</h4>
              <p>
                Store encryption keys on external devices (hard disks, micro SD, USB)
                without requiring expensive hardware wallets.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🎨</span>
              <h4>Dark &amp; Light Themes</h4>
              <p>
                Choose between dark and light themes for comfortable usage
                in any lighting condition.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">📤</span>
              <h4>System Tray Integration</h4>
              <p>
                Access your wallet quickly from the system tray. Nova Desk
                stays available while you work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="nova-desk-security" className="section">
        <div className="container">
          <h2 className="section-title">Security Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="emoji">🔒</span>
              <h4>AES-GCM Encryption</h4>
              <p>
                Military-grade AES-256-GCM encryption for all sensitive data at rest.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">⚡</span>
              <h4>Argon2 Key Derivation</h4>
              <p>
                Memory-hard Argon2id algorithm for secure password-derived keys.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🚫</span>
              <h4>Brute Force Protection</h4>
              <p>
                Rate limiting and progressive delays after failed unlock attempts.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🔐</span>
              <h4>Storage Isolation</h4>
              <p>
                Separate encrypted storage per account for enhanced privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="nova-desk-developers" className="section">
        <div className="container">
          <h2 className="section-title">For Developers</h2>
          <div className="developer-content">
            <p>
              Want to integrate Nova Desk with your dApp? Check out our{" "}
              <a href="/docs#nova-connect-introduction">
                Nova Connect documentation
              </a>{" "}
              for browser integration and API details.
            </p>
            <a
              href="/docs#nova-connect-introduction"
              className="cta-button secondary"
            >
              View Documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
