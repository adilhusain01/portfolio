import { ScrambleText } from "@/components/scramble-text"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery",
  description: "A synchronized visual record of my life and travels.",
}

async function getImages() {
  try {
    // Adding revalidate: 60 syncs the cache every 1 minute.
    const res = await fetch(
      "https://api.github.com/repos/adilhusain01/images/contents/portfolio-gallery",
      {
        next: { revalidate: 60 },
      },
    )

    if (!res.ok) {
      return []
    }

    const data = await res.json()

    // Filter to only include true image files
    return data.filter(
      (file: any) =>
        file.type === "file" && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name),
    )
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return []
  }
}

export default async function GalleryPage() {
  const images = await getImages()

  // Helper to create a randomized-looking, but deterministic asymmetric grid
  const getSpan = (index: number) => {
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
    return patterns[index % patterns.length]
  }

  return (
    <main className="animate-fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="gallery" />
      </h1>

      <p className="text-sm sm:text-base text-gray-400 mb-10 sm:mb-12 leading-relaxed max-w-full">
        A real-time synced board of life fragments. Pulled directly from my
        GitHub repository seamlessly as an asymmetric masonry grid.
      </p>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 auto-rows-[150px] md:auto-rows-[200px] grid-flow-dense">
          {images.map((image: any, index: number) => (
            <div
              key={image.sha}
              className={`relative group overflow-hidden border border-gray-800 hover:border-accent/50 transition-colors bg-gray-900/20 ${getSpan(index)}`}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
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
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-gray-800 p-12 text-center text-gray-500 font-mono text-sm group hover:border-gray-600 transition-colors">
          <p>404: gallery empty</p>
          <p className="mt-2 text-gray-400 text-xs">
            Waiting for images to be pushed to{" "}
            <code className="text-accent">
              adilhusain01/images/portfolio-gallery
            </code>
            ...
          </p>
        </div>
      )}
    </main>
  )
}
