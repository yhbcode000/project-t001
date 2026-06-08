# Worker Service

`services/worker` demonstrates background jobs with Celery and Redis.

## Responsibilities

- Define queue workers.
- Execute tasks outside request/response paths.
- Provide a pattern for long-running AI, media, data, and notification work.

## Run locally

```bash
npm run dev:worker
```

## Current task

The template includes a simple `hello_job` task that returns a Hello payload. It exists to prove the API can enqueue work and workers can execute it.

## When to use workers

Use a worker for:

- Embedding generation.
- File ingestion.
- Video/audio processing.
- Email notifications.
- Scheduled reports.
- Multi-step agent workflows.
- Expensive external API calls.

## Production checklist

- Add named queues by workload type.
- Make tasks idempotent.
- Add retries and dead-letter handling.
- Track task status for user-facing progress.
- Monitor queue length, latency, and failure rate.
