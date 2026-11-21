import { getSystemDesignBySlug, systemDesign } from "@/lib/system-design"
import { techName } from "@/lib/projects"
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
    title: `${entry.title} | Writing`,
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
    <main className="pb-16">
      <PageHead
        title={entry.title}
        line={entry.description}
        back={{ href: "/blog", label: "All writing" }}
        meta={<span>System design, {capitalise(entry.period)}</span>}
        actions={
          <KeyAnchor href={entry.github} target="_blank" rel="noopener noreferrer">
            Code
          </KeyAnchor>
        }
      />

      <section className="grid gap-8 border-t border-rule pt-10 sm:pt-14 lg:grid-cols-[minmax(13rem,22%)_minmax(0,1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-10 lg:self-start">
          <h2 className="text-[15px] text-ink-3">Built with</h2>
          <ul className="mt-3 divide-y divide-rule border-y border-rule">
            {entry.technologies.map((tech) => (
              <li key={tech} className="py-2.5 text-[15px] text-ink">
                {techName(tech)}
              </li>
            ))}
          </ul>
        </div>
        {readmeForRender ? (
          <article className="prose min-w-0 max-w-[75ch] [overflow-wrap:anywhere]">
            <ReactMarkdown
              remarkPlugins={README_REMARK_PLUGINS as any}
              rehypePlugins={README_REHYPE_PLUGINS as any}
              components={readmeData ? createMarkdownComponents(readmeData.context) : {}}
            >
              {readmeForRender}
            </ReactMarkdown>
          </article>
        ) : (
          <p className="text-[15px] text-ink-2">
            The write-up did not load just now.{" "}
            <a href={entry.github} target="_blank" rel="noopener noreferrer" className="text-link text-ink">
              Read it on GitHub
            </a>
            .
          </p>
        )}
      </section>
    </main>
  )
}
