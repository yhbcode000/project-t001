# Hello Platform Monorepo

A complete Hello World platform that maps the requested technology stack into a runnable monorepo: Next.js, React, TypeScript, Zustand, TanStack Query, GSAP, Tailwind CSS, Auth.js, Capacitor, Electron, FastAPI, PostgreSQL, Redis, MinIO, WebSocket, Redis Pub/Sub, Celery, LiveKit, Axum/Rust, OpenTelemetry, Prometheus, Grafana, and Sentry.

## Architecture

```text
apps/web            Next.js web frontend and admin console
apps/mobile         Capacitor iOS / Android shell
apps/desktop        Electron macOS / Windows shell
services/api        FastAPI SaaS backend
services/realtime   WebSocket + Redis Pub/Sub service
services/worker     Celery Redis queue worker
services/rust-edge  Axum high-performance Rust service
services/agent      AI Agent + desktop automation intent service
infra               PostgreSQL, Redis, MinIO, LiveKit, Prometheus, Grafana
```

## Recommended rollout

1. MVP: Next.js, FastAPI, PostgreSQL, Redis, GSAP, Capacitor, Electron.
2. Enhancement: MinIO, WebSocket, Celery, LiveKit, Monitoring.
3. Advanced: Axum/Rust, AI Agent service, desktop automation command intents, screen / mouse / keyboard control adapters.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev:infra
npm run dev:api
npm run dev:realtime
npm run dev:worker
npm run dev:agent
npm run dev:web
npm run dev:desktop
npm run dev:rust
```

Python services expect dependencies from their own `requirements.txt` files. The Rust service uses Cargo.

## Endpoints

- Web: <http://localhost:3000>
- FastAPI: <http://localhost:8000>
- Realtime WebSocket: `ws://localhost:8010/ws`
- Rust Axum: <http://localhost:8081>
- AI Agent and automation: <http://localhost:8020>
- MinIO Console: <http://localhost:9001>
- LiveKit: `ws://localhost:7880`
- Prometheus: <http://localhost:9090>
- Grafana: <http://localhost:3001>


## Verification

```bash
npm run test:web
npm run test:python-compile
npm run test:rust
```

## Screenshot note

The web app is visual and GSAP-driven. If Playwright browser binaries are available locally, run:

```bash
npm --workspace apps/web run start -- --hostname 127.0.0.1 --port 3000
npx playwright screenshot --wait-for-timeout=2000 http://127.0.0.1:3000 docs/hello-platform-screenshot.png
```

Some restricted environments block Playwright's Chromium download CDN; in that case use an installed local browser or capture the running app manually.
