"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data/projects";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
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

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row sm:items-center">
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-white bg-white px-4 py-2 font-mono text-xs font-semibold text-canvas transition-colors duration-200 ease-out hover:bg-zinc-200"
        >
          Live Deployment <ExternalLink size={14} aria-hidden="true" />
        </a>
      ) : null}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-hairline-hover px-4 py-2 font-mono text-xs text-zinc-300 transition-colors duration-200 ease-out hover:border-white hover:text-white"
        >
          Source Code <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ) : (
        <span className="font-mono text-xs text-zinc-500">Source link pending verification</span>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="hairline-card card-top-light group flex min-w-0 flex-col p-5 transition-colors duration-200 ease-out hover:border-white/[0.18] hover:bg-white/[0.02] sm:p-7">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/[0.08] pb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">
        <span>
          SYS // 0{project.index} · <span className="text-emerald-accent">● PRODUCTION</span>
        </span>
        <span>DOMAIN: {project.category}</span>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">{project.year}</p>
        <h3 className="mb-7 text-xl font-semibold tracking-tight text-white">{project.title}</h3>

        <div className="max-w-2xl space-y-7">
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">Core friction</p>
            <p className="max-w-[58ch] text-sm leading-7 text-zinc-400">{project.problem}</p>
          </div>
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">Engineered execution</p>
            <p className="max-w-[58ch] text-sm leading-7 text-zinc-400">{project.solution}</p>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-500">Key architecture decisions</p>
            <ul className="space-y-3 pl-4 text-sm leading-7 text-zinc-400 marker:text-emerald-accent">
              {project.architecture.map((decision) => <li key={decision}>{decision}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
          {project.stack.map((technology) => (
            <span key={technology} className="rounded border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-xs text-zinc-300">
              {technology}
            </span>
          ))}
        </div>

        <ProjectActions project={project} />
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" className="project-section relative z-20" style={{ background: "var(--bg)" }}>
      <div className="container">
        <Reveal>
          <p className="section-kicker">Selected work</p>
          <div className="project-section-heading">
            <h2>Engineering proof, not just project tiles.</h2>
            <p>High-density systems presented through the constraints, decisions, and operational flows behind them.</p>
          </div>
        </Reveal>

        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.index} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
