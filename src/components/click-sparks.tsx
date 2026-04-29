"use client"
import { useEffect, useRef } from "react"

export function ClickSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    let particles: any[] = []
    let animationFrameId: number

    const chars = ["*", "+", "'", ".", "`", "✧", "✦", "×"]

    const createSparks = (x: number, y: number) => {
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 2
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2, // Slight upward bias initially
          char: chars[Math.floor(Math.random() * chars.length)],
          life: 1,
          decay: Math.random() * 0.02 + 0.02,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15,
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      createSparks(e.clientX, e.clientY)
    }

    let lastWidth = 0
    let lastHeight = 0
    const resize = () => {
      if (
        Math.abs(window.innerWidth - lastWidth) < 50 &&
        Math.abs(window.innerHeight - lastHeight) < 50
      ) {
        return
      }
      width = window.innerWidth
      height = window.innerHeight
      lastWidth = width
      lastHeight = height
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("click", handleClick)
    window.addEventListener("resize", resize)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.vy += 0.2 // Gravity pulling down
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay
        p.rotation += p.rotationSpeed

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)

        // Accent color (orange/red) fading out
        ctx.fillStyle = `rgba(255, 107, 53, ${p.life})`
        ctx.font = "16px monospace"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(p.char, 0, 0)

        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-screen h-screen transform-gpu"
    />
  )
}
