import json
from types import SimpleNamespace

import pytest
from jose import jwt

from app.routers import auth, database, files, hello, jobs, livekit


class FakeRedis:
    def __init__(self):
        self.value = None
        self.set_calls = []

    async def get(self, key):
        return self.value

    async def set(self, key, value, ex=None):
        self.value = value
        self.set_calls.append((key, value, ex))


@pytest.mark.asyncio
async def test_hello_uses_redis_cache(monkeypatch):
    fake = FakeRedis()
    monkeypatch.setattr(hello, 'redis', fake)

    first = await hello.hello()
    assert first['message'] == 'Hello from FastAPI SaaS backend'
    assert first['cached'] is False
    assert 'FastAPI' in first['stack']
    assert fake.set_calls[0][0] == 'hello:payload'

    fake.value = json.dumps(first)
    second = await hello.hello()
    assert second['cached'] is True


@pytest.mark.asyncio
async def test_health_and_auth_placeholder():
    assert await hello.health() == {'status': 'ok', 'service': 'api'}
    user = await auth.me()
    assert user['id'] == 'hello-user'
    assert 'admin' in user['roles']
    assert user['provider'].startswith('Auth.js')


@pytest.mark.asyncio
async def test_livekit_token_contains_identity_and_room():
    response = await livekit.token(livekit.TokenRequest(identity='Ada', room='hello-room'))
    decoded = jwt.decode(response['token'], 'secret', algorithms=['HS256'], options={'verify_aud': False})
    assert response['url'] == 'ws://localhost:7880'
    assert response['room'] == 'hello-room'
    assert decoded['sub'] == 'Ada'
    assert decoded['video']['room'] == 'hello-room'
    assert decoded['video']['roomJoin'] is True


@pytest.mark.asyncio
async def test_jobs_enqueue_celery_task(monkeypatch):
    calls = []

    class FakeCelery:
        def send_task(self, name, args):
            calls.append((name, args))
            return SimpleNamespace(id='job-123')

    monkeypatch.setattr(jobs, 'celery_app', FakeCelery())
    response = await jobs.enqueue_hello_job(jobs.HelloJobRequest(name='Ada'))
    assert response == {'job_id': 'job-123', 'status': 'queued'}
    assert calls == [('app.tasks.hello_job', ['Ada'])]


@pytest.mark.asyncio
async def test_minio_upload_creates_bucket_and_puts_object(monkeypatch):
    calls = []

    class FakeUpload:
        filename = 'hello.txt'
        file = object()

    class FakeMinio:
        def bucket_exists(self, bucket):
            calls.append(('bucket_exists', bucket))
            return False

        def make_bucket(self, bucket):
            calls.append(('make_bucket', bucket))

        def put_object(self, bucket, filename, stream, length, part_size):
            calls.append(('put_object', bucket, filename, length, part_size))

    monkeypatch.setattr(files, 'minio_client', FakeMinio())
    response = await files.upload_file(FakeUpload())
    assert response == {'bucket': 'hello-platform', 'object': 'hello.txt', 'storage': 'MinIO'}
    assert ('make_bucket', 'hello-platform') in calls
    assert calls[-1][0] == 'put_object'


@pytest.mark.asyncio
async def test_database_create_and_list_with_fake_session(monkeypatch):
    visits = []

    class FakeScalarResult:
        def all(self):
            return list(reversed(visits))[:5]

    class FakeRows:
        def scalars(self):
            return FakeScalarResult()

    class FakeSession:
        async def __aenter__(self):
            return self

        async def __aexit__(self, exc_type, exc, tb):
            return False

        def add(self, visit):
            visit.id = len(visits) + 1
            visits.append(visit)

        async def commit(self):
            pass

        async def refresh(self, visit):
            pass

        async def scalar(self, statement):
            return len(visits)

        async def execute(self, statement):
            return FakeRows()

    monkeypatch.setattr(database, 'SessionLocal', lambda: FakeSession())
    created = await database.create_database_hello(database.VisitRequest(name='Ada'))
    assert created['id'] == 1
    assert created['message'] == 'Hello Ada from PostgreSQL'
    assert created['total_visits'] == 1

    listed = await database.list_database_hello()
    assert listed['database'] == 'PostgreSQL'
    assert listed['visits'][0]['name'] == 'Ada'
