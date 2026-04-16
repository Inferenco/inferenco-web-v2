import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import NovaBotDocs from "./docs/NovaBotDocs";
import NovaAPIDocs from "./docs/NovaAPIDocs";
import NovaConnectDocs from "./docs/NovaConnectDocs";

const docsSections = [
  {
    title: "Nova Bot",
    items: [
      { id: "nova-bot-introduction", label: "Introduction", icon: "fas fa-book" },
      { id: "nova-bot-commands", label: "Commands", icon: "fas fa-terminal" },
      { id: "nova-bot-settings", label: "Settings", icon: "fas fa-cog" },
      { id: "nova-bot-prompts", label: "Prompts", icon: "fas fa-comments" },
    ],
  },
  {
    title: "Nova API",
    items: [
      { id: "nova-api-introduction", label: "Introduction", icon: "fas fa-book" },
      { id: "generate-api-key", label: "Generate API Key", icon: "fas fa-key" },
      { id: "tools", label: "Tools", icon: "fas fa-toolbox" },
      { id: "add-knowledge", label: "Add Knowledge", icon: "fas fa-book-open" },
      { id: "templates", label: "Templates", icon: "fas fa-puzzle-piece" },
      { id: "api-docs", label: "API Docs", icon: "fas fa-code" },
    ],
  },
  {
    title: "Nova Connect",
    items: [
      { id: "nova-connect-introduction", label: "Introduction", icon: "fas fa-book" },
      { id: "nova-connect-installation", label: "Installation", icon: "fas fa-download" },
      { id: "nova-connect-quickstart", label: "Quick Start", icon: "fas fa-rocket" },
      { id: "nova-connect-api-reference", label: "API Reference", icon: "fas fa-code" },
      { id: "nova-connect-mobile-relay", label: "Mobile Relay", icon: "fas fa-mobile-alt" },
      { id: "nova-connect-configuration", label: "Configuration", icon: "fas fa-cog" },
    ],
  },
];

function DocsContent() {
  const location = useLocation();
  const hash = location.hash.slice(1) || "nova-bot-introduction";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div id="docs-page" className="page-section docs-container docs-page">
      <button
        className="mobile-menu-toggle"
        id="mobileMenuToggle"
        aria-label="Toggle Menu"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="fas fa-bars"></i>
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
        <NovaBotDocs hash={hash} />
        <NovaAPIDocs hash={hash} />
        <NovaConnectDocs hash={hash} />
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
