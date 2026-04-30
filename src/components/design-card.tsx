"use client"

import { motion } from "framer-motion"
import { ProjectEntry } from "@/lib/projects"
import { ArrowRight, Globe } from "lucide-react"
import Link from "next/link"

export function DesignCard({ design, index }: { design: ProjectEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
      viewport={{ once: true }}
      className="group relative h-[400px] sm:h-[500px] w-full overflow-hidden rounded-xl border border-gray-800 bg-[#111317]/50 transition-all hover:border-accent/40"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {design.image && (
          <img
            src={design.image}
            alt={design.title}
            className="h-full w-full object-cover opacity-30 grayscale transition-all duration-1000 group-hover:scale-105 group-hover:opacity-50 group-hover:grayscale-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop`;
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              className="mb-2 flex items-center gap-2"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
                Design {design.period && `• ${design.period}`}
              </span>
              <div className="h-px w-8 bg-gray-800" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              className="mb-3 text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-accent transition-colors"
            >
              {design.title.toLowerCase()}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
              className="text-sm sm:text-base text-gray-400 leading-relaxed"
            >
              {design.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
            className="flex flex-col items-start md:items-end gap-5 shrink-0"
          >
            <div className="flex flex-wrap items-center gap-5 md:flex-row-reverse">
              <Link
                href={`/projects/${design.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center text-xs font-mono text-gray-400 group-hover:text-accent transition-colors gap-1.5"
              >
                SEE MORE
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <div className="flex items-center gap-3">
                {design.github && (
                  <Link
                    href={design.github}
                    target="_blank"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                    title="Source Code"
                  >
                    <img src="/gh-shadowed.png" alt="GitHub" className="w-5 h-5 object-contain" />
                  </Link>
                )}
                {design.href && (
                  <Link
                    href={design.href}
                    target="_blank"
                    className="text-gray-400 hover:text-accent transition-colors"
                    title="Live Site"
                  >
                    <Globe className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 md:justify-end">
              {design.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 text-[9px] font-mono text-gray-500 bg-gray-800/30 rounded border border-gray-800/50"
                >
                  {tech.toLowerCase()}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>


    </motion.div>
  )
}
