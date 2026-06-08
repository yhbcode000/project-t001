from redis.asyncio import from_url
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from minio import Minio
from .config import settings

engine = create_async_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
redis = from_url(settings.redis_url, decode_responses=True)
minio_client = Minio(
    settings.minio_endpoint,
    access_key=settings.minio_access_key,
    secret_key=settings.minio_secret_key,
    secure=False,
)
