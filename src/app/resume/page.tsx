import { Download } from "lucide-react"
import { ScrambleText } from "@/components/scramble-text"
import { AchievementGallery } from "@/components/achievement-gallery"
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
    <div className="relative pl-8 md:pl-0 group">
      <div className="md:hidden absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#0d1117] border border-gray-600 group-last:hidden" />
      <div className="md:grid md:grid-cols-5 md:gap-8 items-start">
        <div className="md:col-span-1 border-b md:border-b-0 border-gray-800/50 pb-2 md:pb-0 mb-4 md:mb-0 md:text-right">
          <div className="text-sm font-mono text-gray-400 md:mt-1.5">
            {date}
          </div>
        </div>
        <div className="md:col-span-4 relative md:border-l border-gray-800 md:pl-10 pb-16 md:pb-32 group-last:pb-0 group-last:border-transparent">
          {/* Timeline Node */}
          <div
            className={`hidden md:block absolute -left-[6.5px] top-1.5 w-3 h-3 rounded-full border-2 ${active ? "bg-accent border-accent shadow-[0_0_10px_rgba(0,229,255,0.5)]" : "bg-[#0d1117] border-gray-600"}`}
          />

          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 flex items-center group-hover:text-accent transition-colors">
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

function SentenceBulletedText({ text }: { text: string }) {
  return (
    <div className="space-y-2 text-gray-300 text-base leading-relaxed">
      {text.split(/\.\s+/).map((sentence, index, array) => {
        const content = index < array.length - 1 ? `${sentence}.` : sentence
        return (
          <p key={`${sentence}-${index}`} className="flex gap-2">
            <span className="text-accent">&gt;</span>
            <span>{content}</span>
          </p>
        )
      })}
    </div>
  )
}

