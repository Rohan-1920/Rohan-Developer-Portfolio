"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    index: "01",
    title: "Neon Nexus",
    role: "Lead Developer",
    year: "2025",
    tags: ["WebGL", "Three.js", "GSAP"],
    desc: "A cyber-kinetic web experience built for modern spatial computing. Immersive 3D environments that respond to user intent in real time.",
    accent: "#c8ff00",
  },
  {
    id: 2,
    index: "02",
    title: "Aura Commerce",
    role: "Design Engineer",
    year: "2025",
    tags: ["Next.js", "Shopify", "Framer Motion"],
    desc: "Headless storefront featuring immersive 3D product explorers and fluid micro-interactions that drive conversion.",
    accent: "#60a5fa",
  },
  {
    id: 3,
    index: "03",
    title: "Onyx System",
    role: "Frontend Architect",
    year: "2024",
    tags: ["React", "TypeScript", "Storybook"],
    desc: "An enterprise design system built for elite financial technology. 200+ components, pixel-perfect, zero compromises.",
    accent: "#a78bfa",
  },
  {
    id: 4,
    index: "04",
    title: "Lumina Studio",
    role: "Creative Coder",
    year: "2024",
    tags: ["WebGL", "GLSL", "Canvas API"],
    desc: "WebGL-powered interactive portfolio for a renowned architecture firm. Real-time ray-marched environments and generative visuals.",
    accent: "#34d399",
  },
];

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

  // This card is hovered
  const isHovered = hoveredId === project.id;
  // Another card is hovered (dim this one)
  const isDimmed = hoveredId !== null && !isHovered;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: isHovered
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${isHovered ? `${project.accent}40` : "rgba(255,255,255,0.08)"}`,
        minHeight: "320px",
        opacity: isDimmed ? 0.4 : 1,
        transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
        transition:
          "opacity 0.35s ease, transform 0.35s ease, background 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Accent top border — only on hovered card */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: project.accent,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Glow — only on hovered card */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${project.accent}12, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="relative z-10 p-8 flex flex-col flex-1">
        {/* ── Top row: index + role badge + arrow ── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-xs tracking-[0.2em]"
              style={{ color: "var(--muted)" }}
            >
              {project.index}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.18em] font-mono px-3 py-1.5 rounded-full"
              style={{
                background: `${project.accent}18`,
                color: project.accent,
                border: `1px solid ${project.accent}35`,
              }}
            >
              {project.role}
            </span>
          </div>

          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: isHovered
                ? project.accent
                : "rgba(255,255,255,0.06)",
              border: `1px solid ${isHovered ? project.accent : "rgba(255,255,255,0.12)"}`,
              transform: isHovered
                ? "translate(2px, -2px)"
                : "translate(0,0)",
            }}
          >
            <ArrowUpRight
              className="w-4 h-4"
              style={{ color: isHovered ? "#0d0d0d" : "var(--fg)" }}
            />
          </div>
        </div>

        {/* ── Title ── */}
        <h3
          className="font-bold tracking-tight leading-[1.05] mb-3"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            color: "var(--fg)",
          }}
        >
          {project.title}
        </h3>

        {/* ── Description — only visible on hover ── */}
        <AnimatePresence>
          {isHovered && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm leading-[1.7] overflow-hidden"
              style={{ color: "var(--muted)" }}
            >
              {project.desc}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Bottom: tags + year ── */}
        <div
          className="mt-auto pt-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "var(--muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className="font-mono text-xs shrink-0 ml-4"
              style={{ color: "var(--muted)" }}
            >
              {project.year}
            </span>
          </div>

          {/* CTA — only on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="mt-4 flex items-center gap-2 text-xs font-mono tracking-[0.15em] uppercase"
                style={{ color: project.accent }}
              >
                <span>View case study</span>
                <ArrowUpRight className="w-3 h-3" />
              </motion.div>
            )}
          </AnimatePresence>
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
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      <div className="container">
        {/* Header */}
        <div ref={headingRef} className="mb-16" style={{ paddingTop: "2rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] font-mono mb-5"
            style={{ color: "var(--accent)" }}
          >
            Selected Work
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <h2
              className="font-bold tracking-tight leading-none"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "var(--fg)",
              }}
            >
              Project
              <br />
              Case Studies
            </h2>
            <p
              className="text-sm leading-relaxed max-w-xs md:text-right"
              style={{ color: "var(--muted)" }}
            >
              A curated selection of work spanning interactive experiences,
              design systems, and creative engineering.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
