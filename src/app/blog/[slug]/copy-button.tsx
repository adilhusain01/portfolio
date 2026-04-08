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
      className="absolute top-3 right-3 p-2 bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 rounded-md transition-all z-10 font-sans text-xs border border-gray-700 flex items-center justify-center backdrop-blur-sm"
      aria-label="Copy to clipboard"
    >
      {isCopied ? "Copied! ✔" : "Copy"}
    </button>
  )
}
