import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"
import { systemDesign } from "@/lib/system-design"

export default function SystemDesignPage() {
  // Sort system design projects chronologically by period
  const sortedSystemDesign = [...systemDesign].sort(
    (a, b) => new Date(b.period).getTime() - new Date(a.period).getTime(),
  )

  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="system design" />
      </h1>

      <p className="text-gray-400 mb-12 leading-relaxed">
        An engineering archive mapping my journey scaling system architecture,
        optimizing backend performance, and deploying distributed services to cloud infrastructure. Sorted chronologically.
      </p>

      <div className="space-y-12">
        {sortedSystemDesign.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "System Design",
  description:
    "An engineering archive of scaling systems, optimization, and cloud architecture.",
}
