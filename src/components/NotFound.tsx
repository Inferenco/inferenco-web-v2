import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page not found</h2>
        <p className="not-found-text">
          The page you&apos;re looking for doesn&apos;t exist. It may have moved during the
          Nova-to-Infer rebrand, or the link may be stale.
        </p>
        <div className="not-found-links">
          <Link to="/" className="cta-button">
            Go home
          </Link>
          <Link to="/docs" className="cta-button secondary">
            Browse docs
          </Link>
        </div>
      </div>
    </div>
  );
}
