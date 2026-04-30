import { Metadata } from "next"
import { ScrambleText } from "@/components/scramble-text"
import { DesignCard } from "@/components/design-card"
import { projects, sortProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Design Works | Adil Husain",
  description: "A showcase of high-impact, cinematic web design and creative studio experiences.",
  openGraph: {
    images: [
      {
        url: "https://adilhusain.xyz/og/home?title=design",
      },
    ],
  },
}

export default function DesignPage() {
  const designProjects = sortProjects(projects.filter((p) => p.category === "design"))

  return (
    <main className="min-h-screen pb-24 animate-fade-in">
      <header className="mb-20 sm:mb-32">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white tracking-tight">
          <span className="text-accent mr-2">*</span>
          <ScrambleText text="design works" />
        </h1>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-3xl">
          Liquid motion, cinematic interactions, and ethereal aesthetics.
          Merging technical precision with creative vision to build immersive digital experiences.
        </p>
      </header>

      <section className="space-y-12 sm:space-y-24">
        {designProjects.map((design, index) => (
          <DesignCard key={design.title} design={design} index={index} />
        ))}
      </section>
    </main>
  )
}
