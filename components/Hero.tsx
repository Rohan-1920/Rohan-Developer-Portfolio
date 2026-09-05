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
        minHeight: "min(860px, 100vh)",
        paddingTop: "clamp(9rem, 18vh, 12rem)",
        paddingBottom: "clamp(6rem, 12vh, 10rem)",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.45,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 35%, black 10%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 35%, black 10%, transparent 80%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "920px" }}>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              marginBottom: "2rem",
              color: "var(--body)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              lineHeight: 1.5,
            }}
          >
            <span aria-hidden="true" style={{ color: "var(--accent)", fontSize: "0.9rem" }}>
              ●
            </span>
            Available for Select Projects &amp; Engineering Roles
          </p>

          <h1
            id="hero-title"
            style={{
              maxWidth: "900px",
              marginBottom: "2rem",
              color: "var(--fg)",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 0.98,
            }}
          >
            Engineering production web products, autonomous AI systems, and automated digital operations.
          </h1>

          <p
            style={{
              maxWidth: "760px",
              marginBottom: "2.5rem",
              color: "var(--body)",
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            Full-Stack Engineer · AI Developer · Automation Builder · Founder @ DevSquad. Bridging modern web architectures (Next.js/TypeScript) with agentic workflows and automated business pipelines to turn product ideas into scalable, reliable software.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href="#work"
              className="hero-action"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.1rem",
                color: "var(--bg)",
                background: "var(--fg)",
                border: "1px solid var(--fg)",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
              }}
            >
              View Selected Work <span aria-hidden="true">↓</span>
            </a>
            <a
              href="#contact"
              className="hero-action"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.1rem",
                color: "var(--fg)",
                background: "var(--surface)",
                border: "1px solid var(--border-active)",
                borderRadius: "6px",
                fontSize: "0.8rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              Start a Conversation <span aria-hidden="true">→</span>
            </a>
          </div>

          <nav aria-label="Professional links" style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginTop: "2.5rem" }}>
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.08em", textDecoration: "none" }}
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
