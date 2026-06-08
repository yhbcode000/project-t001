# Project Structure

The repository is a monorepo with clear runtime ownership. Each folder is designed to be understandable as a standalone slice and removable if your product does not need it.

```text
apps/
├── web/
├── mobile/
└── desktop/
services/
├── api/
├── realtime/
├── worker/
├── rust-edge/
└── agent/
infra/
docs/
```

## Root

| Path | Purpose |
| --- | --- |
| `package.json` | npm workspace configuration and root scripts |
| `package-lock.json` | Locked Node dependency graph |
| `requirements-dev.txt` | Python dev/test/docs dependencies |
| `.env.example` | Local environment variable template |
| `Makefile` | Convenience commands, if expanded by the product team |
| `mkdocs.yml` | Documentation site configuration |
| `README.md` | Public landing page for the template |

## Applications

### `apps/web`

The primary Next.js application. It owns the animated dashboard, admin page, providers, API client, Zustand store, and GSAP setup.

Important files:

- `src/app/page.tsx`: home route.
- `src/app/admin/page.tsx`: admin route placeholder.
- `src/app/api/auth/[...nextauth]/route.ts`: Auth.js route integration.
- `src/components/hello-dashboard.tsx`: main demo UI and animation surface.
- `src/components/providers.tsx`: React Query provider setup.
- `src/lib/api.ts`: typed API client helpers.
- `src/lib/gsap.ts`: GSAP plugin registration and defaults.
- `src/store/hello-store.ts`: Zustand local state.

### `apps/mobile`

Capacitor shell for iOS and Android. It can point to the local Next.js dev server or consume a built web output.

Important files:

- `capacitor.config.ts`: app identity, web output path, and dev server configuration.
- `test/capacitor-config.test.js`: validates mobile configuration defaults.

### `apps/desktop`

Electron shell for macOS and Windows. It loads the web app and includes a safe placeholder bridge for future native automation.

Important files:

- `src/main.js`: Electron main process and BrowserWindow creation.
- `src/preload.js`: context-isolated preload bridge.
- `src/automation.js`: automation capabilities and request placeholder.
- `test/automation.test.js`: verifies automation placeholder behavior.

## Services

### `services/api`

Main FastAPI backend. It demonstrates caching, persistence, object storage, queue enqueueing, LiveKit token creation, auth placeholder, and observability hooks.

### `services/realtime`

FastAPI WebSocket service. It accepts client messages and publishes/broadcasts them through Redis Pub/Sub.

### `services/worker`

Celery worker package. It demonstrates the background job pattern used for long-running product or AI tasks.

### `services/rust-edge`

Axum/Tokio Rust service for performance-sensitive endpoints. It includes Rust integration tests.

### `services/agent`

FastAPI service for AI Agent planning and auditable desktop automation command intents.

## Infrastructure

`infra/docker-compose.yml` starts the local dependency stack:

- PostgreSQL
- Redis
- MinIO
- LiveKit
- Prometheus
- Grafana

Prometheus and Grafana configuration lives under `infra/prometheus` and `infra/grafana`.

## Documentation

`docs/` contains MkDocs pages. The documentation is part of the template deliverable and should be kept in sync with code modules. If a module is removed, remove or rewrite its docs page and update `mkdocs.yml` navigation.
