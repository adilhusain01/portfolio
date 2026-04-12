import { ScrambleText } from "@/components/scramble-text"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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

const achievements = [
  {
    event: "Alphathon Origin Singapore (TOKEN2049)",
    award: "3rd Prize ($1,500)",
    project: "TaaS",
    link: "https://www.token2049.com/singapore/2049-origins",
    image:
      "https://token2049.nyc3.cdn.digitaloceanspaces.com/Singapore/OG/TOKEN2049%20Origins%20-%20Opengraph-2%20OCT%202025%20Opt2png.png",
  },
  {
    event: "Somnia DeFi Mini Hackathon",
    award: "2nd Prize ($1,500)",
    project: "Somany",
    link: "https://dorahacks.io/hackathon/defi-mini-hackathon/buidl",
    image:
      "https://cdn.dorahacks.io/static/files/198840c1a75063621f8f85844ff9995a.png",
  },
  {
    event: "Somnia Mini Games Hackathon",
    award: "2nd Prize ($100)",
    project: "Catch Goofy",
    link: "https://dorahacks.io/hackathon/somnia-minigames/buidl",
    image:
      "https://cdn.dorahacks.io/static/files/1981e7aebe221556ff526be4829964e8.png",
  },
  {
    event: "Microsoft x InnoQuest",
    award: "2nd Position",
    link: "https://www.reskilll.com/hack/innoquest#schedule-area",
    image: "https://content.reskilll.com/ABCO3KzcG6.png",
  },
  {
    event: "Hack for Humanity 2025",
    award: "14th Position",
    project: "Concept Bridge",
    link: "https://devpost.com/software/concept-bridge-la3cfg",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/003/120/949/datas/full_width.png",
  },
  {
    event: "TRON HackaTron Season 7",
    award: "4th Prize ($8,000) - Artistry Track",
    project: "Vibe",
    link: "https://hackatron7.devpost.com/",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/002/960/566/datas/full_width.png",
  },
]

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
        {achievements.map((item, index) => (
          <div
            key={index}
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
                {item.link ? (
                  <Link
                    href={item.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    <span className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 rounded">
                      {item.project
                        ? `built ${item.project.toLowerCase()}`
                        : "view project"}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                  </Link>
                ) : item.project ? (
                  <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                    <span className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 rounded">
                      built {item.project.toLowerCase()}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
