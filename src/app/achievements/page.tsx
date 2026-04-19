import { ScrambleText } from "@/components/scramble-text"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAchievementSlug, getAllAchievements } from "@/lib/achievements"

export const metadata: Metadata = {
  title: "Achievements",
  description: "Hackathons and technical achievements.",
  openGraph: {
    images: [
      {
        url: "https://adilhusain.me/og/home?title=achievements",
      },
    ],
  },
}

const achievements = getAllAchievements()

export default function AchievementsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="achievements" />
      </h1>

      <p className="text-sm sm:text-base text-gray-400 mb-10 sm:mb-12 leading-relaxed tracking-wide">
        Some of my little achievements which means alot to me.
      </p>

      <div className="space-y-6">
        {achievements.map((item) => (
          <div
            key={getAchievementSlug(item)}
            className="group border border-gray-800 transition-colors hover:border-accent/50 flex flex-col overflow-hidden"
          >
            {item.image && (
              <div className="w-full overflow-hidden border-b border-gray-800 group-hover:border-accent/50 transition-colors">
                <div className="w-full" style={{ aspectRatio: "1200 / 630" }}>
                  <img
                    src={item.image}
                    alt={item.event}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            )}
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex justify-between items-start gap-2 sm:gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 text-white group-hover:text-accent transition-colors">
                    {item.event}
                  </h3>
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs sm:text-sm font-semibold text-accent bg-accent/10 border border-accent/40">
                      {item.award}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center pt-1 shrink-0">
                <Link
                  href={`/achievements/${getAchievementSlug(item)}`}
                  className="inline-flex items-center gap-2 text-sm text-gray-300 bg-gray-800/60 px-3 py-2 rounded-md hover:bg-accent/15 hover:text-white transition-colors"
                >
                  view details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
