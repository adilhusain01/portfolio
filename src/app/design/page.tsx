import type { Metadata } from "next"
import { byNewest, projects } from "@/lib/projects"
import { PageHead } from "@/components/site/ui"
import { ProjectTile } from "@/components/site/project-tile"

export const metadata: Metadata = {
  title: "Design",
  description: "Design-led sites by Adil Husain.",
  openGraph: { images: [{ url: "https://adilhusain.dev/og/home?title=design" }] },
}

export default function Page() {
  const list = byNewest(projects.filter((p) => p.category === "design"))
  return (
    <main className="pb-16">
      <PageHead title="Design" line="Sites where the look was the brief." back={{ href: "/projects", label: "All projects" }} />
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
