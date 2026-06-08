'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { createDatabaseHello, createLiveKitToken, fetchHello, requestDesktopAutomation, runAgentHello, triggerHelloJob, wsUrl } from '@/lib/api'
import { gsap, useGSAP } from '@/lib/gsap'
import { useHelloStore } from '@/store/hello-store'

const stackGroups = [
  {
    title: 'Frontend motion shell',
    reason: 'Next.js, React, TypeScript, Zustand, TanStack Query, GSAP, Tailwind CSS, and Auth.js create a typed, animated, authenticated web surface.',
    items: ['Next.js', 'React', 'TypeScript', 'Zustand', 'TanStack Query', 'GSAP', 'Tailwind CSS', 'Auth.js']
  },
  {
    title: 'Native delivery',
    reason: 'Capacitor and Electron reuse the web UI while adding mobile and desktop native capabilities.',
    items: ['Capacitor', 'iOS', 'Android', 'Electron', 'macOS', 'Windows']
  },
  {
    title: 'SaaS backend core',
    reason: 'FastAPI, PostgreSQL, Redis, and MinIO cover API speed, durable data, low-latency cache, queues, Pub/Sub, and S3-compatible files.',
    items: ['FastAPI', 'Python', 'PostgreSQL', 'Redis', 'MinIO']
  },
  {
    title: 'Realtime intelligence',
    reason: 'WebRTC, LiveKit, WebSocket, Redis Pub/Sub, Celery/RQ, Axum/Rust, and observability support collaborative AI-native products.',
    items: ['WebRTC', 'LiveKit', 'WebSocket', 'Redis Pub/Sub', 'Celery/RQ', 'Axum/Rust', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Sentry', 'AI Agent']
  }
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
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(['.hero-kicker', '.hero-word', '.hero-card', '.stack-chip', '.motion-rail'], { clearProps: 'all', autoAlpha: 1 })
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.hero-card')
      const tl = gsap.timeline()

      tl.from('.hero-kicker', { y: 18, autoAlpha: 0 })
        .from('.hero-word', { yPercent: 120, stagger: 0.08, autoAlpha: 0 }, '-=0.25')
        .from(cards.slice(0, 5), { y: 36, scale: 0.96, autoAlpha: 0, stagger: { each: 0.08, from: 'start' } }, '-=0.15')
        .to('.orbit-dot', { rotate: 360, transformOrigin: '50% 120px', repeat: -1, duration: 8, ease: 'none' }, 0)

      gsap.to('.motion-rail', {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.motion-lab',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      })

      cards.slice(5).forEach((card) => {
        gsap.from(card, {
          y: 42,
          autoAlpha: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      })

      gsap.from('.stack-chip', {
        y: 18,
        autoAlpha: 0,
        stagger: { each: 0.035, from: 'center' },
        scrollTrigger: {
          trigger: '.stack-grid',
          start: 'top 80%'
        }
      })
    })

    return () => mm.revert()
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
    <main ref={container} className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#312e81,_transparent_35%),#020617] px-6 py-8 text-white">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="hero-kicker w-fit rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
          Full-stack Hello World Template
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <h1 className="hero-title max-w-4xl overflow-hidden text-5xl font-black tracking-tight md:text-7xl">
              {['Build', 'once.', 'Ship', 'everywhere.'].map((word) => <span className="hero-word inline-block pr-4" key={word}>{word}</span>)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              A complete Hello World scaffold for modern animation UI and AI-native applications across web, mobile, desktop, API, realtime, queue, Rust edge, and monitoring layers.
            </p>
          </div>
          <div className="hero-card relative rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
            <div className="orbit-dot absolute left-1/2 top-1/2 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_30px_#67e8f9]" />
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-200">GSAP Timeline</p>
            <div className="mt-8 text-6xl font-black">Hello</div>
            <div className="mt-2 text-6xl font-black text-violet-300">World</div>
            <p className="mt-6 text-sm text-slate-300">Scoped React timelines, ScrollTrigger reveals, transform-only motion, and reduced-motion handling follow the downloaded Microck GSAP skills guidance.</p>
          </div>
        </div>

        <section className="stack-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stackGroups.map((group) => (
            <div className="hero-card rounded-2xl border border-white/10 bg-slate-900/70 p-5" key={group.title}>
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">{group.title}</div>
              <p className="mb-4 text-sm text-slate-300">{group.reason}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => <span className="stack-chip rounded-full bg-white/10 px-3 py-1 text-sm" key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </section>

        <section className="motion-lab hero-card overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Animation UI Lab</p>
              <h2 className="mt-2 text-3xl font-black">Scroll-driven product narrative</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">GSAP drives high-impact storytelling while React keeps the UI declarative, typed, testable, and ready for AI-generated state changes.</p>
          </div>
          <div className="motion-rail mt-6 flex w-[140%] gap-3">
            {['Prompt', 'Plan', 'Animate', 'Collaborate', 'Observe', 'Automate', 'Ship'].map((step, index) => (
              <div className="min-w-40 rounded-2xl border border-white/10 bg-slate-950/60 p-4" key={step}>
                <div className="text-3xl font-black text-cyan-200">0{index + 1}</div>
                <div className="mt-3 font-semibold">{step}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="hero-card rounded-2xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-xl font-bold">FastAPI + Query + Zustand</h2>
            <input aria-label="Visitor name" className="mt-4 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3" value={name} onChange={(event) => setName(event.target.value)} />
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
            <button className="mt-4 rounded-xl bg-amber-400 px-4 py-3 font-semibold text-slate-950 hover:bg-amber-300" onClick={() => agent.mutate(`Help ${name} operate the hello world`)}>Run agent plan</button>
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
