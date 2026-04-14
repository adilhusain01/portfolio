"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type BackButtonProps = {
  className?: string
  label?: string
}

export function BackButton({ className, label = "back" }: BackButtonProps) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={
        className ??
        "inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-accent transition-colors"
      }
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  )
}
