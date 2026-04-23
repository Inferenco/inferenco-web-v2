# Pull Request: Update Nova Desk Fallback Version to v0.2.0

## Overview

This PR updates the fallback version for Nova Desk downloads from `v0.1.1` to `v0.2.0` to address a critical issue where version 0.1.1 creates accounts with seed words that don't match the account.

## Changes Made

### 1. Updated Fallback Version in GitHub Service (`src/services/github.ts`)

Changed the fallback version in `getLatestReleaseVersion()` from `v0.1.1` to `v0.2.0`:

```typescript
return "v0.2.0"; // Fallback
```

### 2. Updated Initial State in NovaDesk Component (`src/pages/NovaDesk.tsx`)

Changed the initial version state from `v0.1.1` to `v0.2.0`:

```typescript
const [version, setVersion] = useState<string>("v0.2.0");
```

## Impact

- Downloads will now fall back to version 0.2.0 instead of 0.1.1 when GitHub API is unavailable
- Resolves the issue with mismatched seed words and accounts in version 0.1.1
- Ensures users get a stable, working version even if the latest version cannot be fetched

## Files Modified

| File | Changes |
|------|---------|
| `src/services/github.ts` | Updated fallback version to v0.2.0 |
| `src/pages/NovaDesk.tsx` | Updated initial state version to v0.2.0 |

**Total**: 2 files changed, 2 lines modified
