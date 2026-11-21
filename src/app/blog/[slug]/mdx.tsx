import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { Children, createElement, isValidElement } from "react"
import { codeToHtml } from "shiki"
import { Mermaid } from "./mermaid"
import { CopyButton } from "./copy-button"
import { ImageModal } from "@/components/image-modal"

// Code stays on dark ink slabs; everything else sits on the paper like the rest of the site.
function TerminalWindow({ children, title = "zsh" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl bg-ink shadow-print">
      <div className="flex items-center gap-3 border-b border-paper/10 px-4 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        </span>
        <span className="flex-1 text-center font-mono text-[12px] text-paper/60">{title}</span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="overflow-x-auto whitespace-pre-line p-4 font-mono text-[13.5px] leading-relaxed text-paper/90 [&_code]:!p-0 [&_p+p]:mt-3 [&_p]:m-0 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0">
        {children}
      </div>
    </div>
  )
}

function CodeGroup({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
}

function CodeGroupItem({ title, children, isOptimized = false }: { title: string; children: React.ReactNode; isOptimized?: boolean }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-ink">
      <div className="flex items-center justify-between gap-3 border-b border-paper/10 px-4 py-2 text-[12px] text-paper/70">
        <span>{title}</span>
        {isOptimized ? <span className="rounded-[4px] bg-pen px-1.5 py-0.5 text-[11px] text-sheet">Faster</span> : null}
      </div>
      <div className="flex-1 overflow-auto text-[13.5px] [&_.code-block]:!m-0 [&_.code-block]:!rounded-none [&_.code-head]:hidden [&_pre]:!m-0 [&_pre]:!bg-transparent">{children}</div>
    </div>
  )
}

function TechBadge({ text }: { text: string; bg?: string }) {
  return <span className="mx-0.5 inline-block rounded-[5px] bg-tray px-1.5 py-0.5 align-middle font-mono text-[0.8em] text-ink ring-1 ring-inset ring-rule">{text}</span>
}

function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-r-xl border-l-[3px] border-pen bg-tray px-6 py-5">
      <p className="font-display text-lg text-ink">Key takeaway</p>
      <div className="mt-2 text-[1.05rem] leading-relaxed text-ink-2 [&>p]:m-0">{children}</div>
    </aside>
  )
}

function Table({ data }: { data?: { headers: string[]; rows: string[][] } }) {
  if (!data) return null
  return (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function CustomLink({
  href,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  const commonClasses = ""

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={commonClasses} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return <a className={commonClasses} {...props} />
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
      {...props}
    />
  )
}

function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <ImageModal alt={props.alt} className="rounded-[10px]" {...props} />
}

async function Pre({
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) {
  // Extract className from the children code tag
  const codeElement = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === "code",
  ) as React.ReactElement<HTMLPreElement> | undefined

  const className = codeElement?.props?.className ?? ""
  const isCodeBlock =
    typeof className === "string" && className.startsWith("language-")

  if (isCodeBlock) {
    const lang = className.split(" ")[0]?.split("-")[1] ?? ""

    if (lang === "mermaid") {
      return <Mermaid code={String(codeElement?.props.children)} />
    }

    if (!lang) {
      return <code {...props}>{children}</code>
    }

    const rawCode = String(codeElement?.props.children)
    const html = await codeToHtml(rawCode, {
      lang,
      themes: {
        dark: "vesper",
        light: "vitesse-light",
      },
    })

    return (
      <div className="code-block not-prose mb-5 mt-6 overflow-hidden rounded-xl bg-ink">
        <div className="code-head flex items-center justify-between gap-3 border-b border-paper/10 py-1.5 pl-4 pr-1.5">
          <span className="font-mono text-[12px] text-paper/55">{lang}</span>
          <CopyButton text={rawCode} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="overflow-x-auto text-[13.5px] leading-relaxed [&>pre]:!m-0 [&>pre]:!rounded-none [&>pre]:!bg-transparent [&>pre]:p-5"
        />
      </div>
    )
  }

  // If not, return the component as is
  return <pre {...props}>{children}</pre>
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
}

function createHeading(level: number) {
  const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
    const childrenString = Children.toArray(children).join("")
    const slug = slugify(childrenString)
    const Tag = `h${level}` as any
    return (
      <Tag id={slug}>
        <a href={`#${slug}`} key={`link-${slug}`} className="anchor">
          {children}
        </a>
      </Tag>
    )
  }
  HeadingComponent.displayName = `Heading${level}`
  return HeadingComponent
}

function Callout({ type = "info", title, children }: { type?: "info" | "warning" | "danger" | "success"; title?: string; children: React.ReactNode }) {
  // Each kind gets its own edge colour; the text stays ink so it reads the same on every kind.
  const edge = { info: "border-pen", warning: "border-[#A0670F]", danger: "border-[#A63D2C]", success: "border-[#3E7A4B]" }[type]
  return (
    <aside className={`not-prose my-7 rounded-r-xl border-l-[3px] bg-tray px-5 py-4 ${edge}`}>
      {title ? <p className="mb-1.5 font-semibold text-ink">{title}</p> : null}
      <div className="text-[1.02rem] leading-relaxed text-ink-2 [&>p]:m-0 [&>p+p]:mt-3">{children}</div>
    </aside>
  )
}

function Metrics({ data }: { data?: { label: string; value: string }[] }) {
  if (!data) return null
  return (
    <dl className="not-prose my-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-rule ring-1 ring-rule md:grid-cols-4">
      {data.map((item, i) => (
        <div key={i} className="bg-sheet px-4 py-5">
          <dt className="text-[13px] text-ink-3">{item.label}</dt>
          <dd className="mt-1 font-display text-2xl tabular-nums text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ProsCons({ pros, cons }: { pros?: string[]; cons?: string[] }) {
  const column = (title: string, items: string[], dot: string) => (
    <div className="rounded-xl bg-sheet p-5 ring-1 ring-inset ring-rule">
      <p className="mb-3 font-semibold text-ink">{title}</p>
      <ul className="m-0 space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
            <span aria-hidden="true" className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
      {pros && pros.length > 0 ? column("Pros", pros, "bg-[#3E7A4B]") : null}
      {cons && cons.length > 0 ? column("Cons", cons, "bg-[#A63D2C]") : null}
    </div>
  )
}

function Step({ number, title, children }: { number: string | number; title: string; children: React.ReactNode }) {
  return (
    <div className="relative ml-4 mt-8 border-l border-rule pb-8 pl-9 last:border-transparent last:pb-0">
      <span className="absolute -left-4 top-0 grid h-8 w-8 place-items-center rounded-full bg-sheet font-semibold text-pen shadow-key ring-1 ring-inset ring-rule">
        {number}
      </span>
      <h3 className="!mb-3 !mt-0.5">{title}</h3>
      <div className="[&>*:first-child]:mt-0">{children}</div>
    </div>
  )
}

const components = {
  a: CustomLink,
  img: CustomImage,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  pre: Pre,
  Table,
  Callout,
  Metrics,
  ProsCons,
  Step,
  TerminalWindow,
  CodeGroup,
  CodeGroupItem,
  TechBadge,
  KeyTakeaway,
}

export function MDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  )
}
