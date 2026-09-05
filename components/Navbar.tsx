"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#skills" },
  { label: "Record", href: "#experience" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-sm">
      <div className="container flex min-h-16 items-center justify-between gap-6">
        <a
          href="#about"
          className="flex min-h-11 items-center gap-2 whitespace-nowrap no-underline"
          onClick={closeMenu}
        >
          <span className="text-sm font-semibold tracking-tight text-white">
            ROHAN MAJEED
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.08em] text-zinc-500">
            · DEVSQUAD
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center px-3 text-sm text-zinc-400 no-underline transition-colors hover:text-white focus-visible:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden min-h-11 items-center border border-white/[0.15] px-4 text-sm font-medium text-white no-underline transition-colors hover:bg-white/[0.05] focus-visible:bg-white/[0.05] sm:inline-flex"
          >
            Let&apos;s Talk <span className="ml-2" aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-white/[0.08] text-white md:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-white/[0.08] px-4 pb-5 pt-2 md:hidden" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="flex min-h-11 items-center border-b border-white/[0.08] text-base text-zinc-300 no-underline transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-4 flex min-h-11 items-center justify-between border border-white/[0.15] px-4 text-sm font-medium text-white no-underline transition-colors hover:bg-white/[0.05]"
          >
            Let&apos;s Talk <span aria-hidden="true">→</span>
          </a>
        </nav>
      )}
    </header>
  );
}