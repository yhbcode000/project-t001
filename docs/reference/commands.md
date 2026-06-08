# Commands Reference

Root commands are defined in `package.json`.

## Development

| Command | Description |
| --- | --- |
| `npm run dev:web` | Start Next.js web app |
| `npm run dev:desktop` | Start Electron desktop shell |
| `npm run dev:mobile` | Run Capacitor command placeholder/workspace dev command |
| `npm run dev:api` | Start FastAPI backend on port 8000 |
| `npm run dev:realtime` | Start WebSocket service on port 8010 |
| `npm run dev:worker` | Start Celery worker |
| `npm run dev:agent` | Start Agent service on port 8020 |
| `npm run dev:rust` | Start Axum/Rust service |
| `npm run dev:infra` | Start local infrastructure with Docker Compose |

## Testing and validation

| Command | Description |
| --- | --- |
| `npm run test:web` | Run Vitest, TypeScript, and Next build |
| `npm run test:python` | Run pytest across Python services |
| `npm run test:python-compile` | Compile Python service files |
| `npm run test:rust` | Run Cargo tests |
| `npm run test:desktop` | Run desktop tests |
| `npm run test:mobile` | Run mobile tests |
| `npm run test:docs` | Build MkDocs strict |
| `npm run test` | Run the full suite |

## Docs

| Command | Description |
| --- | --- |
| `mkdocs serve` | Preview docs locally |
| `mkdocs build --strict` | Build docs and fail on strict errors |
