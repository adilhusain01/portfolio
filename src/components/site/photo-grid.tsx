"use client"

import { tileFor } from "@/components/achievement-gallery"
import Image from "next/image"
import { useState } from "react"
import { Lightbox } from "./lightbox"


// The originals are phone photos of several megabytes, so both the grid and the viewer ask Next for resized copies.
const large = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=80`

export function PhotoGrid({ photos, label }: { photos: { src: string; name: string }[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <ul className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[210px] md:grid-cols-4">
        {photos.map((photo, index) => (
          <li key={photo.src} className={tileFor(index, photos.length)}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`Open photo ${index + 1}`}
              className="group relative block h-full w-full overflow-hidden rounded-[10px] bg-tray ring-1 ring-inset ring-rule transition-transform duration-150 ease-out active:scale-[0.98]"
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
              />
            </button>
          </li>
        ))}
      </ul>
      {open !== null ? <Lightbox images={photos.map((p) => large(p.src))} index={open} label={label} onClose={() => setOpen(null)} onIndex={setOpen} /> : null}
    </>
  )
}
