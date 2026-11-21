import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

// One set of tokens for the whole site: cream paper, warm ink, and ballpoint blue.
// Blue is the hand on the page (notes in the margin, the camera's guesses, focus rings), never decoration.
// Every text colour is measured at 4.5:1 or better on paper, sheet and tray.
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Wide enough, and landscape enough, for the name to sit either side of the photo.
        wide: { raw: "(min-width: 1024px) and (min-aspect-ratio: 6/5)" },
      },
      fontFamily: {
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-young)", "Georgia", "serif"],
        hand: ["var(--font-kalam)", "ui-rounded", "cursive"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#F2EBDD", // the page
        sheet: "#FAF6EE", // raised: prints, sheets, keys
        tray: "#E7DECC", // pressed in: wells, the chosen tab
        rule: "#DDD3BF", // hairlines
        ink: {
          DEFAULT: "#1F1B16", // 14.4:1 on paper
          2: "#4E463A", // second text, 7.8:1
          3: "#6A6152", // captions, dates, 5.1:1
        },
        pen: {
          DEFAULT: "#2948A6", // ballpoint blue, 6.9:1
          deep: "#22398A",
          wash: "#DCE2F2", // a blue tint behind a chosen row
        },
        background: "#F2EBDD",
        foreground: "#1F1B16",
        accent: "#2948A6",
      },
      boxShadow: {
        key: "0 1px 0 rgb(31 27 22 / 0.06), 0 8px 18px -12px rgb(46 36 20 / 0.5)",
        "key-hover": "0 1px 0 rgb(31 27 22 / 0.06), 0 12px 22px -12px rgb(46 36 20 / 0.55)",
        print: "0 1px 1px rgb(31 27 22 / 0.08), 0 18px 30px -18px rgb(46 36 20 / 0.6)",
        lift: "0 2px 2px rgb(31 27 22 / 0.08), 0 28px 40px -20px rgb(46 36 20 / 0.6)",
        hair: "inset 0 0 0 1px #DDD3BF",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        move: "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      maxWidth: {
        page: "76rem",
        measure: "62ch",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        rise: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 400ms cubic-bezier(0.23, 1, 0.32, 1) both",
        rise: "rise 500ms cubic-bezier(0.23, 1, 0.32, 1) both",
      },
    },
  },
  plugins: [typography()],
} satisfies Config
