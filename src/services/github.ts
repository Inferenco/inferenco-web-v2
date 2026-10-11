export type OS = "windows" | "mac" | "mac-arm64" | "mac-intel" | "linux" | "linux-arm64" | "freebsd" | "unknown";

const REPO_OWNER = "Inferenco";
const REPO_NAME = "infer-desk-releases";
// Wallet downloads always resolve to the newest published (non-prerelease)
// release via GitHub's `releases/latest/download` redirect. The asset names
// below are a stable contract, guarded by tests/download-urls.test.mjs and by
// .github/workflows/release-assets-check.yml — publishing a new wallet
// release must never require an edit in this repo.
const LATEST_DOWNLOAD_BASE = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download`;

export const getDownloadUrl = (os: OS): string => {
  switch (os) {
    case "windows":
      return `${LATEST_DOWNLOAD_BASE}/InferDesk-Windows-x64.exe`;
    case "mac-intel":
      return `${LATEST_DOWNLOAD_BASE}/InferDesk-macOS-x86_64.zip`;
    case "mac-arm64":
      return `${LATEST_DOWNLOAD_BASE}/InferDesk-macOS-aarch64.zip`;
    case "linux":
      return `${LATEST_DOWNLOAD_BASE}/InferDesk-x86_64.AppImage`;
    case "linux-arm64":
      return `${LATEST_DOWNLOAD_BASE}/InferDesk-aarch64.AppImage`;
    case "freebsd":
      return `${LATEST_DOWNLOAD_BASE}/InferDesk-FreeBSD-x86_64`;
    case "mac":
    case "unknown":
    default:
      return `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
  }
};
