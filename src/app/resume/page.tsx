import { Download } from "lucide-react"
import { ScrambleText } from "@/components/scramble-text"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Journey",
  description: "My engineering journey and architectural story.",
}

function TimelineItem({
  date,
  title,
  role,
  children,
  active = false,
}: {
  date: string
  title: string
  role?: string
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <div className="relative pl-8 md:pl-0">
      <div className="md:hidden absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#0d1117] border border-gray-600" />
      <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
        <div className="md:col-span-1 border-b md:border-b-0 border-gray-800/50 pb-2 md:pb-0 mb-4 md:mb-0 md:text-right">
          <div className="text-sm font-mono text-gray-400 md:mt-1.5">
            {date}
          </div>
        </div>
        <div className="md:col-span-4 relative md:border-l border-gray-800 md:pl-10 pb-20 md:pb-40 last:pb-0 last:border-transparent">
          {/* Timeline Node */}
          <div
            className={`hidden md:block absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full border-2 ${active ? "bg-accent border-accent shadow-[0_0_10px_rgba(0,229,255,0.5)]" : "bg-[#0d1117] border-gray-600"}`}
          />

          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center group-hover:text-accent transition-colors">
            {title}
          </h3>
          {role && <div className="text-sm text-gray-400 mb-6">{role}</div>}
          <div className="text-gray-300 leading-relaxed text-base">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResumePage() {
  return (
    <main className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-white">
          <span className="text-accent mr-2">*</span>
          <ScrambleText text="resume & journey" />
        </h1>
        <a
          href="/Resume.pdf"
          download="Adil_Husain_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 hover:border-gray-500 hover:text-white rounded-md text-sm text-gray-300 transition-colors"
        >
          <Download className="w-4 h-4" />
          download pdf
        </a>
      </div>

      <p className="text-gray-400 mb-16 leading-relaxed max-w-full">
        A timeline of my engineering journey. Download the PDF for a standard,
        formalized copy of my resume, or explore the context and architectural
        stories behind the milestones below.
      </p>

      <div className="space-y-24 md:space-y-0">
        <TimelineItem
          date="Present '26"
          title="Breaking Architecture Limits"
          role="Systems Engineering"
          active={true}
        >
          I bypassed the ceiling of single-threaded Node.js and started tearing
          apart Javascript&apos;s internal execution structure. I implemented{" "}
          <strong>PM2 clustering</strong>, pushed <strong>Docker</strong>{" "}
          containers to <strong>AWS EKS</strong> with Horizontal Pod
          Autoscaling, and benchmarked <strong>Rust Axum microservices</strong>{" "}
          against Piscina thread pooling. This resulted in scaling architectural
          throughput to <strong>150,000+ RPS</strong> and dropping operational
          latencies to 6ms using asynchronous Redis/BullMQ task orchestration.
        </TimelineItem>

        <TimelineItem
          date="Late '25 - Early '26"
          title="The Web3 Hackathon Sprint"
          role="Blockchain & Autonomous Agents"
        >
          Immersed completely into decentralized architectures and EVM
          engineering. Built <strong>NeverPay</strong> (yield-farming AI
          platform via Aave V3) and <strong>ClawPay</strong> (an autonomous
          fiat-payment layer backed by Arbitrum Sepolia escrows for AI agents).
          Competed globally—securing{" "}
          <strong>3rd place at Token2049 Origins Singapore</strong> with the
          TAAS escrow protocol, netting $8k with a 4th place sweep at the{" "}
          <strong>TRON Grand Hackatron</strong>, and winning multiple bounties
          in Somnia DeFi circuits.
        </TimelineItem>

        <TimelineItem
          date="Jul '24 - Oct '24"
          title="Professional Leap: Techbug"
          role="Full Stack Developer Intern"
        >
          It wasn&apos;t just writing features or fixing UI bugs; I directly
          overhauled backend data pathways. I engineered the central CMS
          dashboard (boosting content update speeds by 50%), ripped out legacy
          authentication for a hardened <strong>JWT-based pipeline</strong>{" "}
          (preventing 90% of unauthorized API hits), and restructured
          fundamental database pagination formulas to{" "}
          <strong>slash general loading latency by 65%</strong>.
        </TimelineItem>

        <TimelineItem
          date="Early 2024"
          title="Getting Off The Ground"
          role="Full Stack Foundations"
        >
          Started aggressively building intensive full-stack systems beyond
          standard CRUD apps. Developed <strong>AIR</strong>, a real-time
          WebSocket chat application leveraging Django and native SQLite
          seamlessly interwoven with the Gemini API to execute on-the-fly
          sentiment analysis and message prediction engines.
        </TimelineItem>
      </div>
    </main>
  )
}
