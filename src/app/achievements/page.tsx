import { Trophy } from "lucide-react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export const metadata = {
  title: "Achievements",
  description: "Hackathons and technical achievements.",
};

const achievements = [
  {
    event: "Alphathon Origin Singapore (TOKEN2049)",
    award: "3rd Prize ($1,500 USDC)",
    project: "TaaS",
    link: "https://taas-nine.vercel.app",
  },
  {
    event: "Somnia DeFi Mini Hackathon",
    award: "2nd Prize ($1,500)",
    project: "Somany",
    link: "https://somany-nine.vercel.app/",
  },
  {
    event: "Somnia Mini Games Hackathon",
    award: "2nd Prize ($200)",
    project: "Catch Goofy",
    link: "https://catch-goofy.vercel.app",
  },
  {
    event: "Hack for Humanity 2025 (Microsoft x InnoQuest)",
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
    <div className="flex flex-col gap-12 sm:gap-16 pt-8 pb-16">
      <section className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-neutral-500" />
            Achievements
          </h1>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
            A track record of competing and building in global hackathons.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.event}
                </h3>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {item.award}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
                <span className="text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block">
                  Built
                </span>
                <Link
                  href={item.link}
                  target="_blank"
                  className="inline-flex max-w-[fit-content] items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  {item.project}
                  <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
