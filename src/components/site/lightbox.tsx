"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import { keyStyles } from "./ui"

type Props = {
  images: string[]
  index: number
  label: string
  onClose: () => void
  onIndex?: (index: number) => void
}

// One photo at a time on a dimmed page. Escape closes it; the arrow keys step through a set.
export function Lightbox({ images, index, label, onClose, onIndex }: Props) {
  const many = images.length > 1 && onIndex
  const step = (by: number) => onIndex?.((index + by + images.length) % images.length)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (many && event.key === "ArrowLeft") step(-1)
      if (many && event.key === "ArrowRight") step(1)
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", onKey)
    }
  })

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-[100] flex flex-col bg-ink/80 p-3 animate-fade-in sm:p-6">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-zoom-out" />
      <div className="relative flex items-center justify-between gap-4 pb-3 text-[14px] text-paper/80">
        <p className="min-w-0 truncate">
          {label}
          {many ? <span className="ml-2 tabular-nums text-paper/60">{`${index + 1} of ${images.length}`}</span> : null}
        </p>
        <button type="button" onClick={onClose} className={`${keyStyles.paper} shrink-0`}>
          Close
        </button>
      </div>
      <div className="pointer-events-none relative flex min-h-0 flex-1 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={images[index]}
          src={images[index]}
          alt={`${label}, photo ${index + 1}`}
          className="pointer-events-auto max-h-full max-w-full rounded-[10px] bg-sheet object-contain p-1.5 shadow-lift animate-fade-in"
        />
      </div>
      {many ? (
        <div className="relative flex justify-center gap-3 pt-3">
          <button type="button" onClick={() => step(-1)} className={keyStyles.paper}>
            Previous
          </button>
          <button type="button" onClick={() => step(1)} className={keyStyles.paper}>
            Next
          </button>
        </div>
      ) : null}
    </div>,
    document.body,
  )
}
