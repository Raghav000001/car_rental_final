# Rohit Tour & Travel — Premium Car Rental Site

**Stack:** Next.js 16.2.6 · React 19.2.4 · TypeScript 5 · Tailwind CSS v4  
**Entry:** `src/app/page.tsx` → `Home` (composes 17 components)  
**Routing:** App Router — 11 routes (`/`, `/about`, `/team`, `/faq`, `/testimonials`, `/service-areas`, `/gallery`, `/pricing`, `/fleet`, `/checkout`, `/not-found`)  
**Dependencies:** next, react, react-dom, framer-motion, lucide-react, maplibre-gl, clsx, tailwind-merge, react-icons  
**Brand name:** "Rohit Tour & Travel" (package name `carola-temp` — legacy, ignore)  

## Structure

```
src/
├── app/                     # App Router pages (11 routes)
│   ├── layout.tsx           # RootLayout — Inter font via CSS variable
│   ├── page.tsx             # Home — composes 17 components inline
│   ├── globals.css          # Tailwind v4 @import + @theme inline + custom utilities
│   ├── not-found.tsx        # 404 page with quick-links grid
│   ├── about/page.tsx       # Server component, ~590 lines
│   ├── checkout/page.tsx    # "use client" — 4-step booking wizard (deleted from working tree)
│   ├── faq/page.tsx         # "use client" — accordion + category filter
│   ├── gallery/page.tsx     # "use client" — filter + lightbox + load-more
│   ├── pricing/page.tsx     # "use client" — cycle switcher (hourly/daily/weekly/monthly)
│   ├── service-areas/page.tsx # "use client" — MapLibre GL map + city grid
│   ├── team/page.tsx        # Server component — leadership cards + stats
│   └── testimonials/page.tsx # Server component — static grid + stats
└── components/              # 26 files (25 components + 1 ui/)
    ├── Navbar.tsx            # "use client" — sticky, mobile drawer, search modal
    ├── HeroSlider.tsx        # "use client" — auto-rotating hero
    ├── SearchBar.tsx         # "use client" — destination, date pickers, passengers
    ├── AboutSection.tsx      # Server component (uses ParallaxSection, StaggerItem)
    ├── HowItWorks.tsx        # Server component (uses StaggerItem)
    ├── PromoBanners.tsx      # Server component (uses StaggerItem)
    ├── CarTypes.tsx          # Server component (uses StaggerItem)
    ├── CarFleet.tsx          # Server component (uses StaggerItem)
    ├── FleetFilters.tsx      # "use client" — filter sidebar (type, seating, price)
    ├── FleetPagination.tsx   # "use client" — paginated grid controls
    ├── VehicleCard.tsx       # "use client" — fleet vehicle card with entrance animation
    ├── VehicleComparisonModal.tsx # "use client" — side-by-side compare overlay
    ├── BrandsCarousel.tsx    # Server component — marquee (duplicated list)
    ├── VideoSection.tsx      # "use client" — framer-motion player
    ├── TeamSection.tsx       # Server component
    ├── ServiceLocations.tsx  # "use client" — MapLibre map
    ├── Testimonials.tsx      # "use client" — carousel with prev/next + framer-motion
    ├── Newsletter.tsx        # Server component
    ├── Footer.tsx            # Server component
    ├── BentoCard.tsx         # Reusable bento wrapper (variant, delay, as)
    ├── PageHero.tsx          # Reusable hero with breadcrumbs + CTA
    ├── AnimatedCounter.tsx   # "use client" — framer-motion count-up when in view
    ├── FloatingElement.tsx   # "use client" — framer-motion decorative float
    ├── ParallaxSection.tsx   # "use client" — framer-motion parallax scroll
    ├── ScrollReveal.tsx      # "use client" — scroll-triggered reveal + exports StaggerItem
    ├── ui/
    │   ├── button.tsx          # "use client" — shadcn-style Button (cva, variants, asChild)
    │   ├── how-it-works.tsx   # "use client" — How It Works section (kebab-case, named export; unnecessarily client)
    │   ├── mapcn-map-arc.tsx  # "use client" — MapLibre GL wrapper (Map, MapMarker, Popup, Route, Controls); 839 lines, needs splitting
    │   ├── release-time-line.tsx # "use client" — scroll-activated timeline (Our Journey on About page)
    │   ├── review-form.tsx       # "use client" — review form with star rating (used on home page)
    │   ├── stagger-testimonials.tsx # "use client" — staggered card carousel with clip-path hexagons
    │   └── team-showcase.tsx  # "use client" — team section with hover-driven layout (used by Team page)
    └── lib/                    # Shared utilities
        └── utils.ts            # `cn()` — clsx + twMerge helper
```

