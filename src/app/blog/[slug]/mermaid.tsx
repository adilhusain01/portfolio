"use client"

import mermaid from "mermaid"
import { useEffect, useRef, useState } from "react"

export function Mermaid({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      securityLevel: "loose",
      fontFamily: "inherit",
    })

    const renderChart = async () => {
      try {
        const id = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`
        const { svg } = await mermaid.render(id, code)
        setSvg(svg)
      } catch (error) {
        console.error("Failed to render mermaid diagram", error)
      }
    }

    renderChart()
  }, [code])

  return (
    <div 
      ref={ref} 
      className="my-10 flex justify-center p-6 bg-gray-900/30 border border-gray-800 rounded-xl overflow-x-auto shadow-sm"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
