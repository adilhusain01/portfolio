"use client"

import Image, { type StaticImageData } from "next/image"
import { useEffect, useRef, useState } from "react"
import { skeleton, type VisionShot } from "@/lib/vision"

type Props = {
  src: StaticImageData
  alt: string
  shot: VisionShot
  // The hero reveals the overlay once, like a camera locking focus. Smaller prints start with it showing.
  reveal?: boolean
  tilt?: number
  sizes: string
  priority?: boolean
  showCount?: boolean
  className?: string
}

const pct = (value: number, total: number) => `${(value / total) * 100}%`

export function CameraPrint({ src, alt, shot, reveal = false, tilt = 0, sizes, priority, showCount = false, className = "" }: Props) {
  const [shown, setShown] = useState(!reveal)
  const [loaded, setLoaded] = useState(false)
  const first = useRef(reveal)

  // A cached image can finish before hydration and skip onLoad, so the reveal also runs after a short wait.
  useEffect(() => {
    if (!reveal) return
    const fallback = window.setTimeout(() => setLoaded(true), 900)
    return () => window.clearTimeout(fallback)
  }, [reveal])

  useEffect(() => {
    if (!reveal || !loaded) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const timer = window.setTimeout(() => setShown(true), reduce ? 0 : 350)
    return () => window.clearTimeout(timer)
  }, [reveal, loaded])

  const toggle = () => {
    first.current = false
    setShown((value) => !value)
  }

  const { width: W, height: H, subject, others } = shot
  const joint = (name: string) => subject.joints.find((j) => j.name === name)
  const bones = skeleton
    .map(([a, b]) => [joint(a), joint(b)] as const)
    .filter((pair): pair is readonly [NonNullable<ReturnType<typeof joint>>, NonNullable<ReturnType<typeof joint>>] => Boolean(pair[0] && pair[1]))
  const [x1, y1, x2, y2] = subject.box
  const people = 1 + others.filter((o) => o.label === "person").length
  const stagger = (i: number) => (first.current ? `${120 + i * 35}ms` : "0ms")
  const ease = "cubic-bezier(0.23, 1, 0.32, 1)"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={shown}
      aria-label={shown ? "Hide what the model sees" : "Show what the model sees"}
      className={`group relative block w-full rounded-[18px] bg-sheet p-2.5 text-left shadow-print transition-transform duration-200 ease-out active:scale-[0.99] ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      <span className="relative block overflow-hidden rounded-[8px] bg-tray" style={{ aspectRatio: `${W} / ${H}` }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          onLoad={() => setLoaded(true)}
          className="object-cover"
        />

        <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          {others.map((o, i) => (
            <rect
              key={`${o.label}-${i}`}
              x={o.box[0]}
              y={o.box[1]}
              width={o.box[2] - o.box[0]}
              height={o.box[3] - o.box[1]}
              fill="none"
              stroke={o.label === "person" ? "#FAF6EE" : "#2948A6"}
              strokeWidth={o.label === "person" ? 1.25 : 2}
              vectorEffect="non-scaling-stroke"
              rx={3}
              style={{
                opacity: shown ? (o.label === "person" ? 0.85 : 1) : 0,
                transition: `opacity ${shown ? 300 : 160}ms ${ease} ${shown ? stagger(i) : "0ms"}`,
              }}
            />
          ))}

          <g
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "scale(1)" : "scale(1.05)",
              transformBox: "fill-box",
              transformOrigin: "center",
              transition: `opacity ${shown ? 260 : 160}ms ${ease}, transform 520ms ${ease}`,
            }}
          >
            <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} fill="none" stroke="#2948A6" strokeWidth={2} vectorEffect="non-scaling-stroke" rx={4} />
          </g>

          <g
            style={{
              opacity: shown ? 1 : 0,
              transition: `opacity ${shown ? 360 : 160}ms ${ease} ${shown && first.current ? "380ms" : "0ms"}`,
            }}
          >
            {bones.map(([a, b]) => (
              <line
                key={`${a.name}-${b.name}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#2948A6"
                strokeWidth={2.5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {subject.joints.map((j) => (
              <circle key={j.name} cx={j.x} cy={j.y} r={W / 150} fill="#FAF6EE" stroke="#2948A6" strokeWidth={2} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        </svg>

        {/* Labels are HTML so they stay readable at any size. */}
        <span
          className="pointer-events-none absolute -translate-y-full rounded-t-[4px] bg-pen px-1.5 py-0.5 font-mono text-[11px] leading-none text-sheet"
          style={{
            left: pct(x1, W),
            top: pct(y1, H),
            opacity: shown ? 1 : 0,
            transition: `opacity ${shown ? 260 : 160}ms ${ease} ${shown && first.current ? "300ms" : "0ms"}`,
          }}
        >
          {subject.label} {subject.conf.toFixed(2)}
        </span>
        {others
          .filter((o) => o.label !== "person")
          .map((o, i) => (
            <span
              key={`label-${i}`}
              className="pointer-events-none absolute rounded-br-[4px] bg-pen px-1.5 py-0.5 font-mono text-[11px] leading-none text-sheet"
              style={{ left: pct(o.box[0], W), top: pct(o.box[1], H), opacity: shown ? 1 : 0, transition: `opacity 200ms ${ease}` }}
            >
              {o.label} {o.conf.toFixed(2)}
            </span>
          ))}
        {showCount ? (
          <span
            className="pointer-events-none absolute right-2.5 top-2.5 rounded-[5px] bg-ink/75 px-2 py-1 font-mono text-[11px] leading-none text-sheet"
            style={{ opacity: shown ? 1 : 0, transition: `opacity 200ms ${ease}` }}
          >
            {people} people
          </span>
        ) : null}
      </span>
    </button>
  )
}
