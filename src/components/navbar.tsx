"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Instagram,
  ChevronsRight,
} from "lucide-react"

export function Navbar() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger if any input elements are focused or if event target is an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        event.target instanceof HTMLInputElement
      ) {
        return
      }

      // Ignore if modifier keys are pressed (e.g., Cmd+R for refresh)
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      switch (event.key.toLowerCase()) {
        case "h":
          router.push("/")
          break
        case "b":
          router.push("/blog")
          break
        case "p":
          router.push("/projects")
          break
        case "s":
          router.push("/system-design")
          break
        case "a":
          router.push("/achievements")
          break
        case "r":
          router.push("/resume")
          break
        case "g":
          router.push("/gallery")
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [router])

  return (
    <nav className="flex flex-col mb-10 sm:mb-12 text-sm gap-4">
      <div className="relative">
        <div className="flex overflow-x-auto pb-3 space-x-4 whitespace-nowrap w-full scrollbar-hide border-b border-gray-800/50 snap-x snap-mandatory pr-8 lg:pr-0 cursor-grab active:cursor-grabbing">
          <Link
            href="/"
            className="hover:text-accent transition-colors duration-200 snap-start"
          >
            [h] home
          </Link>
          <Link
            href="/projects"
            className="hover:text-accent transition-colors duration-200 snap-start"
          >
            [p] projects
          </Link>
          <Link
            href="/system-design"
            className="hover:text-accent transition-colors duration-200 snap-start"
          >
            [s] system design
          </Link>
          <Link
            href="/blog"
            prefetch={true}
            className="hover:text-accent transition-colors duration-200 snap-start"
          >
            [b] blog
          </Link>
          <Link
            href="/achievements"
            className="hover:text-accent transition-colors duration-200 snap-start"
          >
            [a] achievements
          </Link>
          <Link
            href="/gallery"
            className="hover:text-accent transition-colors duration-200 snap-start"
          >
            [g] gallery
          </Link>
          <Link
            href="/resume"
            className="hover:text-accent transition-colors duration-200 snap-start"
          >
            [r] resume
          </Link>
        </div>

        <div className="pointer-events-none absolute right-0 top-0 h-[calc(100%-12px)] w-12 bg-gradient-to-l from-[#111] to-transparent lg:hidden" />
        <div className="pointer-events-none absolute left-0 top-0 h-[calc(100%-12px)] w-8 bg-gradient-to-r from-[#111] to-transparent lg:hidden" />
      </div>
      <div className="flex items-center justify-between gap-4 shrink-0 px-1">
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/adilhusain01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
          </Link>
          <Link
            href="https://x.com/0xAdilHusain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent transition-colors duration-200"
          >
            <Twitter className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/adil-husain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.instagram.com/adilhusain__"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-accent transition-colors duration-200"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </Link>
          <Link
            href="mailto:husainadil202@gmail.com"
            className="text-gray-400 hover:text-accent transition-colors duration-200"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-gray-500 lg:hidden">
          <span>swipe nav</span>
          <ChevronsRight className="h-3 w-3 animate-pulse" />
        </div>
      </div>
    </nav>
  )
}
