"use client"

import { useState } from "react"
import type { WorkEntry } from "@/lib/work"

// One line per role that opens to every detail. Nothing is cut; it is folded.
export function WorkRows({ items, openFirst = false }: { items: WorkEntry[]; openFirst?: boolean }) {
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null)

  return (
    <ul className="divide-y divide-rule">
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `work-${index}`
        return (
          <li key={item.company}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-5 text-left"
            >
              <span className="min-w-0">
                <span className="text-lg font-semibold text-ink">{item.company}</span>
                <span className="block text-[15px] text-ink-2 sm:ml-2 sm:inline">{item.role}</span>
              </span>
              <span className="flex items-center gap-3 text-[15px] tabular-nums text-ink-3">
                <span className="whitespace-nowrap">
                  {item.start} to {item.end}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-6 w-6 place-items-center rounded-md bg-sheet text-ink shadow-key ring-1 ring-inset ring-rule transition-transform duration-200 ease-out ${isOpen ? "rotate-45" : ""}`}
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M6 1.5v9M1.5 6h9" />
                  </svg>
                </span>
              </span>
              <span className="col-span-2 max-w-measure text-[15px] leading-relaxed text-ink-2">{item.summary}</span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-label={`${item.company} details`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <ul className="max-w-measure space-y-3 pb-6 pl-0 sm:pl-4">
                  {item.details.map((detail) => (
                    <li key={detail.slice(0, 40)} className="relative pl-5 text-[15px] leading-relaxed text-ink-2">
                      <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-ink-3" />
                      {detail}
                    </li>
                  ))}
                  {item.place ? <li className="pl-5 text-[14px] text-ink-3">{item.place}</li> : null}
                </ul>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
