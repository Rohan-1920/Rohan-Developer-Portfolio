"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
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

// ─── About ────────────────────────────────────────────────────────────────────
export function About() {
  return (
    <section id="about" className="relative z-20 about-section">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

      <div className="container">
        <FadeUp>
          <p className="section-kicker">
            About Me
          </p>
        </FadeUp>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-start lg:gap-20">
          <FadeUp delay={0.05}>
            <div className="max-w-2xl">
              <h2 className="max-w-xl text-[clamp(2.2rem,4.5vw,4rem)] font-bold leading-[1.05] tracking-tight text-white">Architecture over hype. Systems that earn their place.</h2>
              <div className="mt-8 space-y-5 text-base leading-8 text-zinc-400">
                <p>I approach engineering as a product and operations discipline. Before choosing a framework or model, I look for the bottleneck: where information gets lost, decisions slow down, or repetitive work drains attention.</p>
                <p>That means building dependable full-stack foundations, clear interfaces, and automation that people can trust. Through DevSquad, I turn those constraints into focused software that can ship, evolve, and solve a concrete operational problem.</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <aside className="border border-white/[0.08] bg-[#121212] p-5 sm:p-6" aria-label="Current building status">
              <p className="mb-6 font-mono text-xs tracking-[0.14em] text-zinc-500">NOW / STATUS</p>
              <div className="space-y-5 font-mono text-xs leading-6 tracking-[0.04em]">
                <p className="text-emerald-accent">● STATUS: ACTIVE SHIPPING</p>
                <p><span className="text-zinc-500">BUILDING:</span> <span className="text-zinc-300">DevSquad Client Systems &amp; SaaS MVPs</span></p>
                <p><span className="text-zinc-500">EXPLORING:</span> <span className="text-zinc-300">Autonomous Multi-Agent Orchestration</span></p>
              </div>
            </aside>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

