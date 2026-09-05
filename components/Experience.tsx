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
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "WebSockets"],
  },
  {
    role: "Self-Employed · Full Stack AI Engineer",
    organization: "Freelance",
    period: "Dec 2025 - Present (5 months)",
    contributions: [
      "Building chatbot-based AI agent systems and automation workflows for real-world productivity use cases.",
      "Handling architecture, implementation, iteration, and deployment across independent software delivery work.",
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

        <div className="experience-timeline border-l border-white/[0.08] pl-6 sm:pl-8">
          {experienceEntries.map((item, index) => (
            <FadeUp key={`${item.organization}-${item.role}`} delay={0.1 + index * 0.07}>
              <motion.article className="experience-entry relative pb-10 last:pb-0" transition={{ duration: 0.22 }}>
                <span className="absolute -left-[2.05rem] top-1.5 size-2 rounded-full border border-zinc-500 bg-[#0A0A0A] sm:-left-[2.55rem]" aria-hidden="true" />
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <p className="mb-2 font-mono text-xs tracking-[0.12em] text-zinc-500">{item.role}</p>
                    {item.organizationUrl ? (
                      <a className="text-xl font-semibold tracking-tight text-white no-underline hover:text-zinc-300" href={item.organizationUrl} target="_blank" rel="noopener noreferrer">{item.organization}</a>
                    ) : (
                      <p className="text-xl font-semibold tracking-tight text-white">{item.organization}</p>
                    )}
                  </div>
                  <time className="font-mono text-xs tracking-[0.08em] text-zinc-500">{item.period}</time>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-400">
                  {item.contributions.map((contribution) => <li className="relative pl-4 before:absolute before:left-0 before:top-[0.65rem] before:size-1 before:bg-emerald-accent before:content-['']" key={contribution}>{contribution}</li>)}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2" aria-label="Core technologies used">
                  {item.technologies.map((technology) => <span className="border border-white/[0.08] px-2 py-1 font-mono text-[11px] text-zinc-500" key={technology}>{technology}</span>)}
                </div>
              </motion.article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
