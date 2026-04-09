import Link from "next/link"
import { Globe, MonitorPlay, Github } from "lucide-react"

type ProjectCardProps = {
  title: string
  description: string
  role: string
  period?: string
  image?: string
  imageAlt?: string
  achievements: string[]
  technologies: string[]
  href?: string
  github?: string
  video?: string
}

export function ProjectCard({
  title,
  description,
  role,
  period,
  image,
  imageAlt,
  achievements,
  technologies,
  href,
  github,
  video,
}: ProjectCardProps) {
  return (
    <div className="group border border-gray-800 p-4 sm:p-6 transition-colors hover:border-accent/50">
      {image && (
        <div className="-mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-4 sm:mb-6 overflow-hidden border-b border-gray-800 group-hover:border-accent/50 transition-colors">
          <div className="w-full" style={{ aspectRatio: "1200 / 630" }}>
            <img
              src={image}
              alt={imageAlt ?? `${title} preview`}
              loading="lazy"
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-1 text-white group-hover:text-accent transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-3 pt-1 shrink-0">
          {github && (
            <Link
              href={github}
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors"
              title="View Source Code"
            >
              <Github className="w-5 h-5" />
            </Link>
          )}
          {video && (
            <Link
              href={video}
              target="_blank"
              className="text-gray-400 hover:text-accent transition-colors"
              title="Video Demo"
            >
              <MonitorPlay className="w-5 h-5" />
            </Link>
          )}
          {href && (
            <Link
              href={href}
              target="_blank"
              className="text-gray-400 hover:text-accent transition-colors"
              title="Visit Website"
            >
              <Globe className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        {role} {period && `(${period})`}
      </p>

      <p className="text-gray-300 mb-6">{description}</p>

      <div className="space-y-6">
        {achievements && achievements.length > 0 && (
          <div>
            <h3 className="text-white font-semibold mb-2">achievements</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-white font-semibold mb-2">technologies</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-sm text-gray-300 bg-gray-800/50 rounded"
              >
                {tech.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
