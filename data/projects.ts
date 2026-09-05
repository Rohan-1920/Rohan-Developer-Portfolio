export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  problem: string;
  solution: string;
  architecture: string[];
  stack: string[];
  github: string | null;
  live: string | null;
};

export const projects: Project[] = [
  {
    index: "1",
    title: "Twitter AI Assistant",
    category: "SOCIAL AUTOMATION",
    year: "2026",
    problem: "Publishing social content and responding to new conversations manually makes consistent audience engagement difficult.",
    solution: "A Node.js backend accepts content from n8n and uses a persistent Playwright session to publish posts and AI-assisted replies on X.",
    architecture: [
      "A one-time browser login persists session state so posting workflows do not handle credentials on every request.",
      "A queued action layer serializes browser jobs and tracks processed replies to prevent duplicate automation.",
    ],
    stack: ["Node.js", "Express", "Playwright", "n8n", "OpenAI"],
    github: "https://github.com/Rohan-1920/twitter-ai-assistant",
    live: null,
  },
  {
    index: "2",
    title: "Karobaar",
    category: "FULL-STACK SAAS",
    year: "2025",
    problem: "Small business operations need one dependable surface instead of disconnected product, customer, and workflow tools.",
    solution: "A full-stack business platform connects structured data, authenticated workflows, and responsive product interfaces.",
    architecture: [
      "Relational application state keeps operational records consistent across workflows.",
      "A modular frontend keeps business actions discoverable without adding dashboard noise.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    github: "https://github.com/Rohan-1920/Small-Business-Platform",
    live: null,
  },
  {
    index: "3",
    title: "Lumen YouTube Automation Agent",
    category: "AI CONTENT AUTOMATION",
    year: "2026",
    problem: "Running a YouTube channel end to end requires disconnected research, production, review, publishing, and analytics workflows.",
    solution: "An approval-first agent pipeline researches topics, writes scripts, generates media, assembles real MP4 videos, and schedules approved content.",
    architecture: [
      "Specialized agents separate strategy, scripting, thumbnails, SEO, production, publishing, and analytics responsibilities.",
      "Persistent jobs, quality gates, rights checks, and real-MP4 validation keep automation observable and human-controlled.",
    ],
    stack: ["Node.js", "AI APIs", "FFmpeg", "SQLite", "YouTube API"],
    github: "https://github.com/Rohan-1920/youtube-automation-agent-",
    live: null,
  },
  {
    index: "4",
    title: "AI Automation / CRM",
    category: "AUTOMATION SYSTEMS",
    year: "2026",
    problem: "Lead operations lose accuracy when capture, validation, qualification, and follow-up depend on manual handoffs.",
    solution: "An n8n pipeline validates incoming leads, scores them, updates CRM records, and triggers targeted communication.",
    architecture: [
      "Webhook and form listeners move lead data into a validated automation pipeline.",
      "Conditional logic, duplicate detection, and execution monitoring keep handoffs auditable.",
    ],
    stack: ["n8n", "Webhooks", "REST APIs", "JavaScript", "CRM"],
    github: "https://github.com/Rohan-1920/AI-Powered-Lead-Generation-CRM-Automation-System",
    live: null,
  },
];
