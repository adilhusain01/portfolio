import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { Children, createElement, isValidElement } from "react"
import { codeToHtml } from "shiki"
import { Mermaid } from "./mermaid"
import { CopyButton } from "./copy-button"

// NEW COMPONENTS
function TerminalWindow({
  children,
  title = "zsh",
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#0d1117] my-8 shadow-2xl">
      {/* Mac window header */}
      <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-gray-800">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-xs font-mono text-gray-400 select-none flex-1 text-center font-semibold">
          {title}
        </div>
      </div>
      {/* Terminal Body */}
      <div className="p-4 overflow-x-auto text-sm font-mono text-green-400 [&_pre]:!bg-transparent [&_pre]:!m-0 [&_code]:!p-0">
        {children}
      </div>
    </div>
  )
}

function CodeGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
      {children}
    </div>
  )
}

function CodeGroupItem({
  title,
  children,
  isOptimized = false,
}: {
  title: string
  children: React.ReactNode
  isOptimized?: boolean
}) {
  return (
    <div
      className={`bg-[#0d1117] border rounded-lg overflow-hidden flex flex-col ${isOptimized ? "border-green-900/50" : "border-gray-800"}`}
    >
      <div
        className={`text-xs px-4 py-2 border-b font-bold tracking-wider uppercase ${isOptimized ? "bg-green-900/20 text-green-400 border-green-900/50" : "bg-gray-900/50 text-gray-400 border-gray-800"}`}
      >
        {title}
      </div>
      <div className="p-4 overflow-auto flex-1 [&_pre]:!m-0 [&_pre]:!bg-transparent text-sm">
        {children}
      </div>
    </div>
  )
}

function TechBadge({
  text,
  bg = "bg-gray-800",
}: {
  text: string
  bg?: string
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${bg} border border-gray-700 shadow-sm text-gray-200 uppercase tracking-widest mx-1 align-middle`}
    >
      {text}
    </span>
  )
}

function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-gray-600 bg-gray-900/30 p-6 my-8 rounded-r-lg">
      <h3 className="text-lg font-bold text-gray-200 mb-3 m-0 flex items-center">
        <span className="text-gray-400 mr-2 text-xl">💡</span>
        Key Takeaway
      </h3>
      <div className="text-base text-gray-300 leading-relaxed z-10 relative">
        {children}
      </div>
    </div>
  )
}

function Table({ data }: { data?: { headers: string[]; rows: string[][] } }) {
  if (!data) return null
  let headers = data.headers.map((header, index) => (
    <th key={index} className="p-2 text-left">
      {header}
    </th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} className="p-2 text-left">
          {cell}
        </td>
      ))}
    </tr>
  ))

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink({
  href,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  const commonClasses =
    "underline underline-offset-4 decoration-gray-700 hover:decoration-accent transition-colors"

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
  return <img alt={props.alt} className="rounded-lg" {...props} />
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
      <div className="relative group relative-code-block mb-4 mt-6 rounded-lg overflow-hidden border border-gray-800">
        <CopyButton text={rawCode} />
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="[&>pre]:!m-0 [&>pre]:!rounded-none"
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

function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "danger" | "success"
  title?: string
  children: React.ReactNode
}) {
  const styles = {
    info: "bg-blue-900/20 border-blue-500 text-blue-200",
    warning: "bg-yellow-900/20 border-yellow-500 text-yellow-200",
    danger: "bg-red-900/20 border-red-500 text-red-200",
    success: "bg-green-900/20 border-green-500 text-green-200",
  }

  const icons = {
    info: "💡",
    warning: "⚠️",
    danger: "🚨",
    success: "✅",
  }

  return (
    <div className={`border-l-4 p-4 my-6 rounded-r-lg ${styles[type]}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icons[type]}</span>
        {title && <strong className="block font-bold text-lg">{title}</strong>}
      </div>
      <div className="m-0 [&>p]:m-0">{children}</div>
    </div>
  )
}

function Metrics({ data }: { data?: { label: string; value: string }[] }) {
  if (!data) return null
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
      {data.map((item, i) => (
        <div
          key={i}
          className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg text-center flex flex-col justify-center shadow-sm"
        >
          <div className="text-sm font-medium text-gray-400 mb-1">
            {item.label}
          </div>
          <div className="text-2xl font-bold tracking-tight text-white mb-1">
            <span className="text-accent mr-1">*</span>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProsCons({ pros, cons }: { pros?: string[]; cons?: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
      {pros && pros.length > 0 && (
        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-5">
          <h4 className="text-green-400 font-semibold mb-4 flex items-center text-lg">
            <span className="mr-2">✓</span> Pros
          </h4>
          <ul className="space-y-3 m-0">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start text-base text-gray-300">
                <span className="text-green-500 mr-2 mt-0.5">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cons && cons.length > 0 && (
        <div className="bg-gray-900/40 border border-gray-800 rounded-lg p-5">
          <h4 className="text-red-400 font-semibold mb-4 flex items-center text-lg">
            <span className="mr-2">✕</span> Cons
          </h4>
          <ul className="space-y-3 m-0">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start text-base text-gray-300">
                <span className="text-red-500 mr-2 mt-0.5">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Step({
  number,
  title,
  children,
}: {
  number: string | number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex border-l-2 border-gray-800 ml-3 md:ml-4 pb-8 last:border-none last:pb-0 relative mt-8">
      <div className="absolute -left-[17px] bg-gray-950 border-2 border-gray-800 h-8 w-8 rounded-full flex items-center justify-center text-accent font-bold text-sm">
        {number}
      </div>
      <div className="ml-8 w-full">
        <h3 className="text-2xl font-bold text-white mt-0.5 mb-4">{title}</h3>
        <div className="text-gray-300 m-0 [&>*:first-child]:mt-0">
          {children}
        </div>
      </div>
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
