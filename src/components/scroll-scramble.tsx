"use client"
import { useEffect, useRef, useState } from "react"
import { ScrambleText } from "./scramble-text"

export function ScrollScramble({ text, className = "" }: { text: string; className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <span ref={ref} className={className}>
      {isVisible ? (
        <ScrambleText text={text} speed={0.5} scramble={5} tick={1} step={1} />
      ) : (
        <span className="opacity-0">{text}</span>
      )}
    </span>
  )
}
