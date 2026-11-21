"use client"

import Link from "next/link"
import { useState } from "react"
import { delhiClock, useNow } from "@/components/home/delhi-time"

// Adil's own fun facts from the old footer, kept in his words and moved to the first person.
const FACTS = [
  "I drink cold coffee even in winter.",
  "I've ridden a bike across 3 countries.",
  "I once won a hackathon I nearly walked out of.",
  "I read books faster than I write docs.",
  "I prefer the terminal over a GUI for everything.",
  "I watched the Petronas Towers at 2 am.",
  "I can spin up a Docker cluster before breakfast.",
  "I have a soft spot for the limestone at Batu Caves.",
  "I think in async and dream in sync.",
  "I debug best at midnight.",
]

const socials = [
  { label: "GitHub", href: "https://github.com/adilhusain01" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adil-husain" },
  { label: "X", href: "https://x.com/0xAdilHusain" },
  { label: "Instagram", href: "https://www.instagram.com/adilhusain__" },
]

const more = [
  { label: "Products", href: "/products" },
  { label: "Design", href: "/design" },
  { label: "Gallery", href: "/gallery" },
]

export function SiteFooter() {
  const now = useNow(1000)
  const [fact, setFact] = useState(0)

  return (
    <footer className="mt-8 border-t border-rule">
      <div className="gutter grid w-full gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] tracking-[-0.02em] text-ink">Say hello.</h2>
          <p className="mt-3 max-w-[40ch] text-lg leading-relaxed text-ink-2">Email is the quickest way to reach me.</p>
          <a href="mailto:husainadil202@gmail.com" className="text-link mt-6 inline-block break-all text-xl font-medium text-ink sm:text-2xl">
            husainadil202@gmail.com
          </a>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-link text-ink-2">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6 text-[15px] lg:w-[22rem]">
          <div className="rounded-2xl bg-tray p-5 ring-1 ring-inset ring-rule">
            <p className="text-ink-3">Delhi right now</p>
            <p className="mt-1 font-display text-3xl tabular-nums text-ink" suppressHydrationWarning>
              {now ? delhiClock(now, true) : " "}
            </p>
            <div className="mt-4 flex items-start justify-between gap-4 border-t border-rule pt-4">
              <p className="min-h-[3em] text-ink-2" aria-live="polite">
                {FACTS[fact]}
              </p>
              <button
                type="button"
                onClick={() => setFact((f) => (f + 1) % FACTS.length)}
                className="shrink-0 rounded-[8px] bg-sheet px-2.5 py-1.5 text-[13px] font-medium text-ink shadow-key ring-1 ring-inset ring-rule transition-transform duration-150 ease-out active:scale-[0.96]"
              >
                Another
              </button>
            </div>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {more.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="text-link text-ink-2">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="gutter flex w-full flex-wrap justify-between gap-x-6 gap-y-2 pb-10 text-[14px] text-ink-3">
        <p>Adil Husain, Delhi, {new Date().getFullYear()}</p>
        <p className="hidden sm:block">
          Keys work here: <kbd className="font-sans">h</kbd> home, <kbd className="font-sans">p</kbd> projects, <kbd className="font-sans">a</kbd> hackathons,{" "}
          <kbd className="font-sans">b</kbd> writing, <kbd className="font-sans">r</kbd> resume.
        </p>
      </div>
    </footer>
  )
}
