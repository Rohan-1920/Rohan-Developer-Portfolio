"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiOpenai,
  SiLangchain,
  SiGithubcopilot,
  SiPerplexity,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiGit,
  SiDocker,
  SiPython,
  SiVercel,
  SiNetlify,
  SiClaude,
} from "react-icons/si";

type SkillItem = {
  name: string;
  icon: IconType;
  color: string;
  pct: number;
};

type SkillCategory = {
  label: string;
  accent: string;
  items: SkillItem[];
};

const skillCategories: SkillCategory[] = [
  {
    label: "MERN Core",
    accent: "#C8FF00",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", pct: 91 },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF", pct: 89 },
      { name: "React", icon: SiReact, color: "#61DAFB", pct: 92 },
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", pct: 90 },
    ],
  },
  {
    label: "Frontend",
    accent: "#60A5FA",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", pct: 90 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", pct: 86 },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", pct: 88 },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", pct: 93 },
      { name: "Redux", icon: SiRedux, color: "#764ABC", pct: 80 },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF", pct: 82 },
    ],
  },
  {
    label: "Backend",
    accent: "#34D399",
    items: [
      { name: "Node.js APIs", icon: SiNodedotjs, color: "#5FA04E", pct: 89 },
      { name: "Express Middleware", icon: SiExpress, color: "#FFFFFF", pct: 87 },
      { name: "Python", icon: SiPython, color: "#3776AB", pct: 76 },
      { name: "Git", icon: SiGit, color: "#F05032", pct: 84 },
      { name: "Docker", icon: SiDocker, color: "#2496ED", pct: 78 },
    ],
  },
  {
    label: "Deployment",
    accent: "#F59E0B",
    items: [
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF", pct: 86 },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7", pct: 80 },
      { name: "Docker Deploy", icon: SiDocker, color: "#2496ED", pct: 77 },
      { name: "Version Control", icon: SiGit, color: "#F05032", pct: 88 },
    ],
  },
  {
    label: "Other Tools",
    accent: "#F472B6",
    items: [
      { name: "ChatGPT", icon: SiOpenai, color: "#10A37F", pct: 92 },
      { name: "Claude", icon: SiClaude, color: "#D97706", pct: 88 },
      { name: "LangChain", icon: SiLangchain, color: "#00A67E", pct: 78 },
      { name: "GitHub Copilot", icon: SiGithubcopilot, color: "#FFFFFF", pct: 85 },
      { name: "Perplexity", icon: SiPerplexity, color: "#20B8CD", pct: 82 },
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

function SkillBar({ skill, delay }: { skill: SkillItem; delay: number }) {
  const Icon = skill.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.8rem" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--fg)", fontSize: "0.8rem", fontWeight: 600 }}>
          <Icon size={15} color={skill.color} />
          {skill.name}
        </span>
        <span style={{ color: skill.color, fontSize: "0.76rem", fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>
          {skill.pct}%
        </span>
      </div>
      <div style={{ height: "5px", borderRadius: "9999px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.pct}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", borderRadius: "9999px", background: skill.color }}
        />
      </div>
    </div>
  );
}

function SkillCard({
  label,
  accent,
  items,
  featured = false,
}: {
  label: string;
  accent: string;
  items: SkillItem[];
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.03)",
        padding: featured ? "1.1rem" : "1rem",
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p
          style={{
            color: accent,
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </p>
        <span style={{ color: "var(--muted)", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
          {items.length} tools
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map((skill, index) => (
          <SkillBar key={`${label}-${skill.name}`} skill={skill} delay={index * 0.06} />
        ))}
      </div>
    </motion.div>
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

// ─── Skills ───────────────────────────────────────────────────────────────────
export function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true });
  const primaryCategory = skillCategories[0];
  const secondaryCategories = skillCategories.slice(1);

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
              MERN stack focused skillset with production-ready frontend, backend, and deployment tools.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <SkillCard
            label={primaryCategory.label}
            accent={primaryCategory.accent}
            items={primaryCategory.items}
            featured
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondaryCategories.map((category) => (
              <SkillCard
                key={category.label}
                label={category.label}
                accent={category.accent}
                items={category.items}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
