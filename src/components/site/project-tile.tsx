import Image from "next/image"
import Link from "next/link"
import { getProjectSlug, projectCover, projectName, projectYear, type ProjectEntry } from "@/lib/projects"

// A project as its own site shows it: the preview image, the name, the year and one line.
export function ProjectTile({ project }: { project: ProjectEntry }) {
  const slug = getProjectSlug(project)
  const cover = projectCover(project)
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <span className="relative block aspect-[1200/630] overflow-hidden rounded-xl bg-tray ring-1 ring-inset ring-rule">
        {cover ? (
          <Image
            src={cover}
            alt={`${projectName(project.title)} preview`}
            fill
            sizes="(min-width: 1280px) 26vw, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-[1.015]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center font-display text-[clamp(1.75rem,4vw,2.5rem)] text-ink-3">{projectName(project.title)}</span>
        )}
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-ink/10" />
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-4">
        <span className="text-lg font-semibold text-ink decoration-pen underline-offset-4 [@media(hover:hover)]:group-hover:underline">{projectName(project.title)}</span>
        <span className="text-[15px] tabular-nums text-ink-3">{projectYear(project)}</span>
      </span>
      <span className="mt-1 block text-[15px] leading-relaxed text-ink-2">{project.tagline}</span>
    </Link>
  )
}
