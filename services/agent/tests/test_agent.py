import pytest
from pydantic import ValidationError

from app.main import AgentRequest, AutomationCommand, AutomationRequest, agent_hello, automation_capabilities, automation_command, health


@pytest.mark.asyncio
async def test_agent_health():
    assert await health() == {'status': 'ok', 'service': 'agent'}


@pytest.mark.asyncio
async def test_agent_hello_returns_plan_for_goal():
    body = await agent_hello(AgentRequest(goal='Operate the hello platform'))
    assert body['goal'] == 'Operate the hello platform'
    assert body['message'] == 'Hello from the AI Agent layer'
    assert any('Celery' in step or 'Redis' in step for step in body['plan'])


@pytest.mark.asyncio
async def test_automation_capabilities_and_command_validation():
    capabilities = await automation_capabilities()
    assert 'screen capture' in capabilities['desktop_automation']
    assert 'keyboard type' in capabilities['desktop_automation']

    accepted = await automation_command(AutomationRequest(command=AutomationCommand.screenshot, target='electron', payload={'hello': True}))
    assert accepted['status'] == 'queued-for-desktop-adapter'
    assert accepted['accepted'] is True

    with pytest.raises(ValidationError):
        AutomationRequest(command='delete_everything')
