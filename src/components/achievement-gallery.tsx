"use client"

import { useState } from "react"
import { Lightbox } from "@/components/site/lightbox"
import { sized } from "@/lib/cloudinary"

type Props = {
  gallery: string[]
  event: string
  // The resume's journey uses a denser grid with a few large tiles.
  useTilePattern?: boolean
  // Long sets show this many first, with a key to open the rest. Nothing is dropped.
  limit?: number
}

const tiles = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
]

export function AchievementGallery({ gallery, event, useTilePattern = false, limit }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const [all, setAll] = useState(false)
  const shown = limit && !all ? gallery.slice(0, limit) : gallery

  return (
    <>
      <ul
        className={
          useTilePattern
            ? "grid grid-flow-dense auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[190px] md:grid-cols-4"
            : "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
        }
      >
        {shown.map((image, index) => (
          <li key={image} className={useTilePattern ? tiles[index % tiles.length] : ""}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`Open ${event}, photo ${index + 1}`}
              className={`group block w-full overflow-hidden rounded-[10px] bg-tray ring-1 ring-inset ring-rule transition-transform duration-150 ease-out active:scale-[0.98] ${
                useTilePattern ? "h-full" : "aspect-[4/3]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sized(image, useTilePattern && index % 8 === 0 ? 900 : 600)}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
              />
            </button>
          </li>
        ))}
      </ul>
      {limit && gallery.length > limit ? (
        <button
          type="button"
          onClick={() => setAll((value) => !value)}
          className="mt-4 rounded-[10px] bg-sheet px-4 py-2.5 text-[15px] font-medium text-ink shadow-key ring-1 ring-inset ring-rule transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          {all ? "Show fewer photos" : `Show all ${gallery.length} photos`}
        </button>
      ) : null}
      {open !== null ? <Lightbox images={gallery.map((image) => sized(image, 1920))} index={open} label={event} onClose={() => setOpen(null)} onIndex={setOpen} /> : null}
    </>
  )
}
