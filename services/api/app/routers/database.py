from pydantic import BaseModel
from fastapi import APIRouter
from sqlalchemy import func, select
from ..dependencies import SessionLocal
from ..models import HelloVisit

router = APIRouter(prefix='/database', tags=['database'])


class VisitRequest(BaseModel):
    name: str = 'World'


@router.post('/hello')
async def create_database_hello(request: VisitRequest):
    async with SessionLocal() as session:
        visit = HelloVisit(name=request.name, message=f'Hello {request.name} from PostgreSQL')
        session.add(visit)
        await session.commit()
        await session.refresh(visit)
        total = await session.scalar(select(func.count()).select_from(HelloVisit))
        return {
            'id': visit.id,
            'message': visit.message,
            'total_visits': total,
            'database': 'PostgreSQL',
        }


@router.get('/hello')
async def list_database_hello():
    async with SessionLocal() as session:
        rows = await session.execute(select(HelloVisit).order_by(HelloVisit.id.desc()).limit(5))
        visits = rows.scalars().all()
        return {
            'database': 'PostgreSQL',
            'visits': [{'id': visit.id, 'name': visit.name, 'message': visit.message} for visit in visits],
        }
