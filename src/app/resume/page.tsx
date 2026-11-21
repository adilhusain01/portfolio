import type { Metadata } from "next"
import { AchievementGallery } from "@/components/achievement-gallery"
import { KeyAnchor, PageHead } from "@/components/site/ui"
import { journey } from "@/lib/journey"

export const metadata: Metadata = {
  title: "Resume",
  description: "Adil Husain's resume as a PDF, and the longer story of each step, newest first.",
  openGraph: { images: [{ url: "https://adilhusain.dev/og/home?title=resume" }] },
}

export default function ResumePage() {
  return (
    <main className="pb-16">
      <PageHead
        title="Resume"
        line="The PDF is the formal copy. Below is the longer story behind each step, newest first."
        actions={
          <KeyAnchor href="/Adil_Husain_Web_Developer_Resume.pdf" download="Adil_Husain_Web_Developer_Resume.pdf" variant="ink">
            Download the PDF
          </KeyAnchor>
        }
      />

      <ol className="border-t border-rule">
        {journey.map((entry) => (
          <li key={`${entry.title}-${entry.date}`} className="grid gap-4 border-b border-rule py-10 sm:py-14 lg:grid-cols-[minmax(13rem,22%)_minmax(0,1fr)] lg:gap-14">
            <div className="lg:sticky lg:top-10 lg:self-start">
              <p className="flex items-center gap-2 text-[15px] tabular-nums text-ink-3">
                {entry.current ? <span className="h-2 w-2 rounded-full bg-pen" aria-hidden="true" /> : null}
                {entry.date}
              </p>
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-ink">{entry.title}</h2>
              {entry.role ? <p className="mt-1.5 text-[15px] text-ink-3">{entry.role}</p> : null}
              <p className="mt-5 max-w-measure text-[1.05rem] leading-relaxed text-ink-2">{entry.text}</p>
              {entry.tags ? (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                  {entry.tags.map((tag) => (
                    <li key={tag} className="rounded-[6px] bg-tray px-2 py-1 text-[13px] text-ink-2 ring-1 ring-inset ring-rule">
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
              {entry.gallery ? (
                <div className="mt-8">
                  <AchievementGallery gallery={entry.gallery} event={entry.title} useTilePattern limit={8} />
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </main>
  )
}
