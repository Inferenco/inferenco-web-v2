import LightboxGallery from "../components/LightboxGallery";

export default function NovaWallet() {
  const walletImages = [
    { id: '1', src: '/img/nova-ecosystem/nova-wallet/dashboard.png', alt: 'Main Dashboard' },
    { id: '2', src: '/img/nova-ecosystem/nova-wallet/light.png', alt: 'Light Theme Dashboard' },
    { id: '3', src: '/img/nova-ecosystem/nova-wallet/dark.png', alt: 'Dark Theme Dashboard' },
    { id: '4', src: '/img/nova-ecosystem/nova-wallet/browser.png', alt: 'DApp Browser' },
    { id: '5', src: '/img/nova-ecosystem/nova-wallet/activity.png', alt: 'Activity History' },
    { id: '6', src: '/img/nova-ecosystem/nova-wallet/nft-collection.png', alt: 'NFT Collection' },
    { id: '7', src: '/img/nova-ecosystem/nova-wallet/swap.png', alt: 'Swap via Avera DEX' },
    { id: '8', src: '/img/nova-ecosystem/nova-wallet/settings.png', alt: 'Settings' },
    { id: '9', src: '/img/nova-ecosystem/nova-wallet/nft-detail.png', alt: 'NFT Detail View' },
  ];

  return (
    <div id="nova-wallet-page" className="page-section">
      <section className="hero nova-hero" role="banner">
        <div className="hero-content">
          <div className="nova-logo-container" style={{ marginBottom: "2rem" }}>
            <img
              src="assets/images/nova-wallet.png"
              alt="Nova Wallet logo"
              style={{
                width: "140px",
                maxWidth: "100%",
                borderRadius: "40px",
                boxShadow: "0 8px 24px rgba(0, 178, 255, 0.35)",
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
          <p style={{ marginBottom: '1.5rem' }}>
            <a
              href="https://www.youtube.com/shorts/BNZETysCRmk"
              className="demo-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              🎥 Watch Demo Video
            </a>
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

      <section id="nova-wallet-gallery" className="section">
        <div className="container">
          <LightboxGallery images={walletImages} thumbnailWidth="280px" />
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
                No data collection — your privacy is guaranteed.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">💰</span>
              <h4>Asset Management</h4>
              <p>
                Send and receive assets with QR code support. Manage CEDRA coins
                and custom tokens with real-time balance updates.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">💱</span>
              <h4>Avera Swap Integration</h4>
              <p>
                Swap tokens directly within Nova Wallet using Avera DEX.
                Get competitive rates across multiple liquidity pools.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">📊</span>
              <h4>Activity History</h4>
              <p>
                View all your transactions and wallet events in one place.
                Complete history of your on-chain activity.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🌐</span>
              <h4>dApp Browser with Nova Connect</h4>
              <p>
                Integrated browser to connect to the decentralized web. Use Nova Connect
                for seamless interaction with external dApps.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🖼️</span>
              <h4>NFT Gallery</h4>
              <p>
                View and manage your digital collectibles in a dedicated gallery.
              </p>
            </div>
            <div className="feature-card">
              <span className="emoji">🎮</span>
              <h4>Gaming Support</h4>
              <p>
                Native support for Cedra-based games like decentralized Poker.
                Manage in-game assets and participate in blockchain gaming.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
