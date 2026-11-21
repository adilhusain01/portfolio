import type { Metadata } from "next"
import Link from "next/link"
import { getPosts } from "@/lib/blog"
import { systemDesign } from "@/lib/system-design"
import { PageHead, formatMonth } from "@/components/site/ui"
import { sentence } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Writing",
  description: "Adil Husain's notes on scaling Node.js and the system design write-ups behind them.",
  openGraph: { images: [{ url: "https://adilhusain.dev/og/home?title=writing" }] },
}

export default function BlogPage() {
  const entries = getPosts()
    .map((post) => ({ title: post.metadata.title, line: post.metadata.description, date: post.metadata.date, href: `/blog/${post.slug}`, kind: "Post" }))
    .concat(systemDesign.map((entry) => ({ title: sentence(entry.title), line: entry.description, date: entry.period, href: `/system-design/${entry.slug}`, kind: "System design" })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main className="pb-16">
      <PageHead title="Writing" line="Long notes from scaling Node.js, and the system design write-ups that go with them." />
      <ul className="divide-y divide-rule border-y border-rule">
        {entries.map((entry) => (
          <li key={entry.href}>
            <Link href={entry.href} className="group grid gap-x-8 gap-y-2 py-7 lg:grid-cols-[minmax(13rem,22%)_minmax(0,1fr)_auto] lg:gap-x-14">
              <span className="text-[15px] text-ink-3">{entry.kind}</span>
              <span className="min-w-0">
                <span className="block font-display text-[1.45rem] leading-snug text-ink decoration-pen decoration-1 underline-offset-[6px] [@media(hover:hover)]:group-hover:underline">
                  {entry.title}
                </span>
                {entry.line ? <span className="mt-2 block max-w-measure text-[15px] leading-relaxed text-ink-2">{entry.line}</span> : null}
              </span>
              <span className="text-[15px] tabular-nums text-ink-3 lg:text-right">{formatMonth(entry.date)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
