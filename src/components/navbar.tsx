"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import {
  Linkedin,
  ChevronsRight,
} from "lucide-react"
import { Magnetic } from "./magnetic"

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
        case "a":
          router.push("/achievements")
          break
        case "r":
          router.push("/resume")
          break
        case "p":
          router.push("/projects")
          break
        case "s":
          router.push("/system-design")
          break
        case "b":
          router.push("/blog")
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
          <Magnetic wrapperClass="snap-start">
            <Link
              href="/"
              className="hover:text-accent transition-colors duration-200"
            >
              [h] home
            </Link>
          </Magnetic>
          <Magnetic wrapperClass="snap-start">
            <Link
              href="/achievements"
              className="hover:text-accent transition-colors duration-200"
            >
              [a] achievements
            </Link>
          </Magnetic>
          <Magnetic wrapperClass="snap-start">
            <Link
              href="/resume"
              className="hover:text-accent transition-colors duration-200"
            >
              [r] resume
            </Link>
          </Magnetic>
          <Magnetic wrapperClass="snap-start">
            <Link
              href="/projects"
              className="hover:text-accent transition-colors duration-200"
            >
              [p] projects
            </Link>
          </Magnetic>
          <Magnetic wrapperClass="snap-start">
            <Link
              href="/system-design"
              className="hover:text-accent transition-colors duration-200"
            >
              [s] system design
            </Link>
          </Magnetic>
          <Magnetic wrapperClass="snap-start">
            <Link
              href="/blog"
              prefetch={true}
              className="hover:text-accent transition-colors duration-200"
            >
              [b] blog
            </Link>
          </Magnetic>

          <Magnetic wrapperClass="snap-start">
            <Link
              href="/gallery"
              className="hover:text-accent transition-colors duration-200"
            >
              [g] gallery
            </Link>
          </Magnetic>

        </div>

        <div className="pointer-events-none absolute right-0 top-0 h-[calc(100%-12px)] w-12 bg-gradient-to-l from-[#111] to-transparent lg:hidden" />
        <div className="pointer-events-none absolute left-0 top-0 h-[calc(100%-12px)] w-8 bg-gradient-to-r from-[#111] to-transparent lg:hidden" />
      </div>
      <div className="flex items-center justify-between gap-4 shrink-0 px-1">
        <div className="flex items-center space-x-4">
          <Magnetic padding={20} strength={15}>
            <Link
              href="https://github.com/adilhusain01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors duration-200"
            >
              <img src="/gh-shadowed.png" alt="GitHub" className="w-6 h-6 object-contain" />
            </Link>
          </Magnetic>
          <Magnetic padding={20} strength={15}>
            <Link
              href="https://x.com/0xAdilHusain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors duration-200"
            >
              <img src="/x-shadowed.png" alt="X" className="w-6 h-6 object-contain" />
            </Link>
          </Magnetic>
          <Magnetic padding={20} strength={15}>
            <Link
              href="https://www.linkedin.com/in/adil-husain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors duration-200"
            >
              <img src="/in-shadowed.png" alt="Linked-In" className="w-6 h-6 object-contain" />

            </Link>
          </Magnetic>
          <Magnetic padding={20} strength={15}>
            <Link
              href="https://www.instagram.com/adilhusain__"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-colors duration-200"
              title="Instagram"
            >
              <img src="/ig-shadowed.png" alt="Instagram" className="w-6 h-6 object-contain" />
            </Link>
          </Magnetic>
          <Magnetic padding={20} strength={15}>
            <Link
              href="mailto:husainadil202@gmail.com"
              className="text-gray-400 hover:text-accent transition-colors duration-200"
              title="Email"
            >
              <img src="/mail-shadowed.png" alt="Email" className="w-6 h-6 object-contain" />
            </Link>
          </Magnetic>
        </div>

        <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-gray-500 lg:hidden">
          <span>swipe nav</span>
          <ChevronsRight className="h-3 w-3 animate-pulse" />
        </div>
      </div>
    </nav>
  )
}
