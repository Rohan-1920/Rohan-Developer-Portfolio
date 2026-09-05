"use client";

import { useEffect, useState } from "react";

const LATENCY_MIN = 22;
const LATENCY_MAX = 28;

function nextLatency() {
  return Math.floor(Math.random() * (LATENCY_MAX - LATENCY_MIN + 1)) + LATENCY_MIN;
}

export function OperationalStatus() {
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLatency(nextLatency());
    }, 1600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      aria-label="Operational system status"
      className="border-t border-white/[0.08] bg-[#0B0B0B] px-4 py-3 font-mono text-xs uppercase tracking-wider text-zinc-500"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-4 gap-y-2 md:flex md:items-center md:justify-between md:gap-6">
        <span className="flex min-w-0 items-center">
          <span className="mr-2 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          SYSTEM: ONLINE
        </span>
        <span className="min-w-0 break-words">FOCUS: DEVSQUAD &amp; n8n AUTOMATIONS</span>
        <span className="min-w-0">LATENCY: ~<span className="inline-block min-w-[2ch] text-right">{latency}</span>ms</span>
        <span className="min-w-0">DEPLOYED: PRODUCTION</span>
      </div>
    </section>
  );
}
