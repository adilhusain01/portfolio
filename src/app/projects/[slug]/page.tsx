import { getProjectBySlug, getProjectSlug, projects } from "@/lib/projects"
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
import { ExternalLink, Github, Globe, MonitorPlay } from "lucide-react"
import { Children, isValidElement, type ComponentPropsWithoutRef } from "react"

type PageProps = {
  params: Promise<{ slug: string }>
}

function getYouTubeEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl)

    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "")
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }

    if (url.hostname.includes("youtube.com")) {
      const fromQuery = url.searchParams.get("v")
      if (fromQuery) {
        return `https://www.youtube-nocookie.com/embed/${fromQuery}`
      }

      const segments = url.pathname.split("/").filter(Boolean)
      const markerIndex = segments.findIndex(
        (segment) => segment === "embed" || segment === "shorts",
      )
      const fromPath = markerIndex >= 0 ? segments[markerIndex + 1] : null

      if (fromPath) {
        return `https://www.youtube-nocookie.com/embed/${fromPath}`
      }
    }
  } catch {
    return null
  }

  return null
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
  return projects.map((project) => ({ slug: getProjectSlug(project) }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug
  const project = getProjectBySlug(slug)

  if (!project) {
    return {}
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const slug = (await params).slug
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const [readmeData, videoEmbedUrl] = await Promise.all([
    fetchReadmeFromGitHub(project.github),
    Promise.resolve(project.video ? getYouTubeEmbedUrl(project.video) : null),
  ])
  const readmeForRender = readmeData
    ? preserveAsciiDiagrams(readmeData.content)
    : null

  return (
    <main className="animate-fade-in-up">
      <div className="mb-6 flex items-center justify-between gap-3">
        <BackButton className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-accent transition-colors" />

        <header className="flex items-center gap-2 text-[11px] sm:text-sm font-mono text-gray-500 shrink-0">
          <span>{project.period}</span>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              title="Open repository"
              aria-label="Open repository on GitHub"
              className="inline-flex items-center justify-center rounded-md border border-gray-800 p-1.5 text-gray-400 hover:text-accent hover:border-gray-700 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              title="Open live project"
              aria-label="Open live project"
              className="inline-flex items-center justify-center rounded-md border border-gray-800 p-1.5 text-gray-400 hover:text-accent hover:border-gray-700 transition-colors"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}

          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              title="Watch video demo"
              aria-label="Watch video demo"
              className="inline-flex items-center justify-center rounded-md border border-gray-800 p-1.5 text-gray-400 hover:text-accent hover:border-gray-700 transition-colors"
            >
              <MonitorPlay className="h-4 w-4" />
            </a>
          )}
        </header>
      </div>

      {project.video && (
        <section className="mb-8">
          {videoEmbedUrl ? (
            <div
              className="w-full overflow-hidden rounded-lg border border-gray-800 bg-black"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                src={videoEmbedUrl}
                title={`${project.title} video demo`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-gray-300 hover:text-accent transition-colors"
            >
              watch video demo
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </section>
      )}

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
          {project.github ? (
            <>
              <p className="text-gray-300 mb-4">
                Could not fetch the README right now. You can open it directly
                on GitHub.
              </p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-mono text-gray-300 hover:text-accent transition-colors"
              >
                open on github
                <ExternalLink className="h-4 w-4" />
              </a>
            </>
          ) : (
            <p className="text-gray-300">
              No repository is linked for this project.
            </p>
          )}
        </section>
      )}
    </main>
  )
}
