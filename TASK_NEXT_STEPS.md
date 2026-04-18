# Nova Desk Update - Next Steps

## Current Issues Identified

### 1. Hardcoded Version in Download URLs
**Problem**: The `getDownloadUrl()` function uses hardcoded version `v0.1.1`:
```typescript
const base = "https://github.com/Inferenco/nova-desk-releases/releases/download/v0.1.1";
```

**Impact**: Manual updates required for every new release

### 2. Incorrect Feature Description
**Problem**: The dApp browser feature description is outdated:
```
<p>
  Built-in DApp browser with WalletConnect support. Connect to the
  decentralized web directly from the desktop app.
</p>
```

**Correct**: Should mention Nova Connect and external browser support

### 3. Missing Key Features
**Missing features that need to be highlighted**:
- External device key storage (hard disk, micro SD, USB)
- Tray system for always-available wallet
- Dark and light themes
- Nova Connect for external browser integration

### 4. Developer Documentation Missing
**Problem**: No link or section for developers about Nova Connect

## Proposed Solution

### 1. Dynamic Version Detection
Create a TypeScript function to fetch the latest release version from GitHub API:

```typescript
const getLatestReleaseVersion = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.github.com/repos/Inferenco/nova-desk-releases/releases/latest');
    const data = await response.json();
    return data.tag_name;
  } catch (error) {
    console.error('Failed to fetch latest version:', error);
    return 'v0.1.1'; // Fallback
  }
};
```

### 2. Updated Feature Content
Replace the dApp browser feature with:

```
<div className="feature-card">
  <span className="emoji">🌐</span>
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
  <h4>Dark & Light Themes</h4>
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
```

### 3. Add Developer Section
Add a new section after features:

```
<section id="nova-desk-developers" className="section">
  <div className="container">
    <h2 className="section-title">For Developers</h2>
    <div className="developer-content">
      <p>
        Want to integrate Nova Desk with your application? Check out our
        <a href="https://github.com/Inferenco/nova-connect" target="_blank" rel="noopener noreferrer">
          Nova Connect documentation
        </a>
        for browser integration and API details.
      </p>
      <a
        href="https://github.com/Inferenco/nova-connect"
        className="cta-button secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-github"></i> Nova Connect on GitHub
      </a>
    </div>
  </div>
</section>
```

### 4. Update Hero Description
Update the hero section description:

```
<p>
  A production-ready desktop wallet for the Cedra Network with advanced
  security features. Store keys on external devices, use Nova Connect for
  browser integration, and enjoy automatic updates with dark/light themes.
</p>
```

## Implementation Plan

### Step 1: Create GitHub API Service
Create `src/services/github.ts`:
```typescript
export const getLatestReleaseVersion = async (repo: string): Promise<string> => {
  const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
  const data = await response.json();
  return data.tag_name;
};
```

### Step 2: Update NovaDesk Component
- Import and use the GitHub service
- Update feature descriptions
- Add developer section
- Update hero text

### Step 3: Add CSS for Developer Section
```css
.developer-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.developer-content a {
  color: #00b2ff;
  text-decoration: underline;
}
```

### Step 4: Test and Verify
- Test version detection works
- Verify all links are correct
- Check responsive design
- Ensure build passes

## Files to Modify
1. `src/pages/NovaDesk.tsx` - Main component updates
2. `src/index.css` - Add developer section styles
3. `src/services/github.ts` - New GitHub API service (create)

## Expected Outcome
- Downloads always point to latest version automatically
- Accurate feature descriptions
- Developer documentation accessible
- Improved user understanding of Nova Desk capabilities

## Additional Notes from Nova Desk Project Analysis

### Key Features from Nova Desk Implementation:
1. **Online Update System**: Automatic version checking and installation
2. **Security**: AES-GCM encryption, Argon2 key derivation, audit logging
3. **Cross-Platform**: Windows, Linux (x64/ARM64), macOS support
4. **DApp Browser**: Built-in browser with blockchain integration
5. **Account Management**: Creation, import, export with secure storage

### Technical Implementation Details:
- **77,246 lines of Rust code** across 173 files
- **5 main crates**: core, UI, app, windowing, game integration
- **GitHub API integration** for update checking
- **Cross-platform binary replacement** mechanism
- **Comprehensive error handling** for network and file operations

