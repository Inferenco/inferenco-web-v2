# PR: Fix Linux ARM64 Detection Issue

## Summary
Fixes issue where Raspberry Pi OS (ARM64) incorrectly showed only the Linux x64 download button instead of both x64 and ARM64 options.

## Problem
Browser's `navigator.userAgent` on Raspberry Pi OS reports `Linux x86_64` even when running on ARM64 hardware. This makes it impossible to reliably detect the actual kernel architecture from client-side JavaScript alone.

## Solution
Modified the download button logic in `src/pages/NovaDesk.tsx` to always show both Linux buttons when Linux is detected, allowing users to manually select their architecture.

## Changes
- Updated `shouldShow()` function to show both Linux x64 and Linux ARM64 buttons when Linux is detected
- Fixed button URLs to use architecture-specific download URLs
- Removed unused `downloadUrl` variable

## Testing
- ✅ Build passes successfully
- ✅ TypeScript compilation succeeds
- ✅ Both Linux buttons appear when Linux is detected
- ✅ Each button links to the correct architecture-specific URL

## Files Modified
- `src/pages/NovaDesk.tsx` (10 insertions, 5 deletions)

## Impact
- Linux users can now manually select the correct architecture
- Raspberry Pi users can download the ARM64 version
- No breaking changes to existing functionality
