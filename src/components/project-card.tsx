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

function SystemDesignFallback({
  title,
  accent,
}: {
  title: string
  accent: string
}) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a1118]">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-28"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accent}55 0%, transparent 70%)`,
        }}
      />

      <div className="relative h-full p-4 sm:p-7 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.16em]"
            style={{
              color: accent,
              borderColor: `${accent}66`,
              backgroundColor: `${accent}1A`,
            }}
          >
            system design canvas
          </span>
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] text-gray-300/80">
            architecture map
          </span>
        </div>

        <div className="relative flex-1 mt-4 sm:mt-5">
          <div className="absolute rounded-md border border-cyan-300/35 bg-[#0d1620]/80 px-2.5 py-1 text-[10px] sm:text-xs text-cyan-200 left-[5%] top-[8%]">
            client
          </div>
          <div className="absolute rounded-md border border-violet-300/35 bg-[#1a1325]/80 px-2.5 py-1 text-[10px] sm:text-xs text-violet-200 right-[5%] top-[8%]">
            api gateway
          </div>
          <div className="absolute rounded-md border border-amber-300/35 bg-[#241909]/80 px-2.5 py-1 text-[10px] sm:text-xs text-amber-200 left-1/2 -translate-x-1/2 top-[42%]">
            message queue
          </div>
          <div className="absolute rounded-md border border-emerald-300/35 bg-[#0f2018]/80 px-2.5 py-1 text-[10px] sm:text-xs text-emerald-200 left-[16%] bottom-[8%]">
            workers
          </div>
          <div className="absolute rounded-md border border-blue-300/35 bg-[#0c1b2d]/80 px-2.5 py-1 text-[10px] sm:text-xs text-blue-200 right-[16%] bottom-[8%]">
            datastore
          </div>

          <div
            className="absolute h-px bg-white/25"
            style={{ top: "21%", left: "20%", width: "30%" }}
          />
          <div
            className="absolute h-px bg-white/25"
            style={{ top: "21%", right: "20%", width: "30%" }}
          />
          <div
            className="absolute w-px bg-white/25"
            style={{ top: "48%", left: "50%", height: "25%" }}
          />
          <div
            className="absolute h-px bg-white/25"
            style={{ top: "72%", left: "24%", width: "52%" }}
          />
        </div>

        <div className="text-[10px] sm:text-xs uppercase tracking-[0.14em] text-gray-300/80">
          latency · throughput · resilience · {title}
        </div>
      </div>
    </div>
  )
}

type CoverType = "default" | "system-design"

type ProjectCardProps = {
  title: string
  description: string
  role: string
  period?: string
  image?: string
  imageAlt?: string
  coverType?: CoverType
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
  coverType = "default",
  achievements,
  technologies,
  href,
  github,
  video,
}: ProjectCardProps) {
  const accent = FALLBACK_ACCENTS[hashTitle(title) % FALLBACK_ACCENTS.length]
  const initials = getInitials(title)
  const showSystemDesignFallback = !image && coverType === "system-design"

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
          ) : showSystemDesignFallback ? (
            <SystemDesignFallback title={title} accent={accent} />
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
