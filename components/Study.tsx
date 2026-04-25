"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const studies = [
  {
    title: "BS Data Science (Bachelor's)",
    institute: "Virtual University of Pakistan",
    duration: "Ongoing",
    details:
      "Currently pursuing a Bachelor's in Data Science with focus on statistics, machine learning foundations, data analysis, and practical software implementation.",
    accent: "#c8ff00",
  },
  {
    title: "DAE Electrical (3 Years)",
    institute: "TEVTA",
    duration: "Completed",
    details:
      "Completed 3-year Diploma of Associate Engineering in Electrical Technology, building strong technical fundamentals and applied engineering discipline.",
    accent: "#60a5fa",
  },
  {
    title: "Certified Chinese Language Course",
    institute: "NAVTTC",
    duration: "3 Months · Completed",
    details:
      "Completed a certified 3-month Chinese language course with focus on foundational communication and practical learning.",
    accent: "#f59e0b",
  },
  {
    title: "AutoCAD Training (Mechanical & Civil)",
    institute: "Professional Technical Training",
    duration: "Completed",
    details:
      "Completed practical AutoCAD training in both Mechanical and Civil drafting with hands-on design and drawing workflows.",
    accent: "#a78bfa",
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Study() {
  return (
    <section
      id="study"
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
            Study
          </p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
              }}
            >
              Education & Learning
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "320px", textAlign: "right" }}>
              Academic base and continuous upskilling aligned with modern full stack and AI development.
            </p>
          </div>
        </FadeUp>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {studies.map((item, index) => (
            <FadeUp key={item.title} delay={0.08 + index * 0.06}>
              <div
                style={{
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  padding: "1.2rem 1.35rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "16%",
                    bottom: "16%",
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
                    marginBottom: "0.6rem",
                  }}
                >
                  <div>
                    <p style={{ color: "var(--fg)", fontSize: "1rem", fontWeight: 700 }}>{item.title}</p>
                    <p style={{ color: item.accent, fontSize: "0.78rem", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.22rem" }}>
                      {item.institute}
                    </p>
                  </div>
                  <span style={{ color: "var(--muted)", fontSize: "0.74rem", fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {item.duration}
                  </span>
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {item.details}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
