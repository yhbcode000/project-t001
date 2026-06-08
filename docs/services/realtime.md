# Realtime Service

`services/realtime` demonstrates WebSocket delivery with Redis Pub/Sub fanout.

## Responsibilities

- Accept WebSocket connections at `/ws`.
- Read client messages.
- Publish messages to a Redis channel.
- Listen to Redis Pub/Sub and send broadcasts to connected clients.

## Run locally

```bash
npm run dev:realtime
```

The WebSocket endpoint is:

```text
ws://localhost:8010/ws
```

## Why it is separate

Realtime traffic has different scaling and lifecycle characteristics from request/response API traffic. Keeping it separate makes it easier to scale WebSocket connections independently.

## AI-native usage

AI-native apps often need realtime streams for:

- Agent progress.
- Tool call status.
- Human approval requests.
- Collaboration cursors or presence.
- Generated artifact notifications.

## Production checklist

- Authenticate WebSocket connections.
- Validate payload shape and size.
- Add heartbeat/ping behavior.
- Decide whether Pub/Sub is enough or whether Redis Streams/Kafka are needed.
- Add backpressure and rate limiting.
