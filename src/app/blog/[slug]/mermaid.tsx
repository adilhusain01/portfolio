"use client"

import mermaid from "mermaid"
import { useEffect, useRef, useState } from "react"

export function Mermaid({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>("")

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      // Drawn in the site's own ink and paper, with blue for the lines between boxes.
      theme: "base",
      themeVariables: {
        background: "#FAF6EE",
        primaryColor: "#FAF6EE",
        primaryBorderColor: "#4E463A",
        primaryTextColor: "#1F1B16",
        secondaryColor: "#E7DECC",
        tertiaryColor: "#F2EBDD",
        lineColor: "#2948A6",
        textColor: "#1F1B16",
        mainBkg: "#FAF6EE",
        nodeBorder: "#4E463A",
        clusterBkg: "#F2EBDD",
        clusterBorder: "#DDD3BF",
        edgeLabelBackground: "#F2EBDD",
        actorBkg: "#FAF6EE",
        actorBorder: "#4E463A",
        signalColor: "#2948A6",
        noteBkgColor: "#E7DECC",
        noteBorderColor: "#DDD3BF",
        fontSize: "15px",
      },
      securityLevel: "loose",
      fontFamily: "var(--font-hanken), system-ui, sans-serif",
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
      className="not-prose my-10 flex justify-center overflow-x-auto rounded-xl bg-sheet p-6 ring-1 ring-inset ring-rule"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
