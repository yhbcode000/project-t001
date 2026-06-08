import sentry_sdk
from fastapi import FastAPI
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry import trace
from prometheus_fastapi_instrumentator import Instrumentator
from .config import settings


def configure_observability(app: FastAPI) -> None:
    if settings.sentry_dsn:
        sentry_sdk.init(dsn=settings.sentry_dsn, traces_sample_rate=1.0)

    trace.set_tracer_provider(TracerProvider(resource=Resource.create({'service.name': settings.otel_service_name})))
    FastAPIInstrumentor.instrument_app(app)
    Instrumentator().instrument(app).expose(app, endpoint='/metrics')
