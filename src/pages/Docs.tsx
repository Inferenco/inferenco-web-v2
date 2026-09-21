import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import InferBotDocs from "./docs/InferBotDocs";
import InferAPIDocs from "./docs/InferAPIDocs";
import InferConnectDocs from "./docs/InferConnectDocs";
import BridgeDocs from "./docs/BridgeDocs";
import PayMeDocs from "./docs/PayMeDocs";
import WalletProfileDocs from "./docs/WalletProfileDocs";

const docsSections = [
  {
    title: "Infer Bot",
    items: [
      { id: "infer-bot-introduction", label: "Introduction", icon: "fas fa-book" },
      { id: "infer-bot-commands", label: "Commands", icon: "fas fa-terminal" },
      { id: "infer-bot-settings", label: "Settings", icon: "fas fa-cog" },
      { id: "infer-bot-prompts", label: "Prompts", icon: "fas fa-comments" },
    ],
  },
  {
    title: "Infer API",
    items: [
      { id: "infer-api-introduction", label: "Introduction", icon: "fas fa-book" },
      { id: "generate-api-key", label: "Generate API Key", icon: "fas fa-key" },
      { id: "tools", label: "Tools", icon: "fas fa-toolbox" },
      { id: "add-knowledge", label: "Add Knowledge", icon: "fas fa-book-open" },
      { id: "templates", label: "Templates", icon: "fas fa-puzzle-piece" },
      { id: "api-docs", label: "API Docs", icon: "fas fa-code" },
    ],
  },
  {
    title: "Infer Connect",
    items: [
      { id: "infer-connect-introduction", label: "Introduction", icon: "fas fa-book" },
      { id: "infer-connect-installation", label: "Installation", icon: "fas fa-download" },
      { id: "infer-connect-quickstart", label: "Quick Start", icon: "fas fa-rocket" },
      { id: "infer-connect-react-integration", label: "React Integration", icon: "fab fa-react" },
      { id: "infer-connect-api-reference", label: "API Reference", icon: "fas fa-code" },
      { id: "infer-connect-configuration", label: "Configuration", icon: "fas fa-cog" },
      { id: "infer-connect-mobile-relay", label: "Mobile Relay", icon: "fas fa-mobile-alt" },
      { id: "infer-connect-pkce", label: "PKCE", icon: "fas fa-lock" },
      { id: "infer-connect-bridge-api", label: "Bridge API", icon: "fas fa-bridge" },
      { id: "infer-connect-detection", label: "Detection", icon: "fas fa-eye" },
      { id: "infer-connect-error-handling", label: "Error Handling", icon: "fas fa-exclamation-triangle" },
      { id: "infer-connect-provider-detection", label: "Provider Detection", icon: "fas fa-search" },
      { id: "infer-connect-session-management", label: "Session Management", icon: "fas fa-database" },
      { id: "infer-connect-version-migration", label: "Version Migration", icon: "fas fa-code-branch" },
    ],
  },
  {
    title: "Bridge",
    items: [
      { id: "bridge-introduction", label: "Introduction", icon: "fas fa-bridge" },
      { id: "bridge-transport-choice", label: "Choose a Transport", icon: "fas fa-route" },
      { id: "bridge-setup", label: "Setup Guide", icon: "fas fa-list-ol" },
      { id: "bridge-security", label: "Security", icon: "fas fa-shield-alt" },
    ],
  },
  {
    title: "Pay Me",
    items: [
      { id: "pay-me-introduction", label: "Introduction", icon: "fas fa-mobile-alt" },
      { id: "pay-me-flow", label: "Transfer Flow", icon: "fas fa-exchange-alt" },
      { id: "pay-me-security", label: "Security & Recovery", icon: "fas fa-shield-alt" },
      { id: "pay-me-scenarios", label: "Scenarios", icon: "fas fa-lightbulb" },
    ],
  },
  {
    title: "Wallet Profile",
    items: [
      { id: "wallet-profile-introduction", label: "Introduction", icon: "fas fa-book" },
      { id: "wallet-profile-contract-functions", label: "Contract Functions", icon: "fas fa-code" },
      { id: "wallet-profile-data-model", label: "Data Model", icon: "fas fa-database" },
      { id: "wallet-profile-cedra-ts-sdk", label: "Cedra TS SDK", icon: "fas fa-plug" },
      { id: "wallet-profile-infer-connect", label: "Infer Connect", icon: "fas fa-link" },
      { id: "wallet-profile-react-example", label: "React Example", icon: "fab fa-react" },
      { id: "wallet-profile-best-practices", label: "Best Practices", icon: "fas fa-lightbulb" },
      { id: "wallet-profile-error-handling", label: "Error Handling", icon: "fas fa-exclamation-triangle" },
    ],
  },
];

function DocsContent() {
  const location = useLocation();
  const hash = location.hash.slice(1) || "infer-bot-introduction";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div id="docs-page" className="page-section docs-container docs-page">
      <button
        className="mobile-menu-toggle"
        id="mobileMenuToggle"
        aria-label="Toggle Sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-list"></i>
      </button>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        id="sidebarOverlay"
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`docs-sidebar ${sidebarOpen ? "active" : ""}`}
        id="docsSidebar"
      >
        {docsSections.map((section) => (
          <div key={section.title} className="sidebar-section">
            <div className="sidebar-title">{section.title}</div>
            {section.items.map((item) => (
              <Link
                key={item.id}
                to={`/docs#${item.id}`}
                className={`sidebar-item ${hash === item.id ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <i className={item.icon}></i> {item.label}
              </Link>
            ))}
          </div>
        ))}
      </aside>

      <main className="docs-content">
        <InferBotDocs hash={hash} />
        <InferAPIDocs hash={hash} />
        <InferConnectDocs hash={hash} />
        <BridgeDocs hash={hash} />
        <PayMeDocs hash={hash} />
        <WalletProfileDocs hash={hash} />
      </main>
    </div>
  );
}

export default function Docs() {
  return (
    <Routes>
      <Route path="/*" element={<DocsContent />} />
    </Routes>
  );
}
