export type Project = {
  id: string;
  title: string;
  domain: string;
  problem: string;
  solution: string;
  stack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  previewPlaceholder: string;
};

export const projects: Project[] = [
  {
    id: "karigar-ai",
    title: "Karigar AI",
    domain: "Agentic AI & RAG",
    problem: "Teams lose time searching across fragmented knowledge sources before they can act on operational questions.",
    solution: "A retrieval-augmented agent layer grounds responses in indexed business context and routes complex requests through explicit tool workflows.",
    stack: ["Next.js", "FastAPI", "LangChain", "Supabase"],
    liveUrl: null,
    githubUrl: null,
    previewPlaceholder: "Grounded answer workspace",
  },
  {
    id: "karobaar",
    title: "Karobaar",
    domain: "Digital Commerce",
    problem: "Small business operations need one dependable surface instead of disconnected product, customer, and workflow tools.",
    solution: "A full-stack business platform connects structured data, authenticated workflows, and responsive product interfaces.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    liveUrl: null,
    githubUrl: "https://github.com/Rohan-1920/Small-Business-Platform",
    previewPlaceholder: "Commerce operations dashboard",
  },
  {
    id: "codevault",
    title: "CodeVault",
    domain: "Developer Tools",
    problem: "Developers need a focused way to organize, retrieve, and reuse implementation knowledge without losing context.",
    solution: "A structured code workspace brings searchable snippets, project context, and reusable references into one developer-facing interface.",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    liveUrl: null,
    githubUrl: null,
    previewPlaceholder: "Searchable code workspace",
  },
  {
    id: "ai-crm-automation",
    title: "AI CRM / Automation",
    domain: "Automated Operations",
    problem: "Lead operations lose accuracy when capture, validation, qualification, and follow-up depend on manual handoffs.",
    solution: "An n8n pipeline validates incoming leads, scores them, updates CRM records, and triggers targeted communication.",
    stack: ["n8n", "Webhooks", "REST APIs", "JavaScript", "CRM"],
    liveUrl: null,
    githubUrl: "https://github.com/Rohan-1920/AI-Powered-Lead-Generation-CRM-Automation-System",
    previewPlaceholder: "Lead qualification pipeline",
  },
];
