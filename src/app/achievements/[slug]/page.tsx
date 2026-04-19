import { BackButton } from "@/components/back-button"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  getAchievementBySlug,
  getAchievementSlug,
  getAllAchievements,
} from "@/lib/achievements"
import { AchievementGallery } from "@/components/achievement-gallery"

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllAchievements().map((achievement) => ({
    slug: getAchievementSlug(achievement),
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const achievement = getAchievementBySlug(slug)

  if (!achievement) {
    return {}
  }

  return {
    title: `${achievement.event} | Achievements`,
    description: achievement.award,
    openGraph: {
      images: [
        {
          url:
            achievement.image ??
            "https://adilhusain.me/og/home?title=achievements",
        },
      ],
    },
  }
}

export default async function AchievementDetailPage({ params }: PageProps) {
  const { slug } = await params
  const achievement = getAchievementBySlug(slug)

  if (!achievement) {
    notFound()
  }

  return (
    <main className="animate-fade-in-up">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BackButton className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-accent transition-colors" />

        {achievement.date ? (
          <div className="text-sm text-gray-500 uppercase tracking-[0.2em]">
            {achievement.date}
          </div>
        ) : null}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
        {achievement.event}
      </h1>

      <p className="max-w-3xl text-sm sm:text-base text-gray-400 mb-8 leading-relaxed tracking-wide">
        {achievement.award}
      </p>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          {achievement.image ? (
            <div className="overflow-hidden rounded-lg border border-gray-800 bg-black">
              <div className="w-full" style={{ aspectRatio: "1200 / 630" }}>
                <img
                  src={achievement.image}
                  alt={achievement.event}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : null}

          {achievement.description ? (
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed tracking-wide">
              {achievement.description}
            </p>
          ) : null}
        </div>

        <aside className="space-y-4">
          {achievement.project ? (
            <div className="rounded-lg border border-gray-800 p-5 bg-gray-900/30">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                project
              </p>
              <p className="mt-3 text-white font-semibold leading-tight">
                {achievement.project}
              </p>
            </div>
          ) : null}

          {achievement.link ? (
            <div className="rounded-lg border border-gray-800 p-5 bg-gray-900/30">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
                event page
              </p>
              <a
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-gray-300 hover:text-accent transition-colors"
              >
                open event
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ) : null}
        </aside>
      </div>

      {achievement.gallery && achievement.gallery.length > 0 ? (
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
              gallery
            </p>
            <h2 className="text-xl font-semibold text-white mt-2">
              supporting screenshots
            </h2>
          </div>

          <AchievementGallery
            gallery={achievement.gallery}
            event={achievement.event}
          />
        </section>
      ) : null}
    </main>
  )
}
