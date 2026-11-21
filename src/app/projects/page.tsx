import type { Metadata } from "next"
import { byNewest, projects } from "@/lib/projects"
import { PageHead } from "@/components/site/ui"
import { ProjectTile } from "@/components/site/project-tile"

export const metadata: Metadata = {
  title: "Projects",
  description: "Apps, tools, hackathon builds and a few designs by Adil Husain, newest first.",
  openGraph: { images: [{ url: "https://adilhusain.dev/og/home?title=projects" }] },
}

const groups = [
  { id: "builds", title: "Builds", line: "Bigger builds, from products to hackathon entries.", category: "project" },
  { id: "tools", title: "Apps and tools", line: "Small apps and tools that each do one job.", category: "tool" },
  { id: "design", title: "Design", line: "Sites where the look was the brief.", category: "design" },
] as const

export default function ProjectsPage() {
  return (
    <main>
      <PageHead title="Projects" line={`All ${projects.length}, newest first. Each one opens to the full story and its README.`} />
      {groups.map((group) => {
        const list = byNewest(projects.filter((p) => p.category === group.category))
        return (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="border-t border-rule py-14 sm:py-16">
            <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 id={`${group.id}-title`} className="font-display text-[1.75rem] leading-tight text-ink">
                {group.title}
              </h2>
              <p className="text-[15px] text-ink-3">{group.line}</p>
            </div>
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((project) => (
                <li key={project.title}>
                  <ProjectTile project={project} />
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </main>
  )
}
