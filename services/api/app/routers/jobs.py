from pydantic import BaseModel
from fastapi import APIRouter
from celery import Celery
from ..config import settings

router = APIRouter(prefix='/jobs', tags=['jobs'])
celery_app = Celery('hello-platform', broker=settings.redis_url, backend=settings.redis_url)


class HelloJobRequest(BaseModel):
    name: str = 'World'


@router.post('/hello')
async def enqueue_hello_job(request: HelloJobRequest):
    task = celery_app.send_task('app.tasks.hello_job', args=[request.name])
    return {'job_id': task.id, 'status': 'queued'}
