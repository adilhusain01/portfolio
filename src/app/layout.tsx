import type { Metadata, Viewport } from "next"
import { Geist_Mono, Hanken_Grotesk, Kalam, Young_Serif } from "next/font/google"
import "./globals.css"
import "katex/dist/katex.min.css"
import "highlight.js/styles/github-dark.css"
import { SiteNav } from "@/components/site/nav"
import { SiteFooter } from "@/components/site/footer"
import { AsciiCat } from "@/components/ascii-cat"
import { AFKTab } from "@/components/afk-tab"
import { ClickSound } from "@/components/click-sound"

// Young Serif for headings, Hanken Grotesk for reading, Kalam (Indian Type Foundry) for the notes in the margin,
// Geist Mono only for code and the camera's readouts. All self-hosted by next/font.
const young = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-young", display: "swap" })
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" })
const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-kalam", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

const description =
  "Adil Husain, a 21-year-old product engineer in Delhi. Camera systems, voice control for computers, Mac apps and a pile of hackathon projects."

export const metadata: Metadata = {
  metadataBase: new URL("https://adilhusain.dev"),
  title: {
    default: "Adil Husain",
    template: "%s | Adil Husain",
  },
  description,
  openGraph: {
    title: "Adil Husain",
    description,
    url: "https://adilhusain.dev",
    siteName: "Adil Husain",
    locale: "en_US",
    type: "website",
    images: ["https://adilhusain.dev/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "Adil Husain",
    description,
    card: "summary_large_image",
    creator: "@0xAdilHusain",
    images: ["https://adilhusain.dev/og.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#F2EBDD",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${young.variable} ${hanken.variable} ${kalam.variable} ${geistMono.variable}`}>
      <body className="paper-grain min-h-screen font-sans text-ink antialiased">
        <AFKTab />
        <ClickSound />
        <SiteNav />
        <div className="gutter w-full">{children}</div>
        <SiteFooter />
        <AsciiCat />
      </body>
    </html>
  )
}
