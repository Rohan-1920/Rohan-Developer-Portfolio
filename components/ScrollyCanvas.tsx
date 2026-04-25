"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 89;
const SCROLL_HEIGHT = "450vh";
const BG_COLOR = "#0d0d0d";
const HERO_IMAGE = "/rohan.jpg";

function getFrameSrc(i: number) {
  return `/sequence/frames/frame_${String(i).padStart(4, "0")}.webp`;
}

function drawCoverFit(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  if (!img.complete || !img.naturalWidth) return;
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = w / h;
  let dw: number, dh: number, ox: number, oy: number;
  if (cr > ir) { dw = w; dh = w / ir; ox = 0; oy = (h - dh) / 2; }
  else         { dh = h; dw = h * ir; oy = 0; ox = (w - dw) / 2; }
  ctx.clearRect(0, 0, w, h);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, ox, oy, dw, dh);
}

// ─── Section components ───────────────────────────────────────────────────────
function Section0() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.3em] mb-6 font-mono" style={{ color: "var(--accent)" }}>
        MERN Stack Developer
      </p>
      <h1 className="font-bold leading-[0.9] tracking-tighter"
        style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)", color: "var(--fg)" }}>
        Rohan Majeed.
      </h1>
      <div className="mt-6 h-px w-24" style={{ background: "var(--border)" }} />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] mb-5 font-mono" style={{ color: "var(--muted)" }}>
          01 / Mission
        </p>
        <h2 className="font-bold leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}>
          <span style={{ color: "var(--fg)" }}>I build</span><br />
          <span className="gradient-text-blue">digital</span><br />
          <span className="gradient-text-blue">experiences.</span>
        </h2>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] mb-5 font-mono" style={{ color: "var(--muted)" }}>
          02 / Craft
        </p>
        <h2 className="font-bold leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}>
          <span style={{ color: "var(--fg)" }}>Bridging</span><br />
          <span className="gradient-text-emerald">design &amp;</span><br />
          <span className="gradient-text-emerald">engineering.</span>
        </h2>
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-[0.3em] mb-6 font-mono" style={{ color: "var(--muted)" }}>
        03 / Let&apos;s work together
      </p>
      <h2 className="font-bold leading-[0.92] tracking-tight mb-8"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
        <span style={{ color: "var(--fg)" }}>Ready to</span><br />
        <span className="gradient-text-lime">create something</span><br />
        <span className="gradient-text-lime">extraordinary?</span>
      </h2>
      <a href="#contact" style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        background: "var(--accent)", color: "#0d0d0d",
        fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em",
        textTransform: "uppercase", fontFamily: "var(--font-mono)",
        padding: "0.85rem 2rem", borderRadius: "9999px", textDecoration: "none",
      }}>
        Get in touch ↓
      </a>
    </div>
  );
}

const sections = [Section0, Section1, Section2, Section3];

function getSection(v: number): number {
  if (v < 0.25) return 0;
  if (v < 0.50) return 1;
  if (v < 0.75) return 2;
  return 3;
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ScrollyCanvas() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const imagesRef       = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [activeSection, setActiveSection] = useState(0);

  // Preload
  useEffect(() => {
    const hero = new window.Image();
    hero.src = HERO_IMAGE;
    const images: HTMLImageElement[] = [hero];
    hero.onload = () => renderFrame(0);
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFrameSrc(i);
      img.onload = () => { if (i === 1) renderFrame(0); };
      images.push(img);
    }
    imagesRef.current = images;
    if (hero.complete && hero.naturalWidth) renderFrame(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Canvas resize (HiDPI)
  const resizeCanvas = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    c.width  = Math.round(window.innerWidth  * dpr);
    c.height = Math.round(window.innerHeight * dpr);
    c.style.width  = `${window.innerWidth}px`;
    c.style.height = `${window.innerHeight}px`;
    renderFrame(currentFrameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Draw frame
  const renderFrame = useCallback((index: number) => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const imgs = imagesRef.current; if (!imgs.length) return;
    const safe = Math.max(0, Math.min(index, imgs.length - 1));
    const img  = imgs[safe];
    if (img?.complete && img.naturalWidth) {
      drawCoverFit(ctx, img, c.width, c.height);
    } else {
      const hero = imgs[0];
      if (hero?.complete && hero.naturalWidth) drawCoverFit(ctx, hero, c.width, c.height);
      if (img && safe !== 0) img.onload = () => {
        if (currentFrameRef.current === safe) drawCoverFit(ctx, img, c.width, c.height);
      };
    }
  }, []);

  // Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX      = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.max(0, Math.min(Math.round(v * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1));
    if (idx !== currentFrameRef.current) { currentFrameRef.current = idx; renderFrame(idx); }
    setActiveSection(getSection(v));
  });

  const SectionComponent = sections[activeSection];

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: SCROLL_HEIGHT, background: BG_COLOR }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas */}
        <canvas ref={canvasRef} aria-hidden="true"
          style={{ display: "block", position: "absolute", inset: 0 }} />

        {/* Vignette */}
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.7) 100%)" }} />

        {/* Subtle background grid */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            opacity: 0.24,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(circle at center, black 35%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 85%)",
          }}
        />

        {/* Active section — AnimatePresence swaps cleanly */}
        <div className="absolute inset-0 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
              style={{ pointerEvents: activeSection === 3 ? "auto" : "none" }}
            >
              <SectionComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <motion.div className="absolute bottom-0 left-0 h-[2px] z-20 origin-left w-full"
          style={{ scaleX, background: "var(--accent)" }} />

        {/* Scroll hint */}
        <motion.div style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono" style={{ color: "var(--muted)" }}>
            Scroll
          </span>
          <div className="w-px h-8 overflow-hidden" style={{ background: "var(--border)" }}>
            <motion.div className="w-full h-full" style={{ background: "var(--accent)" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
