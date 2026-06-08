import { describe, expect, it, vi, beforeEach } from 'vitest'
import {
  createDatabaseHello,
  createLiveKitToken,
  fetchHello,
  requestDesktopAutomation,
  runAgentHello,
  triggerHelloJob
} from './api'

function mockFetch(body: unknown, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({ ok, json: async () => body })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('web API client', () => {
  beforeEach(() => vi.unstubAllGlobals())

  it('fetches the FastAPI hello payload', async () => {
    const fetchMock = mockFetch({ message: 'hi', cached: false, stack: ['FastAPI'] })
    await expect(fetchHello()).resolves.toMatchObject({ message: 'hi', cached: false })
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8000/hello', { cache: 'no-store' })
  })

  it('posts Celery hello jobs', async () => {
    const fetchMock = mockFetch({ job_id: 'job-1', status: 'queued' })
    await expect(triggerHelloJob('Ada')).resolves.toEqual({ job_id: 'job-1', status: 'queued' })
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ name: 'Ada' })
  })

  it('creates LiveKit tokens for hello-room', async () => {
    const fetchMock = mockFetch({ url: 'ws://livekit', token: 'jwt', room: 'hello-room' })
    await createLiveKitToken('Ada')
    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8000/livekit/token')
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ identity: 'Ada', room: 'hello-room' })
  })

  it('writes PostgreSQL hello visits', async () => {
    const fetchMock = mockFetch({ id: 1, message: 'Hello Ada', total_visits: 1, database: 'PostgreSQL' })
    await createDatabaseHello('Ada')
    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8000/database/hello')
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ name: 'Ada' })
  })

  it('calls AI Agent and desktop automation services', async () => {
    const fetchMock = mockFetch({ accepted: true, command: 'screenshot', status: 'queued-for-desktop-adapter' })
    await requestDesktopAutomation('screenshot')
    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:8020/automation/command')
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({ command: 'screenshot', target: 'electron-desktop' })

    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ message: 'agent', goal: 'plan', plan: ['Read user goal'] }) })
    await runAgentHello('plan')
    expect(fetchMock.mock.calls[1][0]).toBe('http://localhost:8020/agent/hello')
  })

  it('throws for non-ok responses', async () => {
    mockFetch({}, false)
    await expect(fetchHello()).rejects.toThrow('Failed to fetch hello')
  })
})
