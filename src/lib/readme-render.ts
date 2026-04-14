import path from "path"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import remarkGithubBlockquoteAlert from "remark-github-blockquote-alert"
import remarkMath from "remark-math"

export type RepoReadmeContext = {
  owner: string
  repo: string
  branch: string
  readmePath: string
}

export type RepoReadmeDocument = {
  content: string
  context: RepoReadmeContext
}

type RepoInfo = {
  owner: string
  repo: string
}

type ReadmeApiResponse = {
  content?: string
  encoding?: string
  path?: string
}

type RepoApiResponse = {
  default_branch?: string
}

const DEFAULT_BRANCH = "main"
const ABSOLUTE_URL_PATTERN = /^[a-zA-Z][a-zA-Z\d+\-.]*:/

const DEFAULT_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "nexxel.dev",
}

const allowedIframeHosts = new Set([
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
  "player.vimeo.com",
  "www.loom.com",
  "codesandbox.io",
  "stackblitz.com",
])

function parseRepoInfo(githubUrl: string): RepoInfo | null {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/?#]+)/i)

  if (!match) {
    return null
  }

  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, ""),
  }
}

function decodeReadmeContent(data: ReadmeApiResponse) {
  if (!data.content) {
    return null
  }

  if (data.encoding === "base64") {
    return Buffer.from(data.content.replace(/\n/g, ""), "base64").toString(
      "utf8",
    )
  }

  return data.content
}

export async function fetchReadmeFromGitHub(
  githubUrl?: string,
  revalidateSeconds = 3600,
): Promise<RepoReadmeDocument | null> {
  if (!githubUrl) {
    return null
  }

  const repo = parseRepoInfo(githubUrl)

  if (!repo) {
    return null
  }

  const [readmeResponse, repoResponse] = await Promise.all([
    fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}/readme`, {
      headers: DEFAULT_HEADERS,
      next: { revalidate: revalidateSeconds },
    }),
    fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}`, {
      headers: DEFAULT_HEADERS,
      next: { revalidate: revalidateSeconds },
    }),
  ])

  if (!readmeResponse.ok) {
    return null
  }

  const readmeData = (await readmeResponse.json()) as ReadmeApiResponse
  const content = decodeReadmeContent(readmeData)

  if (!content) {
    return null
  }

  let branch = DEFAULT_BRANCH

  if (repoResponse.ok) {
    const repoData = (await repoResponse.json()) as RepoApiResponse
    branch = repoData.default_branch || DEFAULT_BRANCH
  }

  return {
    content,
    context: {
      owner: repo.owner,
      repo: repo.repo,
      branch,
      readmePath: readmeData.path || "README.md",
    },
  }
}

function splitPathParts(url: string) {
  const [pathWithQuery, hash = ""] = url.split("#")
  const [pathname, query = ""] = pathWithQuery.split("?")

  return { pathname, query, hash }
}

function sanitizeRelativePath(pathname: string) {
  return pathname.replace(/^(\.\.\/?)+/, "")
}

export function resolveReadmeUrl(
  url: string,
  context: RepoReadmeContext,
  kind: "link" | "image",
) {
  const trimmed = url.trim()

  if (
    !trimmed ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("//") ||
    ABSOLUTE_URL_PATTERN.test(trimmed)
  ) {
    return trimmed
  }

  const { pathname, query, hash } = splitPathParts(trimmed)

  if (!pathname) {
    return trimmed
  }

  const relativePath = pathname.startsWith("/")
    ? pathname.slice(1)
    : path.posix.normalize(
        path.posix.join(path.posix.dirname(context.readmePath), pathname),
      )

  const safePath = sanitizeRelativePath(relativePath)

  const baseUrl =
    kind === "image"
      ? `https://raw.githubusercontent.com/${context.owner}/${context.repo}/${context.branch}/`
      : `https://github.com/${context.owner}/${context.repo}/blob/${context.branch}/`

  const resolved = `${baseUrl}${safePath}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`

  return encodeURI(resolved)
}

export function getSafeIframeSrc(src?: string) {
  if (!src) {
    return null
  }

  try {
    const parsed = new URL(src)

    if (parsed.protocol !== "https:") {
      return null
    }

    if (!allowedIframeHosts.has(parsed.hostname)) {
      return null
    }

    return src
  } catch {
    return null
  }
}

const defaultAttributes = defaultSchema.attributes || {}
const defaultProtocols = defaultSchema.protocols || {}

export const README_SANITIZE_SCHEMA: any = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "iframe",
    "details",
    "summary",
    "kbd",
    "samp",
    "mark",
    "sub",
    "sup",
    "section",
    "article",
    "figure",
    "figcaption",
    "div",
    "span",
  ],
  attributes: {
    ...defaultAttributes,
    "*": [
      ...((defaultAttributes["*"] as any[]) || []),
      "align",
      ["className", /^[a-zA-Z0-9_\-:\s]+$/],
    ],
    a: [
      ...((defaultAttributes.a as any[]) || []),
      "href",
      "title",
      "target",
      "rel",
    ],
    img: [
      ...((defaultAttributes.img as any[]) || []),
      "src",
      "alt",
      "title",
      "width",
      "height",
      "align",
    ],
    code: [
      ...((defaultAttributes.code as any[]) || []),
      ["className", /^(language|hljs|math)-[\w\-\s]*$/],
    ],
    span: [
      ...((defaultAttributes.span as any[]) || []),
      ["className", /^[a-zA-Z0-9_\-:\s]+$/],
    ],
    div: [
      ...((defaultAttributes.div as any[]) || []),
      ["className", /^[a-zA-Z0-9_\-:\s]+$/],
      "align",
    ],
    blockquote: [
      ...((defaultAttributes.blockquote as any[]) || []),
      ["className", /^[a-zA-Z0-9_\-:\s]+$/],
    ],
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "allow",
      "allowfullscreen",
      "frameborder",
      "loading",
      "referrerpolicy",
      "sandbox",
    ],
    p: [...((defaultAttributes.p as any[]) || []), "align"],
    th: [...((defaultAttributes.th as any[]) || []), "align"],
    td: [...((defaultAttributes.td as any[]) || []), "align"],
  },
  protocols: {
    ...defaultProtocols,
    href: [
      ...((defaultProtocols.href as string[]) || []),
      "http",
      "https",
      "mailto",
      "tel",
    ],
    src: [
      ...((defaultProtocols.src as string[]) || []),
      "http",
      "https",
      "data",
    ],
  },
}

export const README_REMARK_PLUGINS = [
  remarkGfm,
  remarkMath,
  remarkGithubBlockquoteAlert,
] as const

export const README_REHYPE_PLUGINS = [
  rehypeRaw,
  rehypeKatex,
  rehypeHighlight,
  [rehypeSanitize, README_SANITIZE_SCHEMA],
] as const
