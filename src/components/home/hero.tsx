"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import beach from "../../../public/me/beach.webp"
import cutout from "../../../public/me/beach-cutout.webp"
import { beach as shot, skeleton } from "@/lib/vision"
import { KeyAnchor, KeyLink } from "@/components/site/ui"

const W = shot.width
const H = shot.height
const ease = "cubic-bezier(0.23, 1, 0.32, 1)"
const pct = (value: number, total: number) => `${(value / total) * 100}%`

// The frame keeps the photo's own proportions and covers the hero the way object-fit: cover would.
// Photo, cutout, boxes and the name all sit inside it, so they line up at every screen size.
const frame: CSSProperties = {
  width: `max(100cqw, calc(100cqh * ${W} / ${H}))`,
  height: `max(100cqh, calc(100cqw * ${H} / ${W}))`,
  left: `calc((100cqw - max(100cqw, calc(100cqh * ${W} / ${H}))) * var(--fx))`,
  top: `calc((100cqh - max(100cqh, calc(100cqw * ${H} / ${W}))) * var(--fy))`,
}

export function Hero() {
  const [shown, setShown] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const first = useRef(true)

  // A cached image can finish before hydration and skip onLoad, so the reveal also runs after a short wait.
  useEffect(() => {
    const fallback = window.setTimeout(() => setLoaded(true), 900)
    return () => window.clearTimeout(fallback)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const timer = window.setTimeout(() => setShown(true), reduce ? 0 : 450)
    return () => window.clearTimeout(timer)
  }, [loaded])

  const toggle = () => {
    first.current = false
    setShown((value) => !value)
  }

  const { subject, others } = shot
  const joint = (name: string) => subject.joints.find((j) => j.name === name)
  const bones = skeleton
    .map(([a, b]) => [joint(a), joint(b)] as const)
    .filter((pair): pair is readonly [NonNullable<ReturnType<typeof joint>>, NonNullable<ReturnType<typeof joint>>] => Boolean(pair[0] && pair[1]))
  const [x1, y1, x2, y2] = subject.box
  const people = 1 + others.filter((o) => o.label === "person").length
  const stagger = (i: number) => (first.current ? `${150 + i * 40}ms` : "0ms")

  return (
    <section
      aria-label="Introduction"
      className="bleed relative h-[calc(100svh-var(--nav))] min-h-[36rem] overflow-hidden [--fx:0.41] [--fy:0.12] wide:max-h-[60rem]"
      style={{ containerType: "size" }}
    >
      <div className="absolute" style={frame}>
        {/* The scene, washed toward the paper so Adil, in full colour, stands out from it. */}
        <Image
          src={beach}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          onLoad={() => setLoaded(true)}
          className="object-cover [filter:grayscale(1)_sepia(0.22)_brightness(1.05)_contrast(0.9)]"
        />
        <div className="absolute inset-0 bg-paper/50" />

        {/* On wide screens the name sits behind Adil, one word either side of his face. */}
        <h1
          className="pointer-events-none absolute inset-0 hidden font-display leading-none tracking-[-0.03em] text-ink wide:block"
          style={{ fontSize: `calc(max(100cqw, calc(100cqh * ${W} / ${H})) * 0.105)` }}
        >
          <span className="absolute animate-rise" style={{ right: pct(W - 452, W), top: pct(206, H) }}>
            Adil
          </span>{" "}
          <span className="absolute animate-rise [animation-delay:80ms]" style={{ left: pct(628, W), top: pct(206, H) }}>
            Husain
          </span>
        </h1>

        <Image src={cutout} alt="Adil Husain in a brown polo and sunglasses on a beach, looking back at the camera" fill priority sizes="100vw" className="object-cover" />

        <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          {others.map((o, i) => (
            <rect
              key={`${o.label}-${i}`}
              x={o.box[0]}
              y={o.box[1]}
              width={o.box[2] - o.box[0]}
              height={o.box[3] - o.box[1]}
              fill="none"
              stroke="#1F1B16"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              rx={2}
              style={{ opacity: shown ? 0.35 : 0, transition: `opacity ${shown ? 320 : 160}ms ${ease} ${shown ? stagger(i) : "0ms"}` }}
            />
          ))}
          <rect
            x={x1}
            y={y1}
            width={x2 - x1}
            height={y2 - y1}
            fill="none"
            stroke="#2948A6"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            rx={3}
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "scale(1)" : "scale(1.04)",
              transformBox: "fill-box",
              transformOrigin: "center",
              transition: `opacity ${shown ? 280 : 160}ms ${ease}, transform 560ms ${ease}`,
            }}
          />
          <g style={{ opacity: shown ? 1 : 0, transition: `opacity ${shown ? 380 : 160}ms ${ease} ${shown && first.current ? "420ms" : "0ms"}` }}>
            {bones.map(([a, b]) => (
              <line key={`${a.name}-${b.name}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#2948A6" strokeWidth={2.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            ))}
            {subject.joints.map((j) => (
              <circle key={j.name} cx={j.x} cy={j.y} r={5} fill="#FAF6EE" stroke="#2948A6" strokeWidth={2} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        </svg>

        <span
          className="pointer-events-none absolute -translate-y-full rounded-t-[4px] bg-pen px-2 py-1 font-mono text-[12px] leading-none text-sheet"
          style={{ left: pct(x1, W), top: pct(y1, H), opacity: shown ? 1 : 0, transition: `opacity ${shown ? 260 : 160}ms ${ease} ${shown && first.current ? "320ms" : "0ms"}` }}
        >
          {subject.label} {subject.conf.toFixed(2)}
        </span>
      </div>

      {/* The bottom of the photo runs out into the page. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-paper/0 via-paper/70 to-paper wide:h-[34%]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-paper to-paper/0" />

      <div className="gutter absolute inset-x-0 top-4 flex justify-end sm:top-6">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={shown}
            className="rounded-[8px] bg-sheet/90 px-3 py-2 text-[13px] text-ink-2 shadow-key ring-1 ring-inset ring-rule transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <span className="font-mono">{people} people in frame</span>
            <span className="mx-2 text-rule" aria-hidden="true">
              |
            </span>
            {shown ? "Hide boxes" : "Show boxes"}
          </button>
      </div>

      <div className="gutter absolute inset-x-0 bottom-0 pb-8 sm:pb-10">
        <div className="animate-rise [animation-delay:160ms]">
          <h1 className="font-display text-[clamp(2.9rem,13vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-ink wide:hidden">Adil Husain</h1>
          <p className="mt-3 text-lg text-ink-2 sm:text-xl wide:mt-0">Product engineer, 21, in Delhi.</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <KeyLink href="/resume" variant="ink">
              Resume
            </KeyLink>
            <KeyAnchor href="mailto:husainadil202@gmail.com">Email me</KeyAnchor>
          </div>
        </div>
      </div>
    </section>
  )
}
