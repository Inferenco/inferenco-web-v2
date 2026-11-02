import { useState } from "react";

type ActiveApp = "resize" | "sound" | null;

const apps = {
  resize: {
    name: "Make My Image Fit",
    url: "https://www.resizeandcompress.app",
    long: "Make My Image Fit (resizeandcompress.app) is a free online image utility that compresses, resizes, and converts images without ever uploading them — all processing happens on your device in the browser. You can process up to 10 images at once (JPG, PNG, WebP, GIF, BMP, TIFF, AVIF, HEIC, or DNG), set a maximum file size in KB/MB and/or exact pixel dimensions, and choose the output format. Before you download, the tool checks each result against your requirements, and you can rotate, set backgrounds, or convert HEIC phone photos and DNG RAW files on-device. Results download individually or as a ZIP. It's completely free with no sign-up, and no analytics or ads load without consent.",
    features: [
      "100% on-device",
      "Batch up to 10 images",
      "JPG/PNG/WebP/GIF/BMP/TIFF/AVIF/HEIC/DNG",
      "Max file-size limit",
      "Resize by pixels",
      "Rotation & backgrounds",
      "ZIP download",
      "No analytics without consent",
    ],
    note: "Completely free with no sign-up.",
  },
  sound: {
    name: "Sound Flipper",
    url: "https://www.soundflipper.com",
    long: "Sound Flipper (soundflipper.com) is a free online audio converter for recordings, songs, and other sound files already saved on your device — everything is processed locally in your browser, so your audio stays private. Its inspector reads the actual audio inside and tells you exactly what it detects, refusing unsupported files with a clear explanation. You can convert up to ten files at once between MP3, WAV, M4A/AAC, FLAC, ALAC, AIFF, Ogg Vorbis, and Opus, with sensible quality settings resolved automatically. It's ideal for fixing rejected uploads — e.g. turning a voice memo into MP3 — and comes with step-by-step conversion guides. Currently offered as a testable preview, free with no sign-up.",
    features: [
      "100% on-device",
      "Batch up to 10 files",
      "MP3/WAV/M4A/FLAC/ALAC/AIFF/Ogg/Opus",
      "Content inspector",
      "Automatic quality settings",
      "Conversion guides",
      "Preview status",
    ],
    note: "Free preview — no sign-up required.",
  },
};

export default function UtilityApps() {
  const [activeApp, setActiveApp] = useState<ActiveApp>(null);

  const close = () => setActiveApp(null);
  const app = activeApp ? apps[activeApp] : null;

  return (
    <div id="utility-apps-page" className="page-section">
      <section className="hero infer-hero" role="banner">
        <div className="hero-content">
          <h1>Utility Apps</h1>
          <p>Free, privacy-first tools that run entirely in your browser.</p>
          <div className="download-buttons">
            <a
              href="https://www.resizeandcompress.app"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              Make My Image Fit
            </a>
            <a
              href="https://www.soundflipper.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              Sound Flipper
            </a>
          </div>
        </div>
      </section>

      <section id="utility-apps-gallery" className="section">
        <div className="container">
          <h2 className="section-title">Our Utility Apps</h2>
          <p className="section-subtitle">
            Two free, privacy-first services — no uploads, no accounts, no installs.
          </p>
          <div className="features-grid">
            {/* Make My Image Fit Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/img/infer-ecosystem/utility-apps/resize-and-compress-image.png"
                alt="Make My Image Fit screenshot"
                className="utility-app-screenshot"
                loading="lazy"
                decoding="async"
                width="1200"
                height="630"
              />
              <h4>Make My Image Fit</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: "-0.5rem 0 0.75rem" }}>
                by Singularity Shift Ltd
              </p>
              <p>
                A free, privacy-first image resizer and compressor that runs entirely in your
                browser — no uploads, no account. Set a maximum file size or exact pixel
                dimensions and it prepares up to 10 images to pass any upload form's
                requirements.
              </p>
              <div className="portfolio-tags">
                <span className="tag">Image Utility</span>
                <span className="tag">Privacy-First</span>
                <span className="tag">Browser-Based</span>
              </div>
              <a
                href="https://www.resizeandcompress.app"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{ marginTop: "1rem" }}
              >
                Visit Website
              </a>
              <button
                onClick={() => setActiveApp("resize")}
                className="cta-button secondary"
                style={{ marginTop: "0.75rem" }}
              >
                Learn More
              </button>
            </div>

            {/* Sound Flipper Card */}
            <div className="feature-card portfolio-card">
              <img
                src="/img/infer-ecosystem/utility-apps/sound-flipper.png"
                alt="Sound Flipper screenshot"
                className="utility-app-screenshot"
                loading="lazy"
                decoding="async"
                width="1200"
                height="630"
              />
              <h4>Sound Flipper</h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: "-0.5rem 0 0.75rem" }}>
                by Singularity Shift Ltd
              </p>
              <p>
                A free audio converter that works entirely in your browser — your recordings
                and songs never get uploaded. Convert between MP3, WAV, M4A, FLAC, Ogg, Opus
                and more, with no account or software installation required.
              </p>
              <div className="portfolio-tags">
                <span className="tag">Audio Converter</span>
                <span className="tag">Privacy-First</span>
                <span className="tag">Browser-Based</span>
              </div>
              <a
                href="https://www.soundflipper.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{ marginTop: "1rem" }}
              >
                Visit Website
              </a>
              <button
                onClick={() => setActiveApp("sound")}
                className="cta-button secondary"
                style={{ marginTop: "0.75rem" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* App Details Modal */}
      {app && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={close} aria-label="Close">
              <i className="fas fa-times"></i>
            </button>
            <h2>{app.name}</h2>
            <p>{app.long}</p>
            <div className="portfolio-tags">
              {app.features.map((feature) => (
                <span key={feature} className="tag">
                  {feature}
                </span>
              ))}
            </div>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              Visit Website
            </a>
            <p className="modal-note">{app.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
