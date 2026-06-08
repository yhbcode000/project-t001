import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

class MockWebSocket {
  static instances: MockWebSocket[] = []
  onopen: ((event: Event) => void) | null = null
  onmessage: ((event: MessageEvent) => void) | null = null
  onerror: ((event: Event) => void) | null = null
  sent: string[] = []

  constructor(public url: string) {
    MockWebSocket.instances.push(this)
    queueMicrotask(() => this.onopen?.(new Event('open')))
  }

  send(message: string) {
    this.sent.push(message)
  }

  close() {}
}

vi.stubGlobal('WebSocket', MockWebSocket)

afterEach(() => {
  vi.restoreAllMocks()
  MockWebSocket.instances = []
})
