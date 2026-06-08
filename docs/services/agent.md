# Agent Service

`services/agent` models the AI-native layer. It currently exposes a simple agent planning endpoint and auditable desktop automation command intents.

## Responsibilities

- Accept a user or system goal.
- Return a structured plan.
- Represent automation as safe command intents.
- Provide an extension point for LLM providers, tool registries, memory, and approval workflows.

## Run locally

```bash
npm run dev:agent
```

The service runs on <http://localhost:8020>.

## Endpoints

| Endpoint | Purpose |
| --- | --- |
| `GET /health` | Service health |
| `POST /agent/hello` | Return a demo agent plan |
| `GET /automation/capabilities` | List supported automation intents |
| `POST /automation/command` | Queue an automation command intent |

## Extension path

A production agent service usually adds:

- LLM provider clients.
- Tool registry and permission policies.
- Durable memory in PostgreSQL.
- Artifact storage in MinIO/S3.
- Realtime progress through WebSocket.
- Long-running work through Celery/RQ.
- Audit logs for every tool and automation intent.

See [AI Agent Architecture](../ai-native/agent-architecture.md).
