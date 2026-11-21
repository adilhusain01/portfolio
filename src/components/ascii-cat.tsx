"use client"

import { useEffect, useState } from "react"

export function AsciiCat() {
  const [face, setFace] = useState("o.o")
  const [zTexts, setZTexts] = useState<{ id: number; text: string }[]>([])

  useEffect(() => {
    let sleepTimeout: NodeJS.Timeout
    let scrollTimeout: NodeJS.Timeout
    let isScrolling = false
    let zCounter = 0
    let isSleeping = false

    const handleMouseMove = (e: MouseEvent) => {
      isSleeping = false
      clearTimeout(sleepTimeout)

      if (!isScrolling) {
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight

        let leftEye = "o"
        let rightEye = "o"
        let mouth = "."

        if (y < 0.3) {
          leftEye = "^"
          rightEye = "^"
          mouth = "_"
        } else if (y > 0.7) {
          leftEye = "v"
          rightEye = "v"
        } else {
          if (x < 0.4) {
            leftEye = "<"
            rightEye = "<"
          } else if (x > 0.6) {
            leftEye = ">"
            rightEye = ">"
          }
        }
        setFace(`${leftEye}${mouth}${rightEye}`)
      }

      sleepTimeout = setTimeout(() => {
        isSleeping = true
        setFace("-.-")
      }, 4000)
    }

    const handleScroll = () => {
      isScrolling = true
      isSleeping = false
      clearTimeout(sleepTimeout)
      clearTimeout(scrollTimeout)

      setFace("O_O") // Wide awake/surprised when scrolling

      scrollTimeout = setTimeout(() => {
        isScrolling = false
        setFace("o.o")
        sleepTimeout = setTimeout(() => {
          isSleeping = true
          setFace("-.-")
        }, 4000)
      }, 200)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Initial sleep timer
    sleepTimeout = setTimeout(() => {
      isSleeping = true
      setFace("-.-")
    }, 4000)

    // Z generator for sleeping
    const zInterval = setInterval(() => {
      if (isSleeping) {
        zCounter++
        const newZ = { id: zCounter, text: zCounter % 2 === 0 ? "Z" : "z" }
        setZTexts((prev) => [...prev, newZ].slice(-3))
      } else {
        setZTexts([])
      }
    }, 1200)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(sleepTimeout)
      clearTimeout(scrollTimeout)
      clearInterval(zInterval)
    }
  }, [])

  return (
    <div className="hidden xl:flex fixed right-3 bottom-4 flex-col items-center justify-end z-20 font-mono text-ink-2 group select-none">
      {/* Zzz Animations */}
      <div className="absolute -top-16 -right-4 h-16 w-16 flex flex-col justify-end items-end pointer-events-none">
        {zTexts.map((z, i) => (
          <span
            key={z.id}
            className="animate-rise text-sm font-bold absolute text-ink-3"
            style={{
              bottom: `${i * 16}px`,
              right: `${i * 10}px`,
              opacity: 1 - i * 0.3,
            }}
          >
            {z.text}
          </span>
        ))}
      </div>

      {/* Cat ASCII Art */}
      <div
        className="text-sm whitespace-pre leading-tight transition-transform duration-200 ease-out group-hover:-translate-y-1 cursor-pointer text-ink hover:text-pen"
        onMouseEnter={() => setFace("♥_♥")}
        onMouseLeave={() => setFace("o.o")}
      >
        {"  /\\_/\\  \n"}
        {` ( ${face} ) \n`}
        {"  > ^ <  "}
      </div>

      {/* Shadow */}
      <div className="w-12 h-1 bg-ink/25 rounded-[100%] mt-2 blur-[2px]"></div>
    </div>
  )
}
