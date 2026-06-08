from fastapi import APIRouter

router = APIRouter(prefix='/auth', tags=['auth'])


@router.get('/me')
async def me():
    return {'id': 'hello-user', 'name': 'Hello User', 'roles': ['admin'], 'provider': 'Auth.js compatible placeholder'}
