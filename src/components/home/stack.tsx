import {
  siDocker,
  siEthereum,
  siFastapi,
  siFramer,
  siGit,
  siGithubactions,
  siJavascript,
  siKubernetes,
  siModelcontextprotocol,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRust,
  siSolidity,
  siSui,
  siSwift,
  siTailwindcss,
  siTanstack,
  siTypescript,
  siZcash,
} from "./logos"
import { awsPath } from "./aws-path"
import type { Logo } from "./logos"

// The same list as the old site and the CV, drawn as logos. Brand logos come from Simple Icons (CC0).
// SQL and computer vision have no brand, so they get a plain drawn mark in the same weight.
type Tool = { name: string; href: string; icon?: Logo; path?: string; stroke?: string }

const SQL_MARK = "M5 6c0-1.66 3.13-3 7-3s7 1.34 7 3-3.13 3-7 3-7-1.34-7-3Zm0 0v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3"
const VISION_MARK = "M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M9 9.5h6v6H9z"

const groups: { label: string; tools: Tool[] }[] = [
  {
    label: "Languages",
    tools: [
      { name: "TypeScript", href: "https://www.typescriptlang.org", icon: siTypescript },
      { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: siJavascript },
      { name: "Python", href: "https://www.python.org", icon: siPython },
      { name: "Swift and SwiftUI", href: "https://www.swift.org", icon: siSwift },
      { name: "Rust", href: "https://www.rust-lang.org", icon: siRust },
      { name: "Solidity", href: "https://soliditylang.org", icon: siSolidity },
      { name: "SQL", href: "https://en.wikipedia.org/wiki/SQL", stroke: SQL_MARK },
    ],
  },
  {
    label: "Web",
    tools: [
      { name: "React and React Native", href: "https://react.dev", icon: siReact },
      { name: "Next.js", href: "https://nextjs.org", icon: siNextdotjs },
      { name: "TanStack Start", href: "https://tanstack.com/start", icon: siTanstack },
      { name: "Tailwind CSS", href: "https://tailwindcss.com", icon: siTailwindcss },
      { name: "Framer Motion", href: "https://motion.dev", icon: siFramer },
    ],
  },
  {
    label: "Backend and data",
    tools: [
      { name: "Node.js", href: "https://nodejs.org", icon: siNodedotjs },
      { name: "FastAPI", href: "https://fastapi.tiangolo.com", icon: siFastapi },
      { name: "PostgreSQL", href: "https://www.postgresql.org", icon: siPostgresql },
      { name: "MongoDB", href: "https://www.mongodb.com", icon: siMongodb },
      { name: "Redis", href: "https://redis.io", icon: siRedis },
    ],
  },
  {
    label: "Cloud and tooling",
    tools: [
      { name: "AWS", href: "https://aws.amazon.com", path: awsPath },
      { name: "Docker", href: "https://www.docker.com", icon: siDocker },
      { name: "Kubernetes", href: "https://kubernetes.io", icon: siKubernetes },
      { name: "GitHub Actions", href: "https://github.com/features/actions", icon: siGithubactions },
      { name: "Git", href: "https://git-scm.com", icon: siGit },
    ],
  },
  {
    label: "AI",
    tools: [
      { name: "Computer vision", href: "https://en.wikipedia.org/wiki/Computer_vision", stroke: VISION_MARK },
      { name: "Ollama", href: "https://ollama.com", icon: siOllama },
      { name: "MCP", href: "https://modelcontextprotocol.io", icon: siModelcontextprotocol },
    ],
  },
  {
    label: "Web3",
    tools: [
      { name: "Sui", href: "https://sui.io", icon: siSui },
      { name: "Zcash", href: "https://z.cash", icon: siZcash },
      { name: "Ethereum and EVM chains", href: "https://ethereum.org", icon: siEthereum },
    ],
  },
]

// Logos sit in ink and take their own colour on hover. Very light brand colours would vanish on paper, so they stay ink.
function hoverColour(hex?: string) {
  if (!hex) return "#1F1B16"
  const n = parseInt(hex, 16)
  const lum = (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255
  return lum > 0.72 ? "#1F1B16" : `#${hex}`
}

export function Stack() {
  return (
    <div className="grid gap-x-12 sm:grid-cols-2 xl:grid-cols-3">
      {groups.map((group) => (
        <div key={group.label} className="border-t border-rule pb-8 pt-5">
          <h3 className="text-[15px] text-ink-3">{group.label}</h3>
          <ul className="-ml-2.5 mt-3 flex flex-wrap items-center gap-1">
            {group.tools.map((tool) => (
              <li key={tool.name}>
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tool.name}
                  className="group relative grid h-12 w-12 place-items-center rounded-[10px] transition-transform duration-150 ease-out active:scale-[0.94]"
                  style={{ "--brand": hoverColour(tool.icon?.hex) } as React.CSSProperties}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className={`h-7 w-7 transition-[fill,stroke,transform] duration-150 ease-out [@media(hover:hover)]:group-hover:-translate-y-0.5 ${
                      tool.stroke
                        ? "fill-none stroke-ink-2 [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.6] [@media(hover:hover)]:group-hover:stroke-ink"
                        : "fill-ink-2 [@media(hover:hover)]:group-hover:fill-[var(--brand)]"
                    }`}
                  >
                    <path d={tool.icon?.path ?? tool.path ?? tool.stroke} />
                  </svg>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-ink px-2 py-1.5 text-[12px] font-medium leading-none text-paper opacity-0 transition-[opacity,transform] duration-150 ease-out group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100"
                  >
                    {tool.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
