import Link from "next/link"
import { Globe, MonitorPlay, Github, ArrowRight } from "lucide-react"

const FALLBACK_ACCENTS = [
  "#22d3ee",
  "#34d399",
  "#f59e0b",
  "#a78bfa",
  "#f472b6",
  "#60a5fa",
]

const USE_TEMP_SYSTEM_DESIGN_IMAGE = true
const TEMP_SYSTEM_DESIGN_IMAGE_URL =
  "https://images.unsplash.com/photo-1667372335936-3dc4ff716017?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const TEMP_PROJECT_FALLBACK_IMAGE_URL =
  "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

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

function SystemDesignFallback({ accent }: { accent: string }) {
  const flowBars = [92, 76, 63, 48]

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#05070d]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 18% 24%, ${accent}2A 0%, transparent 42%), radial-gradient(circle at 84% 12%, rgba(56,189,248,0.16) 0%, transparent 40%), linear-gradient(135deg, #05070d 0%, #0b1320 48%, #111827 100%)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.13) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div
        className="absolute -top-20 right-8 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: accent, opacity: 0.24 }}
      />

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#04060b] to-transparent" />

      <div className="relative flex h-full flex-col p-4 sm:p-7">
        <div className="mt-4 grid flex-1 grid-cols-2 gap-3 sm:gap-4">
          <div className="relative rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
            <div className="mt-3 space-y-2.5">
              {flowBars.map((width, index) => (
                <div key={width} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: accent,
                      opacity: 0.95 - index * 0.15,
                    }}
                  />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${width}%`,
                        background: `linear-gradient(90deg, ${accent} 0%, rgba(248,250,252,0.88) 100%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-x-4 bottom-4 grid grid-cols-4 gap-2">
              <span className="h-6 rounded-md border border-cyan-300/30 bg-cyan-400/10" />
              <span className="h-6 rounded-md border border-violet-300/30 bg-violet-400/10" />
              <span className="h-6 rounded-md border border-emerald-300/30 bg-emerald-400/10" />
              <span className="h-6 rounded-md border border-amber-300/30 bg-amber-400/10" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
            <div className="relative mt-2 h-[120px] sm:h-[150px]">
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25" />
              <div
                className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
                style={{ backgroundColor: `${accent}30` }}
              />

              <div
                className="absolute left-[18%] top-[20%] h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <div
                className="absolute right-[18%] top-[24%] h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <div
                className="absolute right-[22%] bottom-[22%] h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <div
                className="absolute left-[22%] bottom-[20%] h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: accent }}
              />

              <div className="absolute left-[22%] top-[26%] h-px w-[28%] rotate-[24deg] bg-white/30" />
              <div className="absolute right-[20%] top-[30%] h-px w-[28%] -rotate-[24deg] bg-white/30" />
              <div className="absolute right-[24%] bottom-[28%] h-px w-[26%] rotate-[22deg] bg-white/30" />
              <div className="absolute left-[24%] bottom-[26%] h-px w-[26%] -rotate-[22deg] bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectRibbon({ variant }: { variant: "red" | "gold" }) {
  const isGold = variant === "gold"
  const diagonalBar = isGold
    ? "bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b]"
    : "bg-gradient-to-r from-[#be123c] to-[#4c0519]"
  const verticalBar = isGold
    ? "bg-gradient-to-b from-[#92400e] to-[#f59e0b]"
    : "bg-gradient-to-b from-[#4c0519] to-[#be123c]"
  const ribbonStripe = isGold
    ? "bg-gradient-to-r from-transparent via-[#f59e0b]/35 to-transparent"
    : "bg-gradient-to-r from-transparent via-[#881337]/35 to-transparent"
  const ribbonBody = isGold
    ? "bg-gradient-to-r from-[#ca8a04] via-[#f59e0b] to-[#f59e0b] shadow-[inset_0_0_0_2px_rgba(133,77,14,0.95),inset_0_0_0_3px_rgba(120,53,15,0.8),inset_0_0_0_4px_rgba(251,191,36,0.28),0_18px_5px_-16px_rgba(0,0,0,0.8)]"
    : "bg-gradient-to-r from-[#7f1d1d] via-[#dc2626] to-[#7f1d1d] shadow-[inset_0_0_0_2px_rgba(127,29,29,0.95),inset_0_0_0_3px_rgba(69,10,10,0.8),inset_0_0_0_4px_rgba(248,113,113,0.28),0_18px_5px_-16px_rgba(0,0,0,0.8)]"

  return (
    <div
      className="pointer-events-none absolute -top-[10px] -right-[10px] z-20 h-[130px] w-[130px] sm:h-[150px] sm:w-[150px]"
      aria-hidden="true"
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          className={`absolute right-[54px] top-[10px] h-[8px] w-[44px] rotate-45 rounded-[9px] ${diagonalBar} sm:right-[62px] sm:top-[12px] sm:w-[52px]`}
        />

        <div
          className={`absolute right-0 top-[52px] h-[42px] w-[8px] rounded-r-[9px] ${verticalBar} sm:top-[60px] sm:h-[50px]`}
        />

        <div
          className={`absolute top-[28px] -right-[68px] h-[38px] w-[220px] rotate-45 ${ribbonBody} sm:top-[30px] sm:-right-[76px] sm:h-[42px] sm:w-[248px]`}
        />

        <div
          className={`absolute right-[12px] top-[42px] h-[74px] w-[11px] -rotate-45 ${ribbonStripe} sm:right-[14px] sm:top-[48px] sm:h-[86px]`}
        />
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
  detailHref?: string
  detailLabel?: string
  href?: string
  github?: string
  video?: string
  ribbon?: "red" | "gold"
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
  detailHref,
  detailLabel = "see more",
  href,
  github,
  video,
  ribbon,
}: ProjectCardProps) {
  const accent = FALLBACK_ACCENTS[hashTitle(title) % FALLBACK_ACCENTS.length]
  const initials = getInitials(title)
  const isSystemDesignCard = !image && coverType === "system-design"
  const showSystemDesignImage =
    isSystemDesignCard && USE_TEMP_SYSTEM_DESIGN_IMAGE
  const showSystemDesignFallback =
    isSystemDesignCard && !USE_TEMP_SYSTEM_DESIGN_IMAGE
  const ribbonVariant = ribbon ?? (achievements.length > 0 ? "red" : undefined)
  const isInternalHref = Boolean(href?.startsWith("/"))
  const isInternalDetailHref = Boolean(detailHref?.startsWith("/"))

  return (
    <div className="group relative overflow-visible border border-gray-800 p-4 sm:p-6 transition-colors hover:border-accent/50">
      {ribbonVariant && <ProjectRibbon variant={ribbonVariant} />}

      <div className="relative -mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-4 sm:mb-6 overflow-hidden border-b border-gray-800 group-hover:border-accent/50 transition-colors">
        <div className="w-full" style={{ aspectRatio: "1200 / 630" }}>
          {image ? (
            <img
              src={image}
              alt={imageAlt ?? `${title} preview`}
              loading="lazy"
              className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
          ) : showSystemDesignImage ? (
            <img
              src={TEMP_SYSTEM_DESIGN_IMAGE_URL}
              alt={imageAlt ?? `${title} system design preview`}
              loading="lazy"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          ) : showSystemDesignFallback ? (
            <SystemDesignFallback accent={accent} />
          ) : (
            <div
              className="relative w-full h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500"
              style={{
                backgroundImage: `url(${TEMP_PROJECT_FALLBACK_IMAGE_URL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/36 to-black/46" />

              <div className="relative h-full flex flex-col justify-between p-5 sm:p-8">
                <div className="space-y-2">
                  <div className="text-5xl sm:text-7xl font-bold leading-none text-white/90">
                    {initials}
                  </div>
                  <p className="text-lg sm:text-3xl font-semibold leading-tight text-white">
                    {title}
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
            {detailHref ? (
              <Link
                href={detailHref}
                target={isInternalDetailHref ? undefined : "_blank"}
                rel={isInternalDetailHref ? undefined : "noopener noreferrer"}
                className="transition-colors"
              >
                {title}
              </Link>
            ) : (
              title
            )}
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
              target={isInternalHref ? undefined : "_blank"}
              rel={isInternalHref ? undefined : "noopener noreferrer"}
              className="text-gray-400 hover:text-accent transition-colors"
              title={
                coverType === "system-design" ? "Read it" : "Visit Website"
              }
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

      {detailHref && (
        <Link
          href={detailHref}
          target={isInternalDetailHref ? undefined : "_blank"}
          rel={isInternalDetailHref ? undefined : "noopener noreferrer"}
          className="mt-6 inline-flex items-center text-gray-400 group-hover:text-accent text-sm font-medium gap-2 transition-colors"
        >
          {detailLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )
}
