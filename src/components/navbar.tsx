"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { Github, Twitter, Linkedin, Mail } from "lucide-react"

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
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [router])

  return (
    <nav className="flex flex-wrap sm:flex-nowrap items-center justify-between mb-12 text-sm gap-y-4">
      <div className="flex space-x-4 flex-wrap gap-y-2">
        <Link
          href="/"
          className="hover:text-accent transition-colors duration-200"
        >
          [h] home
        </Link>
        <Link
          href="/projects"
          className="hover:text-accent transition-colors duration-200"
        >
          [p] projects
        </Link>
        <Link
          href="/system-design"
          className="hover:text-accent transition-colors duration-200"
        >
          [s] system design
        </Link>
        <Link
          href="/blog"
          prefetch={true}
          className="hover:text-accent transition-colors duration-200"
        >
          [b] blog
        </Link>
        <Link
          href="/achievements"
          className="hover:text-accent transition-colors duration-200"
        >
          [a] achievements
        </Link>
        <Link
          href="/resume"
          className="hover:text-accent transition-colors duration-200"
        >
          [r] resume
        </Link>
      </div>
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
          href="mailto:husainadil202@gmail.com"
          className="text-gray-400 hover:text-accent transition-colors duration-200"
        >
          <Mail className="w-4 h-4" />
        </Link>
      </div>
    </nav>
  )
}
