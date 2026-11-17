import type { DocsProps } from "./types";
import CodeBlock from "../../components/CodeBlock";

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

      <div id="memlock-configuration" className={`docs-section ${hash === "memlock-configuration" ? "active" : ""}`}>
        <h1>Swap &amp; Memory Protection</h1>
        <p className="docs-lead">
          While your wallet is unlocked, the keys that sign your transactions exist as plain bytes in
          your computer&apos;s memory. Your operating system can move idle memory out to disk — that
          is what <em>swap</em> is for — and a key that has been written to a swap file can be read
          back long after you closed the app, by anyone with the disk. Infer Desk therefore pins its
          secret pages in RAM so the kernel is not allowed to page them out. This page explains how
          to check that the pinning is actually working on your machine, how to fix it when it is
          not, and what the wallet tells you in each case.
        </p>

        <h2>How the protection works, in one paragraph</h2>
        <p>
          Linux and FreeBSD gate this ability behind a per-process resource limit called{" "}
          <code>RLIMIT_MEMLOCK</code>. On a stock desktop Linux that limit is only <strong>8 MiB</strong>{" "}
          — enough for the handful of pages the wallet needs, but small enough that containers,
          systemd services and hardened hosts sometimes set it to zero. The wallet measures the limit,
          locks its secret pages, and then <em>verifies</em> the lock instead of assuming it succeeded.
          The result is reported as either <strong>Active</strong> or <strong>Degraded</strong>.
        </p>

        <div className="important-note">
          <strong>⚠ The wallet is fail-open by default.</strong> If the host refuses the lock, Infer
          Desk still unlocks — it does not lock you out of your own funds — and it warns you, loudly,
          in two places: a dismissible banner across the top of the window right after you unlock, and
          the <strong>Protection against swap</strong> card under <strong>Settings → Security</strong>,
          which stays visible on every visit. If you would rather the wallet refuse to unlock at all,
          see <strong>Refusing to unlock without the guarantee</strong> below.
        </div>

        <h2>Step 1 — check the current limit</h2>
        <p>
          Two numbers matter: the <strong>soft</strong> limit (what the process may lock right now) and
          the <strong>hard</strong> limit (how far the process may raise the soft limit itself). The
          shell reports both, in KiB:
        </p>
        <CodeBlock language="bash">{`# soft limit (what a new process may lock)
ulimit -l
# 8192  -> 8 MiB, the stock desktop Linux default

# hard limit (the ceiling it may raise itself to)
ulimit -Hl`}</CodeBlock>
        <p>
          And the kernel&apos;s own view of a running wallet — how many bytes that process has actually
          pinned:
        </p>
        <CodeBlock language="bash">{`grep VmLck /proc/$(pgrep -x infer-desk-app)/status
# VmLck:          2052 kB`}</CodeBlock>
        <p>
          You never have to guess which limit applied to the wallet: the Settings card and the audit
          log both print the soft and hard limits the process actually saw.
        </p>

        <h2>Step 2 — raise the limit</h2>
        <p>
          Pick <strong>one</strong> of the options below. They are listed in the order an operator is
          most likely to try them.
        </p>

        <h3>2.1 For one shell session</h3>
        <p>
          The quickest way to confirm that a bigger limit really does clear the warning. It affects
          only that shell and the programs it starts.
        </p>
        <CodeBlock language="bash">{`ulimit -l unlimited
# then launch Infer Desk from this same shell`}</CodeBlock>

        <h3>2.2 System-wide, for desktop and GUI logins</h3>
        <p>
          Create <code>/etc/security/limits.d/99-infer-desk.conf</code>:
        </p>
        <pre className="code-block">
          <code>{`# Allow the desktop wallet to pin its secret pages in RAM.
# The value is in KiB; "unlimited" removes the ceiling entirely.
*   soft  memlock  unlimited
*   hard  memlock  unlimited`}</code>
        </pre>
        <p>
          This file is read by <code>pam_limits</code>, so it applies to GUI sessions started by a
          display manager as well as to terminal logins. A <code>ulimit</code> line in{" "}
          <code>~/.bashrc</code> does <strong>not</strong> reach an app launched from your desktop
          menu — that is the usual reason people report &ldquo;the limit is still 8 MiB even though I
          changed my shell profile&rdquo;. Log out and back in, then check again:
        </p>
        <CodeBlock language="bash">{`ulimit -l
# unlimited`}</CodeBlock>

        <h3>2.3 systemd service (user or system)</h3>
        <p>
          If you launch the wallet from a unit, set <code>LimitMEMLOCK</code> on the unit. The same
          line works in <code>~/.config/systemd/user/infer-desk.service</code> and in{" "}
          <code>/etc/systemd/system/infer-desk.service</code>:
        </p>
        <pre className="code-block">
          <code>{`[Service]
ExecStart=/opt/infer-desk/InferDesk
LimitMEMLOCK=infinity`}</code>
        </pre>
        <p>
          To raise the default for everything under the <em>user</em> manager instead, put this in{" "}
          <code>~/.config/systemd/user.conf</code>:
        </p>
        <pre className="code-block">
          <code>{`[Manager]
DefaultLimitMEMLOCK=infinity`}</code>
        </pre>
        <CodeBlock language="bash">{`systemctl --user daemon-reload
systemctl --user restart infer-desk.service`}</CodeBlock>

        <h3>2.4 Docker or Podman</h3>
        <p>
          Containers get their own memlock budget, so a host-side <code>limits.d</code> entry does not
          apply inside one. Pass the limit through to the container:
        </p>
        <CodeBlock language="bash">{`docker run --ulimit memlock=-1:-1 ...`}</CodeBlock>
        <p>
          <code>-1:-1</code> means &ldquo;no soft limit, no hard limit&rdquo;. Podman uses the same
          flag.
        </p>

        <h3>2.5 Grant the capability instead of raising the limit</h3>
        <p>
          A process holding <code>CAP_IPC_LOCK</code> may lock memory <em>without</em> being charged
          against <code>RLIMIT_MEMLOCK</code> at all:
        </p>
        <CodeBlock language="bash">{`sudo setcap cap_ipc_lock+ep /opt/infer-desk/InferDesk`}</CodeBlock>
        <div className="important-note">
          <strong>⚠ Read this before using <code>setcap</code>.</strong> When a process starts with
          elevated capabilities the kernel puts it into <em>secure-execution mode</em> (
          <code>AT_SECURE</code>). That mode disables <code>LD_PRELOAD</code> and other dynamic-loader
          hooks, and it makes the process ignore <code>RLIMIT_*</code> changes. Some desktop stacks and
          some AppImage runtimes behave differently under <code>AT_SECURE</code>. If Infer Desk
          misbehaves after you set the capability, remove it with{" "}
          <code>setcap -r /opt/infer-desk/InferDesk</code> and use one of the limit-based options
          above instead.
        </div>

        <h3>2.6 The AppImage case (use a wrapper script)</h3>
        <p>
          The Linux download is an AppImage. Its real binary lives inside a squashfs image that the
          runtime mounts read-only on every launch, so a file capability set on the outer{" "}
          <code>.AppImage</code> never reaches the binary inside — and there is no in-package hook to
          change. A wrapper script is the practical fix:
        </p>
        <pre className="code-block">
          <code>{`#!/bin/sh
# /usr/local/bin/infer-desk
ulimit -l unlimited 2>/dev/null || true
exec /opt/infer-desk/InferDesk-x86_64.AppImage "$@"`}</code>
        </pre>
        <p>
          Make it executable and point your desktop entry&apos;s <code>Exec=</code> line at the
          wrapper. Alternatively, run the wallet as a plain binary on hosts where the guarantee matters.
        </p>

        <h2>Step 3 — verify the protection is active</h2>
        <p>Do not trust that a bigger limit worked; check the two observable signals.</p>
        <ol>
          <li>
            <strong>The Settings card says Active.</strong> Open <strong>Settings → Security</strong>{" "}
            and look at the <strong>Secret page locking</strong> row under <strong>Protection against
            swap</strong>. <strong>Active</strong> means the wallet locked its secrets <em>and</em>{" "}
            verified the lock. <strong>Degraded</strong> means it could not, and the card prints the
            remediation commands.
          </li>
          <li>
            <strong>Watch <code>VmLck</code> step around an unlock.</strong> A bare{" "}
            <code>VmLck &gt; 0</code> proves nothing — the wallet runs a startup probe that pins its own
            arena for the life of the process. What you want to see is the <em>delta</em> when the vault
            opens:
            <CodeBlock language="bash">{`grep VmLck /proc/$(pgrep -x infer-desk-app)/status   # before unlock
# … unlock the wallet in the UI, then:
grep VmLck /proc/$(pgrep -x infer-desk-app)/status   # after unlock`}</CodeBlock>
            On a healthy host the counter steps up by roughly <strong>8 kB</strong> while the wallet is
            unlocked and steps back down to the probe baseline when you lock it again, because the pins
            are released only after the secret bytes are wiped. A counter that never moves means the
            per-secret lock did not take; one that climbs and stays up after locking means the release
            path did not run.
          </li>
        </ol>

        <div className="important-note">
          <strong>⚠ Verify &ldquo;Active&rdquo; — do not try to force &ldquo;Degraded&rdquo; by setting a
          small limit.</strong> The startup probe sizes itself to the budget it is given: its arena is
          one quarter of the soft limit, capped at 1 MiB, with a floor of one memory page. So{" "}
          <code>ulimit -l 64</code> (64 KiB) still reports <strong>Active</strong> — the probe only asks
          for 16 KiB. Only a <em>hard-zero</em> budget fails: <code>ulimit -l 0</code> (which sets the
          soft <em>and</em> hard limit), <code>LimitMEMLOCK=0:0</code>, or{" "}
          <code>--ulimit memlock=0:0</code> in a container. If you are testing the degraded path, use
          one of those; otherwise treat <strong>Active</strong> as the goal and stop there.
        </div>

        <h2>Refusing to unlock without the guarantee</h2>
        <p>
          On a machine with no full-disk encryption and an unencrypted swap file, &ldquo;the wallet
          cannot run without the guarantee&rdquo; is the safer contract than &ldquo;the wallet runs and
          leaks&rdquo;. Set the environment variable to make the wallet strict:
        </p>
        <CodeBlock language="bash">{`INFER_DESK_REQUIRE_MEMLOCK=1 /opt/infer-desk/InferDesk`}</CodeBlock>
        <p>The unlock then fails outright with:</p>
        <pre className="code-block">
          <code>{`wallet secrets could not be locked in RAM (RLIMIT_MEMLOCK soft=8388608 hard=8388608);
refusing to unlock because INFER_DESK_REQUIRE_MEMLOCK=1`}</code>
        </pre>
        <p>
          The variable changes nothing else: with a raised limit the wallet unlocks exactly as before,
          and the Settings card still shows <strong>Active</strong>.
        </p>

        <h2>Platform notes</h2>
        <table className="functions-table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>What to do</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Linux</td>
              <td>
                <code>ulimit -l</code>, <code>/etc/security/limits.d</code>, systemd{" "}
                <code>LimitMEMLOCK=</code>, or <code>--ulimit memlock=-1:-1</code>. Verify with{" "}
                <code>VmLck</code>.
              </td>
            </tr>
            <tr>
              <td>FreeBSD</td>
              <td>
                The same knobs apply; <code>kern.maxlocked</code> is the system-wide ceiling. The wallet
                additionally marks its secret pages <code>MADV_NOCORE</code> so they are left out of
                crash dumps.
              </td>
            </tr>
            <tr>
              <td>macOS</td>
              <td>
                Nothing to raise. macOS does not honour <code>RLIMIT_MEMLOCK</code> in the POSIX sense;
                the wallet uses per-range locking and drops its core-file size limit to zero.
              </td>
            </tr>
            <tr>
              <td>Windows</td>
              <td>
                No swap guarantee exists: <code>VirtualLock</code> pins pages but the pagefile still
                receives them. Use full-disk encryption (BitLocker) instead. The wallet reports{" "}
                <strong>Degraded</strong> here on purpose.
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Related</h2>
        <ul>
          <li>
            <a href="/docs#audits-infer-desk">Infer Desk security audits</a> — the independent reviews
            of the wallet, including the in-memory secret handling findings.
          </li>
          <li>
            <a href="/docs#macos-installation">Installing Infer Desk on macOS</a> — the macOS build
            notes.
          </li>
        </ul>

        <p>
          <a href="/infer-desk" className="cta-button">
            Back to downloads <i className="fas fa-arrow-right"></i>
          </a>
        </p>
      </div>
    </>
  );
}