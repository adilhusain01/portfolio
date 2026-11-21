export type ProjectEntry = {
  title: string
  tagline: string
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
  embedding?: string[]
}

export const projects: ProjectEntry[] = [
  {
    title: "ironclad",
    tagline: "Spending limits for AI agent wallets, enforced in the key itself.",
    description:
      "Built spending limits for AI agent wallets that are enforced in the key itself. The wallet is a 2-of-3 FROST key in Zcash's shielded pool, and a co-signer signs only payments inside the owner's caps and allow-list, so a hijacked agent can spend no more than the owner allowed. Fixes from the project are merged upstream into zshield-mcp and frost-zec.",
    role: "developer",
    period: "november 2026",
    image: "https://ironclad.adilhusain.dev/og.png",
    href: "https://ironclad.adilhusain.dev",
    achievements: ["Won a Zcash Ecosystem Prize at the Free Society Hackathon"],
    technologies: ["rust", "typescript", "zcash", "frost", "mcp"],
    github: "https://github.com/adilhusain01/ironclad",
    video: "https://youtu.be/8QMsMO8Dx6E",
    ribbon: "gold",
    category: "project",
  },
  {
    title: "heyterm",
    tagline: "Voice control for coding agents, with every session in one window.",
    description:
      "Built voice control for coding agents. Every session runs in one window, spoken requests go to the right session, and approvals can be answered by voice. Published on npm with 648 tests and CI on macOS, Linux and Windows.",
    role: "developer",
    period: "october 2026",
    image: "https://heyterm.vercel.app/og.png",
    achievements: [],
    technologies: ["typescript", "node.js", "react", "xterm.js", "node-pty"],
    href: "https://www.npmjs.com/package/heyterm",
    github: "https://github.com/adilhusain01/heyterm",
    video: "https://youtu.be/WgMTuj9yA9Y",
    ribbon: "gold",
    category: "project",
  },
  {
    title: "peeker",
    tagline: "Hover over the MacBook notch to open your recent files.",
    description:
      "Built a paid macOS menu bar app. Hover over the MacBook notch and a panel of recent files unfolds from the top of the screen, with saved folders, a shelf for keeping files between apps, optional encrypted clipboard history, Command-K search and quick previews. It uses only public macOS frameworks and updates itself with Sparkle. Sold for $19.",
    role: "developer",
    period: "september 2026",
    image: "/projects/peeker.webp",
    achievements: [],
    technologies: ["swift", "swiftui", "appkit", "sparkle"],
    href: "https://peeker-weld.vercel.app",
    ribbon: "gold",
    category: "tool",
  },
  {
    title: "saveposts",
    tagline: "Save and sort posts from every social app in one place.",
    description:
      "Built a platform for saving and organizing social media posts with bookmarking, categorization, and search functionality to help users curate and revisit content across platforms.",
    role: "developer",
    period: "may 2026",
    achievements: [],
    technologies: ["next.js", "react", "tailwind css"],
    href: "https://saveposts.xyz",
    image: "https://saveposts.xyz/og.png",
    github: "https://github.com/adilhusain01/SavePosts",
    video: "https://youtu.be/Nb5oZf5xskI",
    ribbon: "gold",
    category: "project",
    embedding: [
      `<div style="font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif; border: 1px solid rgb(224, 224, 224); border-radius: 12px; padding: 20px; max-width: 500px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px;"><div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;"><img alt="SavePosts" src="https://ph-files.imgix.net/579d2860-72be-49e6-a48f-1c28a8ad1711.png?auto=format&amp;fit=crop&amp;w=80&amp;h=80" style="width: 64px; height: 64px; border-radius: 8px; object-fit: cover; flex-shrink: 0;"><div style="flex: 1 1 0%; min-width: 0px;"><h3 style="margin: 0px; font-size: 18px; font-weight: 600; color: rgb(26, 26, 26); line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">SavePosts</h3><p style="margin: 4px 0px 0px; font-size: 14px; color: rgb(102, 102, 102); line-height: 1.4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">One manager for all posts across platforms important to you.</p></div></div><a href="https://www.producthunt.com/products/saveposts?embed=true&amp;utm_source=embed&amp;utm_medium=post_embed" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 4px; margin-top: 12px; padding: 8px 16px; background: rgb(255, 97, 84); color: rgb(255, 255, 255); text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">Check it out on Product Hunt →</a></div>`,
      `<a href="https://www.producthunt.com/products/saveposts?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-saveposts" target="_blank" rel="noopener noreferrer"><img alt="SavePosts - One manager for all posts across platforms important to you. | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1139629&amp;theme=light&amp;t=1778015846308"></a>`,
    ],
  },
  {
    title: "calchub",
    tagline: "Over 500 free calculators you can embed with one line.",
    description:
      "Built a comprehensive library of 500+ free, embeddable calculators for finance, health, business, and everyday workflows. Designed with a high-contrast brutalist aesthetic, it features fully responsive mobile layouts, intuitive search functionality, and instant single-line HTML embedding.",
    role: "developer",
    period: "may 2026",
    image: "https://calchub.adilhusain.dev/og.png",
    achievements: [],
    technologies: ["next.js", "react", "tailwind css", "lucide"],
    href: "https://calchub.adilhusain.dev",
    github: "https://github.com/adilhusain01/CalcHub",
    category: "tool",
  },
  {
    title: "flashcards",
    tagline: "Turns a CSV of questions into flip cards for revision.",
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
    tagline: "A calm PDF reader for close reading, with clipping and brown noise.",
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
    tagline: "Upload one image and export it at every social size.",
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
    href: "https://croppy.xyz",
    github: "https://github.com/adilhusain01/croppy",
    category: "tool",
  },
  {
    title: "spritelab",
    tagline: "Pixel art tools: a background remover, a sprite converter and an editor.",
    description:
      "Built a premium suite of pixel art tools featuring an 'auto-magic' background remover, a high-res to 8-bit sprite converter with adjustable posterization, and a precision editor with full undo/redo and auto-cropping logic.",
    role: "developer",
    period: "april 2026",
    image: "https://spritelab.adilhusain.dev/og.png",
    achievements: [],
    technologies: [
      "next.js 16",
      "zustand",
      "tailwind css v4",
      "canvas api",
      "cropper.js",
      "lucide",
    ],
    href: "https://spritelab.adilhusain.dev",
    github: "https://github.com/adilhusain01/SpriteLab",
    category: "tool",
  },
  {
    title: "voxel",
    tagline: "A 3D voxel editor in the browser, with exports for games and 3D printing.",
    description:
      "Built a high-performance browser-based 3D voxel editor with real-time lighting, advanced brush tools, and optimized mesh exporting for game engines and 3D printing.",
    role: "developer",
    period: "april 2026",
    image: "https://voxel.adilhusain.dev/og.png",
    achievements: [],
    technologies: [
      "react 19",
      "three.js",
      "react-three-fiber",
      "typescript",
      "tailwind css",
    ],
    href: "https://voxel.adilhusain.dev/",
    github: "https://github.com/adilhusain01/voxel",
    category: "tool",
  },
  {
    title: "takemeds",
    tagline: "A Mac app that will not let you ignore your medicine reminders.",
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
    ribbon: "gold",
  },
  {
    title: "sahar studios",
    tagline: "A liquid, cinematic landing page for a creative studio.",
    description:
      "Built a bold, liquid-style creative studio landing experience with cinematic motion, immersive scroll interactions, and polished social preview metadata for high-impact sharing.",
    role: "developer",
    period: "march 2026",
    image: "https://saharstudios.adilhusain.dev/og.webp",
    achievements: [],
    technologies: [
      "next.js 16",
      "react 19",
      "tailwind css",
      "gsap",
      "framer motion",
      "lenis",
    ],
    href: "https://saharstudios.adilhusain.dev",
    github: "https://github.com/adilhusain01/saharstudios",
    category: "design",
  },
  {
    title: "veilverse",
    tagline: "A shimmering site for a digital fashion house.",
    description:
      "Built an ethereal digital fashion house experience with shimmering textures, minimalist layout, and fluid navigation to showcase high-end virtual couture.",
    role: "designer and developer",
    period: "december 2025",
    image: "https://veilverse.adilhusain.dev/og.webp",
    achievements: [],
    technologies: ["react", "tailwind css", "framer motion", "three.js"],
    href: "https://veilverse.adilhusain.dev",
    github: "https://github.com/adilhusain01/veilverse",
    category: "design",
  },
  {
    title: "studio peau",
    tagline: "A soft landing page for a skincare studio.",
    description:
      "Designed and developed a premium skincare creative studio landing page with organic shapes, soft color palettes, and polished interactions for a boutique brand feel.",
    role: "designer and developer",
    period: "november 2025",
    image: "https://studiopeau.adilhusain.dev/og.png",
    achievements: [],
    technologies: ["next.js", "tailwind css", "framer motion"],
    href: "https://studiopeau.adilhusain.dev",
    github: "https://github.com/adilhusain01/StudioPeau",
    category: "design",
  },
  {
    title: "arbipic",
    tagline: "Proves a photo is real, with its proof recorded on Arbitrum.",
    description:
      "Built an on-chain photo authenticity tool against AI-generated fakes. A photo is captured from the webcam, hashed and stored on IPFS, and its proof is recorded on Arbitrum by Rust contracts on Stylus, so anyone can later check whether an image matches the recorded proof.",
    role: "developer",
    period: "january 2026",
    achievements: ["Won a $100 cash prize as an honourable mention"],
    technologies: [
      "react",
      "typescript",
      "rust",
      "arbitrum stylus",
      "ipfs",
      "wagmi",
    ],
    github: "https://github.com/adilhusain01/arbipic",
    video: "https://www.youtube.com/watch?v=3cDjSzvppB0",
    category: "project",
  },
  {
    title: "neverpay",
    tagline: "Spend the yield on your USDC and keep the principal.",
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
    tagline: "Lets AI agents pay on card websites with single-use virtual cards.",
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
    tagline: "Brands fund creator campaigns that earn yield while they run.",
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
    tagline: "Rental deposits locked in a contract on TON, with no middleman.",
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
    tagline: "Gathers tokens scattered across chains into one, with a single signature.",
    description:
      "a token aggregator that teleports cross chain fragmented tokens of the user to a single destination in one signature of the user's intent using batch transfer instead of multiple transactions",
    role: "blockchain developer",
    period: "september 2025",
    image: "https://somany-nine.vercel.app/somany-og.webp",
    achievements: ["Won $1.5k as 2nd prize in the Somnia DeFi Mini Hackathon"],
    technologies: ["javascript", "somnia chain", "react.js", "tailwind css"],
    href: "https://somany-nine.vercel.app/",
    github: "https://github.com/adilhusain01/somany",
    video: "https://youtu.be/vqzJIeNt3y4",
    category: "project",
  },
  {
    title: "hyperswipe",
    tagline: "Swipe right to buy and left to sell on Hyperliquid's testnet.",
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
    tagline: "A bird crash game with betting.",
    description:
      "a fun bird crash game, with high‑stakes betting and adrenaline‑charged experience.",
    role: "developer",
    period: "august 2025",
    achievements: ["Won $100 as 2nd prize in the Somnia Mini Games Hackathon"],
    technologies: ["javascript", "somnia chain", "react.js", "tailwind css"],
    href: "https://catch-goofy.vercel.app",
    github: "https://github.com/rizwanmoulvi/catch-goofy",
    video: "https://youtu.be/XANNfyc-kpY",
    category: "project",
  },
  {
    title: "concept bridge",
    tagline: "Turns hard topics into knowledge graphs you can explore.",
    description:
      "it's a Web3 learning platform that uses AI and blockchain to turn complex topics into interactive knowledge graphs, offering a gamified, visual, and rewarding learning experience.",
    role: "creator and developer",
    period: "january 2025",
    achievements: ["Won 14th prize in the Hack for Humanity 2025 hackathon"],
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
    tagline: "Quiz games made from PDFs, videos and web pages, with crypto rewards.",
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
    tagline: "A real-time chat app with AI reply suggestions.",
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

// How each project writes its own name.
const displayNames: Record<string, string> = {
  heyterm: "HeyTerm",
  saveposts: "SavePosts",
  calchub: "CalcHub",
  bookboy: "BookBoy",
  spritelab: "SpriteLab",
  takemeds: "TakeMeds",
  arbipic: "ArbiPic",
  neverpay: "NeverPay",
  clawpay: "ClawPay",
  hyperswipe: "HyperSwipe",
  taas: "TaaS",
  air: "AIr",
  vibe: "VIBE",
}

export function projectName(title: string) {
  return displayNames[title] ?? title.replace(/(^|\s)(\S)/g, (_, space, char) => space + char.toUpperCase())
}

export function projectYear(project: Pick<ProjectEntry, "period">) {
  const match = project.period.match(/\d{4}/)
  return match ? match[0] : ""
}

// Projects carry their period as "month year", so "1 april 2026" parses in every browser and on the server.
export function projectTime(project: ProjectEntry) {
  const time = new Date(`1 ${project.period}`).getTime()
  return Number.isNaN(time) ? 0 : time
}

export function byNewest<T extends ProjectEntry>(list: T[]) {
  return [...list].sort((a, b) => projectTime(b) - projectTime(a))
}

export function youTubeId(url?: string) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1) || null
    if (parsed.searchParams.get("v")) return parsed.searchParams.get("v")
    const parts = parsed.pathname.split("/").filter(Boolean)
    const at = parts.findIndex((part) => part === "embed" || part === "shorts")
    return at >= 0 ? parts[at + 1] ?? null : null
  } catch {
    return null
  }
}

