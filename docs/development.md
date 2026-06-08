# Development

This guide explains the local development loop for the full template and for smaller MVP subsets.

## Prerequisites

- Node.js and npm for workspace apps.
- Python 3.12+ for FastAPI, Celery, docs, and tests.
- Rust toolchain for `services/rust-edge`.
- Docker Compose for PostgreSQL, Redis, MinIO, LiveKit, Prometheus, and Grafana.

## Install dependencies

```bash
npm install
python -m pip install -r requirements-dev.txt
```

Rust dependencies are resolved by Cargo when running the Rust service or tests:

```bash
cd services/rust-edge
cargo test
```

## Environment setup

```bash
cp .env.example .env
```

Use the defaults for local development only. Replace secrets before deploying or sharing an environment.

## Start infrastructure

```bash
npm run dev:infra
```

This runs Docker Compose with PostgreSQL, Redis, MinIO, LiveKit, Prometheus, and Grafana.

## Start services

Use separate terminals for each service:

```bash
npm run dev:api
npm run dev:realtime
npm run dev:worker
npm run dev:agent
npm run dev:rust
```

## Start apps

```bash
npm run dev:web
npm run dev:desktop
CAPACITOR_DEV=true npm run dev:mobile
```

The web app is the main UI. Desktop and mobile shells load or wrap that UI.

## Recommended MVP loop

For most development, start only:

```bash
npm run dev:infra
npm run dev:api
npm run dev:web
```

Add realtime, worker, agent, and Rust services when developing those specific capabilities.

## Common tasks

| Task | Command |
| --- | --- |
| Run web unit tests | `npm --workspace apps/web run test` |
| Typecheck web app | `npm run typecheck` |
| Build web app | `npm run build:web` |
| Run Python tests | `npm run test:python` |
| Run Rust tests | `npm run test:rust` |
| Build docs | `npm run test:docs` |
| Run everything | `npm run test` |

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Web app cannot reach API | Confirm `NEXT_PUBLIC_API_URL` and `npm run dev:api` |
| WebSocket offline message | Confirm `npm run dev:realtime` and Redis is running |
| Database errors | Confirm PostgreSQL container and `DATABASE_URL` |
| MinIO upload errors | Confirm MinIO container, endpoint, access key, and secret |
| Celery job not processed | Confirm Redis and `npm run dev:worker` |
| LiveKit token works but media does not | Confirm LiveKit ports and client integration |
| Desktop window is blank | Confirm `WEB_URL` or `npm run dev:web` |
