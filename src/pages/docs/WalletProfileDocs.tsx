export default function WalletProfileDocs({ hash }: { hash: string }) {
  const contractAddress =
    "0xbdf9c94e797716648980ed99a0c6e2b3d6452ce5c1d28dbad3517a9be682b724";
  const testnetFullnode = "https://fullnode.testnet.cedralabs.com/v1";

  return (
    <>
      <div
        id="wallet-profile-introduction"
        className={`docs-section ${hash === "wallet-profile-introduction" ? "active" : ""}`}
      >
        <h1>Wallet Profile - Introduction</h1>
        <p>
          The <code>wallet::user_profiles</code> module gives every Cedra
          account a shared on-chain profile: a <strong>nickname</strong> and an
          optional <strong>avatar URL</strong>. Any app vertical (games, social,
          events, marketplaces) can read or write the same profile so the user
          has one identity across the Nova ecosystem.
        </p>

        <h2>Deployment</h2>
        <ul>
          <li>
            <strong>Module:</strong> <code>wallet::user_profiles</code>
          </li>
          <li>
            <strong>Contract address (testnet):</strong>{" "}
            <code>{contractAddress}</code>
          </li>
          <li>
            <strong>Network:</strong> Cedra testnet
          </li>
          <li>
            <strong>Testnet fullnode:</strong> <code>{testnetFullnode}</code>
          </li>
        </ul>

        <h2>Features</h2>
        <ul>
          <li>One <code>UserProfile</code> resource per account, stored under the user's address</li>
          <li>Create or update in a single entry call (<code>set_profile</code>)</li>
          <li>Read-only <code>#[view]</code> functions for nicknames and avatars that never abort on missing profiles</li>
          <li>Delete and reclaim storage with <code>clear_profile</code></li>
          <li>Length-bounded inputs: nickname up to 20 chars, avatar URL up to 256 chars</li>
          <li>Built-in <code>updated_at</code> timestamp for client-side cache invalidation</li>
        </ul>

        <h2>Use Cases</h2>

        <div className="use-case-card">
          <h4>Games</h4>
          <p>
            Render a consistent player handle and avatar across poker, leaderboards, and matchmaking without
            running your own user database.
          </p>
        </div>

        <div className="use-case-card">
          <h4>Social & Messaging</h4>
          <p>
            Display the same nickname the user set in Nova Wallet inside group chats, comments, and notifications.
          </p>
        </div>

        <div className="use-case-card">
          <h4>Marketplaces & Ticketing</h4>
          <p>
            Show a seller or attendee name next to a wallet address on listings, receipts, and tickets.
          </p>
        </div>

        <div className="use-case-card">
          <h4>DAO & Governance</h4>
          <p>
            Map proposals and votes to a human-readable identity instead of raw <code>0x...</code> addresses.
          </p>
        </div>
      </div>

      <div
        id="wallet-profile-contract-functions"
        className={`docs-section ${hash === "wallet-profile-contract-functions" ? "active" : ""}`}
      >
        <h1>Wallet Profile - Contract Functions</h1>
        <p>
          All entry functions must be signed by the user whose profile is being
          modified. View functions are <code>#[view]</code> and can be called
          without a signature through any Cedra fullnode or indexer.
        </p>

        <h2>Entry Functions (write)</h2>
        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>set_profile</code></td>
                <td>
                  <code>(account: &amp;signer, nickname: String, avatar_url: String)</code>
                </td>
                <td>
                  Create the profile if it does not exist, or update the nickname,
                  avatar URL, and <code>updated_at</code> if it does. Aborts on empty
                  nickname, nickname &gt; 20 chars, or avatar URL &gt; 256 chars.
                </td>
              </tr>
              <tr>
                <td><code>clear_profile</code></td>
                <td><code>(account: &amp;signer)</code></td>
                <td>
                  Delete the profile resource and reclaim storage. Aborts with{" "}
                  <code>E_PROFILE_NOT_FOUND</code> if no profile exists.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>View Functions (read)</h2>
        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Signature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>has_profile</code></td>
                <td><code>(addr: address): bool</code></td>
                <td>
                  Returns <code>true</code> when the address holds a{" "}
                  <code>UserProfile</code> resource.
                </td>
              </tr>
              <tr>
                <td><code>get_profile</code></td>
                <td><code>(addr: address): (String, String, u64)</code></td>
                <td>
                  Returns <code>(nickname, avatar_url, updated_at)</code>. Aborts
                  with <code>E_PROFILE_NOT_FOUND</code> when no profile exists.
                </td>
              </tr>
              <tr>
                <td><code>get_nickname</code></td>
                <td><code>(addr: address): String</code></td>
                <td>
                  Returns the nickname, or an empty string when no profile exists.
                  Safe to call without an existence check.
                </td>
              </tr>
              <tr>
                <td><code>get_avatar_url</code></td>
                <td><code>(addr: address): String</code></td>
                <td>
                  Returns the avatar URL, or an empty string when no profile exists.
                  Safe to call without an existence check.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Calling Pattern</h2>
        <p>
          Address the module with <code>{contractAddress}::user_profiles::&lt;function&gt;</code>.
        </p>
        <div className="code-block">
          <code>{`// Read nickname on testnet
{function:"${contractAddress}::user_profiles::get_nickname",functionArguments:["0xabc..."]}

// Write nickname + avatar
{function:"${contractAddress}::user_profiles::set_profile",functionArguments:["alice","https://cdn.example.com/avatars/alice.png"]}`}</code>
        </div>
      </div>

      <div
        id="wallet-profile-data-model"
        className={`docs-section ${hash === "wallet-profile-data-model" ? "active" : ""}`}
      >
        <h1>Wallet Profile - Data Model</h1>
        <p>
          One <code>UserProfile</code> resource is stored directly under the
          user's account address. There is no table, no registry, and no admin
          key — the user is the sole owner.
        </p>

        <h2>Struct</h2>
        <div className="code-block">
          <code>{`struct UserProfile has key, store, drop {
    nickname: String,
    avatar_url: String,
    updated_at: u64,
}`}</code>
        </div>

        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>nickname</code></td>
                <td><code>String</code></td>
                <td>1–20 chars. Empty strings abort.</td>
              </tr>
              <tr>
                <td><code>avatar_url</code></td>
                <td><code>String</code></td>
                <td>Up to 256 chars. Empty string is allowed.</td>
              </tr>
              <tr>
                <td><code>updated_at</code></td>
                <td><code>u64</code></td>
                <td>Unix timestamp in seconds, set automatically on every write.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Constants</h2>
        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Constant</th>
                <th>Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>MAX_NICKNAME_LENGTH</code></td>
                <td><code>20</code></td>
                <td>Maximum number of UTF-8 bytes in a nickname.</td>
              </tr>
              <tr>
                <td><code>MAX_AVATAR_URL_LENGTH</code></td>
                <td><code>256</code></td>
                <td>Maximum number of UTF-8 bytes in an avatar URL.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Storage Notes</h2>
        <ul>
          <li>Resources live under the user's account, so storage costs are paid by the user on each write.</li>
          <li>
            Because the resource is owned by the user, no other module can move
            or modify it. Only <code>set_profile</code> and{" "}
            <code>clear_profile</code> mutate state.
          </li>
          <li>
            Because there is no global registry, you do not need to iterate
            accounts to look up a profile. Always look up by address.
          </li>
          <li>
            The same address can hold other resources (NFTs, coins, app state)
            without conflict — the profile is keyed on its own struct type.
          </li>
        </ul>
      </div>

      <div
        id="wallet-profile-cedra-ts-sdk"
        className={`docs-section ${hash === "wallet-profile-cedra-ts-sdk" ? "active" : ""}`}
      >
        <h1>Wallet Profile - Cedra TS SDK</h1>
        <p>
          Use <code>@cedra-labs/ts-sdk</code> directly when your dApp manages
          signing itself or when you only need to read profiles from a backend
          or script.
        </p>

        <h2>Read a Nickname</h2>
        <div className="code-block">
          <code>{`import { Cedra, Network } from "@cedra-labs/ts-sdk";

const cedra = new Cedra({ network: Network.TESTNET });

const address = "0xabc123...";
const [nickname] = await cedra.view({
  payload: {
    function: "${contractAddress}::user_profiles::get_nickname",
    functionArguments: [address],
  },
});

console.log("nickname:", nickname); // "" when no profile exists`}</code>
        </div>

        <h2>Read the Full Profile</h2>
        <div className="code-block">
          <code>{`import { Cedra, Network } from "@cedra-labs/ts-sdk";

const cedra = new Cedra({ network: Network.TESTNET });

const [nickname, avatarUrl, updatedAt] = await cedra.view({
  payload: {
    function: "${contractAddress}::user_profiles::get_profile",
    functionArguments: ["0xabc123..."],
  },
});

console.log(nickname, avatarUrl, updatedAt);`}</code>
        </div>

        <h2>Check Existence First</h2>
        <div className="code-block">
          <code>{`import { Cedra, Network } from "@cedra-labs/ts-sdk";

const cedra = new Cedra({ network: Network.TESTNET });

const [hasProfile] = await cedra.view({
  payload: {
    function: "${contractAddress}::user_profiles::has_profile",
    functionArguments: ["0xabc123..."],
  },
});

if (hasProfile) {
  // safe to call get_profile
}`}</code>
        </div>

        <h2>Write a Profile</h2>
        <div className="code-block">
          <code>{`import {
  Account,
  Cedra,
  Network,
  Ed25519PrivateKey,
} from "@cedra-labs/ts-sdk";

const cedra = new Cedra({ network: Network.TESTNET });
const account = Account.fromPrivateKey(new Ed25519PrivateKey("0x..."));

const transaction = await cedra.transaction.build.simple({
  sender: account.accountAddress,
  data: {
    function: "${contractAddress}::user_profiles::set_profile",
    functionArguments: [
      "alice",
      "https://cdn.example.com/avatars/alice.png",
    ],
  },
});

const pending = await cedra.signAndSubmitTransaction({
  signer: account,
  transaction,
});

await cedra.waitForTransaction({ transactionHash: pending.hash });
console.log("profile updated:", pending.hash);`}</code>
        </div>

        <h2>Delete a Profile</h2>
        <div className="code-block">
          <code>{`const transaction = await cedra.transaction.build.simple({
  sender: account.accountAddress,
  data: {
    function: "${contractAddress}::user_profiles::clear_profile",
    functionArguments: [],
  },
});

const pending = await cedra.signAndSubmitTransaction({
  signer: account,
  transaction,
});

await cedra.waitForTransaction({ transactionHash: pending.hash });`}</code>
        </div>
      </div>

      <div
        id="wallet-profile-nova-connect"
        className={`docs-section ${hash === "wallet-profile-nova-connect" ? "active" : ""}`}
      >
        <h1>Wallet Profile - Nova Connect</h1>
        <p>
          When your dApp already uses{" "}
          <a href="#nova-connect-introduction" style={{ color: "var(--primary)" }}>
            Nova Connect
          </a>{" "}
          to connect Nova Desk or Nova Wallet, route writes through the
          connected adapter. Reads can still use the SDK's <code>view</code>{" "}
          calls — signing is not required.
        </p>

        <h2>Read with the SDK</h2>
        <div className="code-block">
          <code>{`import { Cedra, Network } from "@cedra-labs/ts-sdk";

const cedra = new Cedra({ network: Network.TESTNET });

async function fetchNickname(address) {
  const [nickname] = await cedra.view({
    payload: {
      function: "${contractAddress}::user_profiles::get_nickname",
      functionArguments: [address],
    },
  });
  return nickname;
}`}</code>
        </div>

        <h2>Write Through NovaWallet</h2>
        <div className="code-block">
          <code>{`import { NovaWallet } from "@inferenco/nova-wallet-adapter";

const wallet = new NovaWallet();
const { account } = await wallet.connect();

await wallet.signAndSubmitTransaction({
  data: {
    function: "${contractAddress}::user_profiles::set_profile",
    functionArguments: [
      "alice",
      "https://cdn.example.com/avatars/alice.png",
    ],
  },
});`}</code>
        </div>

        <h2>Write Through AIP-62</h2>
        <div className="code-block">
          <code>{`import "@inferenco/nova-wallet-adapter/auto-register";
import { getCedraWallets } from "@cedra-labs/wallet-standard";

const { cedraWallets } = getCedraWallets();
const wallet = cedraWallets.find((w) => w.name === "Nova Connect");
const account = (await wallet.features["cedra:connect"].connect()).args;

await wallet.features["cedra:signAndSubmitTransaction"].signAndSubmitTransaction({
  account,
  input: {
    function: "${contractAddress}::user_profiles::set_profile",
    functionArguments: [
      "alice",
      "https://cdn.example.com/avatars/alice.png",
    ],
  },
});`}</code>
        </div>

        <h2>Clear Through NovaWallet</h2>
        <div className="code-block">
          <code>{`await wallet.signAndSubmitTransaction({
  data: {
    function: "${contractAddress}::user_profiles::clear_profile",
    functionArguments: [],
  },
});`}</code>
        </div>
      </div>

      <div
        id="wallet-profile-react-example"
        className={`docs-section ${hash === "wallet-profile-react-example" ? "active" : ""}`}
      >
        <h1>Wallet Profile - React Example</h1>
        <p>
          Drop-in <code>useWalletProfile</code> hook that reads on mount and
          exposes a <code>save</code> function that validates inputs and writes
          through Nova Connect.
        </p>

        <h2>The Hook</h2>
        <div className="code-block">
          <code>{`import { useCallback, useEffect, useState } from "react";
import { Cedra, Network } from "@cedra-labs/ts-sdk";

const cedra = new Cedra({ network: Network.TESTNET });
const PROFILE_MODULE = "${contractAddress}::user_profiles";

export function useWalletProfile(address) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!address) {
      setProfile(null);
      return;
    }
    setLoading(true);
    try {
      const [nickname, avatarUrl, updatedAt] = await cedra.view({
        payload: {
          function: \`\${PROFILE_MODULE}::get_profile\`,
          functionArguments: [address],
        },
      });
      setProfile({ nickname, avatarUrl, updatedAt });
      setError(null);
    } catch (err) {
      // E_PROFILE_NOT_FOUND (3) is expected for new accounts
      if (String(err).includes("E_PROFILE_NOT_FOUND")) {
        setProfile(null);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { profile, loading, error, refresh };
}`}</code>
        </div>

        <h2>Editor Component</h2>
        <div className="code-block">
          <code>{`import { useState } from "react";
import { NovaWallet } from "@inferenco/nova-wallet-adapter";
import { useWalletProfile } from "./useWalletProfile";

const wallet = new NovaWallet();
const PROFILE_MODULE = "${contractAddress}::user_profiles";

export function ProfileEditor({ account }) {
  const { profile, refresh } = useWalletProfile(account?.address?.toString());
  const [nickname, setNickname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!account) return;
    if (!nickname || nickname.length > 20) {
      alert("Nickname must be 1–20 characters");
      return;
    }
    if (avatarUrl.length > 256) {
      alert("Avatar URL must be at most 256 characters");
      return;
    }

    setSaving(true);
    try {
      await wallet.signAndSubmitTransaction({
        data: {
          function: \`\${PROFILE_MODULE}::set_profile\`,
          functionArguments: [nickname, avatarUrl],
        },
      });
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <p>No profile yet. Set a nickname to get started.</p>
    );
  }

  return (
    <div>
      <img src={profile.avatarUrl} alt={profile.nickname} />
      <h3>{profile.nickname}</h3>
      <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
      <button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save profile"}
      </button>
    </div>
  );
}`}</code>
        </div>

        <p>
          Pair the editor with a Nova Connect connection button and a state
          hook for <code>account</code> to drive the full profile flow.
        </p>
      </div>

      <div
        id="wallet-profile-best-practices"
        className={`docs-section ${hash === "wallet-profile-best-practices" ? "active" : ""}`}
      >
        <h1>Wallet Profile - Best Practices</h1>

        <h2>Validate Before Submitting</h2>
        <ul>
          <li>Reject empty nicknames client-side to avoid a useless abort.</li>
          <li>Cap nickname input at 20 characters and avatar input at 256 to match on-chain limits.</li>
          <li>Trim leading and trailing whitespace before sending.</li>
        </ul>

        <h2>Pick the Right Read Function</h2>
        <ul>
          <li>
            Use <code>get_nickname</code> or <code>get_avatar_url</code> when you
            only need one field and want a safe empty-string fallback.
          </li>
          <li>
            Use <code>has_profile</code> as a gate before calling{" "}
            <code>get_profile</code> to avoid decoding abort code 3.
          </li>
          <li>
            Use <code>get_profile</code> when you need <code>updated_at</code>{" "}
            for cache invalidation or ordering.
          </li>
        </ul>

        <h2>Cache With <code>updated_at</code></h2>
        <ul>
          <li>Store <code>updated_at</code> alongside any cached profile.</li>
          <li>Refetch when your local cache is older than the on-chain value.</li>
          <li>On writes, refresh immediately after the transaction is confirmed.</li>
        </ul>

        <h2>Avatars</h2>
        <ul>
          <li>The contract does not validate the URL — it stores the string as-is.</li>
          <li>
            Host avatars on HTTPS, sanitize the input, and fall back to a
            deterministic placeholder (initials, blockies) when the URL is
            empty or fails to load.
          </li>
          <li>
            Treat the avatar URL as untrusted: it is set by the user's wallet
            and could change at any time.
          </li>
        </ul>

        <h2>Multi-App Identity</h2>
        <ul>
          <li>
            The profile is shared across all apps on the same wallet, so never
            assume a nickname is unique to your app.
          </li>
          <li>
            Append an app-specific suffix or keep your own display name separate
            when you need in-app uniqueness.
          </li>
          <li>
            If your app needs uniqueness, store an additional mapping in your
            own contract or off-chain index.
          </li>
        </ul>

        <h2>Gas and Storage</h2>
        <ul>
          <li>The first <code>set_profile</code> creates a resource and costs more gas than subsequent updates.</li>
          <li>
            Each subsequent <code>set_profile</code> pays for the storage delta
            of the new strings.
          </li>
          <li>
            Call <code>clear_profile</code> when a user explicitly resets their
            identity to refund the storage deposit.
          </li>
        </ul>
      </div>

      <div
        id="wallet-profile-error-handling"
        className={`docs-section ${hash === "wallet-profile-error-handling" ? "active" : ""}`}
      >
        <h1>Wallet Profile - Error Handling</h1>
        <p>
          The module aborts with one of four error codes. Read calls on
          <code> get_nickname</code> and <code>get_avatar_url</code> never abort —
          they return an empty string when no profile exists.
        </p>

        <div className="params-table">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Constant</th>
                <th>Thrown by</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>1</code></td>
                <td><code>E_NICKNAME_TOO_LONG</code></td>
                <td><code>set_profile</code></td>
                <td>Nickname exceeds 20 characters.</td>
              </tr>
              <tr>
                <td><code>2</code></td>
                <td><code>E_AVATAR_URL_TOO_LONG</code></td>
                <td><code>set_profile</code></td>
                <td>Avatar URL exceeds 256 characters.</td>
              </tr>
              <tr>
                <td><code>3</code></td>
                <td><code>E_PROFILE_NOT_FOUND</code></td>
                <td>
                  <code>get_profile</code>, <code>clear_profile</code>
                </td>
                <td>No profile resource exists for this address.</td>
              </tr>
              <tr>
                <td><code>4</code></td>
                <td><code>E_NICKNAME_EMPTY</code></td>
                <td><code>set_profile</code></td>
                <td>Nickname is an empty string.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Map Abort Codes to UI Messages</h2>
        <div className="code-block">
          <code>{`function explainProfileError(message) {
  if (message.includes("E_NICKNAME_TOO_LONG") || message.includes("Move abort 1")) {
    return "Nickname must be at most 20 characters.";
  }
  if (message.includes("E_AVATAR_URL_TOO_LONG") || message.includes("Move abort 2")) {
    return "Avatar URL must be at most 256 characters.";
  }
  if (message.includes("E_PROFILE_NOT_FOUND") || message.includes("Move abort 3")) {
    return "No profile exists for this account yet.";
  }
  if (message.includes("E_NICKNAME_EMPTY") || message.includes("Move abort 4")) {
    return "Nickname cannot be empty.";
  }
  return "Profile transaction failed. Please try again.";
}`}</code>
        </div>

        <h2>Safe Read Pattern</h2>
        <div className="code-block">
          <code>{`async function loadProfile(address) {
  const cedra = new Cedra({ network: Network.TESTNET });
  const [hasProfile] = await cedra.view({
    payload: {
      function: "${contractAddress}::user_profiles::has_profile",
      functionArguments: [address],
    },
  });

  if (!hasProfile) {
    return null;
  }

  const [nickname, avatarUrl, updatedAt] = await cedra.view({
    payload: {
      function: "${contractAddress}::user_profiles::get_profile",
      functionArguments: [address],
    },
  });

  return { nickname, avatarUrl, updatedAt };
}`}</code>
        </div>
      </div>
    </>
  );
}

