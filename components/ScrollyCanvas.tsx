"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  useScroll,
  useMotionValueEvent,
  useTransform,
  motion,
} from "framer-motion";

// ─── Config ──────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 89;
const SCROLL_HEIGHT = "500vh";
const BG_COLOR = "#0d0d0d";

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/sequence/frames/frame_${padded}.webp`;
}

// ─── Cover-fit draw helper ────────────────────────────────────────────────────
function drawCoverFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  if (!img.complete || img.naturalWidth === 0) return;

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;

  let drawW: number, drawH: number, offsetX: number, offsetY: number;

  if (canvasRatio > imgRatio) {
    drawW = canvasW;
    drawH = canvasW / imgRatio;
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  } else {
    drawH = canvasH;
    drawW = canvasH * imgRatio;
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}// ─── Component ───────────────────────────────────────────────────────────────
export function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);

  // ── Preload all frames ──────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    loadedCountRef.current = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCountRef.current += 1;
        // Render first frame as soon as it's ready
        if (i === 1) renderFrame(0);
      };
      img.onerror = () => {
        // Frame missing — silently skip (handles single-frame dev scenario)
      };
      images.push(img);
    }

    imagesRef.current = images;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Resize canvas to fill viewport — HiDPI aware ──────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;

    // Physical pixel buffer — sharp on retina screens
    canvas.width  = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);

    // CSS size stays at logical pixels so layout is unchanged
    canvas.style.width  = `${cssW}px`;
    canvas.style.height = `${cssH}px`;

    // Scale context so all draw calls use logical coordinates
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    renderFrame(currentFrameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ── Draw a specific frame index ─────────────────────────────────────────
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    if (images.length === 0) return;

    const safeIndex = Math.max(0, Math.min(index, images.length - 1));
    const img = images[safeIndex];

    // Use logical (CSS) dimensions — context is already DPR-scaled
    const logicalW = parseFloat(canvas.style.width)  || canvas.width;
    const logicalH = parseFloat(canvas.style.height) || canvas.height;

    if (img && img.complete && img.naturalWidth > 0) {
      drawCoverFit(ctx, img, logicalW, logicalH);
    } else if (img) {
      img.onload = () => {
        if (currentFrameRef.current === safeIndex) {
          drawCoverFit(ctx, img, logicalW, logicalH);
        }
      };
    }
  }, []);

  // ── Scroll → frame mapping ──────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.round(latest * (TOTAL_FRAMES - 1));
    const clamped = Math.max(0, Math.min(frameIndex, TOTAL_FRAMES - 1));
    if (clamped !== currentFrameRef.current) {
      currentFrameRef.current = clamped;
      renderFrame(clamped);
    }
  });

  // ── Parallax text transforms ────────────────────────────────────────────
  // Section 1: visible at 0–25%
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], ["0%", "-12%"]);

  // Section 2: visible at 28–55%
  const opacity2 = useTransform(
    scrollYProgress,
    [0.25, 0.38, 0.52],
    [0, 1, 0]
  );
  const y2 = useTransform(
    scrollYProgress,
    [0.25, 0.38, 0.55],
    ["8%", "0%", "-8%"]
  );

  // Section 3: visible at 58–85%
  const opacity3 = useTransform(
    scrollYProgress,
    [0.55, 0.68, 0.82],
    [0, 1, 0]
  );
  const y3 = useTransform(
    scrollYProgress,
    [0.55, 0.68, 0.85],
    ["8%", "0%", "-8%"]
  );

  // Progress indicator
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: SCROLL_HEIGHT, background: BG_COLOR }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ display: "block", position: "absolute", inset: 0 }}
        />

        {/* Dark vignette overlay for text legibility */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.65) 100%)",
          }}
        />

        {/* ── Text Overlay ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Section 1 — Center */}
          <motion.div
            style={{ opacity: opacity1, y: y1 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p
              className="text-xs uppercase tracking-[0.3em] mb-6 font-mono"
              style={{ color: "var(--accent)" }}
            >
              Creative Developer
            </p>
            <h1
              className="font-bold leading-[0.9] tracking-tighter"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 10rem)",
                color: "var(--fg)",
              }}
            >
              Rohan Majeed.
            </h1>
            <div
              className="mt-6 h-px w-24"
              style={{ background: "var(--border)" }}
            />
          </motion.div>

          {/* Section 2 — Left */}
          <motion.div
            style={{ opacity: opacity2, y: y2 }}
            className="absolute inset-0 flex items-center justify-start px-8 md:px-20 lg:px-32"
          >
            <div className="max-w-2xl">
              <p
                className="text-xs uppercase tracking-[0.3em] mb-5 font-mono"
                style={{ color: "var(--muted)" }}
              >
                01 / Mission
              </p>
              <h2
                className="font-bold leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
              >
                <span style={{ color: "var(--fg)" }}>I build</span>
                <br />
                <span className="gradient-text-blue">digital</span>
                <br />
                <span className="gradient-text-blue">experiences.</span>
              </h2>
            </div>
          </motion.div>

          {/* Section 3 — Right */}
          <motion.div
            style={{ opacity: opacity3, y: y3 }}
            className="absolute inset-0 flex items-center justify-end px-8 md:px-20 lg:px-32 text-right"
          >
            <div className="max-w-2xl">
              <p
                className="text-xs uppercase tracking-[0.3em] mb-5 font-mono"
                style={{ color: "var(--muted)" }}
              >
                02 / Craft
              </p>
              <h2
                className="font-bold leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
              >
                <span style={{ color: "var(--fg)" }}>Bridging</span>
                <br />
                <span className="gradient-text-emerald">design &</span>
                <br />
                <span className="gradient-text-emerald">engineering.</span>
              </h2>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll progress bar ── */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] z-20 origin-left"
          style={{
            scaleX,
            background: "var(--accent)",
          }}
        />

        {/* ── Scroll hint ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
          }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.25em] font-mono"
            style={{ color: "var(--muted)" }}
          >
            Scroll
          </span>
          <div className="w-px h-8 overflow-hidden" style={{ background: "var(--border)" }}>
            <motion.div
              className="w-full h-full"
              style={{ background: "var(--accent)" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* ── Frame counter (dev aesthetic) ── */}
        <div
          className="absolute top-6 right-6 z-20 font-mono text-[10px] tracking-widest"
          style={{ color: "var(--muted)" }}
          aria-hidden="true"
        >
          <FrameCounter scrollYProgress={scrollYProgress} total={TOTAL_FRAMES} />
        </div>
      </div>
    </div>
  );
}

// ── Small sub-component to display current frame number ──────────────────────
function FrameCounter({
  scrollYProgress,
  total,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const frame = useTransform(scrollYProgress, (v) =>
    String(Math.round(v * (total - 1)) + 1).padStart(3, "0")
  );
  return <motion.span>{frame}</motion.span>;
}
