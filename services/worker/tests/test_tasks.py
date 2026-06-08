from app.tasks import hello_job


def test_hello_job_returns_completed_payload():
    assert hello_job('Ada') == {'message': 'Hello Ada from Celery / Redis Queue', 'status': 'completed'}
