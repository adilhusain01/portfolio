import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"

const projects = [
  {
    title: "neverpay",
    description: "Built NeverPay, a DeFi-powered AI platform where users deposit USDC once to earn perpetual credits from Aave V3 yield farming for platform credits which can be used at the marketplace on things like Image generation, conversion tools etc and much more, while retaining full principal withdrawal rights at any time.",
    role: "developer",
    period: "february 2026",
    achievements: [],
    technologies: ["next.js", "solidity", "aaveV3", "li.fi", "gemini", "tailwind css", "base sepolia"],
    href: "https://never-pay.vercel.app",
  },
  {
    title: "clawpay",
    description: "Developed secure autonomous payment layer for AI agents enabling purchases on any Visa/Mastercard website using single-use virtual cards backed by USDC in on-chain escrow on Arbitrum Sepolia, eliminating merchant opt-in, persistent card exposure, and human intervention while keeping full user control of funds.",
    role: "developer",
    period: "february 2026",
    achievements: [],
    technologies: ["react.js", "fastapi", "solidity", "lithic api", "tailwind css", "openclaw"],
    href: "https://claw-pay.vercel.app",
  },
  {
    title: "taas",
    description:
      "TAAS (Trust-as-a-Service) Protocol enables trustless rental agreements where security deposits are automatically staked to generate yield during the rental term. The protocol ensures both landlords and tenants benefit from a transparent, automated escrow system.",
    role: "blockchain developer",
    period: "october 2025",
    achievements: [
      "won $1.5k as 3rd prize in the stablecoin track of alphaton bounty in token2049 origins singapore hackathon",
    ],
    technologies: [
      "javascript",
      "react.js",
      "alphaton chain",
      "tailwind css",
    ],
    href: "https://taas-nine.vercel.app",
  },
  {
    title: "somany",
    description: "a token aggregator that teleports cross chain fragmented tokens of the user to a single destination in one signature of the user's intent using batch transfer instead of multiple transactions",
    role: "blockchain developer",
    period: "september 2025",
    achievements: [
      "won $1.5k as 2nd prize in somnia defi mini hackathon",
    ],
    technologies: ["javascript", "somnia chain", "react.js", "tailwind css"],
    href: "https://somany-nine.vercel.app",
  },
  {
    title: "catch goofy",
    description: "a fun bird crash game, with high‑stakes betting and adrenaline‑charged experience.",
    role: "developer",
    period: "august 2025",
    achievements: [
        "won $200 as 2nd prize in somnia mini games hackathon",
    ],
    technologies: ["javascript", "somnia chain", "react.js", "tailwind css"],
    href: "https://catch-goofy.vercel.app",
  },
  {
    title: "concept bridge",
    description: "it's a Web3 learning platform that uses AI and blockchain to turn complex topics into interactive knowledge graphs, offering a gamified, visual, and rewarding learning experience.",
    role: "creator and developer",
    period: "january 2025",
    achievements: [
      "won 14th prize in hack for humanity 2025 hackathon",
    ],
    technologies: ["javascript", "sepolia chain", "react.js", "tailwind css", "mongodb", "aws bedrock"],
    href: "https://concept-bridge.vercel.app",
  },
  {
    title: "vibe",
    description:
      "quiz platform with rewards and memories. earn TRX & NFTs with every answer. vibe with web3",
    role: "developer",
    period: "november 2024",
    achievements: [
     "won $8k as 4rth prize in artistry track in the TRON grand hackathon - hackatron season 7",
    ],
    technologies: ["javascript", "tron chain", "react.js", "tailwind css", "mongodb", "google gemini"],
    href: "https://vibeee.vercel.app",
  },
  {
    title: "air",
    description: "Constructed a real-time chat application using Google Gemini API for AI-powered message suggestions, image descriptions, and sentiment analysis.",
    role: "developer",
    period: "april 2024",
    achievements: [],
    technologies: ["react.js", "django", "sqlite", "websocket", "tailwind css", "gemini api"],
    href: "https://github.com/adilhusain01/AIR",
  },
]

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="projects" />
      </h1>

      <p className="text-gray-400 mb-12 leading-relaxed">
        here are some of the projects i&apos;ve worked on. i like the challenges in the hackathons so some of these are focussed for the best use cases in the web3 world.
      </p>

      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://adilhusain.me/og/home?title=projects",
      },
    ],
  },
}
