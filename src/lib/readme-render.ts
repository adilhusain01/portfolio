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

// Without a token GitHub allows 60 calls an hour per address, and every project page makes two.
// Set GITHUB_TOKEN (a fine-grained token with no extra permissions is enough) to lift that to 5,000.
const DEFAULT_HEADERS: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "adilhusain.dev",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
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

// The site uses no emoji, so decorative ones go: at the start of a heading, list item or table cell,
// and at the end of a line. Emoji in the middle of a sentence carry meaning ("3 ➡️ 6", "Click ✂️") and stay,
// and nothing inside a code fence is touched.
const EMOJI = String.raw`(?:(?![\u00A9\u00AE\u2122])(?:\p{Extended_Pictographic}|\p{Regional_Indicator})(?:\uFE0F|\u200D|\p{Extended_Pictographic}|\p{Emoji_Modifier}|\p{Regional_Indicator})*)`
const leading = new RegExp(String.raw`^(\s*(?:#{1,6}\s+|[-*+]\s+|\d+\.\s+|>\s*|<h[1-6][^>]*>\s*)?(?:\*\*|__)?)(?:${EMOJI}\s*)+`, "u")
const trailing = new RegExp(String.raw`[ \t]+${EMOJI}[ \t]*((?:\*\*|__)?)[ \t]*$`, "u")
const cellStart = new RegExp(String.raw`(\|[ \t]*)(?:${EMOJI}[ \t]*)+`, "gu")
const cellEnd = new RegExp(String.raw`[ \t]+${EMOJI}([ \t]*\|)`, "gu")

export function stripEmoji(text: string) {
  let fence = false
  return text
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) fence = !fence
      if (fence || /^\s*(```|~~~)/.test(line)) return line
      let out = line.replace(leading, "$1").replace(trailing, "$1")
      if (/^\s*\|/.test(out)) out = out.replace(cellStart, "$1").replace(cellEnd, "$1")
      return out
    })
    .join("\n")
}

function decodeReadmeContent(data: ReadmeApiResponse) {
  if (!data.content) {
    return null
  }

  const text =
    data.encoding === "base64"
      ? Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf8")
      : data.content

  return stripEmoji(text)
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
