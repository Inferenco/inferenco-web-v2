# Inferenco Web App - Deployment Guide

This is a single-page application (SPA) that combines all content into one file for easy deployment on GitHub Pages.

## Structure

- `app.html` - Main SPA file containing all pages and functionality
- `index.html` - Redirect file that automatically redirects to `app.html`
- `styles.css` - All styles for the application
- `assets/` - Images and logos
- Other files - SEO and configuration files

## GitHub Pages Deployment

### Option 1: Direct Deployment
1. Push all files to your GitHub repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" → "main" → "/ (root)"
4. Your site will be available at `https://username.github.io/repository-name/`

### Option 2: Custom Domain
1. Follow Option 1 steps
2. Add your custom domain in the "Custom domain" field
3. Ensure your domain's DNS points to GitHub Pages
4. The `CNAME` file is already configured

## Features

### Single Page Application
- Client-side routing with hash-based navigation
- No server-side rendering required
- Fast navigation between pages
- SEO-friendly with dynamic meta tag updates

### GitHub Pages Compatible
- No build process required
- All assets are self-contained
- Works with GitHub Pages' static hosting
- Automatic redirects from old URLs

### Navigation
- `#home` or `/` - Home page
- `#nova` - Nova product page
- Browser back/forward button support
- Deep linking support

## File Modifications

### What Changed
1. Combined `index.html` and `nova.html` into `app.html`
2. Added JavaScript-based SPA routing
3. Updated navigation to use hash-based routing
4. Added dynamic meta tag updates for SEO
5. Created redirect from old `index.html` to `app.html`

### Preserved Features
- All original content and design
- Complete CSS styling
- SEO meta tags and structured data
- Responsive design
- All animations and interactions

## Testing Locally

1. Open `app.html` in a web browser
2. Test navigation between Home and Nova pages
3. Test browser back/forward buttons
4. Test direct URL access with `#home` and `#nova`

## Maintenance

- To update content: Edit the corresponding sections in `app.html`
- To update styles: Edit `styles.css`
- To add new pages: Add new page sections and update the router
- To update assets: Replace files in the `assets/` directory
