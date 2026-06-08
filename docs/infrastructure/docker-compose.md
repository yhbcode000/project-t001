# Docker Compose

`infra/docker-compose.yml` provides local infrastructure for the template.

## Included services

| Service | Image | Ports | Purpose |
| --- | --- | --- | --- |
| PostgreSQL | `postgres:16-alpine` | `5432` | Main relational database |
| Redis | `redis:7-alpine` | `6379` | Cache, queue broker, Pub/Sub |
| MinIO | `minio/minio` | `9000`, `9001` | S3-compatible object storage and console |
| LiveKit | `livekit/livekit-server` | `7880`, `7881`, `50000-50100/udp` | WebRTC room/media server |
| Prometheus | `prom/prometheus` | `9090` | Metrics collection |
| Grafana | `grafana/grafana` | `3001` | Dashboards |

## Start

```bash
npm run dev:infra
```

## Volumes

- `postgres-data`: persisted PostgreSQL data.
- `minio-data`: persisted object storage data.

## Production note

Docker Compose is for local development. For production, use managed services or a hardened container orchestration setup with backups, TLS, secrets management, and monitoring.
