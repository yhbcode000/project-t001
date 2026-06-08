# Environment Variables Reference

This is a compact reference for `.env.example`. See [Environment](../environment.md) for operational guidance.

| Variable | Owner | Required for | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Web | API calls | Browser-visible |
| `NEXT_PUBLIC_WS_URL` | Web | Realtime messages | Browser-visible |
| `NEXT_PUBLIC_AGENT_URL` | Web | Agent calls | Browser-visible |
| `AUTH_SECRET` | Web/Auth | Auth.js | Secret; replace default |
| `AUTH_URL` | Web/Auth | Auth.js callbacks | Use production app URL |
| `DATABASE_URL` | API | PostgreSQL | Async SQLAlchemy URL |
| `REDIS_URL` | API, realtime, worker | Cache, queue, Pub/Sub | Use TLS/auth in production |
| `MINIO_ENDPOINT` | API | Object storage | Local default points to Docker Compose |
| `MINIO_ACCESS_KEY` | API | Object storage | Secret in production |
| `MINIO_SECRET_KEY` | API | Object storage | Secret in production |
| `LIVEKIT_URL` | API/Web | WebRTC rooms | Returned in token response |
| `LIVEKIT_API_KEY` | API | Token signing | Secret in production |
| `LIVEKIT_API_SECRET` | API | Token signing | Secret in production |
| `SENTRY_DSN` | API | Error reporting | Optional |
| `OTEL_SERVICE_NAME` | API | Observability | Used for traces/metrics identity |
