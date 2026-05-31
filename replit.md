# Revansh Sharma — Portfolio

A cinematic 3D portfolio website — a dark, futuristic "digital headquarters" experience.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (port from `$PORT`)
- `pnpm --filter @workspace/portfolio run typecheck` — typecheck the portfolio

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React + Vite (artifact at `artifacts/portfolio/`)
- React Three Fiber + Drei — 3D canvas (HeroSection sphere, AISection neural net)
- GSAP + ScrollTrigger — scroll-triggered animations
- Framer Motion — page transitions, intro choreography
- Lenis — smooth scroll
- Tailwind CSS v4 — utility styling
- No backend — pure frontend presentation

## Where things live

- `artifacts/portfolio/src/components/chapters/` — all page sections
- `artifacts/portfolio/src/data/chapters.ts` — all content data (titles, subtitles, skills, etc.)
- `artifacts/portfolio/src/components/CustomCursor.tsx` — custom magnetic cursor
- `artifacts/portfolio/public/` — GIF assets: `spiderswing.gif`, `SimonWalk.gif`, `SimonStrongWhip.gif`
- `artifacts/portfolio/src/index.css` — theme (CSS vars), glass-card utility, slide-up keyframe

## Architecture decisions

- **R3F pattern**: Scene objects (`useFrame`, meshes) go INSIDE `<Canvas>` as children; never call R3F hooks from a component that also renders `<Canvas>`.
- **Intro choreography**: Spider-Man GIF flies across on load; title + button always visible underneath. Walking/whip GIFs play on "ENTER HEADQUARTERS" click before revealing main portfolio.
- **GIF background**: GIFs have a cyan background (#5BC8F5). Treated as intentional retro pixel art aesthetic; `imageRendering: pixelated` enhances this look.
- **Colors**: primary #c0c1ff (lavender), secondary #4cd7f6 (cyan), background #131313, tertiary #ffafd3 (pink).
- **Fonts**: Sora (display/headings), Inter (body), JetBrains Mono (mono) — loaded via Google Fonts in index.css.

## Product

Eight scrollable chapters: Hero (3D distorted sphere + particles), About, AI Projects (neural network canvas), Journey (timeline), Game Projects, Community/Commands, Contact, Portal.

## User preferences

- Dark, futuristic "digital headquarters" aesthetic
- Sprite GIF animations (Spider-Man, Simon) as cinematic intro elements
- Glassmorphic dark design with lavender/cyan palette

## Gotchas

- Lenis v1 constructor options: `orientation`, `gestureOrientation`, `smoothWheel`, `touchMultiplier` are all valid in v1.3.x
- `THREE.Clock` deprecation warning is harmless — comes from Three.js internals, not app code
- Do NOT add artifacts to root `tsconfig.json` references (leaf packages only)
