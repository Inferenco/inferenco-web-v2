# Migration Guide: Vite, TypeScript, React, and CI Setup

## Overview
This guide outlines the process to migrate the Inferenco Web App from its current single-page application (SPA) structure to a modern Vite-based React application with TypeScript and CI/CD setup for GitHub Pages deployment.

## Current Project Structure
- Single HTML file (`app.html`) with inline JavaScript and CSS
- JavaScript-based SPA navigation system
- No build process or module bundling
- No testing framework
- No CI/CD pipeline

## Target Architecture
- Vite.js for fast development and building
- React 18+ with TypeScript
- Component-based architecture
- GitHub Actions for CI/CD
- GitHub Pages deployment
- Testing framework (Vitest + React Testing Library)

## Migration Steps

### 1. Project Setup

#### Initialize Vite Project
```bash
npm create vite@latest inferenco-web-app -- --template react-ts
cd inferenco-web-app
npm install
```

#### Install Additional Dependencies
```bash
npm install react-router-dom @types/react-router-dom
npm install --save-dev gh-pages
```

### 2. Code Migration

#### Convert HTML Structure to React Components
- Break down `app.html` into logical React components
- Create component hierarchy:
  - `App.tsx` (main router)
  - `Home.tsx`
  - `Nova.tsx`
  - `NovaWallet.tsx`
  - `NovaDesk.tsx`
  - `Docs.tsx` (with sub-components)
  - `Layout.tsx` (shared layout)
  - `Sidebar.tsx`
  - `Navigation.tsx`

#### Migrate JavaScript Logic
- Convert vanilla JS navigation to React Router
- Move utility functions to separate modules
- Convert inline event handlers to proper React handlers

#### Migrate CSS
- Extract inline styles to CSS modules or styled-components
- Convert global styles to CSS-in-JS or separate CSS files
- Ensure responsive design is preserved

### 3. TypeScript Integration

#### Add Type Definitions
- Create type definitions for all props and state
- Add interfaces for API responses (if applicable)
- Type all component props

#### Configure TypeScript
- Update `tsconfig.json` with strict mode
- Add type checking for all files

### 4. Vite Configuration

#### Update `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/inferenco-web-app/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
```

### 5. GitHub Pages Setup

#### Add Deployment Script
Add to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist",
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

#### Configure GitHub Pages
1. Create `.github/workflows/deploy.yml`
2. Set GitHub Pages source to `gh-pages` branch

### 6. CI/CD Pipeline

#### Create GitHub Actions Workflow
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: npm run deploy
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 7. Testing Setup

#### Install Testing Dependencies
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

#### Configure Vitest
Add to `vite.config.ts`:
```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/setupTests.ts',
}
```

### 8. Migration Checklist

- [ ] Initialize Vite + React + TypeScript project
- [ ] Break down HTML into React components
- [ ] Convert JavaScript logic to React hooks
- [ ] Migrate CSS to modern styling solution
- [ ] Add TypeScript types and interfaces
- [ ] Configure Vite for production build
- [ ] Set up React Router navigation
- [ ] Configure GitHub Pages deployment
- [ ] Create CI/CD pipeline
- [ ] Add testing framework
- [ ] Verify all content is migrated
- [ ] Test responsive design
- [ ] Test navigation and routing
- [ ] Deploy to GitHub Pages

## Post-Migration Tasks

1. **Content Audit**: Verify all documentation content is properly migrated
2. **SEO Optimization**: Add proper meta tags and OpenGraph support
3. **Performance Optimization**: Implement code splitting and lazy loading
4. **Accessibility Audit**: Ensure WCAG compliance
5. **Analytics Integration**: Add Google Analytics or similar
6. **Error Tracking**: Set up Sentry or similar error monitoring

## Estimated Timeline

- Initial setup: 1-2 hours
- Component migration: 4-8 hours
- TypeScript integration: 2-4 hours
- Testing setup: 2 hours
- CI/CD configuration: 1 hour
- Deployment and verification: 2 hours

Total: 12-18 hours depending on complexity and familiarity with tools

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GitHub Pages Guide](https://pages.github.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

## Notes

- Preserve all existing content during migration
- Maintain the same visual design and user experience
- Ensure all documentation sections are properly organized
- Test thoroughly on different devices and browsers
- Consider implementing a backup of the current version before migration