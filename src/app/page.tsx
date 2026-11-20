import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { getProjectSlug, projects, sortProjects } from "@/lib/projects"
import { systemDesign } from "@/lib/system-design"
import { ProjectCard } from "@/components/project-card"
import { AchievementsSection } from "@/components/achievements-section"
import { GallerySection } from "@/components/gallery-section"
import { ResumeSection } from "@/components/resume-section"
import Link from "next/link"
import { PhysicsSkills } from "@/components/physics-skills"
import { ScrollScramble } from "@/components/scroll-scramble"

const workItems: Item[] = [
  {
    title: "synq ai",
    role: "forward deployed engineer intern",
    period: "september 2026 - present",
    description:
      "Built camera monitoring that runs on a GPU beside the camera and keeps working offline, with person detection, tracking and pose, zones with seven alert rules, Slack alerts with the frame, a cloud dashboard and a daily PDF report with a timelapse; it is live on an office camera. Built voice control for a macOS agent that sees the screen and operates the computer, with hold-to-talk and a task loop that carries out a spoken request one action at a time, shipped in its 1.0 release in September 2026. Automated lead research in about a day: background workers, one driving a real browser, find target companies and read rating agency releases, a model must quote its evidence, and code checks every quote and computes the score; it tracks about 1,000 companies and 2,000 leads, with 677 tests. Developed an AI office layout generator that turns a floor plan and a brief into layouts verified by a rule checker and exported as PDF and DXF, with company sign-in and attack tests from a security audit. Turned the operations team's written process into a full-stack app for office fit-out projects, covering BOQ, quotes, work orders, change log and snag stages, with role-based access, approvals, Excel and PDF exports, and a public demo that resets nightly.",
    href: "https://www.synqflow.ai",
  },
  {
    title: "techbug",
    role: "full stack developer intern",
    period: "july 2024 - october 2024",
    description:
      "Built and deployed scalable Node.js and React.js applications and CMS dashboards using Docker, AWS EC2/S3, Cloudinary, and Google Analytics. Implemented JWT-based authentication with RBAC, improved API reliability with Redis caching, rate limiting, and optimized queries. Enhanced scalability and response times with server-side pagination, indexing, and Node.js clustering using worker threads. Developed an event-driven email system to automate user and inventory alerts.",
    href: "https://www.linkedin.com/company/techbug-official",
  },
]

const skillsByCategory = [
  {
    title: "languages",
    skills: ["JavaScript", "TypeScript", "Python", "Swift", "Rust", "SQL", "Solidity"],
  },
  {
    title: "backend",
    skills: ["Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    title: "frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "ai",
    skills: ["Computer Vision", "Ollama", "MCP"],
  },
  {
    title: "cloud & tooling",
    skills: ["AWS EC2", "AWS S3", "Docker", "Kubernetes", "Git"],
  },
]

export default function HomePage() {
  const topProjects = sortProjects(projects).slice(0, 2)

  const topSystemDesign = [...systemDesign]
    .sort((a, b) => new Date(b.period).getTime() - new Date(a.period).getTime())
    .slice(0, 2)

  return (
    <>
      <Header />

      <section
        className="mb-12 sm:mb-16 animate-fade-in-up"
        style={{ animationDelay: "120ms", animationFillMode: "both" }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
          <span className="text-accent mr-2">*</span> <ScrollScramble text="skills" />
        </h2>

        <PhysicsSkills skills={skillsByCategory.flatMap(g => g.skills)} />
      </section>

      <SectionList title="work" items={workItems} />

      <ResumeSection />

      <AchievementsSection />

      <section
        className="mb-12 sm:mb-16 animate-fade-in-up"
        style={{ animationDelay: "200ms", animationFillMode: "both" }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
          <span className="text-accent mr-2">*</span> <ScrollScramble text="latest projects" />
        </h2>
        <div className="space-y-6">
          {topProjects.map((project) => (
            <ProjectCard
              key={getProjectSlug(project)}
              {...project}
              detailHref={`/projects/${getProjectSlug(project)}`}
            />
          ))}
        </div>
        <div className="mt-6 sm:mt-8 flex justify-end">
          <Link
            href="/projects"
            className="group flex items-center text-sm font-mono text-gray-400 hover:text-accent transition-colors"
          >
            <span className="transition-colors">show all</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </section>

      <section
        className="mb-12 sm:mb-16 animate-fade-in-up"
        style={{ animationDelay: "300ms", animationFillMode: "both" }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
          <span className="text-accent mr-2">*</span> <ScrollScramble text="system design" />
        </h2>
        <div className="space-y-6">
          {topSystemDesign.map((project) => (
            <ProjectCard
              key={project.slug}
              {...project}
              coverType="system-design"
              detailHref={`/system-design/${project.slug}`}
            />
          ))}
        </div>
        <div className="mt-6 sm:mt-8 flex justify-end">
          <Link
            href="/system-design"
            className="group flex items-center text-sm font-mono text-gray-400 hover:text-accent transition-colors"
          >
            <span className="transition-colors">show all</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </section>

      <BlogSection />

    </>
  )
}
