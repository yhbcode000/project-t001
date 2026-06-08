# Redis

Redis supports three template responsibilities: cache, queue broker, and Pub/Sub fanout.

## Local configuration

Docker Compose exposes Redis at:

```text
redis://localhost:6379/0
```

## Current usage

| Usage | Module |
| --- | --- |
| Cache `/hello` payload | `services/api` |
| Pub/Sub WebSocket messages | `services/realtime` |
| Celery queue broker/result pattern | `services/worker` and `services/api` job route |

## AI-native usage

Redis is useful for short-lived agent state, progress fanout, rate limits, distributed locks, and queue coordination.

## Production checklist

- Choose managed Redis or highly available Redis.
- Enable authentication and TLS.
- Separate cache, queue, and Pub/Sub databases or clusters for larger systems.
- Monitor memory, eviction, queue length, and Pub/Sub consumers.
