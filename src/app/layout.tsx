import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import "katex/dist/katex.min.css"
import "highlight.js/styles/github-dark.css"
import { Navbar } from "../components/navbar"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://adilhusain.me"),
  title: {
    default: "Adil husain",
    template: "%s | Adil husain",
  },
  description: "Developer",
  openGraph: {
    title: "Adil husain",
    description: "Developer",
    url: "https://adilhusain.xyz",
    siteName: "Adil husain",
    locale: "en_US",
    type: "website",
    images: ["https://adilhusain.xyz/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: "Adil husain",
    card: "summary_large_image",
    creator: "@0xAdilHusain",
    image: "https://adilhusain.xyz/og.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="https://adilhusain.xyz/og.png" />
        <meta name="twitter:image" content="https://adilhusain.xyz/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body
        className={`${geistMono.variable} antialiased min-h-screen font-mono`}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
