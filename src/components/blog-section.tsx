import Link from "next/link"
import { getPosts } from "@/lib/blog"
import { PostItem } from "./post-item"

const posts = getPosts()
  .sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  )
  .slice(0, 4)

export function BlogSection() {
  return (
    <section className="mb-12 sm:mb-16 animate-fade-in-up">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
        <span className="text-accent mr-2">*</span>
        blog
      </h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-6 sm:mt-8 flex justify-end">
        <Link
          href="/blog"
          className="group flex items-center text-sm font-mono text-gray-400 hover:text-accent transition-colors"
        >
          <span className="transition-colors">all posts</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}

function formatDate(dateString: string) {
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase()
}
