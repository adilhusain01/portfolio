import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { Children, createElement, isValidElement } from "react"
import { codeToHtml } from "shiki"

function Table({ data }: { data?: { headers: string[]; rows: string[][] } }) {
  if (!data) return null;
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
  const commonClasses = "underline underline-offset-4 decoration-gray-700 hover:decoration-accent transition-colors"
  
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

  return <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses} {...props} />
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

    if (!lang) {
      return <code {...props}>{children}</code>
    }

    const html = await codeToHtml(String(codeElement?.props.children), {
      lang,
      themes: {
        dark: "vesper",
        light: "vitesse-light",
      },
    })

    return <div dangerouslySetInnerHTML={{ __html: html }} />
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

function Callout({ type = "info", title, children }: { type?: "info" | "warning" | "danger" | "success", title?: string, children: React.ReactNode }) {
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
  if (!data) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
      {data.map((item, i) => (
        <div key={i} className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg text-center flex flex-col justify-center shadow-sm">
          <div className="text-sm font-medium text-gray-400 mb-1">{item.label}</div>
          <div className="text-2xl font-bold tracking-tight text-white mb-1"><span className="text-accent mr-1">*</span>{item.value}</div>
        </div>
      ))}
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
}

export function MDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components ?? {}) }}
    />
  )
}
