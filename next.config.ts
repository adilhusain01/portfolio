import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    // ppr: true,
    // reactCompiler: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Project previews live on each project's own site.
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io", pathname: "/a/09ir0bgwfb/**" },
      { protocol: "https", hostname: "**.adilhusain.dev" },
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "https", hostname: "saveposts.xyz" },
      { protocol: "https", hostname: "takemeds.fit" },
      { protocol: "https", hostname: "croppy.xyz" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/djxuqljgr/**" },
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/adilhusain01/**" },
    ],
  },
}

export default nextConfig
