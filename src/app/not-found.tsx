import { KeyLink } from "@/components/site/ui"

// The camera looked, and found nothing here.
export default function NotFound() {
  return (
    <main className="grid min-h-[60svh] place-items-center py-20">
      <div className="text-center">
        <div className="relative mx-auto h-40 w-64 rounded-[6px] border-2 border-dashed border-pen/60">
          <span className="absolute -top-px left-[-2px] -translate-y-full rounded-t-[4px] bg-pen px-2 py-1 font-mono text-[12px] leading-none text-sheet">page 0.00</span>
        </div>
        <h1 className="mt-10 font-display text-[clamp(2rem,4.5vw,3rem)] leading-tight text-ink">Nothing here.</h1>
        <p className="mx-auto mt-3 max-w-[36ch] text-lg leading-relaxed text-ink-2">The link may be old, or the page has moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <KeyLink href="/" variant="ink">
            Home
          </KeyLink>
          <KeyLink href="/projects">Projects</KeyLink>
        </div>
      </div>
    </main>
  )
}
