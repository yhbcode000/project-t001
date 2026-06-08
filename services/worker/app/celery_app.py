import os
from celery import Celery

redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
celery_app = Celery('hello-platform-worker', broker=redis_url, backend=redis_url, include=['app.tasks'])
celery_app.conf.task_default_queue = 'hello'
