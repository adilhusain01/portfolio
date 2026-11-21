import { Metadata } from "next"
import { PhotoGrid } from "@/components/site/photo-grid"
import { PageHead } from "@/components/site/ui"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Adil Husain's trips and days off.",
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
  const photos = images.map((file: { download_url: string; name: string }) => ({ src: file.download_url, name: file.name }))

  return (
    <main className="pb-16">
      <PageHead title="Gallery" line="Some moments I wanted to keep. Press a photo to see it large." />
      <div className="border-t border-rule pt-10 sm:pt-14">
        {photos.length > 0 ? (
          <PhotoGrid photos={photos} label="Gallery" />
        ) : (
          <p className="text-[15px] text-ink-2">The photos did not load just now. Try again in a minute.</p>
        )}
      </div>
    </main>
  )
}
