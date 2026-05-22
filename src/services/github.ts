export type OS = "windows" | "mac" | "mac-arm64" | "mac-intel" | "linux" | "linux-arm64" | "freebsd" | "unknown";

const REPO_OWNER = "Inferenco";
const REPO_NAME = "nova-desk-releases";

export const getLatestReleaseVersion = async (): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`
    );
    const data = await response.json();
    return data.tag_name as string;
  } catch (error) {
    console.error("Failed to fetch latest version:", error);
    return "v0.2.0"; // Fallback
  }
};

export const getDownloadUrl = (os: OS): string => {
  const base = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest/download`;
  switch (os) {
    case "windows":
      return `${base}/NovaDesk-Windows-x64.exe`;
    case "mac":
    case "mac-intel":
      return `${base}/NovaDesk-macOS-x86_64.zip`;
    case "mac-arm64":
      return `${base}/NovaDesk-macOS-aarch64.zip`;
    case "linux":
      return `${base}/NovaDesk-x86_64.AppImage`;
    case "linux-arm64":
      return `${base}/NovaDesk-aarch64.AppImage`;
    case "freebsd":
      return `${base}/NovaDesk-FreeBSD-x86_64`;
    case "unknown":
    default:
      return `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
  }
};
