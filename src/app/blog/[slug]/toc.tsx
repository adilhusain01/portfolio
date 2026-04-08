"use client"

import { useEffect, useState } from "react"

export function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Select all h2, h3 rendered by our custom MDX createHeading
    const elements = Array.from(document.querySelectorAll("h2, h3"))
    const headingData = elements.map((el) => {
      const isAnchor = el.querySelector("a.anchor")
      return {
        id: el.id,
        text: el.textContent ? el.textContent : "",
        level: el.tagName === "H2" ? 2 : 3,
      }
    }).filter(h => h.id)

    setHeadings(headingData)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <div className="sticky top-24 hidden lg:block w-full max-w-[250px]">
      <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
        On this page
      </h4>
      <ul className="space-y-3 text-sm text-gray-400 border-l border-gray-800">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`transition-colors pl-4 ${
              h.level === 3 ? "ml-4" : ""
            } ${activeId === h.id ? "text-accent font-semibold border-l-2 -ml-[1px] border-accent" : "hover:text-gray-200"}`}
          >
            <a href={`#${h.id}`} className="block w-full truncate" title={h.text}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
