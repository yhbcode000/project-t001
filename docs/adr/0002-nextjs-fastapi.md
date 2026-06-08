# ADR 0002: Pair Next.js with FastAPI

## Status

Accepted.

## Context

The template needs a modern frontend and a productive backend that can also support AI-native workflows.

## Decision

Use Next.js for the web app and FastAPI for the main SaaS API.

## Rationale

Next.js provides a strong React application shell, routing, and deployment ecosystem. FastAPI provides async Python APIs, Pydantic validation, OpenAPI generation, and proximity to the AI/data ecosystem.

## Consequences

Benefits:

- Fast iteration for full-stack teams.
- Clear frontend/backend boundary.
- Python service can integrate AI tooling naturally.

Tradeoffs:

- Type contracts should eventually be generated or shared.
- CORS, auth, and environment management must be configured carefully.
