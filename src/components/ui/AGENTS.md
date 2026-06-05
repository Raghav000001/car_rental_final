# src/components/ui/ — Mixed-Domain Component Bucket

**8 files** (1 subsystem + 7 feature components). NOT a pure atomic UI folder — mixes primitives, domain sections, and a complex map subsystem.

## Files

| File | Type | Lines | Role |
|------|------|-------|------|
| `button.tsx` | primitive | ~80 | shadcn-style Button (cva, variants, asChild) |
| `how-it-works.tsx` | feature | ~100 | "How It Works" section (About page) — duplicate of `components/HowItWorks.tsx` |
| `page-not-found.tsx` | feature | ~360 | Animated 404 page with search + resource grid |
| `release-time-line.tsx` | feature | ~200 | Scroll-activated timeline ("Our Journey" on About) |
| `review-form.tsx` | feature | ~200 | Star-rating review form (home page) |
| `stagger-testimonials.tsx` | feature | ~250 | Hexagon clip-path carousel (testimonials page) |
| `team-showcase.tsx` | feature | ~200 | Hover-driven team layout (team page) |
| `mapcn-map-arc.tsx` | **subsystem** | **839** | MapLibre GL wrapper — Map, Marker, Popup, Controls, Route, Arc, ClusterLayer |

## Conventions

- **All files are `"use client"`** — every file here is interactive.
- **No barrel exports** — import by exact path (`@/components/ui/button`).
- **kebab-case filenames** — `release-time-line.tsx`, `how-it-works.tsx`, `page-not-found.tsx`.
- **Mixed concerns** — primitives (`button`), full sections (`how-it-works`, `team-showcase`), and complex subsystems (`mapcn-map-arc`) coexist.
- **`mapcn-map-arc.tsx`** is effectively a self-contained map library (7+ logical components in one file). Prime refactor candidate.

## Anti-Patterns

- **Duplicate concept**: `how-it-works.tsx` and `components/HowItWorks.tsx` are different implementations of the same idea.
- **Map subsystem** in `ui/` is misplaced — `mapcn-map-arc.tsx` belongs in its own `map/` directory.
- **2 eslint-disable suppressions** in this folder: `page-not-found.tsx:334` and `mapcn-map-arc.tsx:164` (both `react-hooks/exhaustive-deps`).
- **No index.ts** — every consumer must use exact file paths; refactoring requires updating all imports.
