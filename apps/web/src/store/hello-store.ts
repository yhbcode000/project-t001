import { create } from 'zustand'

type HelloState = {
  name: string
  setName: (name: string) => void
  visits: number
  incrementVisits: () => void
}

export const useHelloStore = create<HelloState>((set) => ({
  name: 'Codex Builder',
  setName: (name) => set({ name }),
  visits: 0,
  incrementVisits: () => set((state) => ({ visits: state.visits + 1 }))
}))
