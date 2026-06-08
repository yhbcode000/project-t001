export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
export const wsUrl = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:8010/ws'
export const agentUrl = process.env.NEXT_PUBLIC_AGENT_URL ?? 'http://localhost:8020'

export type HelloResponse = {
  message: string
  cached: boolean
  stack: string[]
}

export async function fetchHello(): Promise<HelloResponse> {
  const response = await fetch(`${apiUrl}/hello`, { cache: 'no-store' })
  if (!response.ok) throw new Error('Failed to fetch hello')
  return response.json()
}

export async function triggerHelloJob(name: string) {
  const response = await fetch(`${apiUrl}/jobs/hello`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  })
  if (!response.ok) throw new Error('Failed to enqueue job')
  return response.json() as Promise<{ job_id: string; status: string }>
}

export async function createLiveKitToken(identity: string) {
  const response = await fetch(`${apiUrl}/livekit/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity, room: 'hello-room' })
  })
  if (!response.ok) throw new Error('Failed to create LiveKit token')
  return response.json() as Promise<{ url: string; token: string; room: string }>
}

export async function createDatabaseHello(name: string) {
  const response = await fetch(`${apiUrl}/database/hello`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  })
  if (!response.ok) throw new Error('Failed to create PostgreSQL hello')
  return response.json() as Promise<{ id: number; message: string; total_visits: number; database: string }>
}

export async function runAgentHello(goal: string) {
  const response = await fetch(`${agentUrl}/agent/hello`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal })
  })
  if (!response.ok) throw new Error('Failed to call AI Agent layer')
  return response.json() as Promise<{ message: string; goal: string; plan: string[] }>
}

export async function requestDesktopAutomation(command: 'screenshot' | 'mouse_move' | 'mouse_click' | 'keyboard_type') {
  const response = await fetch(`${agentUrl}/automation/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, target: 'electron-desktop', payload: { hello: true } })
  })
  if (!response.ok) throw new Error('Failed to request desktop automation')
  return response.json() as Promise<{ accepted: boolean; command: string; status: string }>
}
