import Link from "next/link"
import { Globe, MonitorPlay, Github } from "lucide-react"

const FALLBACK_ACCENTS = [
  "#22d3ee",
  "#34d399",
  "#f59e0b",
  "#a78bfa",
  "#f472b6",
  "#60a5fa",
]

function hashTitle(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash)
}

function getInitials(value: string) {
  const initials = value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("")

  return initials || "PR"
}

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
  const accent = FALLBACK_ACCENTS[hashTitle(title) % FALLBACK_ACCENTS.length]
  const initials = getInitials(title)

  return (
    <div className="group border border-gray-800 p-4 sm:p-6 transition-colors hover:border-accent/50">
      <div className="-mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-4 sm:mb-6 overflow-hidden border-b border-gray-800 group-hover:border-accent/50 transition-colors">
        <div className="w-full" style={{ aspectRatio: "1200 / 630" }}>
          {image ? (
            <img
              src={image}
              alt={imageAlt ?? `${title} preview`}
              loading="lazy"
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
          ) : (
            <div
              className="relative w-full h-full overflow-hidden bg-[#0b0f12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.06) 0px, transparent 32%), radial-gradient(circle at 88% 82%, rgba(255,255,255,0.04) 0px, transparent 36%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "46px 46px",
                }}
              />

              <div
                className="absolute -top-16 -right-12 w-72 h-72 rounded-full blur-3xl"
                style={{ backgroundColor: accent, opacity: 0.28 }}
              />
              <div
                className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full blur-3xl"
                style={{ backgroundColor: accent, opacity: 0.18 }}
              />

              <div className="relative h-full flex flex-col justify-between p-5 sm:p-8">
                <span className="inline-flex w-fit items-center rounded-full border border-white/20 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-gray-200/90 bg-black/30">
                  auto generated preview
                </span>

                <div className="space-y-2">
                  <div className="text-5xl sm:text-7xl font-bold leading-none text-white/90">
                    {initials}
                  </div>
                  <p className="text-lg sm:text-3xl font-semibold leading-tight text-white">
                    {title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300/80">
                    project cover pending update
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
