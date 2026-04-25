"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
  {
    role: "Founder",
    company: "DevSquad",
    companyUrl: "https://lnkd.in/ddWMWr94",
    duration: "2025 - Present",
    points: [
      "Founded DevSquad to build modern web products and AI-enabled software solutions.",
      "Leading product direction, development workflows, and delivery strategy for real client needs.",
      "Driving execution across planning, architecture, engineering, and deployment.",
    ],
    accent: "#f59e0b",
  },
  {
    role: "Full Stack Developer",
    company: "TechTicks",
    duration: "Jun 2025 - Mar 2026",
    points: [
      "Built a real-time chat application similar to WhatsApp with secure messaging, responsive UI, and scalable backend APIs.",
      "Developed a PDF Reporting & Data Visualization Automation System to generate structured reports and dashboard-ready insights.",
      "Worked end-to-end on planning, implementation, testing, and deployment while collaborating with product requirements.",
    ],
    accent: "#c8ff00",
  },
  {
    role: "Self-Employed · AI Agent Developer",
    company: "Freelance",
    duration: "Dec 2025 - Present (5 months)",
    points: [
      "Building chatbot-based AI agent systems and automation workflows for real-world productivity use cases.",
      "Working as an FTE-style independent developer on OpenClaw-oriented agent tooling and integrations.",
      "Handling complete delivery cycle including architecture, implementation, iteration, and deployment.",
    ],
    accent: "#60a5fa",
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="relative z-20"
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
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "2.25rem",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.7rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
              }}
            >
              Work Experience
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "320px", textAlign: "right" }}>
              Real-world product building across MERN stack development and AI-enabled solutions.
            </p>
          </div>
        </FadeUp>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {experiences.map((item, index) => (
            <FadeUp key={item.role} delay={0.1 + index * 0.07}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.22 }}
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.035)",
                  padding: "1.35rem 1.5rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "14%",
                    bottom: "14%",
                    width: "2px",
                    borderRadius: "9999px",
                    background: item.accent,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginBottom: "0.7rem",
                  }}
                >
                  <div>
                    <p style={{ color: "var(--fg)", fontSize: "1rem", fontWeight: 700 }}>{item.role}</p>
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: item.accent,
                          fontSize: "0.78rem",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          marginTop: "0.25rem",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        {item.company}
                      </a>
                    ) : (
                      <p style={{ color: item.accent, fontSize: "0.78rem", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.25rem" }}>
                        {item.company}
                      </p>
                    )}
                  </div>
                  <span style={{ color: "var(--muted)", fontSize: "0.74rem", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {item.duration}
                  </span>
                </div>

                <ul style={{ marginLeft: "1rem", display: "grid", gap: "0.45rem" }}>
                  {item.points.map((point) => (
                    <li key={point} style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
