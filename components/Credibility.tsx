const pillars = [
  {
    index: "01",
    title: "FULL-STACK SYSTEMS",
    details: "Next.js, Node.js, TypeScript, PostgreSQL",
  },
  {
    index: "02",
    title: "AGENTIC WORKFLOWS",
    details: "Custom AI Assistants, RAG & LLM Integrations",
  },
  {
    index: "03",
    title: "AUTOMATION PIPELINES",
    details: "n8n Orchestration, Webhooks, API Sync",
  },
  {
    index: "04",
    title: "SAAS & MVP DELIVERY",
    details: "Production Architectures, Founder @ DevSquad",
  },
];

export function Credibility() {
  return (
    <section aria-label="Technical domains" className="credibility-strip">
      <div className="container">
        <div className="credibility-grid">
          {pillars.map((pillar) => (
            <article className="credibility-item" key={pillar.index}>
              <p className="credibility-label">
                <span className="credibility-index">{pillar.index}</span>
                <span>{pillar.title}</span>
              </p>
              <p className="credibility-detail">{pillar.details}</p>
            </article>
          ))}
        </div>

        <a
          className="credibility-proof"
          href="https://github.com/Rohan-1920"
          target="_blank"
          rel="noreferrer"
        >
          <span className="credibility-status" aria-hidden="true" />
          <span>Public GitHub profile and repositories</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
