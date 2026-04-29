"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const FUN_FACTS = [
  "drinks cold coffee even in winter ☕",
  "has ridden a bike across 3 countries 🏍️",
  "once won a hackathon he nearly walked out of 🏆",
  "reads books faster than he writes docs 📚",
  "prefers terminal over GUI for everything 🖥️",
  "watched the Petronas towers at 2am ✨",
  "can spin up a Docker cluster before breakfast 🐳",
  "has a soft spot for Batu Caves limestone 🦇",
  "thinks in async, dreams in sync 💭",
  "debugs best at midnight 🌙",
]

// Site launch date — used for uptime counter
const LAUNCH_DATE = new Date("2024-01-01T00:00:00Z")

function formatUptime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

export function Footer() {
  const [now, setNow] = useState<Date | null>(null)
  const [factIndex, setFactIndex] = useState(0)
  const [factVisible, setFactVisible] = useState(true)

  // Hydration-safe: only run on client
  useEffect(() => {
    setNow(new Date())
    setFactIndex(Math.floor(Math.random() * FUN_FACTS.length))

    const clockInterval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(clockInterval)
  }, [])

  // Rotate fun facts every 5s with a fade
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setFactVisible(false)
      setTimeout(() => {
        setFactIndex((i) => (i + 1) % FUN_FACTS.length)
        setFactVisible(true)
      }, 400)
    }, 5000)
    return () => clearInterval(rotateInterval)
  }, [])

  const uptime = now ? formatUptime(now.getTime() - LAUNCH_DATE.getTime()) : "—"

  const timeStr = now
    ? now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      })
    : "--:--:--"

  return (
    <footer className="mt-16 border-t border-gray-800/60">
      {/* Terminal window chrome */}
      <div className="border border-gray-800 mt-8 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/60 border-b border-gray-800">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-gray-500 tracking-widest">
            adil@portfolio ~ bash
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-4 sm:p-6 space-y-3 text-xs sm:text-sm bg-[#0d1117]">
          {/* whoami */}
          <div className="flex gap-2">
            <span className="text-accent shrink-0">❯</span>
            <span className="text-gray-300">whoami</span>
          </div>
          <div className="pl-4 text-gray-400">
            adil husain — full stack dev, web3 builder, traveller
          </div>

          {/* fun fact */}
          <div className="flex gap-2 mt-1">
            <span className="text-accent shrink-0">❯</span>
            <span className="text-gray-300">cat fun_fact.txt</span>
          </div>
          <div
            className="pl-4 text-gray-400 transition-opacity duration-300"
            style={{ opacity: factVisible ? 1 : 0 }}
          >
            <span className="text-yellow-400/80 mr-1">→</span>
            {FUN_FACTS[factIndex]}
          </div>

          {/* uptime */}
          <div className="flex gap-2 mt-1">
            <span className="text-accent shrink-0">❯</span>
            <span className="text-gray-300">uptime</span>
          </div>
          <div className="pl-4 text-gray-400">
            <span className="text-green-400/80">online</span>
            {"  "}
            <span className="font-mono">{uptime}</span>
            {"  "}
            <span className="text-gray-600">IST {timeStr}</span>
          </div>

          {/* connect */}
          <div className="flex gap-2 mt-1">
            <span className="text-accent shrink-0">❯</span>
            <span className="text-gray-300">ls ./connect</span>
          </div>
          <div className="pl-4 flex flex-wrap gap-x-4 gap-y-1 text-gray-400">
            <Link
              href="https://github.com/adilhusain01"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              github/
            </Link>
            <Link
              href="https://x.com/0xAdilHusain"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              twitter/
            </Link>
            <Link
              href="https://www.linkedin.com/in/adil-husain"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              linkedin/
            </Link>
            <Link
              href="https://www.instagram.com/adilhusain__"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              instagram/
            </Link>
            <Link
              href="mailto:husainadil202@gmail.com"
              className="hover:text-accent transition-colors"
            >
              mail/
            </Link>
          </div>

          {/* blinking cursor */}
          <div className="flex gap-2 pt-1">
            <span className="text-accent shrink-0">❯</span>
            <span
              className="inline-block w-2 h-4 bg-accent/80"
              style={{ animation: "blink 1.1s step-start infinite" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4 px-1 text-[11px] text-gray-600">
        <span>© {new Date().getFullYear()} adil husain. built with next.js &amp; tailwind.</span>
        <span className="hidden sm:block">
          press{" "}
          <kbd className="px-1 py-0.5 border border-gray-700 rounded text-gray-500">
            h
          </kbd>{" "}
          to go home anytime
        </span>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </footer>
  )
}
