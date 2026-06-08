# Roadmap

The template is organized around three adoption phases.

## Phase 1: MVP foundation

Included focus:

- Next.js web app.
- FastAPI backend.
- PostgreSQL persistence.
- Redis cache/queue foundation.
- GSAP animation shell.
- Capacitor mobile wrapper.
- Electron desktop wrapper.

Success criteria:

- A user can open the animated dashboard.
- The frontend can call the API.
- PostgreSQL stores a hello visit.
- Redis can cache data.
- Native shells can load the web app.

## Phase 2: Collaboration and operations

Included focus:

- MinIO file storage.
- WebSocket realtime messages.
- Celery/RQ background work.
- LiveKit/WebRTC room token creation.
- OpenTelemetry, Prometheus, Grafana, and Sentry.

Success criteria:

- Long-running work runs outside API requests.
- Realtime progress can be streamed.
- Files and generated artifacts have object storage.
- Operators can see metrics and errors.

## Phase 3: AI-native and high-performance capabilities

Included focus:

- Axum/Rust hot-path service.
- AI Agent planning service.
- Desktop automation intent boundary.
- Screen, mouse, and keyboard adapters behind explicit controls.

Success criteria:

- AI workflows can plan, call tools, stream progress, and enqueue jobs.
- Automation remains auditable and permissioned.
- Performance-sensitive endpoints can move to Rust.

## Suggested future work

- Add CI workflows for tests and docs deploy.
- Add database migrations with Alembic.
- Add real Auth.js providers.
- Add generated OpenAPI client types for the web app.
- Add Playwright end-to-end tests.
- Add production Dockerfiles.
- Add release packaging for Electron and Capacitor.
- Add agent memory and tool registry abstractions.
