import Link from "next/link"

// Preview the first 2 timeline items — exactly matching resume/page.tsx styling
const PREVIEW_TIMELINE = [
  {
    date: "Present '26",
    title: "Breaking Architecture Limits",
    role: "Systems Engineering",
    active: true,
    text: "I bypassed the ceiling of single-threaded Node.js and started tearing apart Javascript's internal execution structure. I implemented PM2 clustering, pushed Docker containers to AWS EKS with Horizontal Pod Autoscaling, and benchmarked Rust Axum microservices against Piscina thread pooling. This resulted in scaling architectural throughput to 150,000+ RPS and dropping operational latencies to 6ms using asynchronous Redis/BullMQ task orchestration.",
  },
  {
    date: "Feb 10–12 2026",
    title: "Consensus Hong Kong 2026",
    role: "Hong Kong · conference & hackathon",
    active: false,
    text: "After a rejection last year, I finally made it into Consensus Hong Kong and the EasyA hackathon. The event was all deal flow, institution-scale Web3 energy, and elite networking at the Hong Kong Convention & Exhibition Centre.",
  },
]

function SentenceBulletedTextPreview({ text }: { text: string }) {
  // Show only first 2 sentences for preview
  const sentences = text
    .split(/\.\s+/)
    .slice(0, 2)
    .map((s, i, arr) => (i < arr.length - 1 ? `${s}.` : s))

  return (
    <div className="space-y-2 text-gray-300 text-sm leading-relaxed">
      {sentences.map((sentence, index) => (
        <p key={`${sentence}-${index}`} className="flex gap-2">
          <span className="text-accent shrink-0">&gt;</span>
          <span>{sentence}</span>
        </p>
      ))}
    </div>
  )
}

export function ResumeSection() {
  return (
    <section
      className="mb-12 sm:mb-16 animate-fade-in-up"
      style={{ animationDelay: "420ms", animationFillMode: "both" }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
        <span className="text-accent mr-2">*</span> resume &amp; journey
      </h2>

      <p className="text-sm text-gray-400 mb-8 leading-relaxed">
        A timeline of my journey.
      </p>

      <div className="space-y-0">
        {PREVIEW_TIMELINE.map((item, idx) => (
          <div key={item.title} className="relative pl-8 md:pl-0 group">
            {/* Mobile left timeline bar */}
            <div className="md:hidden absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#0d1117] border border-gray-600" />

            <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
              <div className="md:col-span-1 border-b md:border-b-0 border-gray-800/50 pb-2 md:pb-0 mb-4 md:mb-0 md:text-right">
                <div className="text-sm font-mono text-gray-400 md:mt-1.5">
                  {item.date}
                </div>
              </div>

              <div
                className={`md:col-span-4 relative md:border-l border-gray-800 md:pl-10 ${
                  idx < PREVIEW_TIMELINE.length - 1 ? "pb-12 md:pb-20" : "pb-0"
                }`}
              >
                {/* Timeline node */}
                <div
                  className={`hidden md:block absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full border-2 ${
                    item.active
                      ? "bg-accent border-accent shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                      : "bg-[#0d1117] border-gray-600"
                  }`}
                />

                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                {item.role && (
                  <div className="text-xs text-gray-400 mb-4">{item.role}</div>
                )}
                <SentenceBulletedTextPreview text={item.text} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 flex justify-end">
        <Link
          href="/resume"
          className="group flex items-center text-sm font-mono text-gray-400 hover:text-accent transition-colors"
        >
          <span className="transition-colors">full journey</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
