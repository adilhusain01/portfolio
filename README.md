# Adil Husain, portfolio

The source of [adilhusain.dev](https://adilhusain.dev): my work, projects, hackathon prizes, writing and photos, on a cream page that is meant to feel lived in.

The home page opens on a full-height photo of me on a beach, with my name set behind me. Below it sit my work history, projects, every hackathon prize with photos from the day, a camera roll you can drag around, writing, and the tools I use as logos that open each tool's site. Project pages pull their README from GitHub and render it with diagrams, maths and highlighted code.

## Stack

Next.js 16 (app router) with React 19 and TypeScript, Tailwind CSS 3 for every style, Framer Motion for the camera roll, MDX for posts, Shiki for code, Mermaid for diagrams and KaTeX for maths. Tool logos are copied from Simple Icons (CC0) into `src/components/home/logos.ts`. Do not import the `simple-icons` package itself: its entry file is one 5 MB module, and it held the dev server at 600% CPU.

## Getting started

You need Node.js 20 or later. Nothing else is required. Project pages fetch their README from GitHub, which allows 60 anonymous calls an hour, so for heavy local testing or on the live site you can set `GITHUB_TOKEN` (see `.env.example`) to raise that to 5,000.

```bash
git clone git@github.com:adilhusain01/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open http://localhost:3000.

Type errors do not stop `next build` (`typescript.ignoreBuildErrors` is on), so check them yourself before you push:

```bash
npx tsc --noEmit
npm run build
```

## Where things live

- `src/app/`: the pages. `page.tsx` is the home page; `projects`, `achievements` (the hackathons), `blog`, `system-design`, `gallery` and `resume` hold the rest. `og/` draws the share cards.
- `src/components/home/`: the hero, camera roll, tool logos and other home page pieces.
- `src/components/site/`: the nav, footer, page header, keys, project tiles and the photo viewer shared by every page.
- `src/lib/`: the content as data. `projects.ts`, `achievements.ts`, `work.ts`, `journey.ts` (the resume story) and `system-design.ts` are where you add or edit entries. `vision.ts` holds the detection boxes and pose points drawn over the hackathon stage photo.
- `posts/`: blog posts in MDX.
- `public/me/`: the hero photo, its cutout and the face used on share cards. `public/Adil_Husain_Web_Developer_Resume.pdf` is the file the Resume page offers.

## Design

Colours, type and shadows come from one set of tokens in `tailwind.config.ts`: paper `#F2EBDD`, sheet `#FAF6EE`, ink `#1F1B16` and one pen blue `#2948A6`, with Young Serif for headings, Hanken Grotesk for text and Kalam for the handwritten notes. Things you can press cast a shadow; things you only read sit flat. Corners are rectangles, never pills, and motion respects reduced-motion settings.

## Deploying

Pushes to `main` deploy the live site, so work on a branch. Every branch push gets its own preview.
