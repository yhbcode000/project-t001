from enum import Enum
from pydantic import BaseModel, Field
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='Hello AI Agent and Automation Service', version='0.1.0')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost:3001'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class AutomationCommand(str, Enum):
    screenshot = 'screenshot'
    mouse_move = 'mouse_move'
    mouse_click = 'mouse_click'
    keyboard_type = 'keyboard_type'


class AgentRequest(BaseModel):
    goal: str = Field(default='Say hello to the whole project')


class AutomationRequest(BaseModel):
    command: AutomationCommand
    target: str = Field(default='desktop-shell')
    payload: dict = Field(default_factory=dict)


@app.get('/health')
async def health():
    return {'status': 'ok', 'service': 'agent'}


@app.post('/agent/hello')
async def agent_hello(request: AgentRequest):
    plan = [
        'Read user goal',
        'Call FastAPI or Rust edge service for data',
        'Publish progress through WebSocket',
        'Queue long-running work through Celery/RQ',
        'Report observability through OpenTelemetry and Sentry',
    ]
    return {'message': 'Hello from the AI Agent layer', 'goal': request.goal, 'plan': plan}


@app.get('/automation/capabilities')
async def automation_capabilities():
    return {
        'desktop_automation': ['screen capture', 'mouse move', 'mouse click', 'keyboard type'],
        'safety': 'Commands are represented as auditable API intents; native execution belongs in the Electron preload/main process.',
    }


@app.post('/automation/command')
async def automation_command(request: AutomationRequest):
    return {
        'accepted': True,
        'target': request.target,
        'command': request.command,
        'payload': request.payload,
        'status': 'queued-for-desktop-adapter',
    }
