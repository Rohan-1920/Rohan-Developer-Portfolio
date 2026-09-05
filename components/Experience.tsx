"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type ExperienceEntry = {
  role: string;
  organization: string;
  organizationUrl?: string;
  period: string;
  contributions: string[];
  technologies: string[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    role: "Founder",
    organization: "DevSquad",
    organizationUrl: "https://lnkd.in/ddWMWr94",
    period: "2025 - Present",
    contributions: [
      "Founded DevSquad to build modern web products and AI-enabled software solutions.",
      "Lead product direction, architecture, engineering, and deployment for real client needs.",
      "Build client MVPs and coordinate delivery workflows from planning through release.",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "FastAPI", "n8n"],
  },
  {
    role: "Full Stack Developer",
    organization: "TechTicks",
    period: "Jun 2025 - Present",
    contributions: [
      "Built a real-time chat application similar to WhatsApp with secure messaging, responsive UI, and scalable backend APIs.",
      "Developed a PDF Reporting & Data Visualization Automation System to generate structured reports and dashboard-ready insights.",
      "Worked end-to-end on planning, implementation, testing, and deployment while collaborating with product requirements.",
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "WebSockets"],
  },
  {
    role: "Self-Employed · Full Stack AI Engineer",
    organization: "Freelance",
    period: "Dec 2025 - Present (5 months)",
    contributions: [
      "Building chatbot-based AI agent systems and automation workflows for real-world productivity use cases.",
      "Working as an FTE-style independent developer on OpenClaw-oriented agent tooling and integrations.",
      "Handling complete delivery cycle including architecture, implementation, iteration, and deployment.",
    ],
    technologies: ["OpenAI APIs", "Claude API", "n8n", "Webhooks", "Node.js"],
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

export function Experience() {
  return (
    <section
      id="experience"
      className="relative z-20 experience-section"
      style={{ background: "var(--bg)", paddingTop: "8rem", paddingBottom: "6rem" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
      />

      <div className="container">
        <FadeUp>
          <p
            style={{
              color: "var(--accent)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Experience
          </p>
        </FadeUp>

        <FadeUp delay={0.06}>
          <div className="experience-heading">
            <h2>Work Experience</h2>
            <p>Hands-on product engineering, founder-led delivery, and AI-enabled systems in production-oriented work.</p>
          </div>
        </FadeUp>

        <div className="experience-timeline">
          {experienceEntries.map((item, index) => (
            <FadeUp key={`${item.organization}-${item.role}`} delay={0.1 + index * 0.07}>
              <motion.article className="experience-entry" whileHover={{ x: 4 }} transition={{ duration: 0.22 }}>
                <span className="experience-marker" aria-hidden="true" />
                <div className="experience-entry-header">
                  <div>
                    <h3>{item.role}</h3>
                    {item.organizationUrl ? (
                      <a href={item.organizationUrl} target="_blank" rel="noopener noreferrer">{item.organization}</a>
                    ) : (
                      <p>{item.organization}</p>
                    )}
                  </div>
                  <time>{item.period}</time>
                </div>
                <div className="experience-entry-body">
                  <ul>
                    {item.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
                  </ul>
                  <div className="experience-technologies" aria-label="Core technologies used">
                    <p className="experience-technology-label">Core technologies</p>
                    {item.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                  </div>
                </div>
              </motion.article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
