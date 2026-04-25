"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { IconType } from "react-icons";
import { SiMongodb, SiOpenai, SiVercel } from "react-icons/si";

const services = [
  {
    title: "MERN Web App Development",
    description:
      "I build complete MERN stack products for startups and businesses, from idea to production deployment.",
    deliverables: ["Responsive Frontend", "Secure REST APIs", "Database Integration"],
    icon: SiMongodb,
    accent: "#c8ff00",
  },
  {
    title: "AI Chatbots & Agent Systems",
    description:
      "I create practical AI chatbot and agent systems that automate workflows and improve business operations.",
    deliverables: ["Custom AI Workflows", "Tool Integrations", "Automation Logic"],
    icon: SiOpenai,
    accent: "#60a5fa",
  },
  {
    title: "Deployment & Product Launch",
    description:
      "I handle deployment and launch process so your product goes live smoothly with performance and reliability in place.",
    deliverables: ["Deployment Setup", "Performance Optimization", "Launch Support"],
    icon: SiVercel,
    accent: "#a78bfa",
  },
];

type ServiceItem = {
  title: string;
  description: string;
  deliverables: string[];
  icon: IconType;
  accent: string;
};

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative z-20"
      style={{ background: "var(--bg)", paddingTop: "8rem", paddingBottom: "6rem" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
      />

      <div className="container">
        <FadeUp>
          <p
            style={{
              color: "var(--accent)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Services
          </p>
        </FadeUp>

        <FadeUp delay={0.05}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "2.1rem",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2.2rem, 4.6vw, 3.8rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
              }}
            >
              Services I Provide
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "320px", textAlign: "right" }}>
              I actively provide these services for businesses, startups, and product teams.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(services as ServiceItem[]).map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeUp key={service.title} delay={0.08 + index * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    height: "100%",
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.03)",
                    padding: "1.2rem 1.25rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "18%",
                      bottom: "18%",
                      width: "2px",
                      borderRadius: "9999px",
                      background: service.accent,
                    }}
                  />
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `${service.accent}14`,
                      border: `1px solid ${service.accent}33`,
                      marginBottom: "0.9rem",
                    }}
                  >
                    <Icon size={18} style={{ color: service.accent }} />
                  </div>

                  <h3 style={{ color: "var(--fg)", fontSize: "1rem", fontWeight: 700, marginBottom: "0.55rem" }}>
                    {service.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                    {service.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginTop: "0.9rem" }}>
                    {service.deliverables.map((item) => (
                      <span
                        key={`${service.title}-${item}`}
                        style={{
                          fontSize: "0.65rem",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          borderRadius: "9999px",
                          padding: "0.28rem 0.56rem",
                          border: `1px solid ${service.accent}33`,
                          background: `${service.accent}14`,
                          color: service.accent,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
