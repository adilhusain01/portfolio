export type DesignEntry = {
  title: string
  description: string
  image: string
  href: string
  github?: string
  technologies: string[]
  year: string
}

export const designs: DesignEntry[] = [
  {
    title: "sahar studios",
    description: "A bold, liquid-style creative studio landing experience with cinematic motion and immersive scroll interactions.",
    image: "https://saharstudios.adilhusain.xyz/og.webp",
    href: "https://saharstudios.vercel.app/",
    github: "https://github.com/adilhusain01/saharstudios",
    technologies: ["Next.js", "GSAP", "Framer Motion", "Lenis"],
    year: "2026"
  },
  {
    title: "veilverse",
    description: "An ethereal design concept for a digital fashion house, featuring shimmering textures and minimalist layout.",
    image: "https://veilverse.adilhusain.xyz/og.png",
    href: "https://veilverse.adilhusain.xyz",
    github: "https://github.com/adilhusain01/veilverse",
    technologies: ["React", "CSS Modules", "Three.js"],
    year: "2025"
  },
  {
    title: "studio peau",
    description: "A premium, skin-care focused creative studio design with organic shapes and soft color palettes.",
    image: "https://studiopeau.adilhusain.xyz/og.png",
    href: "https://studiopeau.adilhusain.xyz",
    github: "https://github.com/adilhusain01/StudioPeau",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    year: "2025"
  }
]
