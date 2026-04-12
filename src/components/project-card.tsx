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

function StarProjectRibbon() {
  return (
    <div
      className="pointer-events-none absolute -top-[10px] -right-[10px] z-20 h-[130px] w-[130px] sm:h-[150px] sm:w-[150px]"
      aria-hidden="true"
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute right-[54px] top-[10px] h-[8px] w-[44px] rotate-45 rounded-[9px] bg-gradient-to-r from-[#be123c] to-[#4c0519] sm:right-[62px] sm:top-[12px] sm:w-[52px]" />

        <div className="absolute right-0 top-[52px] h-[42px] w-[8px] rounded-r-[9px] bg-gradient-to-b from-[#4c0519] to-[#be123c] sm:top-[60px] sm:h-[50px]" />

        <div className="absolute top-[28px] -right-[68px] h-[38px] w-[220px] rotate-45 bg-gradient-to-r from-[#7f1d1d] via-[#dc2626] to-[#7f1d1d] shadow-[inset_0_0_0_2px_rgba(127,29,29,0.95),inset_0_0_0_3px_rgba(69,10,10,0.8),inset_0_0_0_4px_rgba(248,113,113,0.28),0_18px_5px_-16px_rgba(0,0,0,0.8)] sm:top-[30px] sm:-right-[76px] sm:h-[42px] sm:w-[248px]" />

        <div className="absolute right-[12px] top-[42px] h-[74px] w-[11px] -rotate-45 bg-gradient-to-r from-transparent via-[#881337]/35 to-transparent sm:right-[14px] sm:top-[48px] sm:h-[86px]" />
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
  const isStarProject = achievements.length > 0

  return (
    <div className="group relative overflow-visible border border-gray-800 p-4 sm:p-6 transition-colors hover:border-accent/50">
      {isStarProject && <StarProjectRibbon />}

      <div className="relative -mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-4 sm:mb-6 overflow-hidden border-b border-gray-800 group-hover:border-accent/50 transition-colors">
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
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-1 text-white group-hover:text-accent transition-colors">
            {title}
          </h3>
        </div>
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
