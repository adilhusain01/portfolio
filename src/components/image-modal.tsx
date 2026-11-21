"use client"

import { useState, type ComponentPropsWithoutRef } from "react"
import { Lightbox } from "@/components/site/lightbox"

// An image in a README that opens full size when pressed.
export function ImageModal(props: ComponentPropsWithoutRef<"img">) {
  const [open, setOpen] = useState(false)
  const src = typeof props.src === "string" ? props.src : ""

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        alt={props.alt ?? ""}
        onClick={(event) => {
          setOpen(true)
          props.onClick?.(event)
        }}
        className={`${props.className ?? ""} cursor-zoom-in`}
      />
      {open && src ? <Lightbox images={[src]} index={0} label={props.alt || "Image"} onClose={() => setOpen(false)} /> : null}
    </>
  )
}
