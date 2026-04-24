"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    index: "01",
    title: "University Voice Assistant",
    role: "Lead Developer",
    year: "2025",
    tags: ["JavaScript", "Python", "PostgreSQL", "HTML", "CSS"],
    desc: "An AI-powered voice assistant built for university environments. Handles queries, navigation, and student support through natural language.",
    accent: "#c8ff00",
    link: "#",
  },
  {
    id: 2,
    index: "02",
    title: "Hackathon-0",
    role: "Full Stack Developer",
    year: "2025",
    tags: ["Python", "Claude API", "Kiro"],
    desc: "A rapid-build hackathon project leveraging AI tooling. Built end-to-end in under 48 hours with modern AI-assisted development workflows.",
    accent: "#60a5fa",
    link: "#",
  },
  {
    id: 3,
    index: "03",
    title: "Speckit PR",
    role: "Backend Engineer",
    year: "2024",
    tags: ["Python", "PowerShell", "Shell Script"],
    desc: "Automated PR specification toolkit. Streamlines code review workflows with intelligent spec generation and shell-based automation.",
    accent: "#a78bfa",
    link: "#",
  },
  {
    id: 4,
    index: "04",
    title: "Lumina Studio",
    role: "Creative Developer",
    year: "2024",
    tags: ["WebGL", "GLSL", "Canvas API"],
    desc: "WebGL-powered interactive portfolio for a renowned architecture firm. Real-time ray-marched environments and generative visuals.",
    accent: "#34d399",
    link: "#",
  },
];

// ─── Tag pill ─────────────────────────────────────────────────────────────────
function TagPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "4px 10px",
        borderRadius: "6px",
        fontSize: "0.68rem",
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.06em",
        fontWeight: 500,
        background: `${accent}12`,
        color: accent,
        border: `1px solid ${accent}28`,
      }}
    >
      {label}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  hoveredId,
  onHover,
}: {
  project: (typeof projects)[0];
  index: number;
  hoveredId: number | null;
  onHover: (id: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const isHovered = hoveredId === project.id;
  const isDimmed  = hoveredId !== null && !isHovered;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        minHeight: "300px",
        background: isHovered ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${isHovered ? `${project.accent}35` : "rgba(255,255,255,0.08)"}`,
        opacity: isDimmed ? 0.38 : 1,
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "opacity 0.3s, transform 0.3s, background 0.3s, border-color 0.3s",
      }}
    >
      {/* Accent top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: project.accent,
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* Top glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(500px circle at 50% -20%, ${project.accent}0e, transparent 65%)`,
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      <div style={{ position: "relative", zIndex: 1, padding: "1.75rem", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* ── Header row ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {/* Index */}
            <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--muted)", letterSpacing: "0.2em" }}>
              {project.index}
            </span>
            {/* Role badge */}
            <span style={{
              fontSize: "0.65rem", fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "3px 10px", borderRadius: "5px",
              background: `${project.accent}15`,
              color: project.accent,
              border: `1px solid ${project.accent}30`,
              width: "fit-content",
            }}>
              {project.role}
            </span>
          </div>

          {/* Arrow button */}
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            background: isHovered ? project.accent : "rgba(255,255,255,0.06)",
            border: `1px solid ${isHovered ? project.accent : "rgba(255,255,255,0.1)"}`,
            transform: isHovered ? "translate(2px,-2px)" : "translate(0,0)",
            transition: "all 0.3s",
          }}>
            <ArrowUpRight size={15} style={{ color: isHovered ? "#0d0d0d" : "var(--fg)" }} />
          </div>
        </div>

        {/* ── Title ── */}
        <h3 style={{
          fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--fg)",
          marginBottom: "0.75rem",
        }}>
          {project.title}
        </h3>

        {/* ── Description on hover ── */}
        <AnimatePresence>
          {isHovered && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--muted)", overflow: "hidden", marginBottom: "0.75rem" }}
            >
              {project.desc}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Footer: tags + year ── */}
        <div style={{
          marginTop: "auto",
          paddingTop: "1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}>
          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "0.875rem" }}>
            {project.tags.map((tag) => (
              <TagPill key={tag} label={tag} accent={project.accent} />
            ))}
          </div>

          {/* Year + CTA row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--muted)", letterSpacing: "0.1em" }}>
              {project.year}
            </span>
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  key="cta"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex", alignItems: "center", gap: "4px",
                    fontSize: "0.68rem", fontFamily: "var(--font-mono)",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: project.accent,
                  }}
                >
                  View project <ArrowUpRight size={11} />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="work"
      className="relative z-20 px-0"
      style={{ background: "var(--bg)", paddingTop: "12rem", paddingBottom: "7rem" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
      />

      <div className="container">
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "3.5rem", paddingTop: "2rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.3em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "1rem" }}
          >
            Selected Work
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}
          >
            <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1, color: "var(--fg)", letterSpacing: "-0.02em" }}>
              Project Case Studies
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "260px", textAlign: "right" }}>
              Real projects built with real tech — hover a card to see more.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
