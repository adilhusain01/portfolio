import { ScrambleText } from "@/components/scramble-text"
import { ToolCard } from "@/components/tool-card"
import { Metadata } from "next"
import { getProjectSlug, projects, sortProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Products",
  description: "Focused, high-performance browser tools and products designed to solve specific problems.",
  openGraph: {
    images: [
      {
        url: "https://adilhusain.me/og/home?title=products",
      },
    ],
  },
}

export default function ProductsPage() {
  const sortedProjects = sortProjects(projects)
  const products = sortedProjects.filter(p => p.category === "tool")

  return (
    <main className="animate-fade-in-up">
      <div className="flex flex-col mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">
          <span className="text-accent mr-2">*</span>
          <ScrambleText text="products" />
        </h1>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl">
          A collection of focused, high-performance browser tools and standalone products I've built to solve specific technical challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {products.map((product) => (
          <ToolCard
            key={getProjectSlug(product)}
            {...product}
            detailHref={`/projects/${getProjectSlug(product)}`}
          />
        ))}
      </div>
    </main>
  )
}
