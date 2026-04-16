// Page types
export type PageType = 'home' | 'nova' | 'nova-wallet' | 'nova-desk' | 'docs';

// Navigation link type
export interface NavLink {
  label: string;
  href: string;
  page: PageType;
  icon?: string;
}

// Social link type
export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
  logo?: string;
}

// Feature card type
export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

// Step item type
export interface StepItem {
  icon?: string;
  text: string;
}

// Available Properties section type
export interface PropertyItem {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

// API Endpoint type
export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'DELETE';
  path: string;
  description: string;
  params?: PropertyItem[];
}

// Docs section type
export interface DocsSection {
  id: string;
  title: string;
  content: string;
  codeBlocks?: CodeBlock[];
  endpoints?: ApiEndpoint[];
  properties?: PropertyItem[];
  steps?: StepItem[];
  subSections?: DocsSection[];
}

// Code block type
export interface CodeBlock {
  language?: string;
  code: string;
  title?: string;
}

// Use case card type
export interface UseCaseCard {
  icon: string;
  title: string;
  description: string;
}

// Installation step type
export interface InstallationStep {
  command: string;
  description?: string;
}

// NPM package type
export interface NpmPackage {
  name: string;
  command: string;
  description?: string;
}

// Component props types
export interface LayoutProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  items: { id: string; title: string }[];
  activeId: string;
  onItemClick: (id: string) => void;
}

export interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export interface PageSectionProps {
  id: string;
  isActive: boolean;
  children: React.ReactNode;
}
