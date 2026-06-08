# Hello World Template

Hello World is a full-stack repo template for teams building **modern animation UI** and **AI-native applications**. It demonstrates a working Hello World across web, mobile, desktop, backend, realtime, queue, Rust edge, observability, AI Agent, and desktop automation intent layers.

This documentation is part of the template. It explains what is included, why each choice exists, how to run the project, how to remove modules, and how to grow the starter into a production system.

## What is included

| Layer | Directory | Included technologies | Purpose |
| --- | --- | --- | --- |
| Web app | `apps/web` | Next.js, React, TypeScript, Zustand, TanStack Query, GSAP, Tailwind CSS, Auth.js | Animated product UI and admin surface |
| Mobile shell | `apps/mobile` | Capacitor | iOS / Android native wrapper over the web app |
| Desktop shell | `apps/desktop` | Electron | macOS / Windows native wrapper and automation bridge |
| SaaS API | `services/api` | FastAPI, PostgreSQL, Redis, MinIO, LiveKit, observability | Main product API and integration layer |
| Realtime | `services/realtime` | WebSocket, Redis Pub/Sub | Live messages and agent progress fanout |
| Worker | `services/worker` | Celery, Redis Queue pattern | Background jobs and long-running tasks |
| Rust edge | `services/rust-edge` | Axum, Rust, Tokio | High-performance service path |
| Agent | `services/agent` | FastAPI, Pydantic | AI Agent planning and automation command intents |
| Infrastructure | `infra` | Docker Compose, PostgreSQL, Redis, MinIO, LiveKit, Prometheus, Grafana | Local dependencies and monitoring |
| Documentation | `docs` | MkDocs Material, Mermaid, mkdocstrings | Template operating manual |

## Template documentation map

### Start here

- [Template Usage](template-usage.md): use the repo as a template, rename it, configure environment, and remove modules.
- [Project Structure](project-structure.md): every directory, ownership boundary, entry point, and extension path.
- [Development](development.md): local dependency install and service startup flow.
- [Testing](testing.md): complete test matrix.

### Architecture and decisions

- [Architecture Overview](architecture.md): runtime diagram, data flow, ownership, and safety boundary.
- [Technology Selection](technology-selection.md): why every framework is included.
- [Roadmap](roadmap.md): MVP, enhancement, and advanced phases.
- [ADRs](adr/0001-monorepo.md): decision records for the template defaults.

### Module guides

- [Web App](applications/web.md), [Mobile App](applications/mobile.md), and [Desktop App](applications/desktop.md).
- [FastAPI Backend](services/api.md), [Realtime Service](services/realtime.md), [Worker](services/worker.md), [Rust Edge](services/rust-edge.md), and [Agent Service](services/agent.md).
- [Docker Compose](infrastructure/docker-compose.md), [PostgreSQL](infrastructure/postgres.md), [Redis](infrastructure/redis.md), [MinIO](infrastructure/minio.md), [LiveKit](infrastructure/livekit.md), and [Monitoring](infrastructure/monitoring.md).

## Recommended usage path

1. Read [Template Usage](template-usage.md) before copying the repository.
2. Start with [Development](development.md) and run the web + API + infra loop.
3. Use [Project Structure](project-structure.md) to decide which modules to keep.
4. Use [Technology Selection](technology-selection.md) to explain the architecture to teammates.
5. Follow [Deployment](deployment.md) when turning the template into a production project.

## Local docs preview

```bash
python -m pip install -r docs/requirements.txt
mkdocs serve
```

Then open <http://127.0.0.1:8000>.
