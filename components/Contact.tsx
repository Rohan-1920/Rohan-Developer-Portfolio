"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clipboard,
  Mail,
  Send,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const emailAddress = "rohanmajeed7@gmail.com";

const profiles = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rohan-m-604a2b289", Icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/Rohan-1920", Icon: FaGithub },
];

const engagementContext = [
  "Available for Full-Stack & MVP contracts",
  "Consulting on AI & n8n automation systems",
  "Open to senior technical engineering roles",
];

const projectTypes = [
  "Full-Stack Application",
  "AI / RAG System",
  "n8n Automation",
  "Technical Role",
  "Other",
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

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();

  if (!copied) throw new Error("Copy is unavailable in this browser.");
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function clearFieldError(fieldName: string) {
    if (!fieldErrors[fieldName]) return;
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[fieldName];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const projectType = String(formData.get("projectType") || "Other");
    const message = String(formData.get("message") || "").trim();
    const nextFieldErrors: Record<string, string> = {};

    if (!name) nextFieldErrors.name = "Please enter your name.";
    if (!email) {
      nextFieldErrors.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextFieldErrors.email = "Please enter a valid email address.";
    }
    if (!formData.get("projectType")) nextFieldErrors.projectType = "Please choose a project type.";
    if (!message) nextFieldErrors.message = "Please share a little about your project.";

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    const payload = {
      name,
      email,
      subject: projectType,
      message,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string; details?: string } | null;
        throw new Error([data?.error, data?.details].filter(Boolean).join(" ") || "Unable to send your inquiry.");
      }

      form.reset();
      setSent(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="success"
          className="contact-success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          aria-live="polite"
        >
          <span className="contact-success-icon" aria-hidden="true"><Check size={20} /></span>
          <h3>Conversation started.</h3>
          <p>Thanks for the context. I&apos;ll get back to you within 24 hours.</p>
          <button type="button" className="contact-reset" onClick={() => setSent(false)}>
            Send another inquiry
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" className="contact-form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="contact-form-row">
            <div className="contact-field-group">
              <label className="contact-field-label" htmlFor="contact-name">Name</label>
              <input id="contact-name" className="contact-field" name="name" type="text" placeholder="Your name" required aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "contact-name-error" : undefined} onChange={() => clearFieldError("name")} />
              {fieldErrors.name && <p id="contact-name-error" className="contact-field-error">{fieldErrors.name}</p>}
            </div>
            <div className="contact-field-group">
              <label className="contact-field-label" htmlFor="contact-email">Email Address</label>
              <input id="contact-email" className="contact-field" name="email" type="email" placeholder="you@example.com" required aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "contact-email-error" : undefined} onChange={() => clearFieldError("email")} />
              {fieldErrors.email && <p id="contact-email-error" className="contact-field-error">{fieldErrors.email}</p>}
            </div>
          </div>

          <div className="contact-field-group">
            <label className="contact-field-label" htmlFor="contact-project-type">Project Type</label>
            <select id="contact-project-type" className="contact-field contact-select" name="projectType" defaultValue="" required aria-invalid={Boolean(fieldErrors.projectType)} aria-describedby={fieldErrors.projectType ? "contact-project-type-error" : undefined} onChange={() => clearFieldError("projectType")}>
              <option value="" disabled>Select a focus</option>
              {projectTypes.map((projectType) => <option key={projectType}>{projectType}</option>)}
            </select>
            {fieldErrors.projectType && <p id="contact-project-type-error" className="contact-field-error">{fieldErrors.projectType}</p>}
          </div>

          <div className="contact-field-group">
            <label className="contact-field-label" htmlFor="contact-message">Project Brief</label>
            <textarea id="contact-message" className="contact-field contact-textarea" name="message" rows={5} placeholder="Tell me about the problem, timeline, or requirements..." required aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "contact-message-error" : undefined} onChange={() => clearFieldError("message")} />
            {fieldErrors.message && <p id="contact-message-error" className="contact-field-error">{fieldErrors.message}</p>}
          </div>

          <button className="contact-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Start a Conversation →"}
            {isSubmitting ? <Send className="contact-submit-icon contact-submit-spin" size={16} /> : <ArrowUpRight className="contact-submit-icon" size={16} />}
          </button>

          {errorMessage && <p className="contact-form-error" role="alert">{errorMessage}</p>}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  async function handleCopyEmail() {
    try {
      await copyText(emailAddress);
      setCopyError(null);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      setCopyError(error instanceof Error ? error.message : "Unable to copy email.");
    }
  }

  return (
    <section id="contact" className="contact-section relative z-20">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />
      <div className="container">
        <FadeUp><p className="section-kicker">Get In Touch</p></FadeUp>

        <FadeUp delay={0.06}>
          <div className="contact-intro">
            <h2>Have a product, AI system, or process to build?</h2>
            <p>Let&apos;s discuss architecture, scope, and implementation. Typically responding within 24 hours.</p>
          </div>
        </FadeUp>

        <div className="contact-layout">
          <FadeUp delay={0.1}>
            <div className="contact-direct">
              <p className="contact-overline">Direct touchpoints</p>
              <div className="contact-email-block">
                <Mail size={18} aria-hidden="true" />
                <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                <button type="button" className="contact-copy" onClick={handleCopyEmail} aria-label={copied ? "Email copied" : "Copy email address"}>
                  {copied ? <Check size={15} /> : <Clipboard size={15} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              {copyError && <p className="contact-copy-error" role="alert">{copyError}</p>}

              <div className="contact-profiles" aria-label="Professional profiles">
                {profiles.map(({ label, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer">
                    <Icon size={16} aria-hidden="true" />
                    {label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>

              <ul className="contact-context">
                {engagementContext.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.14}>
            <div className="contact-form-panel">
              <ContactForm />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
