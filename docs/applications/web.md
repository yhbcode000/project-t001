# Web App

`apps/web` is the primary product surface. It demonstrates a typed, animated, data-aware Next.js application that can also be wrapped by Capacitor and Electron.

## Included technologies

| Technology | Role |
| --- | --- |
| Next.js | App Router, page routing, build pipeline, API route compatibility |
| React | Component composition and interactive UI state |
| TypeScript | Type safety for components and API clients |
| Zustand | Lightweight local UI state |
| TanStack Query | Server-state fetching, caching, mutations, and loading states |
| GSAP | High-fidelity motion and ScrollTrigger animation |
| Tailwind CSS | Utility-first styling |
| Auth.js | Authentication route scaffold |

## Key files

| File | Purpose |
| --- | --- |
| `src/app/page.tsx` | Renders the Hello Dashboard |
| `src/app/admin/page.tsx` | Admin placeholder route |
| `src/app/layout.tsx` | Root layout |
| `src/app/globals.css` | Global Tailwind styles |
| `src/app/api/auth/[...nextauth]/route.ts` | Auth.js integration point |
| `src/components/hello-dashboard.tsx` | Main animated product demo |
| `src/components/providers.tsx` | React Query client provider |
| `src/lib/api.ts` | Browser API client helpers |
| `src/lib/gsap.ts` | GSAP defaults and plugin registration |
| `src/store/hello-store.ts` | Zustand store |

## Data flow

1. React renders the dashboard.
2. Zustand stores local UI values such as visitor name and visit count.
3. TanStack Query fetches `/hello` from FastAPI.
4. Mutations call backend endpoints for jobs, database writes, LiveKit tokens, agent plans, and automation intents.
5. WebSocket messages stream from the realtime service.
6. GSAP animates the shell without owning application state.

## Adding a page

1. Create `src/app/<route>/page.tsx`.
2. Use server components by default.
3. Add `'use client'` only when the page needs browser state or animation.
4. Use shared providers from `src/components/providers.tsx` when using TanStack Query.
5. Add tests for user-visible behavior.

## Adding an animated component

Follow the GSAP checklist:

- Put animation code in a client component.
- Use a `ref` as the `useGSAP` scope.
- Use `gsap.matchMedia()` for reduced-motion handling.
- Prefer `transform` and `opacity` over layout properties.
- Keep app state in React/Zustand/TanStack Query, not in timelines.
- Add test mocks when new GSAP APIs are introduced.

See [GSAP Animation System](../animation/gsap.md).
