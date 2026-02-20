# Inferenco Website

A modern, responsive website for Inferenco - transparent, on-chain AI solutions.

## 🚀 Quick Start

### Prerequisites
- Python 3.x (3.7 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Running

1. **Clone or download the project**
   ```bash
   # If using git
   git clone <repository-url>
   cd inferenco-v2
   
   # Or simply navigate to the project directory
   cd /path/to/inferenco-v2
   ```

2. **Start the local development server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in your browser**
   ```
   http://localhost:8000
   ```

### Alternative Server Options

If you prefer different servers:

**Using Node.js (if available):**
```bash
npx http-server -p 8000
```

**Using PHP (if available):**
```bash
php -S localhost:8000
```

**Using Live Server (VS Code extension):**
- Install "Live Server" extension
- Right-click on `index.html` → "Open with Live Server"

## 📁 Project Structure

```
inferenco-v2/
├── index.html              # Main homepage
├── nova.html               # Nova product page
├── styles.css              # Main stylesheet
├── assets/                 # Asset directory
│   ├── images/             # Background and general images
│   │   ├── cosmic-bg.png   # Hero background for main page
│   │   └── radial-bg.png   # Hero background for Nova page
│   ├── logos/              # Company and product logos
│   │   ├── flame.png       # Inferenco flame logo
│   │   ├── nova.png        # Nova star logo
│   │   └── horizontal-logo.png # Horizontal logo variant
│   └── icons/              # Icon assets (future use)
├── README.md               # This file
└── DESIGN.md               # Detailed design documentation
```

## 🎨 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Dark theme with cyan accents and smooth animations
- **Font Awesome Icons**: Themed icons throughout the interface
- **Professional Asset Organization**: Traditional web development structure
- **Cross-browser Compatibility**: Works on all modern browsers
- **Performance Optimized**: Fast loading with optimized assets

## 🔧 Development

### Making Changes

1. **Edit HTML files** for content changes
2. **Edit CSS files** for styling changes
3. **Add new assets** to appropriate folders in `assets/`
4. **Refresh browser** to see changes (or use live reload)

### File Organization

- **HTML**: Structure and content
- **CSS**: All styling and responsive design
- **Assets**: Organized by type (images, logos, icons)

### Best Practices

- Keep asset file names descriptive and lowercase
- Use semantic HTML elements
- Follow the existing CSS naming conventions
- Test on multiple screen sizes after changes

## 🐛 Troubleshooting

### Common Issues

**Images not loading:**
- Check file paths in HTML/CSS
- Ensure assets are in correct folders
- Verify file names match exactly (case-sensitive)

**Styles not updating:**
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Check CSS file path in HTML

**Server won't start:**
- Check if port 8000 is already in use
- Try different port: `python3 -m http.server 8080`
- Ensure you're in the correct directory

**Mobile responsiveness issues:**
- Test in browser dev tools
- Check CSS media queries
- Verify viewport meta tag in HTML

### Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile browsers**: Full support

## 📱 Pages Overview

### Homepage (`index.html`)
- Hero section with animated logo
- About section with company information
- Mission statement with values
- Call-to-action section

### Nova Page (`nova.html`)
- Product hero section
- Problem statement with pain points
- How Nova works (3-step process)
- Features grid
- Pricing table
- Call-to-action

## 🎯 Asset Organization

Following traditional web development conventions:

- **`assets/images/`**: Background images and general graphics
- **`assets/logos/`**: Company and product logos
- **`assets/icons/`**: Icon assets (ready for future use)

This structure makes it easy to:
- Locate specific asset types
- Maintain consistency across the project
- Scale the project as it grows
- Follow industry best practices

## 📚 Additional Documentation

For detailed design specifications, component documentation, and design decisions, see:
- **[DESIGN.md](./DESIGN.md)** - Comprehensive design documentation

## 🤝 Contributing

1. Follow the existing code structure
2. Test changes on multiple devices
3. Maintain responsive design principles
4. Update documentation as needed

## 📄 License

© 2026 Inferenco. All rights reserved.
