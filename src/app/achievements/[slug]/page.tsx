import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getAchievementBySlug, getAchievementSlug, getAllAchievements } from "@/lib/achievements"
import { getProjectBySlug, getProjectSlug } from "@/lib/projects"
import { AchievementGallery } from "@/components/achievement-gallery"
import { KeyAnchor, PageHead, formatMonth } from "@/components/site/ui"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllAchievements().map((achievement) => ({ slug: getAchievementSlug(achievement) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const achievement = getAchievementBySlug(slug)
  if (!achievement) return {}
  return {
    title: `${achievement.event} | Hackathons`,
    description: achievement.award,
    openGraph: { images: [{ url: achievement.image ?? "https://adilhusain.dev/og/home?title=hackathons" }] },
  }
}

export default async function AchievementDetailPage({ params }: PageProps) {
  const { slug } = await params
  const achievement = getAchievementBySlug(slug)
  if (!achievement) notFound()

  const project = achievement.project ? getProjectBySlug(getProjectSlug({ title: achievement.project })) : null

  return (
    <main className="pb-16">
      <PageHead
        title={achievement.event}
        line={achievement.result}
        back={{ href: "/achievements", label: "All hackathons" }}
        meta={
          <>
            {achievement.date ? <span>{formatMonth(achievement.date)}</span> : null}
            {achievement.project ? (
              project ? (
                <Link href={`/projects/${getProjectSlug(project)}`} className="text-link text-ink-2">
                  Built {achievement.project}
                </Link>
              ) : (
                <span>Built {achievement.project}</span>
              )
            ) : null}
          </>
        }
        actions={
          achievement.link ? (
            <KeyAnchor href={achievement.link} target="_blank" rel="noopener noreferrer">
              Event page
            </KeyAnchor>
          ) : null
        }
      />

      <section className="grid gap-10 border-t border-rule pt-12 sm:pt-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        {achievement.image ? (
          <div className="overflow-hidden rounded-2xl bg-tray ring-1 ring-inset ring-rule">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={achievement.image} alt={`${achievement.event} banner`} className="aspect-[1200/630] w-full object-cover" />
          </div>
        ) : null}
        {achievement.description ? (
          <p className="max-w-measure text-lg leading-relaxed text-ink-2 sm:text-xl sm:leading-relaxed">{achievement.description}</p>
        ) : null}
      </section>

      {achievement.gallery && achievement.gallery.length > 0 ? (
        <section aria-labelledby="photos-title" className="mt-14 border-t border-rule pt-12 sm:mt-16">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 id="photos-title" className="font-display text-[1.75rem] leading-tight text-ink">
              Photos
            </h2>
            <p className="text-[15px] text-ink-3">Press one to see it full size.</p>
          </div>
          <AchievementGallery gallery={achievement.gallery} event={achievement.event} />
        </section>
      ) : null}
    </main>
  )
}
