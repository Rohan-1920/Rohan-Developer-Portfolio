const activeWork = [
  {
    title: "Building @ DevSquad",
    detail:
      "Delivering production MVPs, custom business dashboards, and full-stack client web applications.",
  },
  {
    title: "Exploring Agentic Systems",
    detail:
      "Experimenting with multi-agent orchestration, contextual retrieval (RAG), and local LLM pipelines.",
  },
  {
    title: "Automating Operations",
    detail:
      "Architecting self-healing n8n pipelines, webhook listeners, and automated data enrichment tools.",
  },
];

export function CurrentlyBuilding() {
  return (
    <section className="active-status-section" aria-labelledby="active-status-heading">
      <div className="container">
        <div className="active-status-panel">
          <div className="active-status-header">
            <p id="active-status-heading" className="active-status-label">
              <span className="active-status-dot" aria-hidden="true">
                ●
              </span>
              {"// LIVE SYSTEM STATUS"}
            </p>
          </div>

          <div className="active-status-grid">
            {activeWork.map((item) => (
              <article className="active-status-item" key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>

          <p className="active-status-link">
            <a href="https://www.linkedin.com/in/rohan-m-604a2b289" target="_blank" rel="noreferrer">
              Following along on LinkedIn
            </a>
            <span aria-hidden="true"> &amp; </span>
            <a href="https://github.com/Rohan-1920" target="_blank" rel="noreferrer">
              GitHub &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
