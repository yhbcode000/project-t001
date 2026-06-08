from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .observability import configure_observability
from .dependencies import engine
from .models import Base
from .routers import auth, database, files, hello, jobs, livekit

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(title='Hello Platform API', version='0.1.0', lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost:3001'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(hello.router)
app.include_router(auth.router)
app.include_router(files.router)
app.include_router(database.router)
app.include_router(jobs.router)
app.include_router(livekit.router)
configure_observability(app)
