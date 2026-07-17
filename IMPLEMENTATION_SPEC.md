# Portfolio SPA Migration — Implementation Spec

Final version. Supersedes anything discussed earlier in chat.

## Routing

- Single page app. `app/page.tsx` renders all five panels (home, projects, skills, resume, contact).
- Panel state lives in the URL hash (`/#projects`), updated via `history.replaceState` on every switch so back/forward still work.
- Add redirects in `next.config.js` from the old route paths to their hash equivalents:
  - `/about` → `/#home`
  - `/projects` → `/#projects`
  - `/skills` → `/#skills`
  - `/resume` → `/#resume`
  - `/contact` → `/#contact`
- This is required, not optional. Anything already linking to the old paths (shared links, bookmarks) must keep working.

## Boot screen

- Lives in `app/boot-screen.tsx`, but it is an **overlay**, not a gate on rendering.
- The real page content (all five panels, real markup) renders in the initial HTML same as any normal page, so screen readers, crawlers, link-preview bots, and no-JS visitors get the actual content immediately.
- The boot screen sits visually on top, blocking interaction and hiding the content underneath, until:
  - It parses `window.location.hash` and resolves which panel should be active (a deep link to `/#projects` lands on projects, not home).
  - It runs `sessionStorage.getItem('boot-completed')` — if already set, skip the sequence entirely and clear the overlay immediately.
  - If not set, show the step sequence timed to the hash resolution, then `sessionStorage.setItem('boot-completed', 'true')` and clear the overlay.
- Net effect: JS-enabled first-time visitors see the full boot sequence. Returning visitors in the same session, no-JS visitors, and crawlers all get the real page with no fake delay.

## CSS

- Strip Tailwind entirely: remove `tailwindcss` and `@tailwindcss/postcss` from `package.json`, and delete `tailwind.config.ts` and the PostCSS config file, not just the dependency.
- One `app/globals.css`, plain CSS, adapted from `files/style.css`. Gruvbox tokens as CSS custom properties, matching the DESIGN_GUIDE color table.
- Sharp corners (no `border-radius`), no gradients, JetBrains Mono everywhere. No exceptions without updating DESIGN_GUIDE.md first.

## Components

**Create:**
| File | Purpose |
|---|---|
| `app/boot-screen.tsx` | Overlay boot sequence, resolves real hash, gates via sessionStorage, does not unmount page content |
| `app/page.tsx` | Client component, all 5 panels, wrapped by boot-screen overlay |
| `app/layout.tsx` | Topbar, sidebar nav, content area, status bar |

**Delete:**
- `app/themes/`, `app/components/ThemeProvider.tsx`, `app/components/ThemeSwitcher.tsx`, `app/components/MetroPageBackground.tsx`
- `app/components/SectionLayout.tsx`, `app/components/Header.tsx`
- `app/(sections)/` (all 6 subdirectories)
- `lib/themes.ts`, `lib/theme.ts`
- `app/globals.css` (replaced, not just deleted)

**Remove dependencies:** `framer-motion`, `phosphor-react`, `@dnd-kit/*`, `tailwindcss`, `@tailwindcss/postcss`

## Before deleting anything

1. Grep the full codebase for imports of everything on the delete list (`ThemeProvider`, `SectionLayout`, `phosphor-react`, etc.) in case something outside the six section folders depends on one of them.
2. Confirm `tailwind.config.ts` and the PostCSS config are actually removed, not left orphaned next to the new plain CSS.
3. Run `npm run build` locally and confirm it's clean before pushing to main. Deploy is auto-push-to-production with no manual approval step, so this is the only checkpoint before it's live.

## Reference

Color values, typography rules, and the do/avoid list live in `DESIGN_GUIDE.md`. If an implementation decision isn't covered here, that document is the tiebreaker, not personal judgment on the fly.
