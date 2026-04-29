"use client"
import { useEffect, useState } from "react"

export function ScrollMinimap() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // document.documentElement.scrollHeight is more reliable across browsers than document.body.scrollHeight
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0
      
      // Clamp progress between 0 and 100
      setScrollProgress(Math.max(0, Math.min(100, progress)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    
    // Initial call to set state
    handleScroll()
    
    // Fallback recalculation just in case dynamic content loads and changes height
    setTimeout(handleScroll, 1000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <div className="fixed right-0 top-0 w-2 h-screen z-50 pointer-events-none hidden sm:block">
      {/* Subtle background track */}
      <div className="absolute right-0 top-0 w-[2px] h-full bg-gray-800/30"></div>
      
      {/* Glowing active progress line */}
      <div 
        className="absolute right-0 top-0 w-[2px] bg-accent transition-all duration-75 ease-out shadow-[0_0_8px_#ff6b35]"
        style={{ height: `${scrollProgress}%` }}
      ></div>
    </div>
  )
}
