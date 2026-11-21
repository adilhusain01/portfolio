"use client"

import Image, { type StaticImageData } from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { useRef, useState } from "react"
import demo from "../../../public/me/demo.webp"
import consensus from "../../../public/roll/consensus.webp"
import singapore from "../../../public/roll/singapore.webp"
import kl from "../../../public/roll/kl.webp"
import ethindia from "../../../public/roll/ethindia.webp"
import ibw from "../../../public/roll/ibw.webp"
import hills from "../../../public/roll/img_0513.webp"
import breakfast from "../../../public/roll/img_0617.webp"
import lateNight from "../../../public/roll/img_0701.webp"

type Print = {
  src: StaticImageData
  caption: string
  alt: string
  width: number // px on desktop
  left: string // where it lands in the pile
  top: number
  tilt: number
}

// Dates come from each photo's own record or the trip it belongs to.
const prints: Print[] = [
  { src: hills, caption: "In the hills, Oct 2024", alt: "A lawn with a small pool and a terrace, mountains behind", width: 170, left: "1%", top: 40, tilt: -6 },
  { src: consensus, caption: "Consensus, Hong Kong", alt: "A Consensus Hong Kong badge on a CoinDesk lanyard", width: 176, left: "16%", top: 150, tilt: 4 },
  { src: singapore, caption: "Marina Bay, TOKEN2049", alt: "Marina Bay Sands across the water in Singapore", width: 260, left: "27%", top: 18, tilt: -2 },
  { src: demo, caption: "Mid-demo at a hackathon", alt: "Adil presenting a route map on a projector, holding a microphone", width: 300, left: "44%", top: 170, tilt: 2.5 },
  { src: kl, caption: "Malaysia, Oct 2025", alt: "Two glasses printed with the word Ranli, on a table in Malaysia", width: 140, left: "57%", top: 10, tilt: 7 },
  { src: breakfast, caption: "Breakfast with a view", alt: "Adil at a breakfast table with hills behind him", width: 168, left: "70%", top: 120, tilt: -4 },
  { src: ethindia, caption: "ETHIndia, Bengaluru", alt: "The ETHIndia and FIL Bangalore sign against a blue sky", width: 132, left: "84%", top: 30, tilt: 5 },
  { src: ibw, caption: "India Blockchain Week", alt: "The IBW letters outside India Blockchain Week in Bengaluru", width: 220, left: "3%", top: 260, tilt: 3 },
  { src: lateNight, caption: "11 pm, Sep 2024", alt: "Adil in a cap, leaning back in a room lit with fairy lights", width: 150, left: "82%", top: 250, tilt: -7 },
]

function PrintCard({ print, sizes }: { print: Print; sizes: string }) {
  return (
    <>
      <span className="relative block overflow-hidden rounded-[6px] bg-tray" style={{ aspectRatio: `${print.src.width} / ${print.src.height}` }}>
        <Image src={print.src} alt={print.alt} fill sizes={sizes} placeholder="blur" draggable={false} className="pointer-events-none select-none object-cover" />
      </span>
      <span className="mt-2 block truncate px-0.5 font-hand text-[15px] leading-tight text-ink-2">{print.caption}</span>
    </>
  )
}

export function CameraRoll() {
  const area = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [order, setOrder] = useState(() => prints.map((_, i) => i))
  const toFront = (i: number) => setOrder((o) => [...o.filter((x) => x !== i), i])

  return (
    <>
      {/* A pile to push around on wider screens. */}
      <div ref={area} className="relative hidden h-[480px] sm:block" aria-label="Photos you can drag around">
        {prints.map((print, i) => (
          <motion.div
            key={print.caption}
            drag={!reduce}
            dragConstraints={area}
            dragElastic={0.08}
            dragTransition={{ power: 0.25, timeConstant: 180 }}
            onPointerDown={() => toFront(i)}
            whileDrag={{ scale: 1.04, rotate: 0, boxShadow: "0 2px 2px rgb(31 27 22 / 0.08), 0 30px 44px -20px rgb(46 36 20 / 0.6)" }}
            initial={false}
            className="absolute cursor-grab touch-none rounded-[10px] bg-sheet p-2 pb-2.5 shadow-print active:cursor-grabbing"
            style={{ left: print.left, top: print.top, width: print.width, rotate: print.tilt, zIndex: order.indexOf(i) + 1 }}
          >
            <PrintCard print={print} sizes={`${print.width * 2}px`} />
          </motion.div>
        ))}
      </div>

      {/* On a phone the pile becomes two columns, so scrolling never gets caught on a photo. */}
      <ul className="grid grid-cols-2 gap-4 sm:hidden">
        {prints.map((print, i) => (
          <li
            key={print.caption}
            className="rounded-[10px] bg-sheet p-2 pb-2.5 shadow-print"
            style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
          >
            <PrintCard print={print} sizes="45vw" />
          </li>
        ))}
      </ul>
    </>
  )
}
