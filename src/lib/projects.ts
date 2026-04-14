export type ProjectEntry = {
  title: string
  description: string
  role: string
  period: string
  image?: string
  achievements: string[]
  technologies: string[]
  href?: string
  github?: string
  video?: string
}

export const projects: ProjectEntry[] = [
  {
    title: "flashcards",
    description:
      "Built a CSV-driven study app with animated 3D card flipping, keyboard navigation, and progress tracking to turn simple question-answer datasets into focused revision sessions.",
    role: "developer",
    period: "february 2026",
    image: "https://cardsflash.vercel.app/og.webp",
    achievements: [],
    technologies: [
      "next.js 16",
      "react 19",
      "typescript",
      "tailwind css v4",
      "framer motion",
      "papa parse",
    ],
    href: "https://cardsflash.vercel.app/",
    github: "https://github.com/adilhusain01/flashcards",
  },
  {
    title: "bookboy",
    description:
      "Built an immersive browser-based PDF reader designed for active reading with high-resolution clipping, persistent reading state, paper-grain visuals, and generative brown-noise focus audio.",
    role: "developer",
    period: "january 2026",
    image:
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1769391452/Screenshot_2026-01-26_at_7.04.57_AM_cevnzb.jpg",
    achievements: [],
    technologies: [
      "javascript",
      "html",
      "pdf.js",
      "canvas api",
      "web audio api",
      "svg filters",
    ],
    href: "https://bookboy.vercel.app/",
    github: "https://github.com/adilhusain01/bookboy",
  },
  {
    title: "croppy",
    description:
      "Built a client-side social media crop studio that lets users upload once and export multiple platform-specific image sizes with interactive zoom/rotation controls, safe-zone overlays, and high-resolution output formats.",
    role: "developer",
    period: "april 2026",
    image:
      "https://raw.githubusercontent.com/adilhusain01/croppy/main/client/public/og.webp",
    achievements: [],
    technologies: [
      "react 19",
      "vite 7",
      "typescript",
      "tailwind css",
      "react-easy-crop",
      "canvas api",
    ],
    href: "https://croppy-all.vercel.app/",
    github: "https://github.com/adilhusain01/croppy",
  },
  {
    title: "sahar studios",
    description:
      "Built a bold, liquid-style creative studio landing experience with cinematic motion, immersive scroll interactions, and polished social preview metadata for high-impact sharing.",
    role: "developer",
    period: "march 2026",
    image: "https://saharstudios.vercel.app/og.webp",
    achievements: [],
    technologies: [
      "next.js 16",
      "react 19",
      "tailwind css",
      "gsap",
      "framer motion",
      "lenis",
    ],
    href: "https://saharstudios.vercel.app/",
    github: "https://github.com/adilhusain01/saharstudios",
  },
  {
    title: "neverpay",
    description:
      "Built NeverPay, a DeFi-powered AI platform where users deposit USDC once to earn perpetual credits from Aave V3 yield farming for platform credits which can be used at the marketplace on things like Image generation, conversion tools etc and much more, while retaining full principal withdrawal rights at any time.",
    role: "developer",
    period: "february 2026",
    image: "https://never-pay.vercel.app/neverpay-og.webp",
    achievements: [],
    technologies: [
      "next.js",
      "solidity",
      "aaveV3",
      "li.fi",
      "gemini",
      "tailwind css",
      "base sepolia",
    ],
    href: "https://never-pay.vercel.app/",
    github: "https://github.com/adilhusain01/NeverPay",
    video: "https://youtu.be/adcnmsFEAIA",
  },
  {
    title: "clawpay",
    description:
      "Developed secure autonomous payment layer for AI agents enabling purchases on any Visa/Mastercard website using single-use virtual cards backed by USDC in on-chain escrow on Arbitrum Sepolia, eliminating merchant opt-in, persistent card exposure, and human intervention while keeping full user control of funds.",
    role: "developer",
    period: "february 2026",
    image: "https://claw-pay.vercel.app/clawypay-og.webp",
    achievements: [],
    technologies: [
      "react.js",
      "fastapi",
      "solidity",
      "lithic api",
      "tailwind css",
      "openclaw",
    ],
    href: "https://claw-pay.vercel.app",
    github: "https://github.com/adilhusain01/clawpay",
    video: "https://youtu.be/Az8vLFKR9r8",
  },
  {
    title: "campayyn",
    description:
      "Built an influencer-marketing campaign platform where brands fund creator campaigns in tokens, campaign budgets can earn staking yield while live, and payouts are distributed transparently by performance.",
    role: "developer",
    period: "november 2025",
    image: "https://campayyn.vercel.app/og.png",
    achievements: [],
    technologies: [
      "react.js",
      "vite",
      "tailwind css",
      "ethers.js",
      "wagmi",
      "privy",
    ],
    href: "https://campayyn.vercel.app/",
    github: "https://github.com/adilhusain01/campayyn",
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
    technologies: ["javascript", "react.js", "alphaton chain", "tailwind css"],
    github: "https://github.com/rizwanmoulvi/taas",
    video: "https://youtu.be/Q_XKzGK77GQ",
  },
  {
    title: "somany",
    description:
      "a token aggregator that teleports cross chain fragmented tokens of the user to a single destination in one signature of the user's intent using batch transfer instead of multiple transactions",
    role: "blockchain developer",
    period: "september 2025",
    image: "https://somany-nine.vercel.app/somany-og.webp",
    achievements: ["won $1.5k as 2nd prize in somnia defi mini hackathon"],
    technologies: ["javascript", "somnia chain", "react.js", "tailwind css"],
    href: "https://somany-nine.vercel.app/",
    github: "https://github.com/adilhusain01/somany",
    video: "https://youtu.be/vqzJIeNt3y4",
  },
  {
    title: "hyperswipe",
    description:
      "Built a mobile-first Hyperliquid testnet trading app where users can swipe right to buy and swipe left to sell, with live price data, wallet positions, and real-time market updates.",
    role: "developer",
    period: "august 2025",
    image: "https://hyperswipe.vercel.app/og.png",
    achievements: [],
    technologies: [
      "react.js",
      "vite",
      "tailwind css",
      "viem",
      "privy",
      "framer motion",
    ],
    href: "https://hyperswipe.vercel.app/",
    github: "https://github.com/adilhusain01/hyperswipe-client",
    video: "https://www.youtube.com/watch?v=PcIxu5QQeYI",
  },
  {
    title: "catch goofy",
    description:
      "a fun bird crash game, with high‑stakes betting and adrenaline‑charged experience.",
    role: "developer",
    period: "august 2025",
    achievements: ["won $100 as 2nd prize in somnia mini games hackathon"],
    technologies: ["javascript", "somnia chain", "react.js", "tailwind css"],
    href: "https://catch-goofy.vercel.app",
    github: "https://github.com/adilhusain01/catch-goofy",
    video: "https://youtu.be/XANNfyc-kpY",
  },
  {
    title: "concept bridge",
    description:
      "it's a Web3 learning platform that uses AI and blockchain to turn complex topics into interactive knowledge graphs, offering a gamified, visual, and rewarding learning experience.",
    role: "creator and developer",
    period: "january 2025",
    achievements: ["won 14th prize in hack for humanity 2025 hackathon"],
    technologies: [
      "javascript",
      "sepolia chain",
      "react.js",
      "tailwind css",
      "mongodb",
      "aws bedrock",
    ],
    image: "https://concept-bridge.vercel.app/og.png",
    href: "https://concept-bridge.vercel.app",
    github: "https://github.com/adilhusain01/concept-bridge-client",
    video: "https://youtu.be/iuxmcOM0nQk",
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
    technologies: [
      "javascript",
      "tron chain",
      "react.js",
      "tailwind css",
      "mongodb",
      "google gemini",
    ],
    image: "https://vibe-games.vercel.app/og.webp",
    href: "https://vibe-games.vercel.app/",
    github: "https://github.com/adilhusain01/vibe",
    video: "https://youtu.be/anlJwTk06JE",
  },
  {
    title: "air",
    description:
      "Constructed a real-time chat application using Google Gemini API for AI-powered message suggestions, image descriptions, and sentiment analysis.",
    role: "developer",
    period: "april 2024",
    achievements: [],
    technologies: [
      "react.js",
      "django",
      "sqlite",
      "websocket",
      "tailwind css",
      "gemini api",
    ],
    github: "https://github.com/adilhusain01/AIr",
  },
]

function slugifyProjectTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function getProjectSlug(project: Pick<ProjectEntry, "title">) {
  return slugifyProjectTitle(project.title)
}

export function getProjectBySlug(slug: string): ProjectEntry | null {
  return projects.find((project) => getProjectSlug(project) === slug) ?? null
}
