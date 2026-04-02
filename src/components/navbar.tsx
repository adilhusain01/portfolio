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
        case "r":
          router.push("/resume")
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [router])

  return (
    <nav className="flex items-center justify-between mb-12 text-sm">
      <div className="flex space-x-4">
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
          href="/blog"
          prefetch={true}
          className="hover:text-accent transition-colors duration-200"
        >
          [b] blog
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
          href="https://linkedin.com/in/adilhusain01"
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
