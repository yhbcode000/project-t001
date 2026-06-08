# ADR 0004: Keep AI Agent and desktop automation behind an intent boundary

## Status

Accepted.

## Context

AI-native apps may need to operate tools, desktops, files, and external APIs. These actions can be sensitive, expensive, or irreversible.

## Decision

Represent agent actions and desktop automation as auditable command intents first. Native execution should be added only behind explicit controls.

## Rationale

An intent boundary lets the product record, display, approve, deny, replay-protect, and audit sensitive actions before native adapters execute them.

## Consequences

Benefits:

- Safer default template.
- Easier compliance and debugging.
- Clear path to user approvals and audit logs.

Tradeoffs:

- More plumbing is required before real automation works.
- Product teams must design permission UX deliberately.
