import { notFound } from "next/navigation"
import { MDX } from "./mdx"
import { getPostBySlug, getPosts } from "@/lib/blog"
import { ProgressBar } from "./progress-bar"
import Link from "next/link"

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
      url: `https://adilhusain.dev/blog/${post.slug}`,
      images: [
        {
          url: `https://adilhusain.dev/og/blog?title=${encodeURIComponent(post.metadata.title)}`,
        },
      ],
    },
    twitter: {
      title: post.metadata.title,
      description: post.metadata.description,
      card: "summary_large_image",
      creator: "@0xAdilHusain",
      images: [
        `https://adilhusain.dev/og/blog?title=${encodeURIComponent(post.metadata.title)}`,
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
      <section>
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
              url: `https://adilhusain.dev/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "Adil Husain",
              },
            }),
          }}
        />

        <header className="pb-10 pt-10 sm:pb-14 sm:pt-16">
          <Link href="/blog" className="text-link mb-8 inline-block text-[15px] text-ink-2">
            All writing
          </Link>
          <h1 className="max-w-[24ch] font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.08] tracking-[-0.02em] text-ink [overflow-wrap:anywhere]">
            {post.metadata.title}
          </h1>
          {post.metadata.description ? <p className="mt-5 max-w-measure text-lg leading-relaxed text-ink-2">{post.metadata.description}</p> : null}
        </header>

        <div className="grid gap-8 border-t border-rule pt-10 lg:grid-cols-[minmax(13rem,22%)_minmax(0,1fr)] lg:gap-14 lg:pt-14">
          <dl className="flex gap-8 text-[15px] lg:sticky lg:top-10 lg:flex-col lg:gap-4 lg:self-start">
            <div>
              <dt className="text-ink-3">Published</dt>
              <dd className="text-ink">{formatDate(post.metadata.date)}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Reading time</dt>
              <dd className="text-ink">{readingTimeMins} minutes</dd>
            </div>
          </dl>
          <article className="prose prose-lg min-w-0 max-w-[72ch] pb-16 [overflow-wrap:anywhere] lg:prose-h2:scroll-mt-[5rem] lg:prose-h3:scroll-mt-[5rem]">
            <MDX source={post.content} />
          </article>
        </div>
      </section>
    </>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
