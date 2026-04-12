import { type MDXFileData } from "@/lib/blog"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const BLOG_ACCENTS = [
  { glow: "#22d3ee", base: "#0b1520" },
  { glow: "#34d399", base: "#0b1a17" },
  { glow: "#a78bfa", base: "#121023" },
  { glow: "#f59e0b", base: "#1f160b" },
  { glow: "#60a5fa", base: "#0d1626" },
]

function hashValue(value: string) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash)
}

type PostItemProps = {
  post: MDXFileData
  isSelected?: boolean
}

export function PostItem({ post, isSelected }: PostItemProps) {
  const hasCustomCover = Boolean(post.metadata.image)

  const publishedDate = new Date(post.metadata.date)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase()

  const accent = BLOG_ACCENTS[hashValue(post.slug) % BLOG_ACCENTS.length]

  return (
    <Link
      href={`/blog/${post.slug}`}
      prefetch={true}
      className={`group block border border-gray-800 p-4 sm:p-6 transition-all hover:border-accent/50 relative ${
        isSelected ? "bg-accent/5 border-l-2 border-l-accent" : ""
      }`}
    >
      <div className="-mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-4 sm:mb-6 overflow-hidden border-b border-gray-800 group-hover:border-accent/50 transition-colors">
        <div className="w-full" style={{ aspectRatio: "1200 / 630" }}>
          {hasCustomCover ? (
            <img
              src={post.metadata.image}
              alt={`${post.metadata.title} cover`}
              loading="lazy"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
          ) : (
            <div
              className="relative w-full h-full overflow-hidden"
              style={{
                background: `linear-gradient(145deg, ${accent.base} 0%, #0a0c10 72%)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 16px)",
                }}
              />

              <div
                className="absolute -top-14 -right-10 w-64 h-64 rounded-full blur-3xl"
                style={{ backgroundColor: accent.glow, opacity: 0.24 }}
              />

              <div className="relative h-full p-5 sm:p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-[0.16em] border"
                    style={{
                      color: accent.glow,
                      borderColor: `${accent.glow}66`,
                      backgroundColor: `${accent.glow}1A`,
                    }}
                  >
                    blog signature cover
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-gray-300/80">
                    {post.slug}
                  </span>
                </div>

                <div>
                  <p className="text-xl sm:text-3xl font-semibold leading-tight text-white max-w-3xl">
                    {post.metadata.title}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-gray-300/85">
                    {(post.metadata.tag ?? "systems journal").toLowerCase()}
                  </p>
                </div>

                <div className="text-[10px] sm:text-xs font-mono text-gray-300/80 uppercase tracking-[0.14em]">
                  updated on {publishedDate}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {hasCustomCover && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-200 group-hover:text-accent transition-colors duration-200">
            {post.metadata.title.toLowerCase()}
          </h2>
          <span className="text-sm font-mono text-gray-500 shrink-0 sm:pt-1">
            {publishedDate}
          </span>
        </div>
      )}

      {post.metadata.description && (
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {post.metadata.description.toLowerCase()}
        </p>
      )}

      <div className="flex items-center text-gray-400 group-hover:text-accent text-sm font-medium gap-2 transition-colors">
        read article{" "}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
