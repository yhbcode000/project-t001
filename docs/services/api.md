# FastAPI Backend

`services/api` is the main SaaS backend. It demonstrates how the template connects durable data, cache, files, jobs, realtime media token generation, auth placeholders, and observability.

## Included capabilities

| Capability | Router / module |
| --- | --- |
| Hello payload + Redis cache | `app/routers/hello.py` |
| Auth placeholder | `app/routers/auth.py` |
| PostgreSQL hello visits | `app/routers/database.py` |
| MinIO file uploads | `app/routers/files.py` |
| Celery job enqueueing | `app/routers/jobs.py` |
| LiveKit token creation | `app/routers/livekit.py` |
| Observability setup | `app/observability.py` |
| Settings and dependencies | `app/config.py`, `app/dependencies.py` |

## Run locally

```bash
npm run dev:api
```

The service runs on <http://localhost:8000>.

## Persistence

The template creates the `hello_visits` table on startup to keep the demo self-contained. Production projects should add migrations, typically with Alembic.

## Caching

The `/hello` endpoint uses Redis to cache the Hello payload. This demonstrates the same pattern used for low-latency AI context, product settings, feature flags, and short-lived coordination.

## Files

The MinIO upload route shows the S3-compatible object storage boundary. Use this for uploads, generated images, recordings, exports, and agent artifacts.

## Jobs

The jobs route enqueues Celery work. Use background jobs for file ingestion, embedding generation, media processing, report generation, and multi-step agent tasks.

## Production checklist

- Replace placeholder auth with real Auth.js/session enforcement.
- Restrict CORS origins.
- Add database migrations.
- Add rate limits and request size limits.
- Add OpenAPI client generation if frontend contracts grow.
- Add structured logs and trace correlation IDs.
