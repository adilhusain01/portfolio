"use client"
import React from "react"

export function JellyScroll({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      {children}
    </div>
  )
}
