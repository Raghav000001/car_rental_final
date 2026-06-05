# Rohit Tour & Travel — Premium Car Rental Site

**Commit:** `b8112a5` (2026-06-03) · **Branch:** `master`  
**Stack:** Next.js 16.2.6 · React 19.2.4 · TypeScript 5 · Tailwind CSS v4  
**Entry:** `src/app/page.tsx` → `Home` (composes 17 components)  
**Routing:** App Router — 11 active routes (`/`, `/about`, `/team`, `/faq`, `/testimonials`, `/service-areas`, `/gallery`, `/fleet`, `/news`, `/contact`, `/not-found`); pricing and checkout were deleted  
**Dependencies:** next, react, react-dom, framer-motion, lucide-react, maplibre-gl, clsx, tailwind-merge, react-icons, class-variance-authority, @radix-ui/react-slot, nodemailer, mailgen  
**Brand name:** "Rohit Tour & Travel" (package name `carola-temp` — legacy, ignore)  

## Structure

```
src/
├── app/                     # App Router pages (10 active routes)
│   ├── layout.tsx           # RootLayout — Inter font via CSS variable
│   ├── page.tsx             # Home — composes 17 components inline
│   ├── globals.css          # Tailwind v4 @import + @theme inline + custom utilities
│   ├── not-found.tsx        # 404 page with quick-links grid
│   ├── about/page.tsx       # Server component, ~590 lines
│   ├── contact/page.tsx     # Server component — ContactSection + ContactMapSection
│       ├── faq/page.tsx         # "use client" — accordion + category filter
    ├── news/page.tsx        # Server component — PageHero + NewsFeed (filters, grid, search, load-more) + Newsletter
    ├── news/[slug]/page.tsx # Server component — full article with content, related articles, Newsletter
    ├── news/articles.ts     # Shared article data (15 articles with full body content)
│   ├── gallery/page.tsx     # "use client" — filter + lightbox + load-more
│   ├── service-areas/page.tsx # "use client" — MapLibre GL map + city grid
│   ├── team/page.tsx        # Server component — leadership cards + stats
│   └── testimonials/page.tsx # Server component — static grid + stats
├── app/api/
│   └── contact/route.ts     # POST — nodemailer + Mailgen emails (admin + user)
├── components/              # 29 files (28 components + 1 ui/)
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
    ├── FloatingContactButtons.tsx # "use client" — floating phone/WhatsApp CTA
    ├── BentoCard.tsx         # Reusable bento wrapper (variant, delay, as)
    ├── PageHero.tsx          # Reusable hero with breadcrumbs + CTA
    ├── AnimatedCounter.tsx   # "use client" — framer-motion count-up when in view
    ├── FloatingElement.tsx   # "use client" — framer-motion decorative float
    ├── ParallaxSection.tsx   # "use client" — framer-motion parallax scroll
    ├── ScrollReveal.tsx      # "use client" — scroll-triggered reveal + exports StaggerItem
    ├── ui/
    │   ├── button.tsx          # "use client" — shadcn-style Button (cva, variants, asChild)
    │   ├── how-it-works.tsx   # "use client" — How It Works section (kebab-case, named export; unnecessarily client)
    │   ├── mapcn-map-arc.tsx  # "use client" — MapLibre GL wrapper (Map, MapMarker, Popup, Route, Controls); 839 lines
    │   ├── page-not-found.tsx # "use client" — animated 404 page section with search/resources
    │   ├── release-time-line.tsx # "use client" — scroll-activated timeline (Our Journey on About page)
    │   ├── review-form.tsx       # "use client" — review form with star rating (used on home page)
    │   ├── stagger-testimonials.tsx # "use client" — staggered card carousel with clip-path hexagons
    │   └── team-showcase.tsx  # "use client" — team section with hover-driven layout (used by Team page)
└── lib/                        # Shared utilities (1 file)
    └── utils.ts                # `cn()` — clsx + twMerge helper
```

## CODE MAP

