# Architecture Notes

The platform is intentionally split by runtime so each technology has a clear owner:

- Next.js renders the public web app and admin console.
- Zustand stores local UI state, while TanStack Query caches server data.
- GSAP is initialized through `@gsap/react` and scoped timelines, following the installed `Microck/gsap-skills` React guidance.
- FastAPI owns product APIs, PostgreSQL persistence, Redis caching, queue triggers, MinIO file storage, LiveKit token generation, metrics, OpenTelemetry, and Sentry setup.
- The realtime service demonstrates WebSocket fanout over Redis Pub/Sub.
- Celery demonstrates background jobs through Redis.
- Axum provides a high-performance Rust edge service.
- Electron and Capacitor wrap the web application for desktop and mobile delivery.


## Advanced AI and automation layer

`services/agent` models the third-stage AI Agent and desktop automation capabilities. It exposes auditable command intents for screen capture, mouse movement, mouse clicks, and keyboard typing. The Electron shell exposes a preload bridge and IPC handlers so native desktop adapters can later execute these commands safely behind explicit controls.

## PostgreSQL usage

The FastAPI lifespan hook creates the `hello_visits` table on startup. The `/database/hello` endpoints persist and list Hello World visits so the scaffold demonstrates real database usage instead of only configuration.
