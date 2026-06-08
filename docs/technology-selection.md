# Technology Selection

This project is a complete Hello World template for a modern animation UI and AI-native application. The stack is intentionally modular: each runtime has one clear job, and every service demonstrates a real integration point instead of being only a placeholder.

## Complete stack map

```text
Frontend
├─ Next.js        Web app, routing, SSR/SEO, admin console
├─ React          Component model for interactive UI
├─ TypeScript     Type safety across UI and API clients
├─ Zustand        Local UI/session state
├─ TanStack Query Server-state fetching, caching, retries
├─ GSAP           High-fidelity animation timelines and ScrollTrigger
├─ Tailwind CSS   Token-driven utility styling
└─ Auth.js        Authentication boundary for SaaS surfaces

Mobile
└─ Capacitor      iOS / Android shell over the web app

Desktop
└─ Electron       macOS / Windows shell and native automation bridge

Backend
├─ FastAPI        Main SaaS API
├─ Python         AI/data ecosystem compatibility
├─ PostgreSQL     Durable relational data
├─ Redis          Cache, queue broker, realtime Pub/Sub
└─ MinIO          S3-compatible object storage

Realtime
├─ WebRTC         Peer/media transport model
├─ LiveKit        Production-grade WebRTC service layer
├─ WebSocket      App realtime messaging
└─ Redis Pub/Sub  Backend fanout between realtime instances

Queue / Jobs
├─ Celery / RQ    Background task pattern
└─ Redis Queue    Broker/result path for async work

High Performance
└─ Axum / Rust    Low-latency edge/microservice path

Monitoring
├─ OpenTelemetry  Distributed traces and metrics instrumentation
├─ Prometheus     Metrics collection
├─ Grafana        Dashboards
└─ Sentry         Error monitoring
```

## Why these choices fit modern animation UI

| Need | Choice | Reason |
| --- | --- | --- |
| Fast product shell | Next.js | App Router, server/client component split, API-route compatibility, and deployment portability make it a strong default for SaaS frontends and admin consoles. |
| Composable interaction model | React | Component composition maps well to animated sections, cards, forms, realtime panels, and AI-generated UI state. |
| Safer large UI codebases | TypeScript | Typed API clients and component props reduce integration drift as web, desktop, mobile, and backend teams move independently. |
| Local UI state | Zustand | Lightweight stores are ideal for user preferences, current visitor name, local counters, and optimistic UI without boilerplate. |
| Server state | TanStack Query | Built-in caching, loading states, mutations, retries, and invalidation keep frontend code predictable when multiple services are involved. |
| Premium motion | GSAP | GSAP timelines, ScrollTrigger, staggers, easing, and `@gsap/react` cleanup create high-fidelity UI motion while avoiding layout thrash. This repository follows the downloaded `Microck/gsap-skills` React, ScrollTrigger, and performance guidance: scoped selectors, transform/opacity animations, reasonable staggers, and reduced-motion support. |
| Styling speed | Tailwind CSS | Utility classes make layout and visual iteration quick, especially for dense dashboards and animated cards. |
| Auth boundary | Auth.js | Provides a familiar authentication layer for SaaS login, session, and provider integration patterns. |

Animation-heavy products need more than decorative transitions. They need reliable state, easy composition, accessibility, and performance. The selected frontend stack keeps motion in GSAP, application state in React/Zustand/TanStack Query, and styling in Tailwind so each layer can evolve without fighting the others.

## Why these choices fit AI-native applications

| Need | Choice | Reason |
| --- | --- | --- |
| API orchestration | FastAPI + Python | FastAPI is productive, typed through Pydantic, async-friendly, and close to the Python AI ecosystem. It is a pragmatic home for SaaS APIs, agent endpoints, model orchestration, and tool calls. |
| Durable memory | PostgreSQL | AI-native apps still need users, projects, audit logs, usage events, permissions, billing records, and durable agent state. PostgreSQL is the stable system of record. |
| Low-latency context | Redis | Redis supports fast cache reads, short-lived coordination, distributed locks, queue backing, and Pub/Sub fanout for agent progress. |
| Files and artifacts | MinIO | AI apps produce uploads, images, recordings, generated assets, logs, and exports. MinIO gives local S3-compatible object storage that can map to cloud object stores later. |
| Human-in-the-loop realtime | WebSocket + Redis Pub/Sub | Agents should stream progress, tool events, and collaboration updates. WebSocket handles client delivery while Redis Pub/Sub helps horizontally scaled backend instances fan out messages. |
| Voice/video collaboration | WebRTC + LiveKit | LiveKit provides a production service layer for rooms, tokens, and media transport so AI copilots, screen sharing, and multiplayer collaboration can be added later. |
| Async agent work | Celery/RQ + Redis Queue | Long-running tasks such as embeddings, video processing, file ingestion, and multi-step agent workflows should not block request/response APIs. |
| Hot path performance | Axum / Rust | Some services need predictable low latency, high concurrency, or memory safety. Axum provides a Rust path for edge aggregation, streaming, or compute-sensitive microservices. |
| Trust and operations | OpenTelemetry + Prometheus + Grafana + Sentry | AI-native applications need traceability, latency metrics, cost signals, failure alerts, and error context across services. |
| Native action surfaces | Electron + Capacitor | Mobile and desktop shells let the same product reach native capabilities such as notifications, files, camera, screen capture, and guarded desktop automation. |

## Recommended rollout

### Phase 1: MVP

```text
Next.js
FastAPI
PostgreSQL
Redis
GSAP
Capacitor
Electron
```

This phase proves the product loop: animated web UI, authenticated SaaS API, durable data, cache/queue foundation, and native wrappers.

### Phase 2: Enhancement

```text
MinIO
WebSocket
Celery / RQ
LiveKit
Monitoring
```

This phase adds files, realtime collaboration, async jobs, media rooms, and operational visibility.

### Phase 3: Advanced capabilities

```text
Axum / Rust
AI Agent
Desktop automation
Screen / mouse / keyboard control
```

This phase introduces performance-sensitive services and carefully controlled native automation commands.

## Implementation in this repository

- `apps/web` implements the animated Next.js UI with React, TypeScript, Zustand, TanStack Query, GSAP, Tailwind CSS, and Auth.js route scaffolding.
- `apps/mobile` wraps the web app through Capacitor configuration.
- `apps/desktop` wraps the web app through Electron and exposes a preload bridge for future desktop automation adapters.
- `services/api` implements FastAPI routes for hello, auth placeholder, PostgreSQL visits, MinIO upload, Celery job enqueueing, LiveKit token creation, and observability setup.
- `services/realtime` implements WebSocket messaging and Redis Pub/Sub fanout.
- `services/worker` implements a Celery Hello World task.
- `services/rust-edge` implements an Axum/Rust health and hello service.
- `services/agent` implements AI Agent and desktop automation intent endpoints.
- `infra` runs PostgreSQL, Redis, MinIO, LiveKit, Prometheus, and Grafana for local integration.
