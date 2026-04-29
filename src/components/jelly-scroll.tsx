"use client"
import React, { useEffect, useRef } from "react"

export function JellyScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let lastY = window.scrollY
    let currentScaleY = 1
    let currentScaleX = 1
    let targetScaleY = 1
    let targetScaleX = 1
    let animationFrameId: number

    const handleScroll = () => {
      const currentY = window.scrollY
      const deltaY = currentY - lastY

      // Velocity determines stretch. Max 8% vertical stretch, 4% horizontal squash
      const velocity = Math.abs(deltaY)
      targetScaleY = 1 + Math.min(0.08, velocity * 0.002)
      targetScaleX = 1 - Math.min(0.04, velocity * 0.001)

      lastY = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    const animate = () => {
      // Decay target back to 1 (normal size) when scrolling stops
      targetScaleY += (1 - targetScaleY) * 0.1
      targetScaleX += (1 - targetScaleX) * 0.1

      // Lerp current scale towards target for a springy, bouncy effect
      currentScaleY += (targetScaleY - currentScaleY) * 0.15
      currentScaleX += (targetScaleX - currentScaleX) * 0.15

      if (ref.current) {
        ref.current.style.transform = `scale3d(${currentScaleX}, ${currentScaleY}, 1)`
        ref.current.style.transformOrigin = "center center"
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div ref={ref} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}
