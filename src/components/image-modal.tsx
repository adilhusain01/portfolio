"use client"

import { ComponentPropsWithoutRef, useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

export function ImageModal(props: ComponentPropsWithoutRef<"img">) {
  const [isOpen, setIsOpen] = useState(false)

  const openViewer = () => setIsOpen(true)
  const closeViewer = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <>
      <img
        {...props}
        onClick={(e) => {
          openViewer()
          props.onClick?.(e)
        }}
        className={`${props.className ?? ""} cursor-pointer`}
      />

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8">
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeViewer} />
            <div className="relative w-fit max-w-[95vw] sm:max-w-6xl overflow-hidden rounded-xl border border-gray-800 bg-[#111317] shadow-2xl animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-gray-800 px-8 py-4 sm:px-10 bg-[#16181d]">
                <div className="text-xs sm:text-sm text-gray-400 font-mono truncate mr-4">
                  <span className="text-accent mr-2">*</span>
                  {props.alt || "Image View"}
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
                <img
                  src={props.src}
                  alt={props.alt}
                  className="max-h-[85vh] w-auto h-auto max-w-full rounded-b-lg object-contain border-x border-b border-gray-800/50"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
