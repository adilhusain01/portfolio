import Image from "next/image"
import { getProjectBySlug, getProjectSlug, projectCover, projectName, projects, sentence, techName } from "@/lib/projects"
import { KeyAnchor, PageHead, capitalise } from "@/components/site/ui"
import { preserveAsciiDiagrams } from "@/lib/readme-markdown"
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
import { Children, isValidElement, type ComponentPropsWithoutRef } from "react"
import { ImageModal } from "@/components/image-modal"

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
                    {...props}
        />
      )
    },
    img: ({ src, alt, ...props }: ComponentPropsWithoutRef<"img">) => {
      const resolvedSrc = resolveReadmeUrl(String(src ?? ""), context, "image")

      return (
        <ImageModal
          src={resolvedSrc}
          alt={alt ?? "README image"}
          className="rounded-[10px] ring-1 ring-rule"
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
          className="min-h-[360px] w-full rounded-[10px] bg-tray ring-1 ring-rule"
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
    title: `${projectName(project.title)} | Projects`,
    description: project.tagline,
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

  const name = projectName(project.title)
  const cover = projectCover(project)

  return (
    <main className="pb-16">
      <PageHead
        title={name}
        line={project.tagline}
        back={{ href: "/projects", label: "All projects" }}
        meta={
          <>
            <span>{capitalise(project.period)}</span>
            <span>{capitalise(project.role)}</span>
          </>
        }
        actions={
          <>
            {project.href ? (
              <KeyAnchor href={project.href} target="_blank" rel="noopener noreferrer" variant="ink">
                Open it
              </KeyAnchor>
            ) : null}
            {project.github ? (
              <KeyAnchor href={project.github} target="_blank" rel="noopener noreferrer">
                Code
              </KeyAnchor>
            ) : null}
            {project.video && !videoEmbedUrl ? (
              <KeyAnchor href={project.video} target="_blank" rel="noopener noreferrer">
                Watch the demo
              </KeyAnchor>
            ) : null}
          </>
        }
      />

      <div className="overflow-hidden rounded-2xl bg-tray ring-1 ring-inset ring-rule">
        {videoEmbedUrl ? (
          <iframe
            src={videoEmbedUrl}
            title={`${name} demo video`}
            className="aspect-video h-auto w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : cover ? (
          <div className="relative aspect-[1200/630]">
            <Image src={cover} alt={`${name} preview`} fill priority sizes="(min-width: 1280px) 85vw, 100vw" className="object-cover" />
          </div>
        ) : null}
      </div>

      <section className="grid gap-8 border-b border-rule py-12 sm:py-16 lg:grid-cols-[minmax(13rem,22%)_minmax(0,1fr)] lg:gap-14">
        <div className="lg:order-2">
          <h2 className="sr-only">About {name}</h2>
          <p className="max-w-measure text-lg leading-relaxed text-ink-2 sm:text-xl sm:leading-relaxed">{project.description}</p>
          {project.achievements.length > 0 ? (
            <ul className="mt-8 space-y-2">
              {project.achievements.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-ink">
                  <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-pen" />
                  {sentence(item)}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="lg:order-1">
          <h2 className="text-[15px] text-ink-3">Built with</h2>
          <ul className="mt-3 divide-y divide-rule border-y border-rule">
            {project.technologies.map((tech) => (
              <li key={tech} className="py-2.5 text-[15px] text-ink">
                {techName(tech)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {project.embedding && project.embedding.length > 0 ? (
        <section className="space-y-4 pt-12">
          {project.embedding.map((embed, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: embed }} />
          ))}
        </section>
      ) : null}

      {readmeForRender ? (
        <section aria-labelledby="readme-title" className="grid gap-8 pt-12 sm:pt-16 lg:grid-cols-[minmax(13rem,22%)_minmax(0,1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <h2 id="readme-title" className="font-display text-[1.75rem] leading-tight text-ink">
              README
            </h2>
            <p className="mt-2 text-[15px] text-ink-3">Straight from the repository.</p>
          </div>
          <article className="prose min-w-0 max-w-[75ch] [overflow-wrap:anywhere]">
            <ReactMarkdown
              remarkPlugins={README_REMARK_PLUGINS as any}
              rehypePlugins={README_REHYPE_PLUGINS as any}
              components={readmeData ? createMarkdownComponents(readmeData.context) : {}}
            >
              {readmeForRender}
            </ReactMarkdown>
          </article>
        </section>
      ) : project.github ? (
        <p className="pt-12 text-[15px] text-ink-2">
          The README did not load just now.{" "}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link text-ink">
            Read it on GitHub
          </a>
          .
        </p>
      ) : null}
    </main>
  )
}
