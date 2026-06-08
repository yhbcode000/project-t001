'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { Observer } from 'gsap/Observer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable, Observer)
  gsap.defaults({
    duration: 0.8,
    ease: 'power3.out',
    overwrite: 'auto'
  })
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
  })
}

export { gsap, useGSAP, ScrollTrigger, Draggable, Observer }
