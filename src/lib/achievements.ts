export type AchievementEntry = {
  event: string
  award: string
  project?: string
  link?: string
  image?: string
  gallery?: string[]
  description?: string
  date?: string
}

const achievements: AchievementEntry[] = [
  {
    event: "TRON HackaTron Season 7",
    award: "Grabbed 4th Prize ($8,000) - Artistry Track",
    project: "Vibe",
    link: "https://hackatron7.devpost.com/",
    date: "november 2024",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/002/960/566/datas/full_width.png",
    gallery: [
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619438/13_ru7x0f.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619438/12_ne0dnh.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619438/11_o8ahcx.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619438/14_gxmzcz.jpg",
    ],
    description:
      "Built Vibe for TRON HackaTron Season 7 — a reward-driven quiz platform with NFT-inspired visuals and gamified learning mechanics that earned a strong placement in the artistry track.",
  },
  {
    event: "Somnia DeFi Mini Hackathon",
    award: "Grabbed 2nd Prize ($1,500)",
    project: "Somany",
    link: "https://dorahacks.io/hackathon/defi-mini-hackathon/buidl",
    date: "october 2025",
    image:
      "https://cdn.dorahacks.io/static/files/198840c1a75063621f8f85844ff9995a.png",
    gallery: [
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619685/31_hbkdjy.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619686/33_xksvsc.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619685/32_zxun2v.jpg",
    ],
    description:
      "Built Somany as a DeFi token aggregator for Somnia, letting users consolidate cross-chain fragmented balances into a single destination in one batched transaction while preserving on-chain ownership and low fees.",
  },
  {
    event: "TOKEN2049 Origins Singapore",
    award: "Grabbed 3rd Prize ($1,500)",
    project: "TaaS",
    link: "https://www.token2049.com/singapore/2049-origins",
    date: "september 2025",
    image:
      "https://token2049.nyc3.cdn.digitaloceanspaces.com/Singapore/OG/TOKEN2049%20Origins%20-%20Opengraph-2%20OCT%202025%20Opt2png.png",
    gallery: [
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619770/54_ydmfrz.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619730/51_hb0axr.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619769/53_waus1u.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619731/52_iqfbl8.jpg",
    ],
    description:
      "Built TaaS for TOKEN2049 Origins Singapore — a trustless rental staking protocol that turns deposits into passive yield while securing both landlord and tenant interests with transparent escrow automation.",
  },
  {
    event: "Somnia Mini Games Hackathon",
    award: "Grabbed 2nd Prize ($100)",
    project: "Catch Goofy",
    link: "https://dorahacks.io/hackathon/somnia-minigames/buidl",
    date: "august 2025",
    image:
      "https://cdn.dorahacks.io/static/files/1981e7aebe221556ff526be4829964e8.png",
    gallery: [
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619706/41_syqkdf.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619708/43_djtff7.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619707/42_xapvao.jpg",
    ],
    description:
      "Built Catch Goofy as a playful, high-energy mobile game experience for Somnia, blending swipe-based controls with timed challenges and on-chain reward mechanics.",
  },
  {
    event: "Arbitrum APAC Mini Hackathon",
    award: "Got Honorable Mention Prize ($100)",
    project: "Arbipic",
    link: "https://www.hackquest.io/hackathons/Arbitrum-APAC-Mini-Hackathon",
    date: "july 2025",
    image: "https://assets.hackquest.io/hackathons/Okk6ISYxL77bLYAqPu6C6.png",
    gallery: [
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619788/61_h6bqj7.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619793/63_wepd1i.jpg",
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619791/62_ljrcd6.jpg",
    ],
    description:
      "Built Arbipic for Arbitrum APAC — an on-chain image verification and sharing experience that combined discoverability with secure tokenized user interaction.",
  },
  {
    event: "Microsoft x InnoQuest",
    award: "Got 2nd Position",
    link: "https://www.reskilll.com/hack/innoquest#schedule-area",
    date: "june 2025",
    image: "https://content.reskilll.com/ABCO3KzcG6.png",
    gallery: [
      "https://res.cloudinary.com/djxuqljgr/image/upload/v1776619670/21_a8meha.jpg",
    ],
    description:
      "Delivered a polished solution for Microsoft x InnoQuest, winning 2nd place with a product that blended practical user flows, clean UX, and intelligent automation.",
  },
  {
    event: "Hack for Humanity 2025",
    award: "Got 14th Position",
    project: "Concept Bridge",
    link: "https://devpost.com/software/concept-bridge-la3cfg",
    date: "january 2025",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/003/120/949/datas/full_width.png",
    description:
      "Built Concept Bridge for Hack for Humanity 2025 with AI-powered knowledge graphs and visual learning flows that made blockchain concepts accessible and interactive.",
  },
]

function slugifyAchievement(event: string) {
  return event
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function getAchievementSlug(
  achievement: Pick<AchievementEntry, "event">,
) {
  return slugifyAchievement(achievement.event)
}

export function getAllAchievements() {
  return achievements
}

export function getAchievementBySlug(slug: string) {
  return (
    achievements.find(
      (achievement) => getAchievementSlug(achievement) === slug,
    ) ?? null
  )
}
