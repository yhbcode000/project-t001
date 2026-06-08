# LiveKit

LiveKit is the WebRTC service layer for realtime audio, video, screen sharing, and collaborative rooms.

## Local configuration

Docker Compose runs LiveKit in dev mode:

```text
ws://localhost:7880
```

The FastAPI backend creates demo tokens through the LiveKit token route.

## Why LiveKit

Raw WebRTC is powerful but complex. LiveKit gives the product a room/token/media server abstraction suitable for collaborative AI apps, voice copilots, screen sharing, and multiplayer workflows.

## Production checklist

- Use production API keys and secrets.
- Configure TURN/STUN and network access.
- Add room-level permissions.
- Add recording/storage policies if needed.
- Monitor media quality and connection failures.
