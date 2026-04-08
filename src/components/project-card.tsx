import Link from "next/link"
import { Globe, MonitorPlay, Github } from "lucide-react"

type ProjectCardProps = {
  title: string
  description: string
  role: string
  period?: string
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
  achievements,
  technologies,
  href,
  github,
  video,
}: ProjectCardProps) {
  return (
    <div className="group border border-gray-800 p-4 sm:p-6 transition-colors hover:border-accent/50">
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
