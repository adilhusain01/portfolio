import type { Metadata } from "next"
import Link from "next/link"
import { getAchievementSlug, getAchievementsByDate } from "@/lib/achievements"
import { PageHead, formatMonth } from "@/components/site/ui"

export const metadata: Metadata = {
  title: "Hackathons",
  description: "Every hackathon prize Adil Husain has won, newest first, with photos from each one.",
  openGraph: { images: [{ url: "https://adilhusain.dev/og/home?title=hackathons" }] },
}

export default function AchievementsPage() {
  const wins = getAchievementsByDate()
  return (
    <main className="pb-16">
      <PageHead title="Hackathons" line="Every prize so far, newest first. Each one opens to what I built and photos from the day." />
      <ul className="divide-y divide-rule border-y border-rule">
        {wins.map((win) => (
          <li key={win.event}>
            <Link
              href={`/achievements/${getAchievementSlug(win)}`}
              className="group grid items-center gap-x-8 gap-y-4 py-6 sm:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[16rem_minmax(0,1fr)_auto]"
            >
              <span className="relative block aspect-[1200/630] overflow-hidden rounded-[10px] bg-tray ring-1 ring-inset ring-rule">
                {win.image ? (
                  // Event banners live on each organiser's own site.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={win.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                  />
                ) : null}
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-semibold text-ink decoration-pen underline-offset-4 [@media(hover:hover)]:group-hover:underline">
                  {win.event}
                </span>
                <span className="mt-1 block text-[15px] text-ink-2">
                  {win.result}
                  {win.project ? <span className="text-ink-3">, with {win.project}</span> : null}
                </span>
              </span>
              <span className="text-[15px] tabular-nums text-ink-3 lg:text-right">{win.date ? formatMonth(win.date) : ""}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
