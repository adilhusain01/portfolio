import Image from "next/image"
import type { CSSProperties } from "react"
import beach from "../../../public/me/beach.webp"
import cutout from "../../../public/me/beach-cutout.webp"
import { KeyAnchor, KeyLink } from "@/components/site/ui"

const W = beach.width
const H = beach.height
const pct = (value: number, total: number) => `${(value / total) * 100}%`

// The frame keeps the photo's own proportions and covers the hero the way object-fit: cover would.
// Photo, cutout and the name all sit inside it, so they line up at every screen size.
const frame: CSSProperties = {
  width: `max(100cqw, calc(100cqh * ${W} / ${H}))`,
  height: `max(100cqh, calc(100cqw * ${H} / ${W}))`,
  left: `calc((100cqw - max(100cqw, calc(100cqh * ${W} / ${H}))) * var(--fx))`,
  top: `calc((100cqh - max(100cqh, calc(100cqw * ${H} / ${W}))) * var(--fy))`,
}

export function Hero() {
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
      </div>

      {/* The bottom of the photo runs out into the page. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-b from-paper/0 via-paper/70 to-paper wide:h-[34%]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-paper to-paper/0" />

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
