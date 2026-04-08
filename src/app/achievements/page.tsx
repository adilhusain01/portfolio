import { ScrambleText } from "@/components/scramble-text"
import { Metadata } from "next"
import Link from "next/link"
import { Trophy, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Achievements",
  description: "Hackathons and technical achievements.",
};

const achievements = [
  {
    event: "Alphathon Origin Singapore (TOKEN2049)",
    award: "3rd Prize ($1,500 USDC)",
    project: "TaaS",
    link: "https://taas-nine.vercel.app/",
  },
  {
    event: "Somnia DeFi Mini Hackathon",
    award: "2nd Prize ($1,500)",
    project: "Somany",
    link: "https://somany-nine.vercel.app/",
  },
  {
    event: "Somnia Mini Games Hackathon",
    award: "2nd Prize ($100)",
    project: "Catch Goofy",
    link: "https://catch-goofy.vercel.app/",
  },
  {
    event: "Microsoft x InnoQuest",
    award: "2nd Position",
  },
  {
    event: "Hack for Humanity 2025",
    award: "14th Place",
    project: "Concept Bridge",
    link: "https://concept-bridge.vercel.app/",
  },
  {
    event: "TRON HackaTron Season 7",
    award: "Artistry Track 4th Prize ($8,000)",
    project: "Vibe",
    link: "https://vibe-gamez.vercel.app/",
  },
];

export default function AchievementsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="achievements" />
      </h1>

      <p className="text-gray-400 mb-12 leading-relaxed tracking-wide">
        A track record of competing, building, and winning in global hackathons
        and technical competitions.
      </p>

      <div className="space-y-6">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="group border border-gray-800 p-6 transition-colors hover:border-accent/50 flex flex-col sm:flex-row sm:items-start sm:items-center justify-between gap-4"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white group-hover:text-accent transition-colors flex items-center gap-2">
                  <Trophy className="w-5 h-5 shrink-0" />
                  {item.event}
                </h2>
                <p className="text-sm text-gray-400">
                  <span className="text-gray-300 font-semibold">{item.award}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center pt-1 shrink-0">
              {item.project && item.link ? (
                <Link
                  href={item.link}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
                >
                  <span className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 rounded">
                    built {item.project.toLowerCase()}
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
        ))}
      </div>
    </main>
  );
}
