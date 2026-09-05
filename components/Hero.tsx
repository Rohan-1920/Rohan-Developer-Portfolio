const secondaryLinks = [
  { label: "GitHub", href: "https://github.com/Rohan-1920" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohan-m-604a2b289" },
  { label: "DevSquad", href: "https://lnkd.in/ddWMWr94" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      aria-labelledby="hero-title"
      style={{
        minHeight: "min(760px, 100vh)",
        paddingTop: "clamp(7rem, 14vh, 10rem)",
        paddingBottom: "clamp(5rem, 10vh, 8rem)",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div className="radial-spotlight pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container relative z-[1]">
        <div className="flex max-w-[920px] flex-col">
          <div className="mb-7 inline-flex w-fit items-center gap-2 border border-white/[0.08] bg-[#121212]/80 px-3 py-2 font-mono text-[0.68rem] tracking-[0.04em] text-zinc-400">
            <span className="animate-pulse text-emerald-accent" aria-hidden="true">●</span>
            <span>Available for select projects &amp; full-stack roles</span>
          </div>

          <h1
            id="hero-title"
            className="mb-7 max-w-[880px] text-[clamp(2.35rem,5.4vw,4.6rem)] font-bold leading-[1.06] tracking-tight text-white"
          >
            Engineering <span className="text-gradient-metallic">production web products</span>, <span className="text-gradient-metallic">autonomous AI systems</span> &amp; automated operations.
          </h1>

          <div className="mb-9 max-w-[700px] text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.75] text-zinc-400">
            <p>
              Full-Stack Engineer &amp; Founder at DevSquad. Building scalable cloud applications, RAG pipelines, and automated business operations that eliminate technical and operational friction.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#work"
              className="hero-action inline-flex items-center justify-center gap-2 border border-white bg-white px-5 py-3 text-xs font-bold text-canvas no-underline transition-colors hover:bg-zinc-200"
            >
              View Selected Work <span aria-hidden="true">↓</span>
            </a>
            <a
              href="#contact"
              className="hero-action inline-flex items-center justify-center gap-2 border border-hairline-hover bg-surface px-5 py-3 text-xs font-semibold text-white no-underline transition-colors hover:border-white"
            >
              Start a Conversation <span aria-hidden="true">→</span>
            </a>
          </div>

          <nav
            aria-label="Professional links"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-5 sm:gap-x-8"
            style={{ marginTop: "5rem" }}
          >
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm font-semibold tracking-[0.06em] text-zinc-400 no-underline transition-colors hover:text-white sm:text-[0.95rem]"
              >
                {link.label} ↗
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
