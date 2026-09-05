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

function ArchitecturePreview({ project }: { project: Project }) {
  return (
    <div className="project-preview" aria-label={`${project.title} architecture preview`}>
      <div className="project-preview-bar">
        <span className="project-preview-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="project-preview-path">/{project.title.toLowerCase().replaceAll(" ", "-")}</span>
      </div>
      <div className="project-diagram">
        {project.preview.map((node, index) => (
          <div className="project-diagram-node" key={node}>
            <span className="project-diagram-index">0{index + 1}</span>
            <span>{node}</span>
            {index < project.preview.length - 1 && <ArrowUpRight className="project-diagram-arrow" size={14} aria-hidden="true" />}
          </div>
        ))}
      </div>
      <p className="project-preview-note">Architecture view · No screenshot available</p>
    </div>
  );
}

function StackTag({ label }: { label: string }) {
  return <span className="project-stack-tag">{label}</span>;
}

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="project-actions">
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer" className="project-action project-action-primary">
          Live System <ExternalLink size={14} aria-hidden="true" />
        </a>
      ) : null}
      {project.github ? (
        <a href={project.github} target="_blank" rel="noreferrer" className="project-action">
          Source Code <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ) : (
        <span className="project-action project-action-disabled">No public source listed</span>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative z-20 project-section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <Reveal>
          <p className="section-kicker">Selected work</p>
          <div className="project-section-heading">
            <h2>Engineering proof, not just project tiles.</h2>
            <p>Verified builds presented through the constraints, decisions, and systems behind them.</p>
          </div>
        </Reveal>

        <div className="project-case-studies" style={{ gridTemplateColumns: "minmax(0, 1fr)" }}>
          {projects.map((project, index) => (
            <Reveal key={project.index} delay={index * 0.05}>
              <article className={`project-case-study ${index % 2 === 1 ? "project-case-study-reverse" : ""}`}>
                <ArchitecturePreview project={project} />
                <div className="project-case-study-copy">
                  <div className="project-case-study-meta">
                    <span>{project.index} {"//"} {project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-role">{project.role}</p>

                  <div className="project-narrative">
                    <div>
                      <p className="project-field-label">Problem statement</p>
                      <p>{project.problem}</p>
                    </div>
                    <div>
                      <p className="project-field-label">Engineered solution</p>
                      <p>{project.solution}</p>
                    </div>
                  </div>

                  <div>
                    <p className="project-field-label">Architecture highlights</p>
                    <ul className="project-highlights">
                      {project.architecture.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  </div>

                  <div className="project-stack">
                    {project.stack.map((technology) => <StackTag key={technology} label={technology} />)}
                  </div>
                  <ProjectActions project={project} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
