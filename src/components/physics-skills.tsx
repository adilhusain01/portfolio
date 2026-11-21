"use client"
import { useEffect, useRef } from "react"
import Matter from "matter-js"

export function PhysicsSkills({ skills }: { skills: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const bodiesRef = useRef<{ body: Matter.Body; elem: HTMLElement }[]>([])

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return
    // With reduced motion the keys stay in a plain row instead of falling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Events = Matter.Events

    const engine = Engine.create()
    engineRef.current = engine
    const world = engine.world

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height + 50, width * 2, 100, { isStatic: true })
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 2, { isStatic: true })
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 2, { isStatic: true })
    // Ceiling to trap them inside the container
    const ceiling = Bodies.rectangle(width / 2, -50, width * 2, 100, { isStatic: true })

    World.add(world, [ground, leftWall, rightWall, ceiling])

    const skillElements = Array.from(container.querySelectorAll('.skill-tag')) as HTMLElement[]

    skillElements.forEach((elem, index) => {
      // Random starting positions inside the top half of the box
      const x = Math.random() * (width - 100) + 50
      const y = Math.random() * 100 + 50

      const body = Bodies.rectangle(x, y, elem.offsetWidth, elem.offsetHeight, {
        restitution: 0.45, // A little bounce, like a key landing on a desk
        friction: 0.3,
        frictionAir: 0.01, // Slight air resistance
        chamfer: { radius: 8 }, // Rounded like a keycap so corners do not snag
        render: { visible: false }
      })

      // A small random tilt as it falls
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.9)

      bodiesRef.current.push({ body, elem })
      World.add(world, body)
    })

    // Mouse interaction - only enable on desktop to avoid stealing scroll on mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    let mouse: Matter.Mouse | null = null
    
    if (!isMobile) {
      mouse = Mouse.create(container)
      // Matter's mouse cancels wheel events, which would stop the page scrolling over the tray.
      const m = mouse as Matter.Mouse & { mousewheel: EventListener }
      container.removeEventListener("mousewheel", m.mousewheel)
      container.removeEventListener("DOMMouseScroll", m.mousewheel)
      container.removeEventListener("wheel", m.mousewheel)
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      })
      World.add(world, mouseConstraint)
    }

    // Fix for mouseup getting lost outside container
    const handleMouseUp = () => {
      if (mouse) {
        mouse.button = -1
      }
    }
    window.addEventListener("mouseup", handleMouseUp)

    // Play synthesized organic pop sound on collision
    let audioCtx: AudioContext | null = null
    let lastPlayTime = 0
    let isReadyForSound = false

    // Mute sounds for the first 2 seconds so the initial drop is silent
    setTimeout(() => {
      isReadyForSound = true
    }, 2000)

    const playOrganicPop = (volume: number, pitchMultiplier: number) => {
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        }
        if (audioCtx.state === "suspended") {
          audioCtx.resume()
        }

        const oscillator = audioCtx.createOscillator()
        const gainNode = audioCtx.createGain()

        oscillator.type = "sine"
        // Base frequency 350Hz (sounds like a soft hollow block)
        const freq = 350 * pitchMultiplier
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime)
        // Pitch envelope: drops quickly for a percussive "thwack"
        oscillator.frequency.exponentialRampToValueAtTime(freq * 0.3, audioCtx.currentTime + 0.05)

        // Ensure volume is never exactly 0 for exponentialRamp
        const safeVolume = Math.max(0.01, volume)
        gainNode.gain.setValueAtTime(safeVolume, audioCtx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05)

        oscillator.connect(gainNode)
        gainNode.connect(audioCtx.destination)

        oscillator.start()
        oscillator.stop(audioCtx.currentTime + 0.1)
      } catch (e) {
        // Ignore errors if browser blocks autoplay before user interaction
      }
    }

    Events.on(engine, "collisionStart", (event) => {
      if (!isReadyForSound) return
      
      const now = Date.now()
      // Throttle to prevent echo chorus
      if (now - lastPlayTime < 40) return

      const pairs = event.pairs
      let maxImpact = 0
      
      for (let i = 0; i < pairs.length; i++) {
        const speedA = pairs[i].bodyA.speed || 0
        const speedB = pairs[i].bodyB.speed || 0
        maxImpact = Math.max(maxImpact, speedA + speedB)
      }
        
      if (maxImpact > 1.5) {
        lastPlayTime = now
        const volume = Math.min(0.5, maxImpact * 0.04)
        const pitch = 0.8 + Math.random() * 0.4
        playOrganicPop(volume, pitch)
      }
    })

    const runner = Runner.create()
    Runner.run(runner, engine)

    let animationFrameId: number
    const updateDOM = () => {
      bodiesRef.current.forEach(({ body, elem }) => {
        // Position DOM exactly over the center of the physics body
        elem.style.transform = `translate(${body.position.x - elem.offsetWidth / 2}px, ${body.position.y - elem.offsetHeight / 2}px) rotate(${body.angle}rad)`
      })
      animationFrameId = requestAnimationFrame(updateDOM)
    }

    updateDOM()

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
      cancelAnimationFrame(animationFrameId)
      Runner.stop(runner)
      World.clear(world, false)
      Engine.clear(engine)
    }
  }, [skills])

  return (
    <div
      ref={containerRef}
      className="relative h-[240px] w-full cursor-grab overflow-hidden rounded-2xl bg-tray shadow-[inset_0_1px_3px_rgb(46_36_20/0.12)] ring-1 ring-inset ring-rule active:cursor-grabbing motion-reduce:flex motion-reduce:h-auto motion-reduce:cursor-auto motion-reduce:flex-wrap motion-reduce:content-start motion-reduce:gap-2.5 motion-reduce:p-4"
    >
      {skills.map((skill, i) => (
        <div
          key={i}
          className="skill-tag pointer-events-none absolute left-0 top-0 z-10 select-none whitespace-nowrap rounded-[9px] bg-sheet px-3.5 py-2 text-[14px] font-medium text-ink shadow-key ring-1 ring-inset ring-rule motion-reduce:static"
          style={{ willChange: "transform" }}
        >
          {skill}
        </div>
      ))}
    </div>
  )
}
