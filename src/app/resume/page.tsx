import { Download } from "lucide-react"
import { ScrambleText } from "@/components/scramble-text"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume",
  description: "Adil Husain's Resume",
}

export default function ResumePage() {
  return (
    <main className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold text-white">
          <span className="text-accent mr-2">*</span>
          <ScrambleText text="resume" />
        </h1>
        <a
          href="/Resume.pdf"
          download="Adil_Husain_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 hover:border-gray-500 rounded-md text-sm text-gray-300 hover:text-white transition-colors"
        >
          <Download className="w-4 h-4" />
          download pdf
        </a>
      </div>

      <div className="space-y-12 text-gray-300 leading-relaxed max-w-full">
        {/* Header section in Resume */}
        <section className="border-b border-gray-800 pb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Adil Husain</h2>
          <p className="text-sm text-gray-500 mb-4">+91 8604135956 | Mohammadi, Uttar Pradesh, India - 262804</p>
          <div className="flex gap-4 text-sm text-accent underline underline-offset-4">
            <a href="mailto:husainadil202@gmail.com" className="hover:text-white transition-colors">husainadil202@gmail.com</a>
            <a href="https://github.com/adilhusain01" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/adil-husain" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-accent">&gt;</span> Experience
          </h3>
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <a href="https://www.linkedin.com/company/techbug-official" target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-gray-500 hover:decoration-accent hover:text-accent transition-colors">Full Stack Developer Intern</a>
                <span className="font-normal text-gray-400">| Techbug</span>
              </h4>
              <span className="text-xs text-gray-500">Jul 2024 - Oct 2024</span>
            </div>
            <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-400">
              <li>Engineered CMS dashboard increasing content update efficiency by 50%, integrating Google Analytics for real-time insights.</li>
              <li>Enforced JWT-based authorization with role-based access control, reducing unauthorized access attempts by 90%.</li>
              <li>Improved application performance by 65% through server-side pagination and nested child pagination strategies.</li>
              <li>Developed automated email system reducing manual notification processes by 100%, triggering alerts for newsletter subscriptions and low product quantities.</li>
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-accent">&gt;</span> Projects
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <a href="https://never-pay.vercel.app" target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-gray-500 hover:decoration-accent hover:text-accent transition-colors">NeverPay</a>
                  <span className="font-normal text-xs text-gray-400">NextJs, Solidity, AaveV3, LI.FI, Gemini, TailwindCSS</span>
                </h4>
                <span className="text-xs text-gray-500">Feb 2026</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-400">
                <li>Built NeverPay, a DeFi-powered AI platform where users deposit USDC once to earn perpetual credits from Aave V3 yield farming for platform credits which can be used at the marketplace on things like Image generation, conversion tools etc and much more, while retaining full principal withdrawal rights at any time.</li>
                <li>Implemented YieldVault.sol smart contract on Base Sepolia for automated aUSDC yield accrual and credit minting (50 credits per $1 USDC), cross-chain deposit bridging via LI.FI, real-time Next.js 16 dashboard with wagmi + RainbowKit, and secure API routes for Gemini AI.</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <a href="https://claw-pay.vercel.app" target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-gray-500 hover:decoration-accent hover:text-accent transition-colors">ClawPay</a>
                  <span className="font-normal text-xs text-gray-400">ReactJs, FastAPI, Solidity, Lithic API, TailwindCSS, OpenClaw</span>
                </h4>
                <span className="text-xs text-gray-500">Feb 2026</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-400">
                <li>Developed secure autonomous payment layer for AI agents enabling purchases on any Visa/Mastercard website using single-use virtual cards backed by USDC in on-chain escrow on Arbitrum Sepolia, eliminating merchant opt-in, persistent card exposure, and human intervention while keeping full user control of funds.</li>
                <li>Engineered Solidity escrow contract, FastAPI backend with Lithic API for exact spend-limit single-use cards, and MCP server tools for seamless integration with Claude/OpenClaw agents via ethers.js.</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <a href="https://taas-nine.vercel.app" target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-gray-500 hover:decoration-accent hover:text-accent transition-colors">TAAS</a>
                  <span className="font-normal text-xs text-gray-400">ReactJs, Solidity, TailwindCSS</span>
                </h4>
                <span className="text-xs text-gray-500">Oct 2025</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-400">
                <li>Developed a decentralized escrow system for rental agreements on the TON blockchain, enabling trustless transactions between landlords and tenants with automated deposit management and smart contract-enforced terms.</li>
                <li>Engineered a yield generation mechanism that automatically stakes security deposits at 5% APY during rental terms, returning the principal to tenants and distributing generated yield to landlords, creating a mutually beneficial financial model.</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <a href="https://vibeee.vercel.app" target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-gray-500 hover:decoration-accent hover:text-accent transition-colors">VIBE</a>
                  <span className="font-normal text-xs text-gray-400">ReactJs, NodeJs, TailwindCSS, MongoDB, AWS Bedrock</span>
                </h4>
                <span className="text-xs text-gray-500">Nov 2024</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-400">
                <li>Created an educational gaming platform featuring quizzes generated from PDFs, prompts, YouTube video links, or webpage URLs, along with a fact-checking game based on topic inputs using AWS Bedrock API’s AI.</li>
                <li>Implemented a reward model to incentivize participants, where the game initiator deposits a predefined budget via their crypto wallet, calculated based on the number of questions, participants, and reward per score, boosting user retention by 30%-70%.</li>
                <li>Incorporated server-side caching using Redis to optimize data retrieval, reduce server load, and enhance response time.</li>
              </ul>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <a href="https://github.com/adilhusain01/AIR" target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-gray-500 hover:decoration-accent hover:text-accent transition-colors">AIR</a>
                  <span className="font-normal text-xs text-gray-400">ReactJs, Django, SQLite, WebSocket, TailwindCSS, Gemini API</span>
                </h4>
                <span className="text-xs text-gray-500">Apr 2024</span>
              </div>
              <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-400">
                <li>Constructed a real-time chat application using Google Gemini API for AI-powered message suggestions, image descriptions, and sentiment analysis.</li>
                <li>Made the auto chat suggestion based on the ongoing chat flow, tone and behavior paving the conversations more fruitful and improving conversation efficiency by 50%.</li>
                <li>Incorporated sentiment analysis to provide insights into conversation tone, helping maintain professionalism in communication.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-accent">&gt;</span> Technical Skills
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><span className="font-semibold text-white">Languages:</span> JavaScript, Java, Python, SQL, CSS, HTML, Solidity</li>
            <li><span className="font-semibold text-white">Frameworks & Tech:</span> NodeJs, ReactJs, PostgreSQL, MongoDB, TailwindCSS, Redis, Git, Linux Scripting, AWS EC2, AWS S3</li>
          </ul>
        </section>

        {/* Certificates */}
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-accent">&gt;</span> Certificates
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex justify-between items-baseline">
              <span>Data Structure and Algorithms | Boards Infinity</span>
              <span className="text-xs text-gray-500">Oct 2024</span>
            </li>
          </ul>
        </section>

        {/* Education */}
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-accent">&gt;</span> Education
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <div>
                <h4 className="font-semibold text-white">Lovely Professional University <span className="font-normal text-xs text-gray-400 ml-1">Jalandhar, Punjab</span></h4>
                <p className="text-sm text-gray-400">Computer Science Engineering</p>
              </div>
              <span className="text-xs text-gray-500">Since 2022</span>
            </div>
            <div className="flex justify-between items-baseline">
              <div>
                <h4 className="font-semibold text-white">Doon Public School <span className="font-normal text-xs text-gray-400 ml-1">Mohammadi, Uttar Pradesh</span></h4>
                <p className="text-sm text-gray-400">Intermediate with Science</p>
              </div>
              <span className="text-xs text-gray-500">2019 - 2021</span>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-accent">&gt;</span> Achievements
          </h3>
          <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-400">
            <li>TOKEN2049 Origins hackathon Singapore - 3rd prize ($1.5K) <span className="text-xs text-gray-500 ml-2">Oct 2025</span></li>
            <li>Microsoft x InnoQuest Ideathon - 2nd position <span className="text-xs text-gray-500 ml-2">Oct 2025</span></li>
            <li>Somnia DeFi hackathon - 2nd prize ($1.5K) <span className="text-xs text-gray-500 ml-2">Sep 2025</span></li>
            <li>Somnia mini games Hackathon - 2nd prize ($100) <span className="text-xs text-gray-500 ml-2">Aug 2025</span></li>
            <li>TRON HackaTron Season 7 - 4th prize ($8K) <span className="text-xs text-gray-500 ml-2">Nov 2024</span></li>
          </ul>
        </section>

      </div>
    </main>
  )
}
