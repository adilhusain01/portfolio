import { ImageResponse } from "next/og"

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) return await response.arrayBuffer()
  }
  throw new Error("failed to load font data")
}

// The share card matches the site: cream paper, ink type in Young Serif, and Adil's photo in the corner.
export async function ogCard({ title, line, photo }: { title: string; line: string; photo: string }) {
  const display = await loadGoogleFont("Young+Serif", title)
  const body = await loadGoogleFont("Hanken+Grotesk:wght@500", `${line}adilhusain.dev`)

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F2EBDD",
          padding: "72px 80px",
          fontFamily: "Hanken Grotesk",
          color: "#1F1B16",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 28, color: "#4E463A" }}>adilhusain.dev</span>
          <img src={photo} width={96} height={96} style={{ borderRadius: 18, objectFit: "cover", border: "6px solid #FAF6EE" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h1 style={{ fontFamily: "Young Serif", fontSize: title.length > 40 ? 64 : 84, lineHeight: 1.05, margin: 0, letterSpacing: "-0.02em", maxWidth: "92%" }}>{title}</h1>
          <span style={{ fontSize: 30, color: "#4E463A" }}>{line}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Young Serif", data: display, style: "normal" },
        { name: "Hanken Grotesk", data: body, style: "normal", weight: 500 },
      ],
    },
  )
}
