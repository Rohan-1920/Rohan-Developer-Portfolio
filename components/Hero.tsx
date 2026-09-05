"use client";

import { useState } from "react";

const secondaryLinks = [
  { label: "GitHub", href: "https://github.com/Rohan-1920" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohan-m-604a2b289" },
  { label: "DevSquad", href: "https://lnkd.in/ddWMWr94" },
];

export function Hero() {
  const [viewMode, setViewMode] = useState<"executive" | "architecture">("executive");
  const isArchitectureMode = viewMode === "architecture";

  return (
    <section
      id="hero"
      className="hero-section"
      aria-labelledby="hero-title"
      style={{
        minHeight: "min(860px, 100vh)",
        paddingTop: "clamp(9rem, 18vh, 12rem)",
        paddingBottom: "clamp(6rem, 12vh, 10rem)",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div className="radial-spotlight pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container relative z-[1]">
        <div className="flex max-w-[920px] flex-col">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs tracking-[0.08em] text-zinc-400">
              <span className="mr-2 text-emerald-accent" aria-hidden="true">●</span>
              AVAILABLE FOR AGENTIC AI &amp; FULL-STACK SYSTEMS
            </p>

            <div className="inline-flex items-center border border-hairline bg-surface/70 p-1 font-mono text-[0.65rem] tracking-[0.08em] text-zinc-500">
              <span className="px-2 py-1 text-zinc-500">MODE:</span>
              <button
                type="button"
                aria-pressed={viewMode === "executive"}
                onClick={() => setViewMode("executive")}
                className={`px-2 py-1 transition-colors ${
                  viewMode === "executive" ? "bg-white text-canvas" : "hover:text-white"
                }`}
              >
                EXECUTIVE
              </button>
              <span aria-hidden="true">|</span>
              <button
                type="button"
                aria-pressed={viewMode === "architecture"}
                onClick={() => setViewMode("architecture")}
                className={`px-2 py-1 transition-colors ${
                  viewMode === "architecture" ? "bg-white text-canvas" : "hover:text-white"
                }`}
              >
                ARCHITECTURE
              </button>
            </div>
          </div>

          <div className="mb-5 flex min-h-5 items-center font-mono text-[0.65rem] tracking-[0.12em] text-emerald-accent transition-opacity duration-300" aria-live="polite">
            <span className={isArchitectureMode ? "opacity-100" : "opacity-0"}>
              SYS_ID: #RHN-NODE-01
            </span>
          </div>

          <h1
            id="hero-title"
            className="mb-8 max-w-[900px] text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[0.98] tracking-tight text-white"
          >
            Engineering <span className="text-gradient-metallic">production web products</span>, <span className="text-gradient-metallic">autonomous AI systems</span>, and automated operations.
          </h1>

          <div className="mb-5 max-w-[760px] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.7] text-zinc-400">
            <p>
              Full-Stack Engineer · AI Developer · Automation Builder · Founder @ DevSquad. Turning technical architecture into resilient software and automated operational pipelines.
            </p>
          </div>

          <div className={`mb-10 flex min-h-5 flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.65rem] tracking-[0.08em] text-zinc-500 transition-opacity duration-300 ${isArchitectureMode ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!isArchitectureMode}>
            <span>INPUT_STREAM</span>
            <span aria-hidden="true" className="text-emerald-accent">→</span>
            <span>INFERENCE</span>
            <span aria-hidden="true" className="text-emerald-accent">→</span>
            <span>EXECUTION</span>
            <span className="border border-hairline px-2 py-1 text-zinc-400">LATENCY: &lt;30ms | STACK: NEXT.JS 15 + RAG</span>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#work"
              className="hero-action inline-flex items-center justify-center gap-2 border border-white bg-white px-5 py-3 text-xs font-bold text-canvas no-underline transition-colors hover:bg-zinc-200"
            >
              View Selected Work <span aria-hidden="true">↓</span>
            </a>
            <a
              href="#contact"
              className="hero-action inline-flex items-center justify-center gap-2 border border-hairline-hover bg-surface px-5 py-3 text-xs font-semibold text-white no-underline transition-colors hover:border-white"
            >
              Start a Conversation <span aria-hidden="true">→</span>
            </a>
          </div>

          <nav
            aria-label="Professional links"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-5 sm:gap-x-8"
            style={{ marginTop: "5rem" }}
          >
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm font-semibold tracking-[0.06em] text-zinc-400 no-underline transition-colors hover:text-white sm:text-[0.95rem]"
              >
                {link.label} ↗
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
