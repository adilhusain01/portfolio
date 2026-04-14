import { getSystemDesignBySlug, systemDesign } from "@/lib/system-design"
import { preserveAsciiDiagrams } from "@/lib/readme-markdown"
import { BackButton } from "@/components/back-button"
import {
  fetchReadmeFromGitHub,
  getSafeIframeSrc,
  README_REHYPE_PLUGINS,
  README_REMARK_PLUGINS,
  resolveReadmeUrl,
  type RepoReadmeContext,
} from "@/lib/readme-render"
import { Mermaid } from "@/app/blog/[slug]/mermaid"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import type { Components } from "react-markdown"
import { ExternalLink, Github } from "lucide-react"
import { Children, isValidElement, type ComponentPropsWithoutRef } from "react"

type PageProps = {
  params: Promise<{ slug: string }>
}

function createMarkdownComponents(context: RepoReadmeContext): Components {
  return {
    pre: ({ node: _node, children, ...props }) => {
      const codeElement = Children.toArray(children).find(
        (child) => isValidElement(child) && child.type === "code",
      ) as
        | React.ReactElement<{ className?: string; children?: React.ReactNode }>
        | undefined

      const className = codeElement?.props?.className ?? ""
      const isMermaid =
        typeof className === "string" && className.includes("language-mermaid")

      if (isMermaid) {
        return (
          <Mermaid
            code={String(codeElement?.props.children ?? "").replace(/\n$/, "")}
          />
        )
      }

      return <pre {...props}>{children}</pre>
    },
    a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => {
      const resolvedHref = resolveReadmeUrl(String(href ?? ""), context, "link")
      const isHashLink = resolvedHref.startsWith("#")
      const isExternal = /^https?:\/\//i.test(resolvedHref)

      return (
        <a
          href={resolvedHref}
          target={!isHashLink && isExternal ? "_blank" : undefined}
          rel={!isHashLink && isExternal ? "noopener noreferrer" : undefined}
          className="underline underline-offset-4 decoration-gray-700 hover:decoration-accent transition-colors"
          {...props}
        />
      )
    },
    img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => {
      const resolvedSrc = resolveReadmeUrl(String(src ?? ""), context, "image")

      return (
        <img
          src={resolvedSrc}
          alt={alt ?? "README image"}
          className="rounded-lg border border-gray-800"
          {...props}
        />
      )
    },
    iframe: ({ src, title, ...props }: ComponentPropsWithoutRef<"iframe">) => {
      const safeSrc = getSafeIframeSrc(
        typeof src === "string" ? src : undefined,
      )

      if (!safeSrc) {
        return null
      }

      return (
        <iframe
          src={safeSrc}
          title={title ?? "Embedded content"}
          className="w-full min-h-[360px] rounded-lg border border-gray-800 bg-black"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
          allowFullScreen
          {...props}
        />
      )
    },
  }
}

export function generateStaticParams() {
  return systemDesign.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug
  const entry = getSystemDesignBySlug(slug)

  if (!entry) {
    return {}
  }

  return {
    title: `${entry.title} | System Design`,
    description: entry.description,
  }
}

export default async function SystemDesignDetailPage({ params }: PageProps) {
  const slug = (await params).slug
  const entry = getSystemDesignBySlug(slug)

  if (!entry) {
    notFound()
  }

  const readmeData = await fetchReadmeFromGitHub(entry.github)
  const readmeForRender = readmeData
    ? preserveAsciiDiagrams(readmeData.content)
    : null

  return (
    <main className="animate-fade-in-up">
      <div className="mb-6 flex items-center justify-between gap-3">
        <BackButton className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-accent transition-colors" />

        <header className="flex items-center gap-2 text-[11px] sm:text-sm font-mono text-gray-500 shrink-0">
          <span>{entry.period}</span>
          <a
            href={entry.github}
            target="_blank"
            rel="noopener noreferrer"
            title="Open repository"
            aria-label="Open repository on GitHub"
            className="inline-flex items-center justify-center rounded-md border border-gray-800 p-1.5 text-gray-400 hover:text-accent hover:border-gray-700 transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
        </header>
      </div>

      {readmeForRender ? (
        <article className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-white hover:prose-a:text-accent hover:prose-a:underline prose-pre:border prose-pre:border-gray-800">
          <ReactMarkdown
            remarkPlugins={README_REMARK_PLUGINS as any}
            rehypePlugins={README_REHYPE_PLUGINS as any}
            components={
              readmeData ? createMarkdownComponents(readmeData.context) : {}
            }
          >
            {readmeForRender}
          </ReactMarkdown>
        </article>
      ) : (
        <section className="rounded-lg border border-gray-800 bg-gray-900/30 p-5 sm:p-6">
          <p className="text-gray-300 mb-4">
            Could not fetch the README right now. You can open it directly on
            GitHub.
          </p>
          <a
            href={entry.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-gray-300 hover:text-accent transition-colors"
          >
            open on github
            <ExternalLink className="h-4 w-4" />
          </a>
        </section>
      )}
    </main>
  )
}
