"use client"

import { useState } from "react"

export function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      className="absolute right-3 top-3 z-10 rounded-[6px] bg-paper/10 px-2 py-1 font-sans text-[12px] text-paper/80 transition-colors duration-150 ease-out hover:bg-paper/20 hover:text-paper disabled:cursor-default"
      aria-label="Copy to clipboard"
    >
      {isCopied ? "Copied" : "Copy"}
    </button>
  )
}
