"use client"
import React, { useEffect, useRef } from "react"

export function Magnetic({
  children,
  strength = 10,
  padding = 30,
}: {
  children: React.ReactElement
  strength?: number
  padding?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let x = 0
    let y = 0
    let currentX = 0
    let currentY = 0
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()

      // Expand the hitbox by padding so it starts pulling before the mouse actually touches the button
      const isHovered =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding

      if (isHovered) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const distanceX = (e.clientX - centerX) / (rect.width / 2 + padding)
        const distanceY = (e.clientY - centerY) / (rect.height / 2 + padding)

        x = distanceX * strength
        y = distanceY * strength
      } else {
        x = 0
        y = 0
      }
    }

    const handleMouseLeave = () => {
      x = 0
      y = 0
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      // Lerp for smooth spring-like motion
      currentX += (x - currentX) * 0.15
      currentY += (y - currentY) * 0.15

      if (element.firstElementChild) {
        ;(element.firstElementChild as HTMLElement).style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [strength, padding])

  return (
    <div ref={ref} className="inline-block relative z-20">
      {React.cloneElement(children, {
        style: {
          ...children.props.style,
          display: "inline-block",
          willChange: "transform",
        },
      })}
    </div>
  )
}
