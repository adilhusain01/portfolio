export const projects = [
  {
    title: "enterprise node.js scaling to aws eks",
    description:
      "A comprehensive architectural journey transforming a single-threaded Node.js server into a highly available, auto-scaling enterprise system. Broke through local hardware limits using PM2, containerized via Docker, and orchestrated dynamic horizontal scaling using Kubernetes (HPA) on AWS EKS.",
    role: "devops engineer",
    period: "april 2026",
    achievements: [
      "Halved execution time and slashed HTTP timeouts by 85% under a 5,000-request load.",
      "Dynamically scaled to 20 Pods under 3 seconds employing zero-throttle c5.xlarge AWS compute nodes.",
    ],
    technologies: ["node.js", "pm2", "docker", "kubernetes", "aws eks"],
    github: "https://github.com/adilhusain01/Clustering",
  },
  {
    title: "high-performance node.js: multithreading & rust",
    description:
      "Engineered an extensive comparison benchmarking CPU-bound operations in Node.js. Evaluated naïve unpooled worker threads, established stable Piscina thread pooling, and built a blisteringly fast Rust Microservice (Axum/Rayon) culminating in a decoupled BullMQ/Redis Event-Driven Task Queue.",
    role: "system architect",
    period: "april 2026",
    achievements: [
      "Achieved 150,000+ gateway requests with ~15k req/sec throughput and 6ms latency using async Rust workers.",
      "Outperformed native Node.js mathematical processing speed internally by nearly 5x via compiled bare-metal optimization."
    ],
    technologies: ["node.js", "rust", "axum", "piscina", "rayon", "redis", "bullmq"],
    github: "https://github.com/adilhusain01/Multithreading",
  },
  {
    title: "neverpay",
    description:
      "Built NeverPay, a DeFi-powered AI platform where users deposit USDC once to earn perpetual credits from Aave V3 yield farming for platform credits which can be used at the marketplace on things like Image generation, conversion tools etc and much more, while retaining full principal withdrawal rights at any time.",
    role: "developer",
    period: "february 2026",
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
    video: "https://youtu.be/adcnmsFEAIA"
  },
  {
    title: "clawpay",
    description:
      "Developed secure autonomous payment layer for AI agents enabling purchases on any Visa/Mastercard website using single-use virtual cards backed by USDC in on-chain escrow on Arbitrum Sepolia, eliminating merchant opt-in, persistent card exposure, and human intervention while keeping full user control of funds.",
    role: "developer",
    period: "february 2026",
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
    video: "https://youtu.be/Az8vLFKR9r8"
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
    href: "https://taas-nine.vercel.app",
    video: "https://youtu.be/Q_XKzGK77GQ"
  },
  {
    title: "somany",
    description:
      "a token aggregator that teleports cross chain fragmented tokens of the user to a single destination in one signature of the user's intent using batch transfer instead of multiple transactions",
    role: "blockchain developer",
    period: "september 2025",
    achievements: ["won $1.5k as 2nd prize in somnia defi mini hackathon"],
    technologies: ["javascript", "somnia chain", "react.js", "tailwind css"],
    href: "https://somany-nine.vercel.app/",
    github: "https://github.com/adilhusain01/somany",
    video: "https://youtu.be/vqzJIeNt3y4"
  },
  {
    title: "catch goofy",
    description:
      "a fun bird crash game, with high‑stakes betting and adrenaline‑charged experience.",
    role: "developer",
    period: "august 2025",
    achievements: ["won $200 as 2nd prize in somnia mini games hackathon"],
    technologies: ["javascript", "somnia chain", "react.js", "tailwind css"],
    href: "https://catch-goofy.vercel.app",
    github: "https://github.com/adilhusain01/catch-goofy",
    video: "https://youtu.be/XANNfyc-kpY"
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
    href: "https://concept-bridge.vercel.app/",
    github: "https://github.com/adilhusain01/concept-bridge-client",
    video: "https://youtu.be/iuxmcOM0nQk"
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
    href: "https://vibe-gamez.vercel.app/",
    github: "https://github.com/adilhusain01/vibe",
    video: "https://youtu.be/anlJwTk06JE"
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
