import { beforeEach, describe, expect, it } from 'vitest'
import { useHelloStore } from './hello-store'

describe('hello Zustand store', () => {
  beforeEach(() => useHelloStore.setState({ name: 'Codex Builder', visits: 0 }))

  it('starts with the default name and zero visits', () => {
    expect(useHelloStore.getState()).toMatchObject({ name: 'Codex Builder', visits: 0 })
  })

  it('updates the name and visit count', () => {
    useHelloStore.getState().setName('Ada')
    useHelloStore.getState().incrementVisits()
    useHelloStore.getState().incrementVisits()
    expect(useHelloStore.getState()).toMatchObject({ name: 'Ada', visits: 2 })
  })
})
