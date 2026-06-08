'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, Draggable, Observer } from '@/lib/gsap'

const SNAP_ANGLES = [0, 90, 180, 270]
const FRAME_COUNT = 120

function frameSrc(index: number) {
  return `/pvi/frames/${String(index).padStart(4, '0')}.webp`
}

export function PviViewer() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const progressRingRef = useRef<SVGCircleElement>(null)
  const angleTextRef = useRef<HTMLSpanElement>(null)
  const frameTextRef = useRef<HTMLSpanElement>(null)
  const [rotation, setRotation] = useState(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [ready, setReady] = useState(false)

  const images = useRef<HTMLImageElement[]>([])
  const currentAngle = useRef({ value: 0 })
  const goalAngle = useRef(0)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    let loaded = 0
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT)
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = frameSrc(i)
      img.onload = () => {
        loaded++
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100))
        if (loaded === FRAME_COUNT) {
          images.current = imgs
          setReady(true)
        }
      }
      imgs[i] = img
    }
  }, [])

  const drawFrame = useCallback((deg: number) => {
    if (!canvasRef.current || !images.current.length) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const normalized = ((deg % 360) + 360) % 360
    const frameIndex = Math.round((normalized / 360) * (FRAME_COUNT - 1))
    const img = images.current[frameIndex]
    if (!img || !img.complete) return

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
    }
    ctx.drawImage(img, 0, 0)

    if (angleTextRef.current) angleTextRef.current.textContent = `${normalized.toFixed(1)}°`
    if (frameTextRef.current) frameTextRef.current.textContent = `${frameIndex + 1}/${FRAME_COUNT}`
    if (progressRingRef.current) {
      const circumference = 2 * Math.PI * 58
      progressRingRef.current.style.strokeDashoffset = `${circumference * (1 - normalized / 360)}`
    }
    setRotation(normalized)
  }, [])

  const animateToGoal = useCallback((target: number) => {
    goalAngle.current = target
    if (tweenRef.current) tweenRef.current.kill()
    tweenRef.current = gsap.to(currentAngle.current, {
      value: target,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: () => {
        drawFrame(currentAngle.current.value)
        gsap.set(knobRef.current, { rotation: currentAngle.current.value })
      }
    })
  }, [drawFrame])

  const jumpToGoal = useCallback((target: number) => {
    goalAngle.current = target
    currentAngle.current.value = target
    if (tweenRef.current) tweenRef.current.kill()
    drawFrame(target)
    gsap.set(knobRef.current, { rotation: target })
  }, [drawFrame])

  useGSAP(() => {
    if (!sectionRef.current || !ready) return

    gsap.from('.pvi-title', { y: 40, autoAlpha: 0, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })
    gsap.from('.pvi-subtitle', { y: 30, autoAlpha: 0, delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } })
    gsap.from('.pvi-video-wrap', { scale: 0.9, autoAlpha: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
    gsap.from('.pvi-chip', { y: 20, autoAlpha: 0, stagger: 0.08, scrollTrigger: { trigger: '.pvi-controls', start: 'top 85%' } })

    gsap.to('.pvi-dot', {
      y: -15,
      stagger: { each: 0.3, repeat: -1, yoyo: true },
      ease: 'sine.inOut',
      duration: 2
    })

    if (knobRef.current) {
      Draggable.create(knobRef.current, {
        type: 'rotation',
        inertia: true,
        onDrag() {
          const delta = this.deltaX * 0.5
          goalAngle.current += delta
          jumpToGoal(goalAngle.current)
        },
        onDragEnd() {
          const deg = ((goalAngle.current % 360) + 360) % 360
          const nearest = SNAP_ANGLES.reduce((a, b) => Math.abs(b - deg) < Math.abs(a - deg) ? b : a)
          animateToGoal(nearest)
          gsap.to(this.target, { rotation: nearest, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
        }
      })
    }

    Observer.create({
      target: '.pvi-video-wrap',
      type: 'pointer,touch,wheel',
      dragMinimum: 3,
      wheelSpeed: -1,
      onDrag: (self) => {
        const delta = (self.deltaX || 0) * 0.6
        goalAngle.current += delta
        jumpToGoal(goalAngle.current)
      },
      onDragEnd: () => {
        const deg = ((goalAngle.current % 360) + 360) % 360
        const nearest = SNAP_ANGLES.reduce((a, b) => Math.abs(b - deg) < Math.abs(a - deg) ? b : a)
        animateToGoal(nearest)
      },
      onChangeY: (self) => {
        const delta = (self.deltaY || 0) * 0.3
        goalAngle.current += delta
        animateToGoal(goalAngle.current)
      }
    })
  }, { scope: sectionRef, dependencies: [ready, drawFrame, animateToGoal, jumpToGoal] })

  const circumference = 2 * Math.PI * 58

  return (
    <section ref={sectionRef} className="pvi-section relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/40 via-slate-900/80 to-cyan-950/30 p-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="pvi-dot absolute h-1.5 w-1.5 rounded-full bg-violet-400/20" style={{ left: `${8 + (i * 7.5)}%`, top: `${15 + ((i * 23) % 60)}%` }} />
        ))}
      </div>

      <div className="relative z-10">
        <p className="pvi-title text-sm uppercase tracking-[0.4em] text-violet-300">Parametric Video Interface</p>
        <h2 className="pvi-title mt-2 text-4xl font-black">Control state, not time.</h2>
        <p className="pvi-subtitle mt-3 max-w-xl text-slate-400">Drag to rotate. Scroll to scrub. The video responds to your parameter — not a timeline.</p>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div className="pvi-video-wrap relative cursor-grab overflow-hidden rounded-2xl border border-white/10 bg-black/60 active:cursor-grabbing">
            <canvas ref={canvasRef} className="aspect-video w-full object-cover" />
            {!ready && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-200" style={{ width: `${loadProgress}%` }} />
                </div>
                <p className="mt-3 text-xs text-slate-400">Loading frames... {loadProgress}%</p>
              </div>
            )}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="pvi-chip rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-200 backdrop-blur">
                <span ref={angleTextRef}>0.0°</span>
              </span>
              <span className="pvi-chip rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-200 backdrop-blur">
                Frame <span ref={frameTextRef}>0/{FRAME_COUNT}</span>
              </span>
            </div>
          </div>

          <div className="pvi-controls flex flex-col items-center gap-4">
            <div className="relative h-36 w-36">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="4" />
                <circle
                  ref={progressRingRef}
                  cx="64" cy="64" r="58" fill="none"
                  stroke="url(#pvi-gradient)" strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference}
                />
                <defs>
                  <linearGradient id="pvi-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div ref={knobRef} className="absolute inset-3 flex items-center justify-center rounded-full border border-violet-400/30 bg-slate-900/80 backdrop-blur">
                <div className="absolute -top-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                <span className="text-2xl font-black text-white">{Math.round(rotation)}°</span>
              </div>
            </div>

            <div className="flex gap-2">
              {SNAP_ANGLES.map(angle => (
                <button
                  key={angle}
                  onClick={() => animateToGoal(angle)}
                  className="pvi-chip rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-violet-400/40 hover:text-violet-200"
                >
                  {angle}°
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500">Drag ring or scroll to rotate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
