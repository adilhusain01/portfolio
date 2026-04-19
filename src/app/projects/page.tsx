import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"
import { getProjectSlug, projects, sortProjects } from "@/lib/projects"

export default function ProjectsPage() {
  const sortedProjects = sortProjects(projects)

  return (
    <main className="animate-fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="projects" />
      </h1>

      <p className="text-sm sm:text-base text-gray-400 mb-10 sm:mb-12 leading-relaxed">
        A look of my fun projects that I love to do.
      </p>

      <div className="space-y-12">
        {sortedProjects.map((project) => (
          <ProjectCard
            key={getProjectSlug(project)}
            {...project}
            detailHref={`/projects/${getProjectSlug(project)}`}
          />
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
