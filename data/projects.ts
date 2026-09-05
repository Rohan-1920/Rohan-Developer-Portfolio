export type Project = {
  index: string;
  category: string;
  title: string;
  year: string;
  role: string;
  problem: string;
  solution: string;
  architecture: string[];
  stack: string[];
  github: string | null;
  live: string | null;
  preview: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    category: "AI & VOICE SYSTEMS",
    title: "University Voice Assistant",
    year: "2025",
    role: "Lead Developer",
    problem: "University users need a faster way to handle recurring queries, navigation, and student support requests.",
    solution: "An AI-powered voice assistant processes natural-language requests and connects them to a university support experience.",
    architecture: [
      "Natural-language interaction is central to queries, navigation, and student support.",
      "PostgreSQL is included in the verified project stack for structured data needs.",
    ],
    stack: ["JavaScript", "Python", "PostgreSQL", "HTML", "CSS"],
    github: "https://github.com/Rohan-1920/University-Voice-Assistant-",
    live: null,
    preview: ["Voice input", "Intent handling", "Student support"],
  },
  {
    index: "02",
    category: "AI-ASSISTED DELIVERY",
    title: "Hackathon-0",
    year: "2025",
    role: "Full Stack Developer",
    problem: "A hackathon build needs a complete, coherent product direction without sacrificing delivery speed.",
    solution: "The project uses AI-assisted development workflows to move from concept to an end-to-end implementation in under 48 hours.",
    architecture: [
      "Claude API and Kiro are listed as part of the AI-assisted development toolchain.",
      "The verified project description documents end-to-end delivery under 48 hours.",
    ],
    stack: ["Python", "Claude API", "Kiro"],
    github: "https://github.com/Rohan-1920/Hackathon-0",
    live: null,
    preview: ["Product brief", "AI tooling", "Working build"],
  },
  {
    index: "03",
    category: "DEVELOPER AUTOMATION",
    title: "Speckit PR",
    year: "2024",
    role: "Backend Engineer",
    problem: "Code review workflows lose time when PR specifications and implementation context must be assembled manually.",
    solution: "An automated PR specification toolkit uses intelligent spec generation and shell-based automation to streamline review preparation.",
    architecture: [
      "Python provides the toolkit implementation layer described by the project.",
      "PowerShell and shell scripts provide the verified automation surface.",
    ],
    stack: ["Python", "PowerShell", "Shell Script"],
    github: "https://github.com/Rohan-1920/spec-kit",
    live: null,
    preview: ["PR input", "Spec generation", "Review context"],
  },
  {
    index: "04",
    category: "REAL-TIME GRAPHICS",
    title: "Lumina Studio",
    year: "2024",
    role: "Creative Developer",
    problem: "An architecture firm needs an interactive portfolio experience that communicates space beyond static pages.",
    solution: "A WebGL-powered portfolio creates real-time ray-marched environments and generative visuals in the browser.",
    architecture: [
      "WebGL and GLSL drive the real-time rendering and ray-marched environments.",
      "Canvas API provides the browser rendering surface for the interactive experience.",
    ],
    stack: ["WebGL", "GLSL", "Canvas API"],
    github: null,
    live: null,
    preview: ["WebGL scene", "GLSL shaders", "Canvas output"],
  },
];
