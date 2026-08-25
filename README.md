# Delhi World Public School — Website

Production-ready **Vite + React + React Router** project.

## Run locally
```bash
npm install
npm run dev
```
Open the printed URL (usually http://localhost:5173).

## Build for production
```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

## Project structure
```
public/
  images/            # every photo slot, by filename (see images/README.md)
  dwps-logo.png      # full lockup logo
  dwps-crest.png     # crest only
src/
  main.jsx           # entry
  App.jsx            # all routes
  styles/global.css  # the DWPS design system
  data/
    site.js          # nav, contacts, enquiry URL
    home.js          # homepage content
    content.js       # content for every interior page (edit here)
  lib/assets.js      # image path helper + slug
  components/
    ui.jsx           # Band, SectionHead, Media, Card, Hero, CTA, CountUp, icons…
    layout.jsx       # AnnouncementBar, Header (mega-menu), Footer, Layout…
  pages/
    Home.jsx         # fully designed homepage
    InteriorPage.jsx # content-driven engine for all interior pages
    NotFound.jsx
```

## Adding real photos
Replace any file in `public/images/` with a real photo of the **same filename**.
No code changes needed. See `public/images/README.md` for the slot list + aspect ratios.

## Editing page content
All interior-page text lives in `src/data/content.js`, keyed by route.
Placeholder content is clearly marked; replace with verified school information.
