import { notFound } from "next/navigation"
import { MDX } from "./mdx"
import { getPostBySlug, getPosts } from "@/lib/blog"
import { ProgressBar } from "./progress-bar"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    return
  }

  const publishedTime = formatDate(post.metadata.date)

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      publishedTime,
      type: "article",
      url: `https://adilhusain.me/blog/${post.slug}`,
      images: [
        {
          url: `https://adilhusain.me/og/blog?title=${post.metadata.title}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@0xAdilHusain",
      images: [
        `https://adilhusain.me/og/blog?title=${post.metadata.title}&top=${publishedTime}`,
      ],
    },
  }
}

export default async function Post({ params }: PageProps) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  const wordCount = post.content.split(/\s+/g).length
  const readingTimeMins = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <>
      <ProgressBar />
      <section className="animate-fade-in-up">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.date,
              dateModified: post.metadata.date,
              description: post.metadata.description,
              url: `https://adilhusain.me/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "Adil husain",
              },
            }),
          }}
        />

        <div className="flex flex-col lg:flex-row gap-2 md:gap-12 relative items-start">
          <div className="flex-1 w-full min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
              {post.metadata.title}
            </h1>

            <div className="my-6 flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-400 font-mono">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {formatDate(post.metadata.date)}
              </span>
              <span className="text-gray-700">|</span>
              <span className="flex items-center text-accent font-semibold tracking-wide">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {readingTimeMins} MIN READ
              </span>
            </div>

            <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-white hover:prose-a:text-accent hover:prose-a:underline prose-pre:border prose-pre:border-gray-800 lg:prose-h2:scroll-mt-[5rem] lg:prose-h3:scroll-mt-[5rem]">
              <MDX source={post.content} />
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
