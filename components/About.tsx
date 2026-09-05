"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
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

const principles = [
  {
    title: "Architecture over Hype",
    detail: "Choosing reliable, maintainable primitives over fragile tech fads.",
  },
  {
    title: "End-to-End Ownership",
    detail: "From database design and API security to responsive frontend and automated deployment.",
  },
  {
    title: "Outcome-Driven Systems",
    detail: "Every line of code or workflow step must eliminate friction or create measurable utility.",
  },
];

// ─── About ────────────────────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="relative z-20 about-section">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

      <div className="container">
        <FadeUp>
          <p className="section-kicker">
            About Me
          </p>
        </FadeUp>

        <div className="about-editorial">
          <FadeUp delay={0.05}>
            <div className="about-editorial-lead">
              <h2>Engineering with product sense and operational clarity.</h2>
              <ul className="about-principles">
                {principles.map((principle) => (
                  <li key={principle.title}>
                    <strong>{principle.title}</strong>
                    <span>{principle.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <div className="about-editorial-narrative">
            <FadeUp delay={0.1}>
              <p>
                Writing code alone is not enough. The useful leverage comes from understanding the operational bottleneck, designing the right system architecture, and combining modern full-stack web technologies with autonomous AI workflows.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p>
                Today I&apos;m founding DevSquad, building production SaaS applications, automating repetitive business logic with n8n, and engineering tools that solve concrete real-world problems.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