## Where to Look

| Task | Location |
|------|----------|
| Add/modify a section | `src/components/` — create file, import in target page |
| Change theme/spacing | `src/app/globals.css` — `@theme inline` tokens |
| Nav items / dropdowns | `src/components/Navbar.tsx` — `navItems` array (lines 9-57) |
| Layout wrapper | `src/app/layout.tsx` |
| Image domains | `next.config.ts` — `images.remotePatterns[]` |
| Font | `layout.tsx` — Inter via `next/font/google` |
| Add a new route | Create `src/app/<name>/page.tsx`, import Navbar + Footer + sections |
| Route-local data | `src/app/<name>/` can colocate data/types (fleet route does this via `vehicleData.ts` + `types.ts`) |
| Fleet data & types | `src/app/fleet/vehicleData.ts`, `src/app/fleet/types.ts` |
| Map subsystem | `src/components/ui/mapcn-map-arc.tsx` (Map, MapMarker, Popup, Route, Controls) |
| Custom page hero | `PageHero` component (title, subtitle, crumbs, badge props) |
| Scroll-reveal animations | `ScrollReveal` (direction, stagger, staggerDelay) — wraps any section |
| Staggered children | `StaggerItem` (imported from ScrollReveal) — inside a `ScrollReveal` with `stagger` |
| Count-up number | `AnimatedCounter` (to, duration, prefix, suffix) |
| Parallax depth | `ParallaxSection` (speed, offset) |
| Decorative float | `FloatingElement` (distance, duration, delay) |

## Conventions

- **Client components:** Must start with `"use client"`. Interactive pages: faq, fleet, gallery, pricing, service-areas. Interactive sections: Navbar, HeroSlider, SearchBar, ServiceLocations, Testimonials, mapcn-map-arc.
- **Server components:** Default (no directive). All section components *without* event handlers or hooks.
- **`src/components/ui/` is NOT a pure atomic UI folder** — it mixes primitives (`button`), feature sections (`how-it-works`, `team-showcase`), and a map subsystem (`mapcn-map-arc`). Expect domain components, not just design atoms.
- **Animation helpers (framer-motion):** 4 reusable animation components available:
  - `ScrollReveal` — wraps sections for scroll-triggered reveal (6 directions: up/down/left/right/scale/fade). Exports `StaggerItem` for staggered children inside a `ScrollReveal` with `stagger` prop. Used on Home page for all sections.
  - `ParallaxSection` — parallax scroll effect (used in AboutSection).
  - `AnimatedCounter` — count-up animation when element scrolls into view.
  - `FloatingElement` — decorative continuous float animation.
  - All respect `prefers-reduced-motion` via framer-motion's `useReducedMotion`.