| Page / Module | Type | Complexity | Data Pattern |
|---|---|---|---|
| `/` (page.tsx) | server · 16 imports | medium | static composition |
| `/about` | server · 8 imports | medium | static inline arrays |
| `/contact` | server · 4 imports | low | delegates to client components |
| `/faq` | client · 3 imports | low | static FAQ + local state |
| `/fleet` | client · 12 imports | **high** | static dataset + filter/paginate/compare |
| `/gallery` | client · 3 imports | low | static array + filter/lightbox |
| `/news` | server · 4 imports | low | delegates to NewsFeed |
| `/news/[slug]` | server+async · 10 imports | **high** | shared articles + genStaticParams |
| `/service-areas` | client · 8 imports | **high** | static coords + MapLibre map |
| `/team` | server · 6 imports | low | static |
| `/testimonials` | server · 5 imports | low | delegates to client components |

**Large File Hotspots (>500 lines):** `ui/mapcn-map-arc.tsx` (839), `fleet/page.tsx` (704), `Navbar.tsx` (666), `fleet/vehicleData.ts` (522), `globals.css` (520)

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
| Contact form API | `src/app/api/contact/route.ts` — POST handler with nodemailer + Mailgen |
| Contact form UI | `src/components/ContactSection.tsx` — "use client" form with validation, loading, success states |
| Contact map | `src/components/ContactMapSection.tsx` — "use client" MapLibre map showing office location |
| Route-local data | `src/app/<name>/` can colocate data/types (fleet route does this via `vehicleData.ts` + `types.ts`) |
| News data & articles | `src/app/news/articles.ts` — Article type, categories, all 15 articles with full body |
| Fleet data & types | `src/app/fleet/vehicleData.ts`, `src/app/fleet/types.ts` |
| Map subsystem | `src/components/ui/mapcn-map-arc.tsx` (Map, MapMarker, Popup, Route, Controls) |
| Custom page hero | `PageHero` component (title, subtitle, crumbs, badge props) |
| Scroll-reveal animations | `ScrollReveal` (direction, stagger, staggerDelay) — wraps any section |
| Staggered children | `StaggerItem` (imported from ScrollReveal) — inside a `ScrollReveal` with `stagger` |
| Count-up number | `AnimatedCounter` (to, duration, prefix, suffix) |
| Parallax depth | `ParallaxSection` (speed, offset) |
| Decorative float | `FloatingElement` (distance, duration, delay) |
| Service-areas map route | `src/app/service-areas/page.tsx` — client, MapLibre GL, city grid, embedded iframes |

## Page Complexity Clusters

| Cluster | Pages | Risk |
|---------|-------|------|
| **High complexity** | `/fleet`, `/news/[slug]`, `/service-areas` | Hardest to maintain/modify |
| **Medium** | `/`, `/about`, `/faq`, `/gallery` | Moderate |
| **Low (thin shells)** | `/contact`, `/news`, `/team`, `/testimonials` | Easy, delegate to sections |

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
- **ESLint:** Uses `eslint.config.mjs` (flat config, ESLint 9) with `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. No `.eslintrc.*` file.
- **`"use client"` count:** 27 client-side components across the project (all interactive pages + sections with state/effects/hooks).
- **CSS utility classes in globals.css:** `.glass`, `.glass-light`, `.shine-effect`, `.dot-pattern`, `.grid-pattern`, `.card-hover`, `.shadow-premium`, `.shadow-glow-red`, `.reveal`, `.text-gradient-primary`, etc. Browse `globals.css` before adding new utility classes.

## Anti-Patterns / Gotchas

- **No tests** — zero test setup or test files. `npm test` will not work.
- **eslint-disable suppressions** — 2 files suppress `react-hooks/exhaustive-deps`: `ui/page-not-found.tsx:334` and `ui/mapcn-map-arc.tsx:164`.
- **No barrel files** — no `index.ts` re-exports in any `src/` directory. All components must be imported by their exact file path.
- **Hardcoded content** — all text, pricing, team data is inline in components. No CMS, i18n, or data files.
- **API routes** — `src/app/api/contact/route.ts` is the only API route (nodemailer + Mailgen). No other API routes exist.
- **Checkout & pricing pages deleted** — `src/app/checkout/page.tsx` (4-step booking wizard) and `src/app/pricing/page.tsx` (cycle switcher) were removed from the working tree. No replacements exist yet.
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
npm run build       # production build (all 9 routes static)
npm run start       # start production server
npm run lint        # ESLint (core-web-vitals + TypeScript)
npm run dev -- --turbopack  # faster dev (Turbopack)
```

No typecheck script exists — TypeScript checking happens via `next build` or the LSP.
