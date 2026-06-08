# ADR 0001: Use a modular monorepo

## Status

Accepted.

## Context

The template must demonstrate web, native shells, multiple backend services, infrastructure, and documentation without forcing users to open many repositories.

## Decision

Use a monorepo with `apps/`, `services/`, `infra/`, and `docs/`.

## Consequences

Benefits:

- Easier template discovery.
- Shared commands and docs.
- Simple local development.
- Clear cross-service examples.

Tradeoffs:

- CI must avoid running unnecessary work for small changes.
- Teams may later split services into separate repositories.
- Dependency management requires care across Node, Python, and Rust.
