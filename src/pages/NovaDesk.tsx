type OS = "windows" | "mac" | "linux" | "linux-arm64" | "unknown";

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

const getDownloadUrl = (os: OS): string => {
  const base = "https://github.com/Inferenco/nova-desk-releases/releases/download/v0.1.1";
  switch (os) {
    case "windows":
      return `${base}/NovaDesk-Windows-x64.exe`;
    case "linux":
      return `${base}/NovaDesk-x86_64.AppImage`;
    case "linux-arm64":
      return `${base}/NovaDesk-aarch64.AppImage`;
    case "mac":
    case "unknown":
    default:
      return "https://github.com/Inferenco/nova-desk-releases/releases/latest";
  }
};

export default function NovaDesk() {
  const detectedOS = detectOS();
  const downloadUrl = getDownloadUrl(detectedOS);
  const isUnknownOS = detectedOS === "unknown";
  const isMacOS = detectedOS === "mac";
  const showAllButtons = isUnknownOS || isMacOS;
  
  const shouldShow = (os: OS): boolean => detectedOS === os || showAllButtons;

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
                href={downloadUrl}
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
                href={downloadUrl}
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
                href={downloadUrl}
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
              <span className="emoji">🌐</span>
              <h4>dApp Browser</h4>
              <p>
                Built-in DApp browser with WalletConnect support. Connect to the
                decentralized web directly from the desktop app.
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
    </div>
  );
}
