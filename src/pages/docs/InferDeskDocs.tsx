import type { DocsProps } from "./types";

export default function InferDeskDocs({ hash }: DocsProps) {
  return (
    <>
      <div id="macos-installation" className={`docs-section ${hash === "macos-installation" ? "active" : ""}`}>
        <h1>Installing Infer Desk on macOS</h1>
        <p className="docs-lead">
          Infer Desk ships on macOS as a zip archive, not as a one-click installer. This page
          walks through picking the right build, unzipping it, moving it into your Applications
          folder, and approving the one security prompt macOS shows the first time you open any
          app that came from the internet. Allow a few minutes — there is nothing to type into a
          terminal.
        </p>

        <h2>Which download to pick</h2>
        <p>
          There are two macOS builds: one for Apple Silicon Macs and one for Intel Macs. Pick the
          one that matches your hardware, not the one that happens to be listed first.
        </p>
        <ul>
          <li>
            <strong>Apple Silicon (M1, M2, M3, and newer)</strong> — choose the{" "}
            <strong>macOS Apple Silicon</strong> button on the{" "}
            <a href="/infer-desk">Infer Desk page</a>.
          </li>
          <li>
            <strong>Intel</strong> — choose the <strong>macOS Intel</strong> button on the{" "}
            <a href="/infer-desk">Infer Desk page</a>.
          </li>
        </ul>
        <p>
          <strong>Not sure?</strong> Open the Apple menu → <strong>About This Mac</strong>. The
          window names the chip at the top: an Apple M-series chip means Apple Silicon, and
          &ldquo;Intel&rdquo; means Intel. Older Macs show Intel; most Macs bought in the last
          several years show an M-series chip.
        </p>

        <h2>Install step by step</h2>
        <ol>
          <li>
            <strong>Download the zip.</strong> Click the macOS button on the{" "}
            <a href="/infer-desk">Infer Desk page</a>. The download lands in your{" "}
            <code>Downloads</code> folder as a file named{" "}
            <code>InferDesk-macOS-x86_64.zip</code> or <code>InferDesk-macOS-aarch64.zip</code>.
          </li>
          <li>
            <strong>Unzip it.</strong> Double-click the zip in <code>Downloads</code>. macOS
            expands it into an <code>InferDesk.app</code> folder next to it — that is the app
            itself, and it is the only thing inside the archive.
          </li>
          <li>
            <strong>Move it to Applications.</strong> Drag <code>InferDesk.app</code> into the{" "}
            <code>Applications</code> folder in your sidebar.
          </li>
          <li>
            <strong>Open it from Applications.</strong> Launch <code>InferDesk.app</code> from
            Applications — not from the copy still sitting in <code>Downloads</code>. The first
            launch shows a macOS security dialog, because macOS asks you to confirm any app that
            was downloaded from the internet.{" "}
            <strong>This is expected, and it is not a warning about this build.</strong> Infer
            Desk is signed with an Apple Developer ID and notarized by Apple, so approving it is
            telling macOS that you trust a known developer.
            <div className="important-note">
              <strong>⚠ The first-launch prompt, and what to click.</strong> The path depends on
              your macOS version.
              <br />
              <strong>macOS 14 (Sonoma) and earlier:</strong> the dialog has an{" "}
              <strong>Open</strong> button — click it and the app starts.
              <br />
              <strong>macOS 15 (Sequoia) and later:</strong> there is no Open button in the
              dialog. Dismiss it with <strong>OK</strong>, then open{" "}
              <strong>System Settings → Privacy &amp; Security</strong> and scroll down to the
              message about Infer Desk. Click <strong>Open Anyway</strong>, then confirm in the
              follow-up dialog.
              <br />
              After that first approval, every later launch opens normally with no dialog.
            </div>
          </li>
        </ol>

        <p>
          <strong>Note:</strong> keep Infer Desk in <code>/Applications</code> rather than running
          it from <code>Downloads</code>. macOS ties the security approval to the copy you opened
          first, and every update replaces the app in <code>/Applications</code> — an app left in
          Downloads keeps pointing at an old build.
        </p>

        <h2>Updating on macOS</h2>
        <p>
          Updates on macOS are manual. Nothing installs itself in the background, so repeat the
          same four install steps each time a new version is published.
        </p>
        <ol>
          <li>
            <strong>Quit Infer Desk.</strong> Use Infer Desk → Quit Infer Desk, or close the
            window and quit from the Dock.
          </li>
          <li>
            <strong>Download the new zip</strong> from the{" "}
            <a href="/infer-desk">Infer Desk page</a>, and unzip it.
          </li>
          <li>
            <strong>Replace the installed app.</strong> Drag the new <code>InferDesk.app</code> onto
            the copy already in <code>/Applications</code> and confirm <strong>Replace</strong>.
          </li>
          <li>
            <strong>Launch it again.</strong> Open Infer Desk from <code>/Applications</code>. No
            security dialog appears — you already approved this app.
          </li>
        </ol>
        <p>
          Your wallets, accounts, and settings are not touched by replacing the application bundle
          in <code>/Applications</code>; they live in the Infer Desk data directory, not inside the
          app.
        </p>

        <p>
          <strong>Note:</strong> the embedded dApp browser is not available in the macOS build.
          Opening a dApp from Infer Desk hands the page to your default system browser, where
          Infer Connect still connects and asks you to approve requests in the wallet window.
        </p>

        <p>
          <a href="/infer-desk" className="cta-button">
            Back to downloads <i className="fas fa-arrow-right"></i>
          </a>
        </p>
      </div>
    </>
  );
}