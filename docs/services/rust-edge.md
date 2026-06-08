# Rust Edge Service

`services/rust-edge` is an Axum/Tokio service for high-performance or latency-sensitive endpoints.

## Responsibilities

- Demonstrate a Rust microservice path.
- Provide `/health` and `/hello` routes.
- Include Rust integration tests.

## Run locally

```bash
npm run dev:rust
```

## Test

```bash
npm run test:rust
```

## When to use Rust

Move work to Rust when you need:

- Predictable low latency.
- High concurrency.
- CPU-efficient streaming.
- Memory safety for sensitive workloads.
- A small edge aggregation service.

## Production checklist

- Add configuration parsing.
- Add structured tracing.
- Add Prometheus/OpenTelemetry exporters.
- Build release binaries.
- Add container packaging.
