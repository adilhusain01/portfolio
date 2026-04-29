import Link from "next/link"

// A small curated set of gallery images for the homepage preview
// These match the same sources/style as gallery/page.tsx (GitHub images repo)
// We'll use a static deterministic subset to avoid the async fetch on the home page
const PREVIEW_GALLERY_IMAGES = [
  "https://raw.githubusercontent.com/adilhusain01/images/main/portfolio-gallery/1.jpg",
  "https://raw.githubusercontent.com/adilhusain01/images/main/portfolio-gallery/2.jpg",
  "https://raw.githubusercontent.com/adilhusain01/images/main/portfolio-gallery/3.jpg",
  "https://raw.githubusercontent.com/adilhusain01/images/main/portfolio-gallery/4.jpg",
  "https://raw.githubusercontent.com/adilhusain01/images/main/portfolio-gallery/5.jpg",
  "https://raw.githubusercontent.com/adilhusain01/images/main/portfolio-gallery/6.jpg",
  "https://raw.githubusercontent.com/adilhusain01/images/main/portfolio-gallery/7.jpg",
  "https://raw.githubusercontent.com/adilhusain01/images/main/portfolio-gallery/8.jpg",
]

// Mirror the same tile patterns as gallery/page.tsx
const patterns = [
  "md:col-span-2 md:row-span-2 col-span-2 row-span-2", // Large square
  "md:col-span-1 md:row-span-2 col-span-1 row-span-2", // Tall
  "md:col-span-1 md:row-span-1 col-span-1 row-span-1", // Small square
  "md:col-span-2 md:row-span-1 col-span-2 row-span-1", // Wide
  "md:col-span-1 md:row-span-1 col-span-1 row-span-1", // Small square
  "md:col-span-1 md:row-span-2 col-span-1 row-span-2", // Tall
  "md:col-span-2 md:row-span-2 col-span-2 row-span-2", // Large square
  "md:col-span-1 md:row-span-1 col-span-1 row-span-1", // Small square
]

export async function GallerySection() {
  // Fetch live images from GitHub (same as gallery page) — limit to 8
  let images: { sha: string; name: string; download_url: string }[] = []

  try {
    const res = await fetch(
      "https://api.github.com/repos/adilhusain01/images/contents/portfolio-gallery",
      { next: { revalidate: 60 } },
    )
    if (res.ok) {
      const data = await res.json()
      images = data
        .filter(
          (file: any) =>
            file.type === "file" && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name),
        )
        .slice(0, 8)
    }
  } catch {
    // silently fall back to empty
  }

  const hasImages = images.length > 0

  return (
    <section
      className="mb-12 sm:mb-16 animate-fade-in-up"
      style={{ animationDelay: "380ms", animationFillMode: "both" }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-white">
        <span className="text-accent mr-2">*</span> gallery
      </h2>

      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        Some delicate moments of my life.
      </p>

      {hasImages ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 auto-rows-[100px] md:auto-rows-[120px] grid-flow-dense">
          {images.map((image, index) => (
            <Link
              key={image.sha}
              href="/gallery"
              className={`relative group overflow-hidden border border-gray-800 hover:border-accent/50 transition-colors bg-gray-900/20 ${patterns[index % patterns.length]}`}
            >
              <img
                src={image.download_url}
                alt={image.name}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute px-4 pb-4 pt-8 bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-gray-300 font-mono truncate">
                  {image.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-gray-800 p-8 text-center text-gray-500 font-mono text-sm hover:border-gray-600 transition-colors">
          <p>gallery empty</p>
        </div>
      )}

      <div className="mt-6 sm:mt-8 flex justify-end">
        <Link
          href="/gallery"
          className="group flex items-center text-sm font-mono text-gray-400 hover:text-accent transition-colors"
        >
          <span className="transition-colors">see full gallery</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
