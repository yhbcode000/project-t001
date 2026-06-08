from pydantic import BaseModel
from fastapi import APIRouter
from jose import jwt
import time
from ..config import settings

router = APIRouter(prefix='/livekit', tags=['livekit'])


class TokenRequest(BaseModel):
    identity: str
    room: str = 'hello-room'


@router.post('/token')
async def token(request: TokenRequest):
    now = int(time.time())
    payload = {
        'iss': settings.livekit_api_key,
        'sub': request.identity,
        'nbf': now,
        'exp': now + 3600,
        'video': {'roomJoin': True, 'room': request.room, 'canPublish': True, 'canSubscribe': True},
    }
    return {'url': settings.livekit_url, 'token': jwt.encode(payload, settings.livekit_api_secret, algorithm='HS256'), 'room': request.room}
