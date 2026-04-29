"use client"
import { useEffect } from "react"

export function ClickSound() {
  useEffect(() => {
    // Preload the audio to avoid delay on the first click
    const audio = new Audio("/mouse-click.wav")
    audio.load()

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check if the clicked element or any of its parents is a link or a button
      if (target.closest("a") || target.closest("button")) {
        // Clone the audio node so rapid clicks overlap properly instead of cutting off
        const clickAudio = audio.cloneNode() as HTMLAudioElement
        
        // Adjust volume if needed (0.5 is usually a good balance)
        clickAudio.volume = 0.5

        clickAudio.play().catch((err) => {
          // Browsers block audio before the first user interaction
          console.debug("Audio play blocked by browser:", err)
        })
      }
    }

    // Use the capture phase (true) so the sound plays even if a click event calls stopPropagation()
    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [])

  return null
}
