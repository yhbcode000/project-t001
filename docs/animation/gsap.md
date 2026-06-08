# GSAP Animation System

The web app uses GSAP for premium motion while React remains responsible for application state.

## Why GSAP

GSAP is a strong fit for modern animation UI because it provides:

- Timelines for orchestrated motion.
- Staggers for natural sequence effects.
- ScrollTrigger for scroll-driven narratives.
- Easing controls for product polish.
- Excellent React integration through `@gsap/react`.
- High-performance transform/opacity animation patterns.

## Template pattern

The template follows the downloaded Microck `gsap-skills` guidance:

- Use `@gsap/react` and `useGSAP()`.
- Scope selectors to a component `ref`.
- Clean up animations on unmount.
- Use `gsap.matchMedia()` for responsive and reduced-motion behavior.
- Prefer `transform` and `opacity`; avoid animating layout properties.
- Use reasonable staggers.
- Keep timeline logic separate from app state.

## Current dashboard animation

`apps/web/src/components/hello-dashboard.tsx` demonstrates:

- Hero text reveal.
- Card entrance animation.
- Infinite orbit dot rotation.
- ScrollTrigger-powered motion rail.
- Scroll-revealed lower cards.
- Staggered stack chips.
- Reduced-motion fallback.

## Reduced motion

Users who prefer reduced motion should still see the content immediately. The template uses `prefers-reduced-motion: reduce` to clear animation properties and set elements visible.

## New animation checklist

Before adding an animation:

1. Confirm the component is a client component.
2. Add a container `ref`.
3. Use `useGSAP(callback, { scope: container })`.
4. Use `gsap.matchMedia()` for reduced motion.
5. Animate only `x`, `y`, `scale`, `rotate`, `opacity`, or similar compositor-friendly properties.
6. Avoid layout properties such as `width`, `height`, `top`, `left`, `margin`, and `padding`.
7. Add tests or mocks for new GSAP APIs.
8. Test on smaller screens.
