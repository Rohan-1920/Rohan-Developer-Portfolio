"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const studies = [
  {
    title: "BS Data Science",
    institute: "Virtual University of Pakistan",
    duration: "Ongoing",
    details: "Statistics, machine learning foundations, data analysis, and practical software implementation.",
  },
  {
    title: "DAE Electrical",
    institute: "TEVTA · 3 Years",
    duration: "Completed",
    details: "Technical fundamentals and applied engineering discipline across a three-year diploma program.",
  },
  {
    title: "Certified Chinese Language Course",
    institute: "NAVTTC",
    duration: "3 Months",
    details: "Foundational communication and practical language learning through a certified course.",
  },
  {
    title: "AutoCAD Training",
    institute: "Professional Technical Training · Mechanical & Civil",
    duration: "Completed",
    details: "Hands-on drafting and design workflows across mechanical and civil drawing systems.",
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6%" });
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

export function Study() {
  return (
    <section id="study" className="study-section relative z-20 bg-canvas py-20 md:py-28">
      <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)]" />

      <div className="container">
        <FadeUp>
          <p className="section-kicker">Study / foundations</p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
            <h2 className="max-w-3xl text-[clamp(2.1rem,4.4vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-white">
              Education that compounds the engineering work.
            </h2>
            <p className="max-w-xs text-sm leading-7 text-zinc-500 md:text-right">
              Academic grounding and technical training aligned with full-stack systems, data, and applied problem-solving.
            </p>
          </div>
        </FadeUp>

        <div className="border-t border-white/[0.08]">
          {studies.map((item, index) => (
            <FadeUp key={item.title} delay={0.08 + index * 0.06}>
              <article className="grid gap-4 border-b border-white/[0.08] py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)_auto] md:items-center md:gap-8">
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-accent">0{index + 1} / learning record</p>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-zinc-400">{item.institute}</p>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-500">{item.details}</p>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-zinc-500 md:text-right">{item.duration}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
