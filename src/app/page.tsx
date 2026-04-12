import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { projects } from "@/lib/projects"
import { systemDesign } from "@/lib/system-design"
import { ProjectCard } from "@/components/project-card"
import Link from "next/link"

const workItems: Item[] = [
  {
    title: "techbug",
    role: "full stack developer intern",
    period: "july 2024 - october 2024",
    description:
      "Engineered CMS dashboard increasing content update efficiency by 50%. Enforced JWT-based authorization, reducing unauthorized access by 90%. Improved app performance by 65% through optimized pagination. Developed an automated email system for notifications.",
    href: "https://www.linkedin.com/company/techbug-official",
  },
]

export default function HomePage() {
  const topProjects = [...projects]
    .sort((a, b) => new Date(b.period).getTime() - new Date(a.period).getTime())
    .slice(0, 2)

  const topSystemDesign = [...systemDesign]
    .sort((a, b) => new Date(b.period).getTime() - new Date(a.period).getTime())
    .slice(0, 2)

  return (
    <>
      <Header />
      <SectionList title="work" items={workItems} />
      <BlogSection />

      <section
        className="mb-12 sm:mb-16 animate-fade-in-up"
        style={{ animationDelay: "200ms", animationFillMode: "both" }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
          <span className="text-accent mr-2">*</span> system design
        </h2>
        <div className="space-y-6">
          {topSystemDesign.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
              coverType="system-design"
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

      <section
        className="mb-12 sm:mb-16 animate-fade-in-up"
        style={{ animationDelay: "300ms", animationFillMode: "both" }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
          <span className="text-accent mr-2">*</span> latest projects
        </h2>
        <div className="space-y-6">
          {topProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
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
    </>
  )
}
