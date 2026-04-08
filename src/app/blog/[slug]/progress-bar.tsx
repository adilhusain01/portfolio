"use client"

import { useEffect, useState } from "react"

export function ProgressBar() {
  const [scrollWidth, setScrollWidth] = useState(0)

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = (scrollY / docHeight) * 100
      setScrollWidth(percent > 100 ? 100 : percent)
    }

    // Run initially (in case user refreshes midway)
    updateScroll()
    
    window.addEventListener("scroll", updateScroll, { passive: true })
    window.addEventListener("resize", updateScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", updateScroll)
      window.removeEventListener("resize", updateScroll)
    }
  }, [])

  return (
    <div
      style={{ width: `${scrollWidth}%` }}
      className="fixed top-0 left-0 h-1 bg-accent z-50 transition-all duration-150 ease-out glow-bar"
    />
  )
}
