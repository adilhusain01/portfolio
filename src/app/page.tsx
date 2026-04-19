import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { getProjectSlug, projects, sortProjects } from "@/lib/projects"
import { systemDesign } from "@/lib/system-design"
import { ProjectCard } from "@/components/project-card"
import Link from "next/link"

const workItems: Item[] = [
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
    skills: ["JavaScript", "TypeScript", "Python", "SQL", "Solidity"],
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
          <span className="text-accent mr-2">*</span> skills
        </h2>

        <div className="space-y-4 sm:space-y-5">
          {skillsByCategory.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.12em] text-gray-500 mb-2">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionList title="work" items={workItems} />

      <section
        className="mb-12 sm:mb-16 animate-fade-in-up"
        style={{ animationDelay: "200ms", animationFillMode: "both" }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
          <span className="text-accent mr-2">*</span> latest projects
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
          <span className="text-accent mr-2">*</span> system design
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