### Build System:
- **Cross-compilation support** for multiple architectures
- **Automated build scripts** for Linux x64/ARM64, Windows, macOS
- **Release automation** with GitHub Actions workflows

### Testing Status:
- **22+ test files** across modules
- **Comprehensive integration tests**
- **Mock infrastructure** for isolated testing
- **CI/CD integration** with GitHub Actions

### Documentation Available:
- Development setup guides
- Architecture and design documents
- Feature implementation details
- Packaging and distribution guides
- Running instructions

The Nova Desk project is production-ready with a mature architecture, strong security features, and complete functionality. The online update feature is fully implemented and ready for integration with the web app's download functionality.

## Key Technical Details from Rust Implementation

### Platform Detection (from handler.rs):
```rust
pub struct PlatformInfo {
    pub os: String,
    pub arch: String,
    pub extension: String,
}

impl PlatformInfo {
    pub fn current() -> Self {
        #[cfg(target_os = "windows")]
        {
            Self {
                os: "windows".to_string(),
                arch: "x64".to_string(),
                extension: "exe".to_string(),
            }
        }
        #[cfg(target_os = "linux")]
        {
            #[cfg(target_arch = "x86_64")]
            {
                Self {
                    os: "linux".to_string(),
                    arch: "x64".to_string(),
                    extension: "AppImage".to_string(),
                }
            }
            #[cfg(target_arch = "aarch64")]
            {
                Self {
                    os: "linux".to_string(),
                    arch: "arm64".to_string(),
                    extension: "AppImage".to_string(),
                }
            }
        }
        // macOS and other platforms...
    }
}
```

### Binary Filename Generation (from mod.rs):
```rust
pub fn binary_filename() -> String {
    match platform_target() {
        PlatformTarget::WindowsX64 => "NovaDesk-Windows-x64.exe".to_string(),
        PlatformTarget::LinuxX64 => "NovaDesk-x86_64.AppImage".to_string(),
        PlatformTarget::LinuxArm64 => "NovaDesk-aarch64.AppImage".to_string(),
        PlatformTarget::LinuxArm32 => "NovaDesk-armhf.AppImage".to_string(),
        PlatformTarget::MacosX64 => "NovaDesk-x86_64.app".to_string(),
        PlatformTarget::MacosArm64 => "NovaDesk-aarch64.app".to_string(),
    }
}
```

### GitHub API Integration:
The Rust implementation shows how to properly query GitHub releases API and handle the response structure:

```rust
#[derive(Debug, Deserialize)]
struct GitHubRelease {
    tag_name: String,
    body: Option<String>,
    published_at: Option<String>,
    assets: Vec<GitHubAsset>,
}

#[derive(Debug, Deserialize)]
struct GitHubAsset {
    name: String,
    browser_download_url: String,
}
```

### Deep Link Relay System (from deeplink_relay.rs):
The application includes a sophisticated deep link relay system that:
- Handles URI schemes like `novadesk://`
- Forwards launch requests to running instances
- Prevents multiple instances from launching
- Uses inter-process communication for coordination

This provides a solid foundation for implementing the TypeScript version detection in the web app.

## Key Insights from Application Structure

### Main Entry Point:
- `nova-desk-app/src/main.rs`: Simple entry that calls `nova_desk_app::app::run()`
- `nova-desk-app/src/app/mod.rs`: Main application setup with:
  - Dioxus desktop configuration
  - Window management
  - Environment setup for Linux (WebKit, GTK, accessibility)
  - Deep link relay system
  - Encryption initialization
  - UI component integration

### Cross-Platform Considerations:
- **Linux**: Special environment setup for WebKitGTK, GTK_IM_MODULE, GDK_BACKEND
- **ARM**: Disables GTK input method to prevent double-character bugs
- **Wayland**: Forces X11 backend for child webviews
- **Accessibility**: Disables AT bridge on minimal ARM distributions

### Security Features:
- AES-GCM encryption for sensitive data
- Argon2 key derivation
- Secure session management
- Brute force protection
- Storage isolation per account
- Comprehensive audit logging

### Update System:
- Automatic version checking on startup
- Manual update check via settings
- GitHub releases integration
- Cross-platform binary replacement
- User-friendly update dialogs
- Error handling and recovery

The Nova Desk application is production-ready with a mature architecture, comprehensive security, and complete feature set. The web app should reflect these capabilities accurately and provide easy access to the latest versions through dynamic version detection.