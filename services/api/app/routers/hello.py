import json
from fastapi import APIRouter
from ..dependencies import redis

router = APIRouter()

STACK = ['FastAPI', 'PostgreSQL', 'Redis', 'MinIO', 'Celery/RQ', 'LiveKit', 'OpenTelemetry', 'Prometheus', 'Sentry']


@router.get('/hello')
async def hello():
    cached = await redis.get('hello:payload')
    if cached:
        payload = json.loads(cached)
        payload['cached'] = True
        return payload

    payload = {'message': 'Hello from FastAPI SaaS backend', 'cached': False, 'stack': STACK}
    await redis.set('hello:payload', json.dumps(payload), ex=60)
    return payload


@router.get('/health')
async def health():
    return {'status': 'ok', 'service': 'api'}
