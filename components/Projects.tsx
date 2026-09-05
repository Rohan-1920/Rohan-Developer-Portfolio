"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-white bg-white px-4 py-2 font-mono text-xs font-semibold text-canvas transition-colors duration-200 ease-out hover:bg-zinc-200"
        >
          Live System <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ) : null}
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-hairline-hover px-4 py-2 font-mono text-xs text-zinc-300 transition-colors duration-200 ease-out hover:border-white hover:text-white"
        >
          Source Code <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border border-white/[0.08] bg-[#181818] p-3 sm:p-4">
      <div className="flex h-full flex-col overflow-hidden border border-white/[0.08] bg-[#121212]">
        <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-white/[0.08] px-3">
          <span className="size-1.5 rounded-full bg-zinc-600" />
          <span className="size-1.5 rounded-full bg-zinc-600" />
          <span className="size-1.5 rounded-full bg-zinc-600" />
          <span className="ml-3 h-3 max-w-48 flex-1 border border-white/[0.06] bg-white/[0.03]" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[0.7fr_1.3fr] gap-3 p-3 sm:gap-4 sm:p-4">
          <div className="space-y-2 border-r border-white/[0.06] pr-3 sm:pr-4">
            <div className="h-2 w-2/3 bg-white/[0.12]" />
            <div className="h-1.5 w-full bg-white/[0.05]" />
            <div className="h-1.5 w-4/5 bg-white/[0.05]" />
            <div className="h-1.5 w-3/5 bg-emerald-400/40" />
          </div>
          <div className="min-w-0 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="h-2 w-2/5 bg-white/[0.12]" />
              <div className="h-4 w-12 border border-emerald-400/20 bg-emerald-400/10" />
            </div>
            <div className="h-16 border border-white/[0.06] bg-white/[0.03] sm:h-20" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-white/[0.04]" />
              <div className="h-8 bg-white/[0.04]" />
              <div className="h-8 bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </div>
      <span className="absolute bottom-5 left-5 border border-white/[0.08] bg-[#121212]/90 px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-zinc-500 sm:bottom-6 sm:left-6">
        {project.previewPlaceholder}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="hairline-card card-top-light group flex min-w-0 flex-col overflow-hidden rounded-lg transition-colors duration-200 ease-out hover:border-white/[0.2] hover:bg-white/[0.02]">
      <ProjectPreview project={project} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 font-mono text-xs tracking-wider text-zinc-500">{project.domain}</p>
        <h3 className="mb-5 text-xl font-semibold tracking-tight text-white">{project.title}</h3>

        <div className="space-y-4 text-sm leading-6 text-zinc-400">
          <p><span className="font-mono text-xs text-zinc-500">Problem: </span>{project.problem}</p>
          <p><span className="font-mono text-xs text-zinc-500">Solution: </span>{project.solution}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
          {project.stack.map((technology) => (
            <span key={technology} className="rounded border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 font-mono text-xs text-zinc-300">
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
            <Reveal key={project.id} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
