"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#skills" },
  { label: "Record", href: "#experience" },
  { label: "About", href: "#about" },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY <= 12 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isHeaderVisible || isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="container"
          style={{ minHeight: "72px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}
        >
          <a href="#about" style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", textDecoration: "none", minWidth: 0 }}>
            <span style={{ color: "var(--fg)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
              ROHAN MAJEED
            </span>
          </a>

          <nav className="hidden md:flex items-center" aria-label="Primary navigation" style={{ gap: "0.25rem" }}>
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                style={{
                  color: "var(--muted)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                  padding: "0.65rem 0.8rem",
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
                {item.label}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            <a
              href="#contact"
              className="hidden sm:inline-flex"
              style={{
                alignItems: "center", gap: "0.4rem",
                background: "var(--fg)", color: "var(--bg)",
                fontSize: "0.78rem", fontWeight: 700, minHeight: "44px",
                padding: "0.65rem 1rem",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "color 0.2s, background 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--surface-hover)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 0 1px var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--fg)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Let&apos;s Talk
            </a>
            <button
              type="button"
              className="md:hidden"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              style={{ width: "44px", height: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--fg)", background: "transparent", border: "1px solid var(--border)", borderRadius: "6px", cursor: "pointer" }}
            >
              {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden container" aria-label="Mobile navigation" style={{ paddingTop: "0.75rem", paddingBottom: "1.25rem", borderTop: "1px solid var(--border)" }}>
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} style={{ display: "block", color: "var(--fg)", fontSize: "1.15rem", fontWeight: 600, padding: "0.9rem 0", borderBottom: "1px solid var(--border)", textDecoration: "none" }}>
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem", padding: "0.9rem 1rem", color: "var(--bg)", background: "var(--fg)", borderRadius: "6px", fontWeight: 700, textDecoration: "none" }}>
              Let&apos;s Talk
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
