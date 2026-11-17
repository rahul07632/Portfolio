# Rahul Vishwakarma — React Portfolio

React + Vite component-based portfolio. The existing visual design and portfolio sections are retained.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Updated interaction fixes
- Larger, high-contrast yellow custom cursor with smoother pointer tracking and a clear hover ring.
- Functional responsive mobile menu with all section links, close button, Escape-key support, and background scroll lock.
- Faster preloader exit and quicker scroll-reveal animations.
- Reduced-motion accessibility support.

## Project structure
- `src/components/` — reusable React UI components.
- `src/sections/` — portfolio sections.
- `src/App.jsx` — app composition and mobile menu state.
- `src/styles.css` — global styling and interaction states.
- `public/portfolio-interactions.js` — existing portfolio behaviours (theme, clock, Three.js, project interactions, resume, contact).

Tailwind CDN, Three.js, Lucide icons, and Google Fonts are loaded from `index.html`.
