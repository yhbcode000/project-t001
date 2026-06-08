import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HelloDashboard } from './hello-dashboard'

vi.mock('@/lib/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/api')>()
  return {
    ...actual,
    fetchHello: vi.fn(async () => ({ message: 'Hello from FastAPI SaaS backend', cached: false, stack: ['FastAPI'] })),
    triggerHelloJob: vi.fn(),
    createLiveKitToken: vi.fn(),
    createDatabaseHello: vi.fn(),
    runAgentHello: vi.fn(),
    requestDesktopAutomation: vi.fn()
  }
})

vi.mock('@/lib/gsap', () => ({
  gsap: {
    timeline: () => ({ from: vi.fn().mockReturnThis(), to: vi.fn().mockReturnThis() }),
    matchMedia: () => ({ add: (_query: string, callback: () => void) => callback(), revert: vi.fn() }),
    set: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    utils: { toArray: () => [] }
  },
  useGSAP: (callback: () => void) => callback()
}))

describe('HelloDashboard', () => {
  it('renders the full-stack feature cards', async () => {
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
    render(<QueryClientProvider client={client}><HelloDashboard /></QueryClientProvider>)

    expect(screen.getByText('Full-stack Hello World Template')).toBeInTheDocument()
    expect(screen.getByText('FastAPI + Query + Zustand')).toBeInTheDocument()
    expect(screen.getByText('Celery / Redis Queue')).toBeInTheDocument()
    expect(screen.getByText('LiveKit / WebRTC')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL persistence')).toBeInTheDocument()
    expect(screen.getAllByText('AI Agent').length).toBeGreaterThan(0)
    expect(screen.getByText('Desktop automation')).toBeInTheDocument()
    expect(screen.getByText('WebSocket + Redis Pub/Sub')).toBeInTheDocument()
    expect(await screen.findByText(/Hello from FastAPI SaaS backend/)).toBeInTheDocument()
  })
})
