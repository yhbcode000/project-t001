# Environment

Environment values are documented in `.env.example` and grouped here by owner.

## Frontend

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | FastAPI base URL used by the web client |
| `NEXT_PUBLIC_WS_URL` | `ws://localhost:8010/ws` | WebSocket endpoint used by the web client |
| `NEXT_PUBLIC_AGENT_URL` | `http://localhost:8020` | AI Agent service URL used by the web client |

Values prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never store secrets in them.

## Authentication

| Variable | Default | Purpose |
| --- | --- | --- |
| `AUTH_SECRET` | `replace-me` | Auth.js secret for signing/encryption |
| `AUTH_URL` | `http://localhost:3000` | Canonical app URL for Auth.js callbacks |

Replace `AUTH_SECRET` before any shared environment.

## Backend data stores

| Variable | Default | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | `postgresql+asyncpg://postgres:postgres@localhost:5432/hello_world` | SQLAlchemy async PostgreSQL connection |
| `REDIS_URL` | `redis://localhost:6379/0` | Redis URL for cache, queue, and Pub/Sub |

## Object storage

| Variable | Default | Purpose |
| --- | --- | --- |
| `MINIO_ENDPOINT` | `localhost:9000` | MinIO API endpoint |
| `MINIO_ACCESS_KEY` | `minioadmin` | Local object storage access key |
| `MINIO_SECRET_KEY` | `minioadmin` | Local object storage secret key |

For production, prefer managed S3-compatible object storage or hardened MinIO with TLS, IAM, lifecycle rules, and backups.

## LiveKit

| Variable | Default | Purpose |
| --- | --- | --- |
| `LIVEKIT_URL` | `ws://localhost:7880` | LiveKit server URL returned to clients |
| `LIVEKIT_API_KEY` | `devkey` | Local token signing key |
| `LIVEKIT_API_SECRET` | `secret` | Local token signing secret |

## Observability

| Variable | Default | Purpose |
| --- | --- | --- |
| `SENTRY_DSN` | empty | Enables Sentry when configured |
| `OTEL_SERVICE_NAME` | `hello-world-api` | OpenTelemetry service name |

## Template rule

When adding a new environment variable:

1. Add it to `.env.example`.
2. Document it in this page or `reference/environment-variables.md`.
3. Add validation in service config when the value is required.
4. Avoid exposing secrets through `NEXT_PUBLIC_` variables.
