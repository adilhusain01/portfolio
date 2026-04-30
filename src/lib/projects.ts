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
  ribbon?: "red" | "gold"
  category: "tool" | "project" | "design"
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
    category: "tool",
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
    category: "tool",
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
    href: "https://croppy.adilhusain.xyz",
    github: "https://github.com/adilhusain01/croppy",
    category: "tool",
  },
  {
    title: "spritelab",
    description:
      "Built a premium suite of pixel art tools featuring an 'auto-magic' background remover, a high-res to 8-bit sprite converter with adjustable posterization, and a precision editor with full undo/redo and auto-cropping logic.",
    role: "developer",
    period: "april 2026",
    image: "https://spritelab.adilhusain.xyz/og.png",
    achievements: [],
    technologies: [
      "next.js 16",
      "zustand",
      "tailwind css v4",
      "canvas api",
      "cropper.js",
      "lucide",
    ],
    href: "https://spritelab.adilhusain.xyz",
    github: "https://github.com/adilhusain01/SpriteLab",
    category: "tool",
  },
  {
    title: "voxel",
    description:
      "Built a high-performance browser-based 3D voxel editor with real-time lighting, advanced brush tools, and optimized mesh exporting for game engines and 3D printing.",
    role: "developer",
    period: "april 2026",
    image: "https://voxel.adilhusain.xyz/og.png",
    achievements: [],
    technologies: [
      "react 19",
      "three.js",
      "react-three-fiber",
      "typescript",
      "tailwind css",
    ],
    href: "https://voxel.adilhusain.xyz/",
    github: "https://github.com/adilhusain01/voxel",
    category: "tool",
  },
  {
    title: "takemeds",
    description:
      "Built a high-stakes macOS medication adherence app that prevents users from ignoring reminders through an automated escalation system. It progresses from standard notifications to full-screen blocks that can only be dismissed via AI-powered camera verification of hand-to-mouth intake motion. Developed the accompanying marketing site with secure license delivery, Dodo Payments integration, and a private purchase recovery portal.",
    role: "developer",
    period: "april 2026",
    image: "https://takemeds.fit/og.png",
    achievements: [],
    technologies: [
      "next.js 14",
      "supabase",
      "dodo payments",
      "apple vision",
      "core ml",
      "resend",
    ],
    href: "https://takemeds.fit",
    github: "https://github.com/adilhusain01/TakeMeds",
    category: "project",
    ribbon: 'gold'
  },
  {
    title: "sahar studios",
    description:
      "Built a bold, liquid-style creative studio landing experience with cinematic motion, immersive scroll interactions, and polished social preview metadata for high-impact sharing.",
    role: "developer",
    period: "march 2026",
    image: "https://saharstudios.adilhusain.xyz/og.webp",
    achievements: [],
    technologies: [
      "next.js 16",
      "react 19",
      "tailwind css",
      "gsap",
      "framer motion",
      "lenis",
    ],
    href: "https://saharstudios.adilhusain.xyz",
    github: "https://github.com/adilhusain01/saharstudios",
    category: "design",
  },
  {
    title: "veilverse",
    description:
      "Built an ethereal digital fashion house experience with shimmering textures, minimalist layout, and fluid navigation to showcase high-end virtual couture.",
    role: "designer and developer",
    period: "december 2025",
    image: "https://veilverse.adilhusain.xyz/og.webp",
    achievements: [],
    technologies: ["react", "tailwind css", "framer motion", "three.js"],
    href: "https://veilverse.adilhusain.xyz",
    github: "https://github.com/adilhusain01/veilverse",
    category: "design",
  },
  {
    title: "studio peau",
    description:
      "Designed and developed a premium skincare creative studio landing page with organic shapes, soft color palettes, and polished interactions for a boutique brand feel.",
    role: "designer and developer",
    period: "november 2025",
    image: "https://studiopeau.adilhusain.xyz/og.png",
    achievements: [],
    technologies: ["next.js", "tailwind css", "framer motion"],
    href: "https://studiopeau.adilhusain.xyz",
    github: "https://github.com/adilhusain01/StudioPeau",
    category: "design",
  },
  {
    title: "arbipic",
    description:
      "Built a community-driven on-chain art platform on Arbitrum that enables users to mint, trade, and showcase high-resolution digital art with minimal gas fees. Integrated a custom sub-graph for real-time indexing and a smooth, cinematic gallery experience.",
    role: "developer",
    period: "december 2025",
    achievements: ['won $100 cash prize as honourable mention'],
    technologies: ["react", "solidity", "arbitrum", "ethers.js", "tailwind css"],
    github: "https://github.com/adilhusain01/arbipic",
    video: "https://www.youtube.com/watch?v=3cDjSzvppB0",
    category: "project",
  },
  {
    title: "neverpay",
    description:
      "Built a DeFi-powered platform where users deposit USDC to earn yield from Aave V3 and convert it into platform credits for a native marketplace. Users retain full control of their principal and can withdraw it anytime, while the platform applies a 5% margin to generated yield. Implemented YieldVault smart contracts on Base to automate yield accrual and credit conversion, added LI.FI cross-chain deposit bridging, RainbowKit wallet integration, and secure Gemini API-backed routes.",
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
    ribbon: "gold",
    category: "project",
  },
  {
    title: "clawpay",
    description:
      "Created a secure payment layer that lets AI agents make purchases on Visa/Mastercard websites using single-use virtual cards funded by USDC in on-chain escrow on Arbitrum. This removed personal card exposure while enabling pay-as-you-go agent spending under strict limits. Designed Solidity escrow contracts, a FastAPI backend integrated with Lithic for exact spend-limit virtual cards, and MCP server tooling for seamless Claude/OpenClaw agent workflows using ethers.js.",
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
    ribbon: "gold",
    category: "project",
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
    ribbon: "gold",
    category: "project",
  },
  {
    title: "taas",
    description:
      "Created a decentralized escrow platform for rental agreements on TON that lets landlords and tenants transact without intermediaries by locking security deposits into smart contracts with automated fund handling. Deposits were held in escrow and deployed for yield generation (~5% APY) during the rental period, then returned to tenants while generated yield was transferred to landlords. Implemented TON escrow smart contracts for agreement enforcement, deposit management, yield allocation, and automated settlement.",
    role: "blockchain developer",
    period: "october 2025",
    achievements: [
      "won $1.5k as 3rd prize in the stablecoin track of alphaton bounty in token2049 origins singapore hackathon",
    ],
    technologies: ["javascript", "react.js", "alphaton chain", "tailwind css"],
    github: "https://github.com/rizwanmoulvi/taas",
    video: "https://youtu.be/Q_XKzGK77GQ",
    category: "project",
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
    category: "project",
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
    ribbon: "gold",
    category: "project",
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
    github: "https://github.com/rizwanmoulvi/catch-goofy",
    video: "https://youtu.be/XANNfyc-kpY",
    category: "project",
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
    category: "project",
  },
  {
    title: "vibe",
    description:
      "Constructed an AI-powered educational gaming platform that generates time-constrained quizzes and fact-checking games from PDFs, text prompts, YouTube links, and web pages using AWS Bedrock LLM APIs. Added a reward system where creators deposit a budget via crypto wallet, dynamically calculated from question count, participants, and score rewards, enabling transparent automated prize distribution. Used Redis caching, rate limiting, and clustering to reduce latency and improve scalability, while Somnia blockchain smart contracts handled game generation, scoring, and rewards.",
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
    category: "project",
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
    category: "project",
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

const getProjectTime = (project: Pick<ProjectEntry, "period">) => {
  const time = new Date(project.period).getTime()
  return Number.isNaN(time) ? 0 : time
}

export function sortProjects<T extends ProjectEntry>(projectList: T[]) {
  return [...projectList].sort((a, b) => {
    const aHasAchievement = a.achievements.length > 0 ? 2 : 0
    const bHasAchievement = b.achievements.length > 0 ? 2 : 0

    if (aHasAchievement !== bHasAchievement) {
      return bHasAchievement - aHasAchievement
    }

    const aHasGoldRibbon = a.ribbon === "gold" ? 1 : 0
    const bHasGoldRibbon = b.ribbon === "gold" ? 1 : 0

    if (aHasGoldRibbon !== bHasGoldRibbon) {
      return bHasGoldRibbon - aHasGoldRibbon
    }

    return getProjectTime(b) - getProjectTime(a)
  })
}

export function getProjectBySlug(slug: string): ProjectEntry | null {
  return projects.find((project) => getProjectSlug(project) === slug) ?? null
}
