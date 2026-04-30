"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowLeft, ArrowRight, X } from "lucide-react"

type AchievementGalleryProps = {
  gallery: string[]
  event: string
  useTilePattern?: boolean
}

export function AchievementGallery({
  gallery,
  event,
  useTilePattern = false,
}: AchievementGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openViewer = useCallback((index: number) => {
    setActiveIndex(index)
    setIsOpen(true)
  }, [])

  const closeViewer = useCallback(() => {
    setIsOpen(false)
  }, [])

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + gallery.length) % gallery.length)
  }, [gallery.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % gallery.length)
  }, [gallery.length])

  const getSpan = (index: number) => {
    const patterns = [
      "md:col-span-2 md:row-span-2 col-span-2 row-span-2",
      "md:col-span-1 md:row-span-2 col-span-1 row-span-2",
      "md:col-span-1 md:row-span-1 col-span-1 row-span-1",
      "md:col-span-2 md:row-span-1 col-span-2 row-span-1",
      "md:col-span-1 md:row-span-1 col-span-1 row-span-1",
      "md:col-span-1 md:row-span-2 col-span-1 row-span-2",
      "md:col-span-2 md:row-span-2 col-span-2 row-span-2",
      "md:col-span-1 md:row-span-1 col-span-1 row-span-1",
    ]
    return patterns[index % patterns.length]
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer()
      }

      if (event.key === "ArrowLeft") {
        showPrevious()
      }

      if (event.key === "ArrowRight") {
        showNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, closeViewer, showNext, showPrevious])

  return (
    <div className="space-y-4">
      <div
        className={
          useTilePattern
            ? "grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px] grid-flow-dense"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {gallery.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => openViewer(index)}
            className={`overflow-hidden rounded-lg border border-gray-800 bg-slate-950 transition-shadow hover:shadow-[0_0_0_2px_rgba(16,185,129,0.15)] ${
              useTilePattern ? getSpan(index) : ""
            }`}
          >
            {useTilePattern ? (
              <div className="w-full h-full">
                <img
                  src={image}
                  alt={`${event} screenshot ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full" style={{ aspectRatio: "4 / 3" }}>
                <img
                  src={image}
                  alt={`${event} screenshot ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {isOpen ? (
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8">
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeViewer} />
            <div className="relative w-fit max-w-[95vw] sm:max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-[#111317] shadow-2xl animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-gray-800 px-8 py-4 sm:px-10 bg-[#16181d]">
                <div className="text-xs sm:text-sm text-gray-400 font-mono">
                  <span className="text-accent mr-2">*</span>
                  {event} — {activeIndex + 1}/{gallery.length}
                </div>
                <button
                  type="button"
                  onClick={closeViewer}
                  className="inline-flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-gray-800 bg-[#1e2128] text-gray-400 transition-colors hover:text-accent hover:border-accent"
                  aria-label="Close viewer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative flex items-center justify-center overflow-hidden">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-6 sm:left-10 z-10 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gray-800 bg-black/60 text-gray-300 transition-colors hover:border-accent hover:text-accent shadow-xl"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <img
                  src={gallery[activeIndex]}
                  alt={`${event} screenshot ${activeIndex + 1}`}
                  className="max-h-[80vh] w-auto h-auto max-w-full rounded-b-lg object-contain border-x border-b border-gray-800/50"
                />

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-6 sm:right-10 z-10 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-gray-800 bg-black/60 text-gray-300 transition-colors hover:border-accent hover:text-accent shadow-xl"
                  aria-label="Next image"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
      ) : null}
    </div>
  )
}
