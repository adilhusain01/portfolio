import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAchievementSlug, getAllAchievements } from "@/lib/achievements"

const TOP_ACHIEVEMENTS_COUNT = 2

export function AchievementsSection() {
  const topAchievements = getAllAchievements().slice(0, TOP_ACHIEVEMENTS_COUNT)

  return (
    <section
      className="mb-12 sm:mb-16 animate-fade-in-up"
      style={{ animationDelay: "340ms", animationFillMode: "both" }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
        <span className="text-accent mr-2">*</span> achievements
      </h2>

      <div className="space-y-6">
        {topAchievements.map((item) => (
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

      <div className="mt-6 sm:mt-8 flex justify-end">
        <Link
          href="/achievements"
          className="group flex items-center text-sm font-mono text-gray-400 hover:text-accent transition-colors"
        >
          <span className="transition-colors">show all</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
