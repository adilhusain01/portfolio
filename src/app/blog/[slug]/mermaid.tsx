"use client"

import mermaid from "mermaid"
import { useEffect, useRef, useState } from "react"

// READMEs can colour their own boxes (a red "style Node fill:#e74c3c"). Those colours are swapped onto the
// site's tokens: a strong colour becomes the pen blue with paper text, a grey becomes the tray.
function toTokens(code: string) {
  return code.replace(/^(\s*(?:style|classDef)\s+\S+\s+)(.+)$/gm, (_, head: string, rules: string) => {
    const fill = rules.match(/fill:\s*#([0-9a-f]{3}|[0-9a-f]{6})\b/i)?.[1]
    if (!fill) return head + rules
    const hex = fill.length === 3 ? fill.replace(/./g, (c) => c + c) : fill
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    const strong = Math.max(r, g, b) - Math.min(r, g, b) > 0.25
    return head + (strong ? "fill:#2948A6,stroke:#1F1B16,stroke-width:1.5px,color:#FAF6EE" : "fill:#E7DECC,stroke:#DDD3BF,color:#4E463A")
  })
}

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
        const { svg } = await mermaid.render(id, toTokens(code))
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