export default function ResumePage() {
  return (
    <main className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          <span className="text-accent mr-2">*</span>
          <ScrambleText text="resume & journey" />
        </h1>
        <a
          href="/Adil_Husain_Web_Developer_Resume.pdf"
          download="Adil_Husain_Web_Developer_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-[max-content] items-center justify-center gap-2 px-4 py-2 border border-gray-700 hover:border-gray-500 hover:text-white rounded-md text-sm text-gray-300 transition-colors"
        >
          <Download className="w-4 h-4" />
          download pdf
        </a>
      </div>

      <p className="text-sm sm:text-base text-gray-400 mb-12 sm:mb-16 leading-relaxed max-w-full">
        A timeline of my journey. PDF consists a formal copy of my resume.
        Explore the context and stories behind my milestones below.
      </p>

      <div className="space-y-16 md:space-y-0">
        <TimelineItem
          date="Present '26"
          title="Breaking Architecture Limits"
          role="Systems Engineering"
          active={true}
        >
          <SentenceBulletedText text="I bypassed the ceiling of single-threaded Node.js and started tearing apart Javascript's internal execution structure. I implemented PM2 clustering, pushed Docker containers to AWS EKS with Horizontal Pod Autoscaling, and benchmarked Rust Axum microservices against Piscina thread pooling. This resulted in scaling architectural throughput to 150,000+ RPS and dropping operational latencies to 6ms using asynchronous Redis/BullMQ task orchestration." />
        </TimelineItem>

        <TimelineItem
          date="Feb 10–12 2026"
          title="Consensus Hong Kong 2026"
          role="Hong Kong · conference & hackathon"
        >
          <div className="space-y-6">
            <SentenceBulletedText text="After a rejection last year, I finally made it into Consensus Hong Kong and the EasyA hackathon. The event was all deal flow, institution-scale Web3 energy, and elite networking at the Hong Kong Convention & Exhibition Centre." />

            <div className="flex flex-wrap gap-2">
              {[
                "Consensus",
                "hackathon",
                "Web3",
                "institutional",
                "deal flow",
                "Asia",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-gray-800 bg-gray-900/30 px-3 py-1 text-xs uppercase tracking-[0.22em] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <AchievementGallery
              gallery={[
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776629741/photo_2026-04-20_01.43.06_v9ltqt.jpg",
              ]}
              event="Consensus Hong Kong 2026"
              useTilePattern
            />
          </div>
        </TimelineItem>

        <TimelineItem
          date="Sep 30 – Oct 10 2025"
          title="Malaysia Road Trip"
          role="Kuala Lumpur & beyond"
        >
          <div className="space-y-6">
            <SentenceBulletedText text="The day after TOKEN2049, I crossed into Malaysia and spent the next week exploring Kuala Lumpur and the region. The twin towers were surreal, the second tallest building was humongous, and the Batu Caves were absolutely unforgettable. I stayed in a hostel in Kuala Lumpur, drank a lot of cold coffee, rode the metro and rail, and got lost in a huge local food market. The mosques were beautifully calm, the people were kind and helpful, and the centre mall felt incredible. I tried the new clothes I picked up at the Singapore events and they were dope. On the last day I returned to Singapore and flew home to Chennai from there." />

            <div className="flex flex-wrap gap-2">
              {[
                "Malaysia",
                "Kuala Lumpur",
                "Batu Caves",
                "twin towers",
                "hostel",
                "coffee",
                "food market",
                "mosque",
                "mall",
                "travel",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-gray-800 bg-gray-900/30 px-3 py-1 text-xs uppercase tracking-[0.22em] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <AchievementGallery
              gallery={[
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668155/photo_2026-04-20_12.19.28_jtmay3.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668154/photo_2026-04-20_12.19.28_1_yh8vfh.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668154/photo_2026-04-20_12.19.27_vjecgu.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668153/photo_2026-04-20_12.19.26_tvesl5.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668152/photo_2026-04-20_12.19.25_pymbtc.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668151/photo_2026-04-20_12.19.25_1_wq0ump.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668150/photo_2026-04-20_12.19.24_agux5h.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668149/photo_2026-04-20_12.19.23_qc69i5.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668146/photo_2026-04-20_12.19.21_qi4bdz.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668146/photo_2026-04-20_12.19.20_rhmuja.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668145/photo_2026-04-20_12.19.19_w5orjk.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668144/photo_2026-04-20_12.19.17_o5mqp8.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668142/photo_2026-04-20_12.19.15_1_br50e6.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668140/photo_2026-04-20_12.19.13_z4vutc.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668139/photo_2026-04-20_12.19.13_1_ix6eca.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668139/photo_2026-04-20_12.19.12_r6vvkp.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668137/photo_2026-04-20_12.19.11_k3dklr.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668137/photo_2026-04-20_12.19.11_1_j2sjbi.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668136/photo_2026-04-20_12.19.10_yu1vl5.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668134/photo_2026-04-20_12.19.10_1_rbelxw.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668133/photo_2026-04-20_12.19.09_i1dbeo.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668132/photo_2026-04-20_12.19.08_nmaucj.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668131/photo_2026-04-20_12.19.08_1_xcbjxn.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668131/photo_2026-04-20_12.19.07_odrhrz.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668130/photo_2026-04-20_12.19.06_nak46l.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668129/photo_2026-04-20_12.19.05_dnt6tg.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668129/photo_2026-04-20_12.19.06_1_iqbsqv.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668127/photo_2026-04-20_12.19.05_1_jzapqo.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668127/photo_2026-04-20_12.19.04_tnpcrl.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668126/photo_2026-04-20_12.19.04_1_feuyxj.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668126/photo_2026-04-20_12.19.03_ja4fn9.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668126/photo_2026-04-20_12.19.02_e9hvo8.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668125/photo_2026-04-20_12.19.03_1_gay6kp.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668124/photo_2026-04-20_12.19.01_xl3jwg.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668123/photo_2026-04-20_12.19.01_1_qllouc.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668123/photo_2026-04-20_12.19.00_idbc5l.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668123/photo_2026-04-20_12.18.59_ripxyh.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668123/photo_2026-04-20_12.19.00_1_jd51ov.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668121/photo_2026-04-20_12.18.59_1_ibcvvn.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668120/photo_2026-04-20_12.18.58_1_ms7azk.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776668120/photo_2026-04-20_12.18.58_wvrxqp.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667924/photo_2026-04-20_12.18.57_lw6ay5.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667923/photo_2026-04-20_12.18.57_1_qgbd5w.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667895/photo_2026-04-20_12.18.56_1_ahrdgp.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667895/photo_2026-04-20_12.18.56_oeqzzr.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667894/photo_2026-04-20_12.18.55_quesfb.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667893/photo_2026-04-20_12.18.53_y1s0xs.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667893/photo_2026-04-20_12.18.54_xwtetf.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667893/photo_2026-04-20_12.18.55_1_iimsnp.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667892/photo_2026-04-20_12.18.53_1_todlfp.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667892/photo_2026-04-20_12.18.52_j6evpn.jpg",
              ]}
              event="TOKEN2049 Origins Singapore"
              useTilePattern
            />
          </div>
        </TimelineItem>

        <TimelineItem
          date="Sep 30 – Oct 2 2025"
          title="TOKEN2049 Origins Singapore"
          role="Singapore · Marina Bay Sands hackathon & expo"
        >
          <div className="space-y-6">
            <SentenceBulletedText text="I landed in Singapore for TOKEN2049 Origins and the expo at Marina Bay Sands, and it was one of the best travel/hackathon combos yet. The metro and the weather were effortless, the top-deck view felt like a knockoff LA skyline, and the hackathon energy at the expo center was absolutely electric. Between the market haul and buying a trolley for goodies, winning quiz hampers, and meeting people from around the world, the trip was a rich blend of blockchain, culture, and sheer energizing fun. I even made time for the Museum of Ice Cream on a fast Singapore city loop. I felt low after the first day and stepped away to roam the city, convinced I had missed my shot. The next morning I found out I had actually won—a prize I nearly left behind in ignorance—and it was the happiest turnaround of the trip." />

            <div className="flex flex-wrap gap-2">
              {[
                "TOKEN2049",
                "hackathon",
                "Marina Bay",
                "expo",
                "metro",
                "museum",
                "diversity",
                "markets",
                "networking",
                "firehose",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-gray-800 bg-gray-900/30 px-3 py-1 text-xs uppercase tracking-[0.22em] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <AchievementGallery
              gallery={[
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776622058/52_i4qreu.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776622059/54_l4fwiw.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776622057/51_xlh3ye.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666779/photo_2026-04-20_12.00.56_hdsumz.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666779/photo_2026-04-20_12.00.57_hzrvme.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666779/photo_2026-04-20_12.00.20_yxwqbj.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666779/photo_2026-04-20_12.00.58_1_ekhmn1.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666779/photo_2026-04-20_12.00.50_v2sdj3.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666779/photo_2026-04-20_12.00.58_cexist.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666780/photo_2026-04-20_12.01.00_ccyf4q.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666780/photo_2026-04-20_12.01.01_1_xxmsjb.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666780/photo_2026-04-20_12.01.01_glx2th.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666780/photo_2026-04-20_12.01.02_rzh4oh.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666781/photo_2026-04-20_12.01.04_jsdvyu.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666782/photo_2026-04-20_12.01.05_1_bv7na9.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666782/photo_2026-04-20_12.01.05_nlhpry.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666782/photo_2026-04-20_12.01.06_mbypte.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666783/photo_2026-04-20_12.01.08_xqqc86.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666783/photo_2026-04-20_12.01.09_1_cnbrkd.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666784/photo_2026-04-20_12.01.09_nfc7rp.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666784/photo_2026-04-20_12.01.10_nr6gdw.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666784/photo_2026-04-20_12.01.11_ldswyf.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666785/photo_2026-04-20_12.01.12_1_tznrbf.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666786/photo_2026-04-20_12.01.13_ys7cdv.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666787/photo_2026-04-20_12.01.14_kllncc.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666786/photo_2026-04-20_12.01.14_1_ubuao9.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776666785/photo_2026-04-20_12.01.12_va3ryq.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776667408/photo_2026-04-20_12.13.06_vbzvu3.jpg",
              ]}
              event="TOKEN2049 Origins Singapore"
              useTilePattern
            />
          </div>
        </TimelineItem>

        <TimelineItem
          date="Dec 6–8 2024"
          title="ETHIndia + FIL Bangalore"
          role="Bengaluru · hackathon chaos & city roam"
        >
          <div className="space-y-6">
            <SentenceBulletedText text="Three days of ETHIndia and FIL Bangalore with a frozen laptop and no phone — I became a city wanderer, paying cash, chasing delivery updates, and still squeezing in table football, table tennis, and endless foodie runs." />

            <div className="flex flex-wrap gap-2">
              {[
                "offline",
                "city hunt",
                "hackathon",
                "table football",
                "foodie",
                "sapno ka baaraat",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-gray-800 bg-gray-900/30 px-3 py-1 text-xs uppercase tracking-[0.22em] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <AchievementGallery
              gallery={[
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776624429/IMG_1524_ugltjm.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776624713/IMG_1535_qptgzw.jpg",
              ]}
              event="ETHIndia + FIL Bangalore"
              useTilePattern
            />
          </div>
        </TimelineItem>

        <TimelineItem
          date="Dec 4–5 2024"
          title="India Blockchain Week"
          role="Bangalore · conference + afterparty"
        >
          <div className="space-y-6">
            <SentenceBulletedText text="Two days at India Blockchain Week in Bangalore—high-voltage keynotes, sharp Web3 panels, and a final-night afterparty that sealed the event." />

            <div className="flex flex-wrap gap-2">
              {[
                "keynotes",
                "panels",
                "workshops",
                "networking",
                "afterparty",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full border border-gray-800 bg-gray-900/30 px-3 py-1 text-xs uppercase tracking-[0.22em] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <AchievementGallery
              gallery={[
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776622532/photo_2026-04-19_23.40.36_hjsri2.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776623035/IMG_1472_xg8lqf.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776623046/IMG_1469_yomlpb.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776622997/IMG_1527_dxdtap.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776623015/IMG_1488_vx4ap4.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776625059/IMG_1473_fo2yhj.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776623003/IMG_1513_iemmbq.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776623079/IMG_1449_z7ihms.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776623068/IMG_1458_fjwfnd.jpg",
                "https://res.cloudinary.com/djxuqljgr/image/upload/v1776623058/IMG_1460_agzblr.png",
              ]}
              event="India Blockchain Week"
              useTilePattern
            />
          </div>
        </TimelineItem>

        <TimelineItem
          date="Jul '24 - Oct '24"
          title="Professional Leap: Techbug"
          role="Full Stack Developer Intern"
        >
          <SentenceBulletedText text="Built and deployed scalable Node.js and React.js applications and CMS dashboards using Docker, AWS EC2/S3, Cloudinary, and Google Analytics. Implemented JWT-based authentication with RBAC and improved API reliability with Redis caching, rate limiting, and optimized queries. Enhanced scalability and response times with server-side pagination, indexing, and Node.js clustering using worker threads. Developed an event-driven email system to automate user and inventory alerts, removing manual processes." />
        </TimelineItem>

        <TimelineItem
          date="Early 2024"
          title="Getting Off The Ground"
          role="Full Stack Foundations"
        >
          <SentenceBulletedText text="Started aggressively building intensive full-stack systems beyond standard CRUD apps. Developed AIR, a real-time WebSocket chat application leveraging Django and native SQLite seamlessly interwoven with the Gemini API to execute on-the-fly sentiment analysis and message prediction engines." />
        </TimelineItem>
      </div>
    </main>
  )
}
