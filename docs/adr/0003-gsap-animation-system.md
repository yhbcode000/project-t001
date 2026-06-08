# ADR 0003: Use GSAP for the animation system

## Status

Accepted.

## Context

The template targets modern animation UI, not only static dashboards. It needs animation primitives that can handle timelines, scroll narratives, and polished product interactions.

## Decision

Use GSAP with `@gsap/react` and ScrollTrigger.

## Rationale

GSAP provides mature timeline control, performant transform/opacity animation, easing, staggers, and ScrollTrigger. The template follows Microck `gsap-skills` guidance for scoped React usage, cleanup, reduced motion, and performance.

## Consequences

Benefits:

- Premium product feel.
- Clear animation patterns for React components.
- Scroll-driven storytelling support.

Tradeoffs:

- Developers must avoid mixing animation state with application state.
- Tests need mocks for GSAP APIs.
- Reduced-motion behavior must be maintained.
