"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const capabilities = [
  {
    number: "01",
    title: "Full-Stack Web Applications & SaaS",
    problem: "Product ideas often stall between fragile frontend mockups and disconnected backends.",
    solution: "End-to-end web engineering using Next.js, React, Node.js/FastAPI, and relational schemas.",
    deliverable: "Fast, maintainable, production-ready web applications with clean auth and data architecture.",
  },
  {
    number: "02",
    title: "Autonomous AI Systems & RAG",
    problem: "Generic chatbot prompts fail when applied to proprietary business documents and workflows.",
    solution: "Custom Retrieval-Augmented Generation (RAG), vector stores, and contextual agents.",
    deliverable: "Domain-specific AI assistants that query proprietary data and return reliable, structured actions.",
  },
  {
    number: "03",
    title: "Workflow & Operational Automation",
    problem: "Teams waste hundreds of hours manually syncing data between CRMs, forms, and communication channels.",
    solution: "Autonomous n8n workflows, custom webhook pipelines, and API integrations.",
    deliverable: "Self-healing operational pipelines that eliminate manual data entry.",
  },
  {
    number: "04",
    title: "MVP Engineering for Founders",
    problem: "Founders burn capital building bloated prototypes instead of testing core market value.",
    solution: "Rapid scoping, database design, and rapid MVP deployment via DevSquad methodologies.",
    deliverable: "A functional, scalable V1 product deployed in weeks, not months.",
  },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6%" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduceMotion ? 0 : 0.24, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative z-20 services-section" style={{ background: "var(--bg)", paddingTop: "8rem", paddingBottom: "7rem" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "var(--border)" }} />
      <div className="container">
        <Reveal>
          <p style={{ color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.3em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "1rem" }}>
            Capabilities
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap", marginBottom: "3.25rem" }}>
            <h2 style={{ maxWidth: "720px", fontSize: "clamp(2.2rem, 4.6vw, 3.8rem)", fontWeight: 700, lineHeight: 1.05, color: "var(--fg)", letterSpacing: "-0.02em" }}>
              Systems built around the work that matters.
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "300px", textAlign: "right" }}>
              From first architecture decisions to dependable production operations.
            </p>
          </div>
        </Reveal>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {capabilities.map((capability, index) => (
            <Reveal key={capability.number} delay={0.08 + index * 0.06}>
              <motion.article
                className="capability-row"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid", gridTemplateColumns: "minmax(220px, 0.8fr) minmax(0, 1.2fr)", gap: "clamp(2rem, 6vw, 6rem)", padding: "2rem 0", borderBottom: "1px solid var(--border)", borderLeft: "2px solid transparent", transition: "border-color 0.2s ease" }}
                onMouseEnter={(event) => { event.currentTarget.style.borderLeftColor = "var(--accent)"; }}
                onMouseLeave={(event) => { event.currentTarget.style.borderLeftColor = "transparent"; }}
              >
                <div style={{ paddingLeft: "1rem" }}>
                  <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.14em", marginBottom: "0.9rem" }}>
                    CAPABILITY // {capability.number}
                  </p>
                  <h3 style={{ color: "var(--fg)", fontSize: "clamp(1.25rem, 2vw, 1.7rem)", fontWeight: 700, lineHeight: 1.2 }}>
                    {capability.title}
                  </h3>
                </div>

                <div style={{ display: "grid", gap: "1rem" }}>
                  <div>
                    <p className="capability-meta">Problem</p>
                    <p className="capability-copy">{capability.problem}</p>
                  </div>
                  <div>
                    <p className="capability-meta">Engineered solution</p>
                    <p className="capability-copy">{capability.solution}</p>
                  </div>
                  <div>
                    <p className="capability-meta capability-meta-accent">Deliverable</p>
                    <p className="capability-copy capability-deliverable">{capability.deliverable}</p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
