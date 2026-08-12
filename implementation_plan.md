# Hair Technique - Landing Page Implementation Plan

## Project Structure
```
Hair technique/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── images/
    ├── logo.jpg          (204198538... - provided)
    ├── interior.webp     (unnamed.webp - provided)
    └── [external Unsplash images via URL]
```

## Sections
1. Navbar - Sticky, logo + nav links + CTA button
2. Hero - Full-viewport, spiral SVG background, GSAP headline animation
3. Marquee - Scrolling brand mantra text strip
4. The Technique - 4 craft pillars with icons
5. Our Story / The Vibe - Split layout with interior image
6. Services Showcase - 4 cards with hover flip animations
7. Why Choose Us - Trust differentiators
8. Gallery / Social Proof - Masonry-style grid
9. Testimonials - Sliding carousel
10. FAQ - Accordion
11. CTA Banner - Urgency + booking
12. Newsletter / VIP List - Email capture
13. Footer

## Tech Stack
- HTML5 semantic markup
- CSS custom properties (8px grid, CSS vars for colors)
- GSAP (CDN) for scroll animations
- ScrollTrigger plugin
- FontAwesome CDN for icons
- Iconify for additional icons
- Prefers-reduced-motion support throughout
