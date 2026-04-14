export type SystemDesignEntry = {
  slug: string
  title: string
  description: string
  role: string
  period: string
  achievements: string[]
  technologies: string[]
  github: string
}

export const systemDesign: SystemDesignEntry[] = [
  {
    slug: "enterprise-nodejs-scaling-aws-eks",
    title: "enterprise node.js scaling to aws eks",
    description:
      "A complete guide and implementation for scaling a monolith Node.js API to AWS EKS. Includes Dockerization, Kubernetes manifests, CI/CD with GitHub Actions, and load testing.",
    role: "developer",
    period: "december 2024",
    achievements: [],
    technologies: [
      "kubernetes",
      "aws eks",
      "docker",
      "github actions",
      "node.js",
      "load testing",
    ],
    github: "https://github.com/adilhusain01/Clustering",
  },
  {
    slug: "high-performance-nodejs-multithreading-rust",
    title: "high-performance node.js: multithreading & rust",
    description:
      "Architectural implementation of advanced Node.js performance patterns using Worker Threads, Clusters, and Rust WebAssembly via Neon. Includes detailed benchmarks.",
    role: "developer",
    period: "january 2025",
    achievements: [],
    technologies: [
      "rust",
      "webassembly",
      "neon",
      "node.js",
      "worker threads",
      "performance",
    ],
    github: "https://github.com/adilhusain01/Multithreading",
  },
]

export function getSystemDesignBySlug(slug: string): SystemDesignEntry | null {
  return systemDesign.find((entry) => entry.slug === slug) ?? null
}
