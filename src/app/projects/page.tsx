import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"
import { projects } from "@/lib/projects"

export default function ProjectsPage() {
  // Sort projects chronologically by period
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.period).getTime() - new Date(a.period).getTime(),
  )

  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="projects" />
      </h1>

      <p className="text-gray-400 mb-12 leading-relaxed">
        An engineering archive mapping my projects scaling system architecture,
        developing multi-chain blockchain smart contracts, and full stack AI
        application development.
      </p>

      <div className="space-y-12">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description:
    "An engineering archive of scaling systems, web3 applications, and full-stack AI development.",
  openGraph: {
    images: [
      {
        url: "https://adilhusain.me/og/home?title=projects",
      },
    ],
  },
}
