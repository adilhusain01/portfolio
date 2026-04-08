import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"

const workItems: Item[] = [
  {
    title: "techbug",
    role: "full stack developer intern",
    period: "july 2024 - october 2024",
    description:
      "Engineered CMS dashboard increasing content update efficiency by 50%. Enforced JWT-based authorization, reducing unauthorized access by 90%. Improved app performance by 65% through optimized pagination. Developed an automated email system for notifications.",
    href: "https://www.linkedin.com/company/techbug-official",
  },
]

const projectItems = [
  {
    title: "enterprise node.js scaling to aws eks",
    role: "devops engineer",
    description:
      "A comprehensive journey from single-threaded Node.js limits to PM2 vertical scaling, containerization via Docker, and auto-scaling Kubernetes deployments on c5.xlarge physical AWS nodes.",
    href: "https://github.com/adilhusain01/Clustering",
  },
  {
    title: "high-performance node.js: multithreading & rust",
    role: "system architect",
    description:
      "Explored intensive CPU-bound task offloading. Evaluated native worker thread pooling (Piscina) against lightning-fast Axum Rust Microservices and decoupled Redis event-driven Task Queues.",
    href: "https://github.com/adilhusain01/Multithreading",
  },
  {
    title: "neverpay",
    role: "developer",
    description:
      "A DeFi-powered AI platform where users deposit USDC to earn perpetual credits from Aave V3 yield farming for platform services like AI API access.",
    href: "https://never-pay.vercel.app",
  },
  {
    title: "clawpay",
    role: "developer",
    description:
      "A secure autonomous payment layer for AI agents enabling purchases on any Visa/Mastercard website using single-use virtual cards backed by on-chain escrow.",
    href: "https://claw-pay.vercel.app",
  },
  {
    title: "taas",
    role: "developer",
    description:
      "TAAS (Trust-as-a-Service) Protocol enables trustless rental agreements where security deposits are automatically staked to generate yield during the rental term. The protocol ensures both landlords and tenants benefit from a transparent, automated escrow system.",
    href: "https://taas-nine.vercel.app",
  },
  {
    title: "somany",
    role: "blockchain developer",
    description:
      "a token aggregator that teleports cross chain fragmented tokens of the user to a single destination in one signature of the user's intent using batch transfer instead of multiple transactions",
    href: "https://somany-nine.vercel.app",
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <SectionList title="work" items={workItems} />
      <BlogSection />
      <SectionList
        title="projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="all projects"
      />
      <LinksSection />
    </>
  )
}
