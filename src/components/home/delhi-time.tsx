"use client"

import { useEffect, useState } from "react"

const DELHI = "Asia/Kolkata"

function delhiParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: DELHI,
    hour: "numeric",
    minute: "2-digit",
    weekday: "long",
    hour12: false,
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  return { hour: Number(get("hour")) % 24, weekday: get("weekday") }
}

export function useNow(intervalMs = 15_000) {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
  return now
}

export function delhiClock(now: Date, seconds = false) {
  return now
    .toLocaleTimeString("en-US", {
      timeZone: DELHI,
      hour: "numeric",
      minute: "2-digit",
      second: seconds ? "2-digit" : undefined,
      hour12: true,
    })
    .toLowerCase()
}

// How far the visitor's clock is from Delhi's, in words.
function offsetFromVisitor(now: Date) {
  const delhiMinutes = 330
  const visitorMinutes = -now.getTimezoneOffset()
  const diff = delhiMinutes - visitorMinutes
  if (diff === 0) return "Same time zone as you."
  const abs = Math.abs(diff)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  const span = [h ? `${h}h` : "", m ? `${m}m` : ""].filter(Boolean).join(" ")
  return diff > 0 ? `That's ${span} ahead of you.` : `That's ${span} behind you.`
}

// One line that changes with the hour in Delhi. Rendered only after mount, so the server and browser never disagree.
export function DelhiLine() {
  const now = useNow()
  if (!now) return <p className="h-6" aria-hidden="true" />

  const { hour, weekday } = delhiParts(now)
  const time = delhiClock(now)
  const weekend = weekday === "Saturday" || weekday === "Sunday"
  let line: string
  if (hour >= 23 || hour < 4) line = `It's ${time} in Delhi, the hour I get most done.`
  else if (!weekend && hour >= 10 && hour < 19) line = `It's ${time} in Delhi, so I'm probably at work in Gurugram.`
  else line = `It's ${time} on a ${weekday} in Delhi.`

  return (
    <p className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink-3">
      <span className="relative mt-[0.55em] inline-block h-2 w-2 shrink-0 rounded-full bg-pen" aria-hidden="true" />
      <span>
        {line} <span className="whitespace-nowrap">{offsetFromVisitor(now)}</span>
      </span>
    </p>
  )
}
