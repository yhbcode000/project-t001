import asyncio
import json
import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from redis.asyncio import from_url

app = FastAPI(title='Hello Realtime Service')
redis = from_url(os.getenv('REDIS_URL', 'redis://localhost:6379/0'), decode_responses=True)
CHANNEL = 'hello:broadcast'


@app.get('/health')
async def health():
    return {'status': 'ok', 'service': 'realtime'}


@app.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    pubsub = redis.pubsub()
    await pubsub.subscribe(CHANNEL)

    async def reader():
        async for message in websocket.iter_text():
            payload = json.loads(message)
            await redis.publish(CHANNEL, f"Hello {payload.get('name', 'World')} from WebSocket + Redis Pub/Sub")

    async def writer():
        async for message in pubsub.listen():
            if message['type'] == 'message':
                await websocket.send_text(message['data'])

    try:
        await asyncio.gather(reader(), writer())
    except WebSocketDisconnect:
        pass
    finally:
        await pubsub.unsubscribe(CHANNEL)
        await pubsub.close()
