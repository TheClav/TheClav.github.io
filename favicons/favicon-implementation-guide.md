# Favicon Implementation Instructions for Claude Code

## Objective
Add a custom favicon to the website using the "Primary Gradient" CD logo design.

## Design Specifications

### Visual Design
- **Content**: "CD" text in a circular logo
- **Background**: Linear gradient from purple to orange (135deg, #a855f7 to #f97316)
- **Text Color**: White (#ffffff)
- **Font Weight**: Bold (700)
- **Font Size**: Large enough to be readable at small sizes (recommend 72-80px for a 100x100 canvas)
- **Letter Spacing**: Tight (-0.03em or -2 to -3px)

### Technical Requirements

1. **Create an SVG favicon file** at `favicon.svg` with these exact specifications:
   - Circular shape (viewBox="0 0 100 100")
   - Gradient definition with id "primaryGradient"
   - Gradient: `<linearGradient x1="0%" y1="0%" x2="100%" y2="100%">`
   - Stop 1: offset="0%" color="#a855f7"
   - Stop 2: offset="100%" color="#f97316"
   - Circle element with gradient fill
   - Text element "CD" centered, white, bold

2. **Generate PNG favicons** in multiple sizes:
   - 16x16 (favicon-16x16.png)
   - 32x32 (favicon-32x32.png)
   - 180x180 (apple-touch-icon.png for iOS)
   - 192x192 (android-chrome-192x192.png)
   - 512x512 (android-chrome-512x512.png)

3. **Create a site.webmanifest** file:
```json
{
  "name": "Your Portfolio",
  "short_name": "CD",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#a855f7",
  "background_color": "#12101a",
  "display": "standalone"
}
```

4. **Add to the HTML `<head>` section**:
```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#a855f7">
```

## Implementation Steps

1. Create the SVG favicon file with the gradient circle and "CD" text
2. Use a library or tool to generate PNG versions from the SVG (or create them programmatically using Canvas/sharp)
3. Create the site.webmanifest file
4. Add the favicon link tags to the HTML head
5. Place all files in the root directory (or appropriate public/static folder depending on the project structure)

## Color Palette Reference
- Primary Purple: #a855f7
- Secondary Orange: #f97316
- Background Dark: #12101a
- Text Light: #e8e4f0

## Testing
After implementation, test the favicon by:
- Checking browser tab icon
- Testing on mobile (add to home screen)
- Viewing in different browsers (Chrome, Firefox, Safari)
- Checking dark mode compatibility

## Notes
- SVG favicon provides best quality and smallest file size
- PNG fallbacks ensure compatibility with older browsers
- The gradient should maintain readability even at 16x16 size
- Consider slightly increasing letter spacing at very small sizes if needed
