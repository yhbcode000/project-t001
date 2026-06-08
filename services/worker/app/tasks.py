from .celery_app import celery_app


@celery_app.task(name='app.tasks.hello_job')
def hello_job(name: str) -> dict:
    return {'message': f'Hello {name} from Celery / Redis Queue', 'status': 'completed'}
