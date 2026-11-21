import { ogCard } from "@/lib/og-card"

export const runtime = "edge"

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("title")
  const title = raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : "Adil Husain"
  return ogCard({
    title,
    line: "Product engineer in Delhi",
    photo: new URL("/adil.jpg", request.url).toString(),
  })
}
