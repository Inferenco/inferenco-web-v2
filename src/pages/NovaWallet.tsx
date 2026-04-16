export default function NovaWallet() {
  return (
    <div id="nova-wallet-page" className="page-section">
      <section className="hero nova-hero" role="banner">
        <div className="hero-content">
          <div className="nova-logo-container" style={{ marginBottom: "2rem" }}>
            <img
              src="assets/images/nova-wallet.png"
              alt="Nova Wallet logo"
              style={{
                width: "200px",
                maxWidth: "100%",
                borderRadius: "30px",
                boxShadow: "0 4px 12px rgba(0, 178, 255, 0.3)",
              }}
            />
          </div>
          <h1>
            Nova Wallet — Secure Next-Gen Mobile Cryptocurrency Wallet
          </h1>
          <p>
            A non-custodial mobile wallet for the Cedra Network. Manage assets,
            connect to dApps, and securely store your crypto.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.inferenco.novawallet"
            className="cta-button"
            aria-label="Get Nova Wallet on Google Play"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Nova Wallet
          </a>
        </div>
      </section>

      <section id="nova-wallet-features" className="section">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="emoji">🔐</span>
              <h4>Security First</h4>
              <p>
                Non-Custodial wallet where you own your keys. Secure access with
                Biometric Authentication (Face ID / Touch ID) and zero tracking.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">💰</span>
              <h4>Asset Management</h4>
              <p>
                Send and receive assets across the network. Manage CEDRA coins
                and custom tokens with real-time balances.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🌐</span>
              <h4>dApp Browser</h4>
              <p>
                Connect to the decentralized web directly from the wallet and
                explore Web3 applications.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🎮</span>
              <h4>Gaming &amp; NFTs</h4>
              <p>
                View and manage your digital collectibles, with native support
                for Cedra-based games like decentralized Poker.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
