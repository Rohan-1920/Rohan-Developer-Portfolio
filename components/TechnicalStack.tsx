const technicalDomains = [
  {
    index: "01",
    name: "FRONTEND ENGINEERING",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "State Management (Zustand/Redux)", "HTML5/CSS3"],
  },
  {
    index: "02",
    name: "BACKEND & SYSTEMS",
    technologies: ["Node.js", "Express.js", "FastAPI", "RESTful APIs", "WebSockets", "Serverless Architecture"],
  },
  {
    index: "03",
    name: "AI & AUTOMATION",
    technologies: ["OpenAI / Anthropic APIs", "LangChain", "RAG Architectures", "Vector Stores", "n8n Workflow Automation", "Webhook Orchestration"],
  },
  {
    index: "04",
    name: "DATA & INFRASTRUCTURE",
    technologies: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "Git/GitHub", "Docker basics", "Vercel"],
  },
];

export function TechnicalStack() {
  return (
    <section id="skills" className="technical-stack-section" aria-labelledby="technical-stack-title">
      <div className="container">
        <div className="technical-stack-heading">
          <div>
            <p className="section-kicker">Technical index</p>
            <h2 id="technical-stack-title">A working index of the stack.</h2>
          </div>
          <p>
            Verified tools and architectural patterns used across product interfaces, backend systems, AI workflows, and delivery infrastructure.
          </p>
        </div>

        <div className="technical-stack-grid">
          {technicalDomains.map((domain) => (
            <article className="technical-domain" key={domain.index}>
              <p className="technical-domain-label">INDEX // {domain.index} {domain.name}</p>
              <ul className="technical-domain-list">
                {domain.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="technical-stack-note">
          Focused on selecting the right tool for the architectural bottleneck rather than chasing framework trends.
        </p>
      </div>
    </section>
  );
}