// A project without its own preview image borrows its demo video's thumbnail.
export function projectCover(project: ProjectEntry) {
  if (project.image) return project.image
  const id = youTubeId(project.video)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
}

// Technology names as their makers write them. Anything not listed just gets a capital first letter.
const techNames: Record<string, string> = {
  "aws eks": "AWS EKS", "github actions": "GitHub Actions", webassembly: "WebAssembly", "alphaton chain": "AlphaTON chain", "sepolia chain": "Sepolia", "somnia chain": "Somnia",
  typescript: "TypeScript", javascript: "JavaScript", mcp: "MCP", frost: "FROST", "node.js": "Node.js", "react.js": "React",
  "next.js": "Next.js", "next.js 14": "Next.js 14", "next.js 16": "Next.js 16", "tailwind css": "Tailwind CSS", "tailwind css v4": "Tailwind CSS v4",
  swiftui: "SwiftUI", appkit: "AppKit", "framer motion": "Framer Motion", "three.js": "Three.js", "canvas api": "Canvas API",
  "xterm.js": "xterm.js", "node-pty": "node-pty", mongodb: "MongoDB", html: "HTML", "pdf.js": "PDF.js", "web audio api": "Web Audio API",
  "svg filters": "SVG filters", "react-easy-crop": "react-easy-crop", "cropper.js": "Cropper.js", "react-three-fiber": "React Three Fiber",
  "core ml": "Core ML", gsap: "GSAP", ipfs: "IPFS", aavev3: "Aave v3", "li.fi": "LI.FI", fastapi: "FastAPI", "lithic api": "Lithic API",
  openclaw: "OpenClaw", "ethers.js": "ethers.js", "aws bedrock": "AWS Bedrock", "tron chain": "TRON chain", sqlite: "SQLite",
  websocket: "WebSocket", "gemini api": "Gemini API", "google gemini": "Google Gemini", "dodo payments": "Dodo Payments",
  "arbitrum stylus": "Arbitrum Stylus", "apple vision": "Apple Vision", "papa parse": "Papa Parse", "base sepolia": "Base Sepolia",
  viem: "viem", wagmi: "wagmi",
}

export function techName(tech: string) {
  const key = tech.toLowerCase()
  return techNames[key] ?? key.charAt(0).toUpperCase() + key.slice(1)
}

export function sentence(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
