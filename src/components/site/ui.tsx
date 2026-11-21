import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

// Keys cast a shadow because they can be pressed. They lift 1px under a fine pointer and press in on pointer-down.
const keyBase =
  "inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 text-[15px] font-medium leading-none transition-[transform,box-shadow,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-key-hover"

export const keyStyles = {
  ink: `${keyBase} bg-ink text-paper shadow-key`,
  paper: `${keyBase} bg-sheet text-ink shadow-key ring-1 ring-inset ring-rule`,
}

export function KeyLink({
  variant = "paper",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof keyStyles }) {
  return <Link className={`${keyStyles[variant]} ${className}`} {...props} />
}

export function KeyAnchor({
  variant = "paper",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof keyStyles }) {
  return <a className={`${keyStyles[variant]} ${className}`} {...props} />
}

// A home page section: the heading and its one line on the left, the content on the right. One column on a phone.
export function Section({
  id,
  title,
  line,
  children,
  aside,
}: {
  id?: string
  title: string
  line?: ReactNode
  children: ReactNode
  aside?: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className="grid gap-8 border-t border-rule py-16 sm:py-20 lg:grid-cols-[minmax(13rem,22%)_minmax(0,1fr)] lg:gap-14">
      <div className="lg:sticky lg:top-10 lg:self-start">
        <h2 id={id ? `${id}-title` : undefined} className="font-display text-[1.75rem] leading-tight tracking-[-0.01em] text-ink">
          {title}
        </h2>
        {line ? <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-ink-3">{line}</p> : null}
        {aside}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

// The top of every inner page: a back link, the title, one line, and any keys on the right.
export function PageHead({
  title,
  line,
  back,
  actions,
  meta,
}: {
  title: string
  line?: ReactNode
  back?: { href: string; label: string }
  actions?: ReactNode
  meta?: ReactNode
}) {
  return (
    <div className="pb-10 pt-10 sm:pb-14 sm:pt-16">
      {back ? (
        <Link href={back.href} className="text-link mb-8 inline-block text-[15px] text-ink-2">
          {back.label}
        </Link>
      ) : null}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ink [overflow-wrap:anywhere]">
            {title}
          </h1>
          {line ? <p className="mt-4 max-w-measure text-lg leading-relaxed text-ink-2">{line}</p> : null}
          {meta ? <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-ink-3">{meta}</div> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  )
}

// A handwritten note in blue pen, with an optional hand-drawn arrow.
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-hand text-[1.15rem] leading-snug text-pen ${className}`}>{children}</p>
}

export function Arrow({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 40"
      aria-hidden="true"
      className={`h-8 w-12 text-pen ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 34c10-2 22-8 30-17 4-5 7-9 9-13" />
      <path d="M36 6c3-1 6-2 8-2 0 3-1 6-1 9" />
    </svg>
  )
}

export function formatMonth(value: string) {
  const time = new Date(value)
  if (Number.isNaN(time.getTime())) return value
  return time.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function capitalise(value: string) {
  return value.replace(/(^|\s)(\S)/g, (_, space, char) => space + char.toUpperCase())
}
