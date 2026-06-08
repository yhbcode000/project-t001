# Monitoring

The template includes observability foundations for modern SaaS and AI-native systems.

## Included tools

| Tool | Role |
| --- | --- |
| OpenTelemetry | Instrument traces and metrics with vendor-neutral APIs |
| Prometheus | Scrape and store metrics |
| Grafana | Visualize metrics and dashboards |
| Sentry | Capture errors and exceptions |

## Local infrastructure

- Prometheus runs at <http://localhost:9090>.
- Grafana runs at <http://localhost:3001>.
- Grafana datasource provisioning points at Prometheus.

## AI-native signals to track

- Agent request latency.
- Tool call count and failures.
- Queue length and task duration.
- Token/cost metrics if using LLM providers.
- WebSocket connection count.
- Automation approval/denial rate.
- File ingestion and artifact generation failures.

## Production checklist

- Add trace propagation across web, API, worker, realtime, and agent services.
- Add structured logging with correlation IDs.
- Create dashboards for latency, errors, queue depth, and resource usage.
- Configure Sentry release/environment tags.
- Add alerts for error rate, saturation, and failed jobs.
