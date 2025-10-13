import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"

const workItems: Item[] = [
   {
    title: "techbug",
    role: "backend developer",
    period: "july 2024 - november 2024",
    description:
      "worked on some sites during the internship period. Gained experience in backend development and database management. it was a nice little fun journey",
    href: "https://www.linkedin.com/company/techbug-official",
  },
]

const projectItems = [
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
    description: "a token aggregator that teleports cross chain fragmented tokens of the user to a single destination in one signature of the user's intent using batch transfer instead of multiple transactions",
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
