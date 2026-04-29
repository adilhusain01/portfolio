"use client"

import { useEffect, useRef } from "react"

export function AFKTab() {
  const originalTitle = useRef<string>("")

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Save the current title just before changing it
        if (document.title !== "( -.- ) zZz..." && document.title !== "( O_O ) Welcome back!") {
          originalTitle.current = document.title
        }
        document.title = "( -.- ) zZz..."
      } else {
        document.title = "( O_O ) Welcome back!"
        
        // Revert back to the real title after 2 seconds
        setTimeout(() => {
          if (!document.hidden && originalTitle.current) {
            document.title = originalTitle.current
          }
        }, 2000)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return null
}
