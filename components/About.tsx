"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "Frontend",
    color: "#c8ff00",
    skills: [
      { name: "React / Next.js",  pct: 92 },
      { name: "TypeScript",       pct: 88 },
      { name: "Framer Motion",    pct: 85 },
      { name: "Tailwind CSS",     pct: 95 },
    ],
  },
  {
    category: "Creative Dev",
    color: "#60a5fa",
    skills: [
      { name: "WebGL / Three.js", pct: 75 },
      { name: "GSAP",             pct: 80 },
      { name: "Canvas API",       pct: 82 },
      { name: "GLSL Shaders",     pct: 60 },
    ],
  },
  {
    category: "Design",
    color: "#a78bfa",
    skills: [
      { name: "Figma",            pct: 90 },
      { name: "Motion Design",    pct: 78 },
      { name: "Design Systems",   pct: 85 },
      { name: "UI / UX",          pct: 88 },
    ],
  },
  {
    category: "Backend",
    color: "#34d399",
    skills: [
      { name: "Node.js",          pct: 80 },
      { name: "PostgreSQL",       pct: 72 },
      { name: "REST / GraphQL",   pct: 83 },
      { name: "Prisma / MongoDB", pct: 75 },
    ],
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <div ref={ref} className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span style={{ color: "var(--fg)", fontSize: "0.9rem" }}>{name}</span>
        <span style={{ color, fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>{pct}%</span>
      </div>
      <div className="w-full rounded-full overflow-hidden" style={{ height: "6px", background: "rgba(255,255,255,0.07)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}55` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="relative z-20" style={{ background: "var(--bg)", paddingTop: "9rem", paddingBottom: "7rem" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

      <div className="container">
        {/* Label */}
        <FadeUp>
          <p style={{ color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.3em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            About Me
          </p>
        </FadeUp>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="grid-cols-1 lg:grid-cols-2">

          {/* Left — bio */}
          <div>
            <FadeUp delay={0.05}>
              <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.8rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "2rem", color: "var(--fg)", letterSpacing: "-0.02em" }}>
                I&apos;m Rohan Majeed.<br />
                <span className="gradient-text-lime">MERN Stack Developer.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                I&apos;m a passionate MERN Stack Developer with a strong focus on building modern, scalable, and high-performance web applications. I specialize in MongoDB, Express.js, React, and Node.js creating full-stack solutions with clean UI/UX and efficient backend architecture.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.85, marginBottom: "1.25rem" }}>
                Alongside web development, I integrate AI-powered features to build intelligent systems like chat applications, voice assistants, and multi-agent platforms. I&apos;ve worked on projects such as a Multi-Agent AI Career Advisor, a University Voice Assistant with chat integration.
                </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.85, marginBottom: "2.5rem" }}>
                I&apos;m continuously exploring new technologies and pushing my limits to build impactful solutions in AI, SaaS, and digital products.
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", borderRadius: "9999px", padding: "0.6rem 1.25rem", background: "rgba(200,255,0,0.07)", border: "1px solid rgba(200,255,0,0.2)" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", animation: "pulse 2s infinite" }} />
                <span style={{ color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.2em", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                  Open to new opportunities
                </span>
              </div>
            </FadeUp>
          </div>

          {/* Right — stat cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { value: "4+",  label: "Years of Experience" },
              { value: "30+", label: "Projects Shipped"    },
              { value: "12+", label: "Happy Clients"       },
              { value: "∞",   label: "Cups of Coffee"      },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                ref={(() => { const r = useRef<HTMLDivElement>(null); return r; })()}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  borderRadius: "14px", padding: "0 1.5rem",
                  height: "76px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", left: 0, top: "22%", bottom: "22%", width: "2px", borderRadius: "2px", background: "var(--accent)" }} />
                <span style={{ color: "var(--muted)", fontSize: "0.78rem", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {stat.label}
                </span>
                <span style={{ color: "var(--accent)", fontSize: "1.9rem", fontWeight: 700, fontFamily: "var(--font-mono)", lineHeight: 1 }}>
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skill card with animations ──────────────────────────────────────────────
function SkillCard({ group, gi }: { group: typeof skillGroups[0]; gi: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: gi * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      style={{
        borderRadius: "20px", padding: "2rem",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        height: "100%", position: "relative", overflow: "hidden",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${group.color}30`;
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
      }}
    >
      {/* Subtle corner glow */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "120px", height: "120px", borderRadius: "50%",
        background: `radial-gradient(circle, ${group.color}18 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
        {/* Animated pulsing dot */}
        <div style={{ position: "relative", width: "12px", height: "12px", flexShrink: 0 }}>
          <motion.div
            style={{ position: "absolute", inset: 0, borderRadius: "50%", background: group.color }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: gi * 0.4 }}
          />
          <div style={{ position: "absolute", inset: "2px", borderRadius: "50%", background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
        </div>

        <span style={{ color: group.color, fontSize: "0.7rem", letterSpacing: "0.25em", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
          {group.category}
        </span>

        {/* Skill count badge */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: gi * 0.12 + 0.3 }}
          style={{
            marginLeft: "auto", fontSize: "0.65rem", fontFamily: "var(--font-mono)",
            color: group.color, background: `${group.color}15`,
            border: `1px solid ${group.color}30`,
            borderRadius: "9999px", padding: "2px 8px",
          }}
        >
          {group.skills.length} skills
        </motion.span>
      </div>

      {/* Skill bars */}
      {group.skills.map((skill, si) => (
        <SkillBar key={skill.name} name={skill.name} pct={skill.pct} color={group.color} delay={gi * 0.12 + si * 0.09} />
      ))}
    </motion.div>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true });

  return (
    <section id="skills" className="relative z-20" style={{ background: "var(--bg)", paddingTop: "7rem", paddingBottom: "14rem" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

      <div className="container">
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "4rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.3em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "1rem" }}
          >
            What I Work With
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.08 }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}
          >
            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1, color: "var(--fg)", letterSpacing: "-0.02em" }}>
              Skills &amp; Expertise
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "280px", textAlign: "right" }}>
              Built over years of shipping real products from design systems to 3D experiences.
            </p>
          </motion.div>
        </div>

        {/* 2×2 skill cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          {skillGroups.map((group, gi) => (
            <SkillCard key={group.category} group={group} gi={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}