- **All pages** include `<Navbar />` + `<Footer />` directly (not in layout). Each page manages its own `<main>` wrapper. Some pages also include `<Newsletter />`.
- **Imports:** `@/components/X` alias (mapped in tsconfig paths).
- **Styling:** Tailwind CSS v4 with `@theme inline` tokens in `globals.css`.
  - Custom colors: `primary` (#dc2626), `primary-dark` (#b91c1c), `secondary` (#0a0a0a), `body` (#9ca3af), `heading` (#f3f4f6), `bg-light` (#1a1a1a), `bg-dark` (#111111), `footer-bg` (#050505), `star` (#f59e0b), `border-light` (#27272a).
- **No CSS modules or CSS-in-JS** — Tailwind utility classes + global CSS utilities.
- **Animations:** 15 `--animate-*` utilities in `@theme inline` backed by 18 `@keyframes` (marquee, fadeIn, fadeInUp/Down, slideUp/Left/Right, scaleIn, float, glow, shine, pulseStrong, gradientShift, bounceSlow, spinSlow, shimmer, textReveal, bentoFadeIn).
- **Bento system:** Reusable CSS classes (`.bento`, `.bento-card`, `.bento-card-featured`, `.bento-card-inset`, `.bento-chip`, `.bento-fade-in-N`) plus `<BentoCard>` component.
- **Icons:** Inline SVGs throughout (Heroicons-style paths). No external icon library except lucide-react in `mapcn-map-arc.tsx`.
- **CSS utility classes in globals.css:** `.glass`, `.glass-light`, `.shine-effect`, `.dot-pattern`, `.grid-pattern`, `.card-hover`, `.shadow-premium`, `.shadow-glow-red`, `.reveal`, `.text-gradient-primary`, etc. Browse `globals.css` before adding new utility classes.

## Anti-Patterns / Gotchas

- **No tests** — zero test setup or test files. `npm test` will not work.
- **Hardcoded content** — all text, pricing, team data is inline in components. No CMS, i18n, or data files.
- **No API routes** — `src/app/api/` does not exist. Forms (FAQ, checkout, newsletter) use `onSubmit(e => e.preventDefault())` — no backend submissions.
- **Checkout page deleted** — `src/app/checkout/page.tsx` has been removed from the working tree (was a 4-step booking wizard). No replacement exists yet.
- **`href="#"`** — many nav links (Car Listing, Blog, Area Details) are placeholder anchors.
- **`next.config.ts`** — only configures `images.remotePatterns`. No env vars, redirects, or headers.
- **`img` not `next/image`** — section components use plain `<img>` with `loading="lazy"` instead of `<Image>`. Only `about/page.tsx` uses `next/image`.
- **Grain overlay** — `body::before` injects a fixed SVG grain texture (`z-index: 1000`, `pointer-events: none`). May interfere with sticky positioning in some browsers.
- **`[color-scheme:dark]`** — date inputs in SearchBar and Checkout use this Tailwind arbitrary value for dark calendar picker.
- **`public/` is empty** — all images are external URLs (picsum.photos, unsplash, pravatar.cc), configured in `next.config.ts` remotePatterns.
- **Large file hotspots** — 5 files >500 lines: `ui/mapcn-map-arc.tsx` (839), `fleet/page.tsx` (704), `Navbar.tsx` (666), `fleet/vehicleData.ts` (522), `globals.css` (520). Prime candidates for splitting.
- **Split HowItWorks** — `src/components/HowItWorks.tsx` (Home page) and `src/components/ui/how-it-works.tsx` (About page) are separate components with different implementations but the same concept.
- **No CI/CD** — no `.github/` directory, no CI workflows, no Dockerfile, no vercel.json.
- **`.playwright-mcp/`** — contains Playwright MCP logs and page snapshots from agent browsing sessions. Not part of the app.
- **README.md** — stale create-next-app boilerplate. Not reflective of the actual project. `AGENTS.md` is the authoritative reference.
- **CLAUDE.md** — simply references `@AGENTS.md`. Not maintained separately.
- **Font:** Uses `Inter` (not Geist as the boilerplate README claims) via `next/font/google` with `variable: "--font-inter"`. The `html` element gets `className={inter.variable}` and the CSS `font-sans` token references `"Inter", ui-sans-serif, ...`.

## Commands

```bash
npm run dev         # dev server on localhost:3000
npm run build       # production build (all 11 routes static)
npm run start       # start production server
npm run lint        # ESLint (core-web-vitals + TypeScript)
npm run dev -- --turbopack  # faster dev (Turbopack)
```

No typecheck script exists — TypeScript checking happens via `next build` or the LSP.
