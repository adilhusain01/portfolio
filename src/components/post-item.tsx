import { type MDXFileData } from "@/lib/blog"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const BLOG_TEMP_COVER_IMAGE_URL =
  "https://images.unsplash.com/photo-1518674660708-0e2c0473e68e?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

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
          <img
            src={
              hasCustomCover ? post.metadata.image : BLOG_TEMP_COVER_IMAGE_URL
            }
            alt={`${post.metadata.title} cover`}
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white group-hover:text-accent transition-colors duration-200">
          {post.metadata.title}
        </h2>
        <span className="text-sm font-mono text-gray-400 shrink-0 sm:pt-1">
          {publishedDate}
        </span>
      </div>

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
