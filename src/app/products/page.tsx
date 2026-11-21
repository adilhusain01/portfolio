import type { Metadata } from "next"
import { byNewest, projects } from "@/lib/projects"
import { PageHead } from "@/components/site/ui"
import { ProjectTile } from "@/components/site/project-tile"

export const metadata: Metadata = {
  title: "Apps and tools",
  description: "Small apps and browser tools by Adil Husain.",
  openGraph: { images: [{ url: "https://adilhusain.dev/og/home?title=apps%20and%20tools" }] },
}

export default function Page() {
  const list = byNewest(projects.filter((p) => p.category === "tool"))
  return (
    <main className="pb-16">
      <PageHead title="Apps and tools" line="Small apps and tools that each do one job." back={{ href: "/projects", label: "All projects" }} />
      <ul className="grid gap-x-8 gap-y-12 border-t border-rule pt-14 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((project) => (
          <li key={project.title}>
            <ProjectTile project={project} />
          </li>
        ))}
      </ul>
    </main>
  )
}
