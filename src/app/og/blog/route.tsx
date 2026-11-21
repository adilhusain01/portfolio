import { ogCard } from "@/lib/og-card"

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams
  return ogCard({
    title: params.get("title") ?? "Writing",
    line: params.get("top") ?? "Writing by Adil Husain",
    photo: new URL("/adil.jpg", request.url).toString(),
  })
}
