"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

const links = [
  { href: "/projects", label: "Projects", key: "p" },
  { href: "/achievements", label: "Hackathons", key: "a" },
  { href: "/blog", label: "Writing", key: "b" },
  { href: "/resume", label: "Resume", key: "r" },
]

// Single-letter jumps, kept from the old site. They stay quiet while someone is typing or holding a modifier.
const shortcuts: Record<string, string> = {
  h: "/",
  a: "/achievements",
  r: "/resume",
  p: "/projects",
  t: "/products",
  d: "/design",
  s: "/system-design",
  b: "/blog",
  g: "/gallery",
}

export function SiteNav() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return
      const to = shortcuts[event.key.toLowerCase()]
      if (to) router.push(to)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [router])

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="gutter flex min-h-[var(--nav)] w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
      <Link
        href="/"
        aria-label="Adil Husain, home"
        aria-keyshortcuts="h"
        className="font-hand text-[1.6rem] font-bold leading-none tracking-tight text-ink"
      >
        Adil Husain
      </Link>
      <nav aria-label="Main" className="-mx-2 flex items-center gap-1 sm:mx-0">
        {links.map((link) => {
          const current = isCurrent(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current ? "page" : undefined}
              aria-keyshortcuts={link.key}
              className={`rounded-lg px-2.5 py-1.5 text-[15px] transition-colors duration-150 ease-out ${
                current ? "bg-tray text-ink shadow-hair" : "text-ink-2 [@media(hover:hover)]:hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
