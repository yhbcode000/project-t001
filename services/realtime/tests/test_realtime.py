import pytest

from app import main


@pytest.mark.asyncio
async def test_health():
    assert await main.health() == {'status': 'ok', 'service': 'realtime'}


@pytest.mark.asyncio
async def test_websocket_reader_publishes_and_writer_sends(monkeypatch):
    published = []

    class FakePubSub:
        async def subscribe(self, channel):
            self.channel = channel

        async def listen(self):
            yield {'type': 'message', 'data': 'Hello Ada from WebSocket + Redis Pub/Sub'}

        async def unsubscribe(self, channel):
            pass

        async def close(self):
            pass

    class FakeRedis:
        def pubsub(self):
            return FakePubSub()

        async def publish(self, channel, message):
            published.append((channel, message))

    class FakeWebSocket:
        def __init__(self):
            self.accepted = False
            self.sent = []

        async def accept(self):
            self.accepted = True

        async def iter_text(self):
            yield '{"name":"Ada"}'

        async def send_text(self, message):
            self.sent.append(message)

    monkeypatch.setattr(main, 'redis', FakeRedis())
    websocket = FakeWebSocket()

    await main.websocket_endpoint(websocket)

    assert websocket.accepted is True
    assert websocket.sent == ['Hello Ada from WebSocket + Redis Pub/Sub']
    assert published == [(main.CHANNEL, 'Hello Ada from WebSocket + Redis Pub/Sub')]
