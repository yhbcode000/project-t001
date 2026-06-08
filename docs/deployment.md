# Deployment

This template is local-first but structured so each runtime can be deployed independently.

## Deployment principles

- Deploy each runtime independently when it has different scale or security requirements.
- Use managed infrastructure for stateful systems when possible.
- Keep secrets out of the browser and out of source control.
- Add CI/CD before production.
- Add database migrations before production schema changes.

## Web app

Deploy `apps/web` to a Next.js-compatible host or container platform.

Production checklist:

- Set `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL`, and `NEXT_PUBLIC_AGENT_URL` to production URLs.
- Set `AUTH_SECRET` and `AUTH_URL`.
- Confirm any Auth.js providers are configured.
- Build with `npm run build:web`.

## FastAPI backend

Deploy `services/api` as an ASGI service.

Production checklist:

- Use `uvicorn` or `gunicorn` with ASGI workers.
- Configure `DATABASE_URL`, `REDIS_URL`, MinIO/S3, LiveKit, Sentry, and OpenTelemetry.
- Replace startup table creation with migrations for real schemas.
- Restrict CORS origins to production domains.
- Add request logging, rate limits, and auth enforcement.

## Realtime service

Deploy `services/realtime` separately from the main API when traffic grows.

Production checklist:

- Use Redis Pub/Sub or Redis Streams depending on delivery guarantees.
- Add authentication to WebSocket connections.
- Add message validation and size limits.
- Configure horizontal scaling and sticky/session behavior if required.

## Worker service

Deploy `services/worker` as one or more Celery workers.

Production checklist:

- Separate queues by workload type.
- Add retries, dead-letter handling, and idempotency.
- Monitor queue length and task failures.
- Keep long-running AI or media jobs out of request/response paths.

## Rust edge service

Deploy `services/rust-edge` where low latency or high concurrency is needed.

Production checklist:

- Build a release binary.
- Add config/env parsing.
- Add tracing and metrics exporters.
- Put behind an API gateway or service mesh if needed.

## Desktop and mobile

- Build Capacitor projects through native iOS/Android tooling after generating/syncing web assets.
- Package Electron through an Electron builder workflow once app signing, updates, and platform assets are configured.
- Keep automation adapters behind explicit user permissions.

## Infrastructure choices

| Local template | Production recommendation |
| --- | --- |
| Docker PostgreSQL | Managed PostgreSQL or hardened self-hosted PostgreSQL |
| Docker Redis | Managed Redis or highly available Redis |
| Docker MinIO | Managed S3-compatible storage or hardened MinIO |
| LiveKit dev server | LiveKit Cloud or hardened LiveKit cluster |
| Prometheus/Grafana containers | Managed observability or production Prometheus/Grafana |

## Documentation deployment

MkDocs can be deployed to GitHub Pages or any static host:

```bash
python -m pip install -r docs/requirements.txt
mkdocs build --strict
```

Publish the generated `site/` directory.
