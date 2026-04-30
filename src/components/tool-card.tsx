import Link from "next/link"
import { Globe, ArrowRight } from "lucide-react"

type ToolCardProps = {
  title: string
  description: string
  period?: string
  image?: string
  technologies: string[]
  href?: string
  github?: string
  detailHref?: string
}

export function ToolCard({
  title,
  description,
  period,
  image,
  technologies,
  href,
  github,
  detailHref,
}: ToolCardProps) {
  const isInternalHref = Boolean(href?.startsWith("/"))
  const isInternalDetailHref = Boolean(detailHref?.startsWith("/"))

  return (
    <div className="group relative overflow-hidden border border-gray-800 p-5 transition-all hover:border-accent/40 bg-[#111317]/50 hover:bg-[#111317] flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors truncate">
            {title}
          </h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
            Product {period && `• ${period}`}
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          {github && (
            <Link
              href={github}
              target="_blank"
              className="opacity-60 hover:opacity-100 transition-opacity"
              title="Source Code"
            >
              <img src="/gh-shadowed.png" alt="GitHub" className="w-5 h-5 object-contain" />
            </Link>
          )}
          {href && (
            <Link
              href={href}
              target={isInternalHref ? undefined : "_blank"}
              rel={isInternalHref ? undefined : "noopener noreferrer"}
              className="text-gray-400 hover:text-accent transition-colors"
              title="Launch Tool"
            >
              <Globe className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      <div className="relative mb-5 aspect-video overflow-hidden rounded border border-gray-800/50 grayscale group-hover:grayscale-0 transition-all duration-700">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center text-2xl font-bold text-gray-800 uppercase">
            {title.slice(0, 2)}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
        {description}
      </p>

      <div className="mt-auto space-y-5">
        <div className="flex flex-wrap gap-1.5">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 text-[10px] text-gray-500 bg-gray-800/30 rounded border border-gray-800/50"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="text-[10px] text-gray-600 self-center">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {detailHref && (
          <Link
            href={detailHref}
            className="inline-flex items-center text-xs font-mono text-gray-500 group-hover:text-accent transition-colors gap-1.5"
          >
            DOCUMENTATION
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  )
}
