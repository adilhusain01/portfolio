import Link from "next/link"
import stagePhoto from "../../public/me/demo.webp"
import { stage as stageShot } from "@/lib/vision"
import { work } from "@/lib/work"
import { getProjectBySlug, projects, type ProjectEntry } from "@/lib/projects"
import { getAchievementSlug, getAchievementsByDate } from "@/lib/achievements"
import { getPosts } from "@/lib/blog"
import { systemDesign } from "@/lib/system-design"
import { CameraPrint } from "@/components/home/camera-print"
import { DelhiLine } from "@/components/home/delhi-time"
import { Hero } from "@/components/home/hero"
import { WorkRows } from "@/components/home/work-rows"
import { CameraRoll } from "@/components/home/camera-roll"
import { Stack } from "@/components/home/stack"
import { Note, Section, formatMonth } from "@/components/site/ui"
import { ProjectTile } from "@/components/site/project-tile"

const featured = ["ironclad", "heyterm", "peeker", "saveposts", "bookboy", "croppy"]

const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"]

const socials = [
  { label: "GitHub", href: "https://github.com/adilhusain01" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adil-husain" },
  { label: "X", href: "https://x.com/0xAdilHusain" },
]

export default function HomePage() {
  const wins = getAchievementsByDate()
  const featuredProjects = featured.map((slug) => getProjectBySlug(slug)).filter((p): p is ProjectEntry => Boolean(p))
  const posts = getPosts()
    .map((post) => ({ title: post.metadata.title, date: post.metadata.date, href: `/blog/${post.slug}`, kind: "Post" }))
    .concat(systemDesign.map((entry) => ({ title: entry.title, date: entry.period, href: `/system-design/${entry.slug}`, kind: "System design" })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <main>
      <Hero />

      <section aria-label="About" className="grid gap-8 pb-20 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-[minmax(13rem,22%)_minmax(0,1fr)] lg:gap-14">
        <div aria-hidden="true" />
        <div>
          <p className="max-w-[30ch] font-display text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.22] tracking-[-0.015em] text-ink">
            These days I teach cameras to notice things and computers to take orders by voice. I also make Mac apps people pay for, and I&apos;ve won prizes at{" "}
            {words[wins.length] ?? wins.length} hackathons.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            <DelhiLine />
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-link text-ink-2">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section id="work" title="Work" line="Where I've worked.">
        <WorkRows items={work} />
      </Section>

      <Section id="projects" title="Projects" line="Apps, tools and hackathon builds.">
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <li key={project.title}>
              <ProjectTile project={project} />
            </li>
          ))}
        </ul>
        <Link href="/projects" className="text-link mt-12 inline-block text-[15px] font-medium text-ink">
          See all {projects.length} projects
        </Link>
      </Section>

      <Section
        id="hackathons"
        title="Hackathons"
        line="Every prize so far, newest first."
        aside={
          <div className="mt-8 hidden lg:block">
            <CameraPrint
              src={stagePhoto}
              shot={stageShot}
              alt="Adil presenting at a hackathon, a route map on the projector behind him"
              tilt={-2}
              sizes="14rem"
            />
            <Note className="mt-3 -rotate-2">It thinks the projector is a TV.</Note>
          </div>
        }
      >
        <ul className="divide-y divide-rule border-b border-rule">
          {wins.map((win) => (
            <li key={win.event} className="relative">
              <Link
                href={`/achievements/${getAchievementSlug(win)}`}
                className="group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,15rem)_5.5rem] sm:items-baseline"
              >
                <span className="min-w-0">
                  <span className="font-semibold text-ink decoration-pen underline-offset-4 [@media(hover:hover)]:group-hover:underline">{win.event}</span>
                  {win.project ? <span className="ml-2 text-[15px] text-ink-3">with {win.project}</span> : null}
                </span>
                <span className="text-[15px] text-ink-2">{win.result}</span>
                <span className="text-[15px] tabular-nums text-ink-3 sm:text-right">{win.date ? formatMonth(win.date) : ""}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/achievements" className="text-link mt-8 inline-block text-[15px] font-medium text-ink">
          Photos and stories from each one
        </Link>
      </Section>

      <Section id="roll" title="Camera roll" line="Hackathon trips and a few days off. Drag them around.">
        <CameraRoll />
      </Section>

      <Section id="writing" title="Writing" line="Notes from scaling Node.js and taking systems apart.">
        <ul className="divide-y divide-rule">
          {posts.map((post) => (
            <li key={post.href}>
              <Link href={post.href} className="group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_8rem_5.5rem] sm:items-baseline">
                <span className="font-medium text-ink decoration-pen underline-offset-4 first-letter:uppercase [@media(hover:hover)]:group-hover:underline">{post.title}</span>
                <span className="text-[15px] text-ink-3">{post.kind}</span>
                <span className="text-[15px] tabular-nums text-ink-3 sm:text-right">{formatMonth(post.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tools" title="Tools" line="What I build with most. Each logo opens its site.">
        <Stack />
      </Section>
    </main>
  )
}
