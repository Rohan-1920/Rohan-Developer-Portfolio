"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

// ─── Custom SVG icons ─────────────────────────────────────────────────────────
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

const socials = [
  { label: "GitHub",   handle: "GitHub",   href: "https://github.com/Rohan-1920",                 Icon: GitHubIcon  },
  { label: "LinkedIn", handle: "LinkedIn", href: "https://www.linkedin.com/in/rohan-m-604a2b289",  Icon: LinkedInIcon },
  { label: "Email",    handle: "Email",    href: "mailto:rohanmajeed7@gmail.com",                  Icon: Mail        },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string; details?: string } | null;
        const reason = [data?.error, data?.details].filter(Boolean).join(" ");
        throw new Error(reason || "Failed to send message");
      }

      setSent(true);
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  const field = (name: string): React.CSSProperties => ({
    width: "100%",
    background: focused === name ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === name ? "rgba(200,255,0,0.45)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "12px",
    padding: "13px 16px",
    fontSize: "0.9rem",
    color: "var(--fg)",
    outline: "none",
    fontFamily: "inherit",
    transition: "background 0.2s, border-color 0.2s",
  });

  const label: React.CSSProperties = {
    display: "block",
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    fontFamily: "var(--font-mono)",
    color: "var(--muted)",
    marginBottom: "8px",
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div key="ok"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 0", gap: "1rem" }}
        >
          <div style={{ width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(200,255,0,0.12)", border: "1px solid rgba(200,255,0,0.3)", fontSize: "1.6rem", color: "var(--accent)" }}>✓</div>
          <p style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--fg)" }}>Message sent!</p>
          <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>I&apos;ll get back to you within 24 hours.</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* Name + Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={label}>Name</label>
              <input type="text" name="name" required placeholder="Your name"
                style={field("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
            </div>
            <div>
              <label style={label}>Email</label>
              <input type="email" name="email" required placeholder="your@email.com"
                style={field("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label style={label}>Subject</label>
            <input type="text" name="subject" placeholder="Project inquiry, collaboration..."
              style={field("subject")} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} />
          </div>

          {/* Message */}
          <div>
            <label style={label}>Message</label>
            <textarea name="message" required rows={5} placeholder="Tell me about your project..."
              style={{ ...field("message"), resize: "none" }}
              onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
          </div>

          {/* Submit */}
          <button type="submit"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem", background: "var(--accent)", color: "#0d0d0d", border: "none", borderRadius: "9999px", padding: "0.9rem 2rem", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-mono)", cursor: "pointer", marginTop: "0.5rem", transition: "opacity 0.2s, transform 0.2s" }}
            disabled={isSubmitting}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          >
            {isSubmitting ? "Sending..." : "Send Message"} <ArrowUpRight size={16} />
          </button>
          {errorMessage && (
            <p style={{ color: "#fda4af", fontSize: "0.8rem", marginTop: "0.2rem" }}>
              {errorMessage}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function Contact() {
  return (
    <section id="contact" className="relative z-20 px-0"
      style={{ background: "var(--bg)", paddingTop: "12rem", paddingBottom: "8rem" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(200,255,0,0.04), transparent)" }} />

      <div className="container relative">

        {/* Label */}
        <FadeUp>
          <p style={{ color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.3em", fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: "1.25rem", paddingTop: "2rem" }}>
            Get In Touch
          </p>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.06}>
          <h2 style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--fg)", marginBottom: "4rem" }}>
            Let&apos;s build<br />
            <span className="gradient-text-lime">something great.</span>
          </h2>
        </FadeUp>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>

          {/* ── Left: form card ── */}
          <FadeUp delay={0.1}>
            <div style={{ borderRadius: "24px", padding: "2.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}>
              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Mail size={15} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <p style={{ color: "var(--fg)", fontSize: "0.9rem", fontWeight: 600 }}>Send a message</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.75rem" }}>I reply within 24 hours</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </FadeUp>

          {/* ── Right: info card ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Availability */}
            <FadeUp delay={0.14}>
              <div style={{ borderRadius: "20px", padding: "1.75rem 2rem", background: "rgba(200,255,0,0.05)", border: "1px solid rgba(200,255,0,0.18)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", display: "inline-block", boxShadow: "0 0 8px rgba(200,255,0,0.6)" }} />
                  <span style={{ color: "var(--accent)", fontSize: "0.7rem", letterSpacing: "0.2em", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                    Available for new projects
                  </span>
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.6, marginTop: "0.75rem" }}>
                  Currently open to freelance work, full-time roles, and interesting collaborations.
                </p>
              </div>
            </FadeUp>

            {/* Location */}
            <FadeUp delay={0.18}>
              <div style={{ borderRadius: "20px", padding: "1.5rem 2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin size={16} style={{ color: "var(--muted)" }} />
                </div>
                <div>
                  <p style={{ color: "var(--fg)", fontSize: "0.9rem", fontWeight: 500 }}>Based in Pakistan</p>
                  <p style={{ color: "var(--muted)", fontSize: "0.78rem", marginTop: "2px" }}>Working worldwide · Remote friendly</p>
                </div>
              </div>
            </FadeUp>

            {/* Social links */}
            <FadeUp delay={0.22}>
              <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                {socials.map((social, i) => {
                  const Icon = social.Icon;
                  return (
                    <a key={social.label} href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "1rem 1.5rem",
                        background: "rgba(255,255,255,0.02)",
                        borderBottom: i < socials.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        textDecoration: "none",
                        transition: "background 0.2s, padding-left 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,255,0,0.05)";
                        (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "1.75rem";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)";
                        (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "1.5rem";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={16} style={{ color: "var(--fg)" }} />
                        </div>
                        <span style={{ color: "var(--fg)", fontSize: "0.9rem", fontWeight: 500 }}>
                          {social.label}
                        </span>
                      </div>
                      <ArrowUpRight size={15} style={{ color: "var(--muted)", flexShrink: 0 }} />
                    </a>
                  );
                })}
              </div>
            </FadeUp>

          </div>
        </div>
      </div>
    </section>
  );
}
