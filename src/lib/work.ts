export type WorkEntry = {
  company: string
  role: string
  place?: string
  start: string
  end: string
  summary: string
  details: string[]
  href?: string
}

// The home page shows the summary line; every detail opens under it and nothing is cut.
export const work: WorkEntry[] = [
  {
    company: "Synq AI",
    role: "Forward deployed engineer intern",
    place: "Gurugram",
    start: "Sep 2026",
    end: "now",
    summary: "Camera monitoring, voice control for a Mac agent, and automating the team's slow, manual work.",
    details: [
      "Built camera monitoring that runs on a GPU beside the camera and keeps working offline: person detection, tracking and pose, zones with seven alert rules, Slack alerts with the frame, a cloud dashboard and a daily PDF report with a timelapse. It is live on an office camera.",
      "Built voice control for a macOS agent that sees the screen and operates the computer, with hold-to-talk and a task loop that carries out a spoken request one action at a time. It shipped in the agent's 1.0 release in September 2026.",
      "Automated lead research in about a day. Background workers, one of them driving a real browser, find target companies and read rating agency releases; a model must quote its evidence, and code checks every quote and computes the score. It tracks about 1,000 companies and 2,000 leads, with 677 tests.",
      "Developed an AI office layout generator that turns a floor plan and a brief into layouts verified by a rule checker and exported as PDF and DXF, with company sign-in and attack tests from a security audit.",
      "Turned the operations team's written process into a full-stack app for office fit-out projects, covering BOQ, quotes, work orders, change log and snag stages, with role-based access, approvals, Excel and PDF exports, and a public demo that resets nightly.",
    ],
  },
  {
    company: "Techbug",
    role: "Full stack developer intern",
    start: "Jul 2024",
    end: "Oct 2024",
    summary: "Node.js and React apps, CMS dashboards and the plumbing that kept them fast.",
    details: [
      "Built and deployed scalable Node.js and React applications and CMS dashboards using Docker, AWS EC2 and S3, Cloudinary and Google Analytics.",
      "Implemented JWT sign-in with role-based access, and improved API reliability with Redis caching, rate limiting and optimised queries.",
      "Improved scalability and response times with server-side pagination, indexing and Node.js clustering on worker threads.",
      "Developed an event-driven email system that sends user and inventory alerts automatically.",
    ],
    href: "https://www.linkedin.com/company/techbug-official",
  },
]
