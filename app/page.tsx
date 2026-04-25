import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { NavBar } from "@/components/Overlay";
import { About, Skills } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Study } from "@/components/Study";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Fixed navigation */}
      <NavBar />

      {/* 1 — Scrollytelling hero (500vh) */}
      <ScrollyCanvas />

      {/* 2 — About Me (bio + stats) */}
      <About />

      {/* 3 — Skills & Expertise */}
      <Skills />

      {/* 4 — Experience */}
      <Experience />

      {/* 5 — Study */}
      <Study />

      {/* 6 — Services */}
      <Services />

      {/* 7 — Project Case Studies */}
      <Projects />

      {/* 8 — Contact */}
      <Contact />

      {/* Footer */}
      <footer
        className="relative z-20 py-10"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "var(--bg)",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
            © 2025 Rohan Majeed. All rights reserved.
          </span>
          <span className="font-mono text-xs tracking-widest" style={{ color: "var(--muted)" }}>
            Built with Next.js · Framer Motion · Canvas
          </span>
        </div>
      </footer>
    </>
  );
}
