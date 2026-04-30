"use client"

import { useEffect, useRef } from "react"

const chars = "  ..,-~:;=!*#$@@".split("")
const fontSize = 16

class Particle {
  baseX: number
  baseY: number
  x: number
  y: number
  charIndex: number
  scale: number

  constructor(x: number, y: number) {
    this.baseX = x
    this.baseY = y
    this.x = x
    this.y = y
    this.charIndex = 0
    this.scale = 1
  }

  update(
    time: number,
    width: number,
    height: number,
    mouse: { x: number; y: number; radius: number }
  ) {
    const centerX = width / 2
    const centerY = height / 2

    let dxBase = this.baseX - centerX
    let dyBase = this.baseY - centerY

    // Squash the Y axis slightly to make an ellipse
    let distFromCenter = Math.sqrt(
      dxBase * dxBase + dyBase * 2.2 * (dyBase * 2.2)
    )
    let angle = Math.atan2(dyBase, dxBase)

    // Combine sine/cosine waves for a slow, organic liquid shape
    let wave =
      Math.sin(angle * 3 + time * 0.001) * 60 +
      Math.cos(angle * 5 - time * 0.0015) * 40 +
      Math.sin(distFromCenter * 0.01 - time * 0.002) * 30

    let blobRadius = 250 + wave

    // Calculate visual density based on whether the particle is inside the blob
    let density = blobRadius - distFromCenter
    if (density < 0) density = 0
    if (density > 100) density = 100

    this.charIndex = Math.floor((density / 100) * (chars.length - 1))

    // Mouse Interaction (Disruption only, no new particles)
    let dxMouse = mouse.x - this.x
    let dyMouse = mouse.y - this.y
    let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

    if (distMouse < mouse.radius) {
      // Force calculation to push particles outwards
      const force = (mouse.radius - distMouse) / mouse.radius
      const forceDirectionX = dxMouse / distMouse
      const forceDirectionY = dyMouse / distMouse
      const pushStrength = force * 40

      this.x -= forceDirectionX * pushStrength * 0.15
      this.y -= forceDirectionY * pushStrength * 0.15

      // Grow outwards
      this.scale = 1 + force * 1.5
    } else {
      // Smoothly shrink back to normal scale
      this.scale += (1 - this.scale) * 0.1
    }

    // Smoothly spring back to base grid position
    this.x += (this.baseX - this.x) * 0.08
    this.y += (this.baseY - this.y) * 0.08
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Don't draw empty space (this prevents the mouse from having its own particles)
    if (this.charIndex <= 1) return

    const char = chars[this.charIndex] || chars[chars.length - 1]

    // Shading based on the requested palette:
    // Black (#000) for outer outline
    // Gold (#EAC473) & Cream (#FFE8CC) for main body
    // Pink (#FF617A, #FFA5B4) for special center highlights
    const ratio = this.charIndex / (chars.length - 1)
    let color = ""

    if (ratio < 0.12) {
      // Outer layer outline (Black)
      color = "#000000"
    } else if (ratio < 0.4) {
      // Main body - Outer (Dark Yellow #EAC473)
      color = "#EAC473"
    } else if (ratio < 0.8) {
      // Main body - Inner (Light Yellow #FFE8CC)
      color = "#FFE8CC"
    } else if (ratio < 0.94) {
      // Special areas - Dark Pink (#FF617A)
      color = "#FF617A"
    } else {
      // Special areas - Light Pink (#FFA5B4)
      color = "#FFA5B4"
    }

    ctx.fillStyle = color
    ctx.font = `${fontSize * this.scale}px monospace`
    ctx.fillText(char, this.x, this.y)
  }
}

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let particles: Particle[] = []
    let animationFrameId: number

    let mouse = { x: -1000, y: -1000, radius: 120 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      mouse.x = e.touches[0].clientX
      mouse.y = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    const initParticles = () => {
      particles = []
      for (let y = 0; y < height; y += fontSize) {
        for (let x = 0; x < width; x += fontSize * 0.6) {
          particles.push(new Particle(x, y))
        }
      }
    }

    let lastWidth = 0
    let lastHeight = 0

    const resize = () => {
      // Ignore tiny resizes (like scrollbars appearing/disappearing) to prevent the animation from resetting
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
      initParticles()
    }

    window.addEventListener("resize", resize)
    resize()

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time, width, height, mouse)
        particles[i].draw(ctx)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 opacity-40"
    />
  )
}
