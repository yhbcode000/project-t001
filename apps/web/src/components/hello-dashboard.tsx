'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { createDatabaseHello, createLiveKitToken, fetchHello, requestDesktopAutomation, runAgentHello, triggerHelloJob, wsUrl } from '@/lib/api'
import { gsap, useGSAP } from '@/lib/gsap'
import { useHelloStore } from '@/store/hello-store'

const stackGroups = [
  ['Next.js', 'React', 'TypeScript', 'Zustand', 'TanStack Query', 'GSAP', 'Tailwind CSS', 'Auth.js'],
  ['Capacitor', 'Electron', 'FastAPI', 'PostgreSQL', 'Redis', 'MinIO'],
  ['WebRTC', 'LiveKit', 'WebSocket', 'Redis Pub/Sub', 'Celery', 'Axum/Rust'],
  ['OpenTelemetry', 'Prometheus', 'Grafana', 'Sentry', 'AI Agent', 'Desktop Automation']
]

export function HelloDashboard() {
  const container = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<string[]>([])
  const { name, setName, visits, incrementVisits } = useHelloStore()
  const hello = useQuery({ queryKey: ['hello'], queryFn: fetchHello })
  const job = useMutation({ mutationFn: triggerHelloJob })
  const livekit = useMutation({ mutationFn: createLiveKitToken })
  const database = useMutation({ mutationFn: createDatabaseHello })
  const agent = useMutation({ mutationFn: runAgentHello })
  const automation = useMutation({ mutationFn: requestDesktopAutomation })

  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.hero-kicker', { y: 18, autoAlpha: 0 })
      .from('.hero-title span', { yPercent: 120, stagger: 0.08, autoAlpha: 0 }, '-=0.25')
      .from('.hero-card', { y: 36, scale: 0.96, autoAlpha: 0, stagger: 0.08 }, '-=0.15')
      .to('.orbit-dot', { rotate: 360, transformOrigin: '50% 120px', repeat: -1, duration: 8, ease: 'none' })
  }, { scope: container })

  useEffect(() => {
    incrementVisits()
    const socket = new WebSocket(wsUrl)
    socket.onmessage = (event) => setMessages((current) => [event.data, ...current].slice(0, 5))
    socket.onopen = () => socket.send(JSON.stringify({ type: 'hello', name }))
    socket.onerror = () => setMessages((current) => ['WebSocket offline: start services/realtime to receive Redis Pub/Sub messages.', ...current].slice(0, 5))
    return () => socket.close()
  }, [incrementVisits, name])

  return (
    <main ref={container} className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#312e81,_transparent_35%),#020617] px-6 py-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="hero-kicker w-fit rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
          Full-stack Hello World Platform
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <h1 className="hero-title max-w-4xl overflow-hidden text-5xl font-black tracking-tight md:text-7xl">
              {['Build', 'once.', 'Ship', 'everywhere.'].map((word) => <span className="inline-block pr-4" key={word}>{word}</span>)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              A working scaffold for web, mobile, desktop, API, realtime, queue, high-performance Rust, and monitoring layers.
            </p>
          </div>
          <div className="hero-card relative rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
            <div className="orbit-dot absolute left-1/2 top-1/2 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_30px_#67e8f9]" />
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">GSAP Timeline</p>
            <div className="mt-8 text-6xl font-black">Hello</div>
            <div className="mt-2 text-6xl font-black text-violet-300">World</div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stackGroups.map((group) => (
            <div className="hero-card rounded-2xl border border-white/10 bg-slate-900/70 p-5" key={group.join('-')}>
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Stack slice</div>
              <div className="flex flex-wrap gap-2">
                {group.map((item) => <span className="rounded-full bg-white/10 px-3 py-1 text-sm" key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="hero-card rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">FastAPI + Query + Zustand</h2>
            <input className="mt-4 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3" value={name} onChange={(event) => setName(event.target.value)} />
            <p className="mt-4 text-slate-300">Visits in local store: {visits}</p>
            <pre className="mt-4 min-h-28 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-cyan-100">{hello.isLoading ? 'Loading /hello...' : JSON.stringify(hello.data ?? hello.error, null, 2)}</pre>
          </div>

          <div className="hero-card rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Celery / Redis Queue</h2>
            <button className="mt-4 rounded-xl bg-violet-500 px-4 py-3 font-semibold hover:bg-violet-400" onClick={() => job.mutate(name)}>Run hello job</button>
            <pre className="mt-4 min-h-28 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-fuchsia-100">{JSON.stringify(job.data ?? { status: job.status }, null, 2)}</pre>
          </div>

          <div className="hero-card rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">LiveKit / WebRTC</h2>
            <button className="mt-4 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-300" onClick={() => livekit.mutate(name)}>Create room token</button>
            <pre className="mt-4 min-h-28 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-cyan-100">{JSON.stringify(livekit.data ?? { status: livekit.status }, null, 2)}</pre>
          </div>
        </section>


        <section className="grid gap-4 lg:grid-cols-3">
          <div className="hero-card rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">PostgreSQL persistence</h2>
            <button className="mt-4 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 hover:bg-emerald-300" onClick={() => database.mutate(name)}>Write hello visit</button>
            <pre className="mt-4 min-h-28 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-emerald-100">{JSON.stringify(database.data ?? { status: database.status }, null, 2)}</pre>
          </div>

          <div className="hero-card rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">AI Agent</h2>
            <button className="mt-4 rounded-xl bg-amber-400 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-300" onClick={() => agent.mutate(`Help ${name} operate the hello platform`)}>Run agent plan</button>
            <pre className="mt-4 min-h-28 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-amber-100">{JSON.stringify(agent.data ?? { status: agent.status }, null, 2)}</pre>
          </div>

          <div className="hero-card rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">Desktop automation</h2>
            <button className="mt-4 rounded-xl bg-rose-500 px-4 py-3 font-semibold hover:bg-rose-400" onClick={() => automation.mutate('screenshot')}>Queue screen capture</button>
            <pre className="mt-4 min-h-28 overflow-auto rounded-xl bg-black/40 p-4 text-xs text-rose-100">{JSON.stringify(automation.data ?? { status: automation.status }, null, 2)}</pre>
          </div>
        </section>

        <section className="hero-card rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-xl font-bold">WebSocket + Redis Pub/Sub</h2>
          <div className="mt-4 grid gap-2">
            {messages.length ? messages.map((message, index) => <div className="rounded-xl bg-white/10 p-3 text-sm" key={`${message}-${index}`}>{message}</div>) : <div className="text-slate-400">Waiting for realtime messages...</div>}
          </div>
        </section>
      </section>
    </main>
  )
}
