# Template Usage

This repository is intended to be copied, renamed, and shaped into a real product. The template is deliberately modular: each app or service can be kept, replaced, or removed without invalidating the rest of the architecture.

## Use the template

### Option A: GitHub template

1. Click **Use this template** in GitHub.
2. Pick a new repository name.
3. Clone your new repository.
4. Continue with the rename checklist below.

### Option B: Clone manually

```bash
git clone <this-repository-url> my-product
cd my-product
rm -rf .git
git init
git add .
git commit -m "Initialize from Hello World template"
```

## Rename checklist

Update these values before shipping a derived project:

| Location | What to change |
| --- | --- |
| `package.json` | Root package name and scripts if you remove modules |
| `apps/web/package.json` | Web workspace package name |
| `apps/mobile/package.json` | Mobile workspace package name |
| `apps/mobile/capacitor.config.ts` | `appId`, `appName`, production `webDir`, dev server URL |
| `apps/desktop/package.json` | Desktop workspace package name |
| `apps/desktop/src/main.js` | Window title and default `WEB_URL` behavior |
| `services/*/app/main.py` | FastAPI titles and service names |
| `services/rust-edge/Cargo.toml` | Rust package name |
| `mkdocs.yml` | `site_name`, `site_description`, `repo_url`, `repo_name` |
| `README.md` | Project title, screenshot, links, license, and roadmap |
| `.env.example` | Domain names, secrets, database URLs, object storage, telemetry |

## First-run checklist

```bash
cp .env.example .env
npm install
python -m pip install -r requirements-dev.txt
npm run dev:infra
npm run dev:api
npm run dev:web
```

After the MVP loop works, start optional services:

```bash
npm run dev:realtime
npm run dev:worker
npm run dev:agent
npm run dev:desktop
npm run dev:rust
```

## Module selection guide

| Product need | Keep these modules |
| --- | --- |
| Web-only MVP | `apps/web`, `services/api`, PostgreSQL, Redis |
| Animated marketing/SaaS UI | Web app, GSAP docs, Tailwind, Zustand, TanStack Query |
| Mobile app | `apps/mobile`, web app, Capacitor config |
| Desktop app | `apps/desktop`, web app, automation safety docs |
| File uploads or generated assets | `services/api` files router, MinIO |
| Realtime collaboration | `services/realtime`, Redis Pub/Sub, LiveKit token route |
| Background AI/data jobs | `services/worker`, Redis Queue pattern |
| Low-latency service | `services/rust-edge` |
| AI-native workflows | `services/agent`, WebSocket, worker, database, audit model |
| Production operations | Prometheus, Grafana, Sentry, OpenTelemetry |

## How to remove a module

1. Delete the module directory.
2. Remove its root npm script from `package.json`.
3. Remove Docker services if the module depended on them.
4. Remove environment variables that are no longer used.
5. Remove docs pages from `mkdocs.yml` navigation.
6. Run `npm run test:docs` to catch broken links.
7. Run the relevant app/service test commands.

## MVP-first rollout

Start small even though the template is broad:

1. **MVP:** web app, FastAPI, PostgreSQL, Redis, GSAP, Capacitor, Electron.
2. **Enhancement:** MinIO, WebSocket, Celery/RQ, LiveKit, monitoring.
3. **Advanced:** Axum/Rust, AI Agent, guarded desktop automation.

## Production hardening checklist

Before production:

- Replace all demo secrets in `.env.example`.
- Put PostgreSQL, Redis, MinIO/S3, and LiveKit behind managed or hardened infrastructure.
- Configure TLS and production domains.
- Add real Auth.js providers and session policies.
- Add migrations for PostgreSQL instead of relying only on startup table creation.
- Add object lifecycle rules for MinIO/S3 artifacts.
- Add permission prompts and audit logs for automation commands.
- Add CI workflows for tests, docs, and deployment.
- Add a license file and security policy.
