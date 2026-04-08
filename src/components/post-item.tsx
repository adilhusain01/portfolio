import { type MDXFileData } from "@/lib/blog"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type PostItemProps = {
  post: MDXFileData
  isSelected?: boolean
}

export function PostItem({ post, isSelected }: PostItemProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      prefetch={true}
      className={`group block border border-gray-800 p-6 transition-all hover:border-accent/50 relative ${
        isSelected ? "bg-accent/5 border-l-2 border-l-accent" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-200 group-hover:text-accent transition-colors duration-200">
          {post.metadata.title.toLowerCase()}
        </h2>
        <span className="text-sm font-mono text-gray-500 shrink-0 sm:pt-1">
          {new Date(post.metadata.date)
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            .toLowerCase()}
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
