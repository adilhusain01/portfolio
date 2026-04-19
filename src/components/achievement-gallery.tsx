"use client"

import { useCallback, useEffect, useState } from "react"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8">
          <div className="absolute inset-0" onClick={closeViewer} />
          <div className="relative w-full max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3 sm:px-6">
              <div className="text-sm text-gray-400">
                {event} — image {activeIndex + 1} of {gallery.length}
              </div>
              <button
                type="button"
                onClick={closeViewer}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-slate-900 text-gray-400 transition-colors hover:text-white hover:border-accent"
                aria-label="Close viewer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex items-center justify-center overflow-hidden px-4 py-6 sm:px-6">
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-black/60 text-gray-300 transition-colors hover:border-accent hover:text-white"
                aria-label="Previous image"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <img
                src={gallery[activeIndex]}
                alt={`${event} screenshot ${activeIndex + 1}`}
                className="max-h-[80vh] max-w-full rounded-[1.5rem] object-contain"
              />

              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-800 bg-black/60 text-gray-300 transition-colors hover:border-accent hover:text-white"
                aria-label="Next image"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
