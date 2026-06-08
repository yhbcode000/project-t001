from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = 'postgresql+asyncpg://postgres:postgres@localhost:5432/hello_platform'
    redis_url: str = 'redis://localhost:6379/0'
    minio_endpoint: str = 'localhost:9000'
    minio_access_key: str = 'minioadmin'
    minio_secret_key: str = 'minioadmin'
    livekit_url: str = 'ws://localhost:7880'
    livekit_api_key: str = 'devkey'
    livekit_api_secret: str = 'secret'
    sentry_dsn: str = ''
    otel_service_name: str = 'hello-platform-api'

    model_config = ConfigDict(env_file='.env', extra='ignore')


settings = Settings()
