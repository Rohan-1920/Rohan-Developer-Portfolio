"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const navLinks = ["Work", "About", "Skills", "Contact"];

export function NavBar() {
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const bgOpacity  = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(13,13,13,${v * 0.9})`),
          borderBottom: "1px solid",
          borderColor: useTransform(borderOpacity, (v) => `rgba(255,255,255,${v * 0.08})`),
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          className="container"
          style={{ height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* ── Logo ── */}
          <a
            href="#"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}
          >
            {/* Icon mark */}
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "var(--accent)", display: "flex", alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ color: "#0d0d0d", fontWeight: 800, fontSize: "0.85rem", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
                RM
              </span>
            </div>
            {/* Name — hidden on small screens */}
            <span
              className="hidden sm:block"
              style={{ color: "var(--fg)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em" }}
            >
              Rohan Majeed
            </span>
          </a>

          {/* ── Desktop nav ── */}
          <nav
            className="hidden md:flex items-center"
            style={{ gap: "0.25rem" }}
          >
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: "var(--muted)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-mono)",
                  textDecoration: "none",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "6px",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "var(--fg)";
                  el.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "var(--muted)";
                  el.style.background = "transparent";
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* ── Right side: CTA + hamburger ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Hire me button */}
            <a
              href="#contact"
              className="hidden sm:flex"
              style={{
                alignItems: "center", gap: "0.4rem",
                background: "var(--accent)", color: "#0d0d0d",
                fontSize: "0.75rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                padding: "0.5rem 1.1rem",
                borderRadius: "9999px",
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Hire me
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="flex md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", flexDirection: "column", gap: "5px" }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  style={{ display: "block", width: "22px", height: "2px", background: "var(--fg)", borderRadius: "2px", transformOrigin: "center" }}
                  animate={
                    menuOpen
                      ? i === 0 ? { rotate: 45, y: 7 }
                      : i === 1 ? { opacity: 0 }
                      : { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.25 }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: "68px", left: 0, right: 0, zIndex: 49,
              background: "rgba(13,13,13,0.97)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              padding: "1.5rem",
              display: "flex", flexDirection: "column", gap: "0.5rem",
            }}
          >
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "var(--fg)", fontSize: "1rem", fontWeight: 500,
                  textDecoration: "none", padding: "0.75rem 1rem",
                  borderRadius: "10px", transition: "background 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "transparent")}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: "0.5rem", textAlign: "center",
                background: "var(--accent)", color: "#0d0d0d",
                fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", fontFamily: "var(--font-mono)",
                padding: "0.75rem", borderRadius: "9999px", textDecoration: "none",
              }}
            >
              Hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Need AnimatePresence for mobile menu
import { AnimatePresence } from "framer-motion";
