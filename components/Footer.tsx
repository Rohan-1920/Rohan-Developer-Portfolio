"use client";

const quickAnchors = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#services" },
  { label: "Record", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  function handleBackToTop() {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="site-footer border-t border-white/[0.08] bg-[#0B0B0B] py-12">
      <div className="container grid gap-8 lg:grid-cols-[1.2fr_1fr_1.2fr] lg:items-start lg:gap-10">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-white">ROHAN MAJEED</p>
          <p className="mt-2 max-w-xs font-mono text-xs leading-6 text-zinc-500">
            Full-Stack Engineer · AI Developer · Founder @ DevSquad.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 font-mono text-xs text-zinc-500 lg:justify-center">
          {quickAnchors.map((anchor) => (
            <a key={anchor.href} href={anchor.href} className="transition-colors hover:text-white focus:text-white focus:outline-none">
              {anchor.label}
            </a>
          ))}
          <button type="button" onClick={handleBackToTop} className="transition-colors hover:text-white focus:text-white focus:outline-none">
            Back to Top ↑
          </button>
        </nav>

        <div className="flex flex-col gap-2 font-mono text-xs text-zinc-500 lg:items-end">
          <div className="flex gap-5">
            <a href="https://github.com/Rohan-1920" target="_blank" rel="noreferrer" className="transition-colors hover:text-white focus:text-white focus:outline-none">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/rohan-m-604a2b289" target="_blank" rel="noreferrer" className="transition-colors hover:text-white focus:text-white focus:outline-none">
              LinkedIn
            </a>
          </div>
          <p>Rohan Majeed. Built for performance.</p>
        </div>
      </div>
    </footer>
  );
}