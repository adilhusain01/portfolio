# Adil Husain — Engineering Archive & Portfolio

A high-performance, fun-first interactive portfolio built with **Next.js 16**, **Tailwind CSS**, and **Framer Motion**. This site serves as a cinematic archive of my engineering journey, featuring a blend of technical precision and creative motion design.

[adilhusain.xyz](https://adilhusain.xyz)

## ✨ Core Experience Features

- **Interactive ASCII Mascot**: A motion-based ASCII cat that exhibits various emotions and searches for interaction as you navigate.
- **Physics-driven UI**: 
  - **Magnetic Links**: Interactive elements that pull towards the cursor using physics-based attraction.
  - **Jelly Scrolling**: A custom "jelly" elastic scroll effect that makes page transitions feel fluid and tactile.
  - **Click Sparks**: Dynamic particle effects that respond to every interaction.
- **Cinematic Design Works**: A curated `/design` showcase featuring liquid-style creative studio experiences with GSAP-powered cinematic motion.
- **Engineering Archive**: A Markdown-driven system that automatically fetches and renders project READMEs from GitHub, supporting:
  - **Mermaid Diagrams**: Visualizing system architecture directly in the browser.
  - **Math Equations**: LaTeX support via KaTeX for technical documentation.
  - **Syntax Highlighting**: Beautiful code blocks powered by Shiki.
- **Real-time Technical Details**:
  - **Scroll Minimap**: A live preview of your position on the page.
  - **Spatial Sound**: Subtle, click-based audio feedback for a tactile browsing experience.
  - **AFK Detection**: Smart tab behavior that changes state when you're away.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v3/v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/), [Lenis](https://github.com/darkroomengineering/lenis)
- **Physics**: [Matter.js](https://brm.io/matter-js/)
- **Data & Content**: [MDX](https://mdxjs.com/), [Supabase](https://supabase.com/), [Upstash Redis](https://upstash.com/)
- **Visuals**: Three.js (for 3D design works), Canvas API, ASCII Art
- **Icons**: [Lucide React](https://lucide.dev/), Custom Shadowed Pixel Art

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable UI components (Magnetic, ScrambleText, ASCII elements).
- `src/lib/`: Core logic for project fetching, README rendering, and data structures.
- `posts/`: MDX blog content.
- `public/`: Assets including pixel-art icons and sound effects.

## 🎨 Design Philosophy

This portfolio follows a **"Engineering Meets Art"** philosophy. It prioritizes performance and technical depth while ensuring the user is "wowed" by micro-animations and physics. The aesthetic is a curated dark mode with gold (`#ff6b35`) accents, focused on high-impact sharing and cinematic storytelling.

---

Built with 🧡 by [Adil Husain](https://x.com/0xAdilHusain)
