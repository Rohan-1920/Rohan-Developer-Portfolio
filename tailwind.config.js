/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: "#0A0A0A",
        surface: "#121212",
        "surface-hover": "#181818",
        primary: "#FFFFFF",
        secondary: "#A1A1AA",
        muted: "#71717A",
        "emerald-accent": "#10B981",
        "emerald-glow": "rgba(16, 185, 129, 0.08)",
        hairline: "rgba(255, 255, 255, 0.08)",
        "hairline-hover": "rgba(255, 255, 255, 0.18)",
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          active: "rgba(255, 255, 255, 0.16)",
        },
        content: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
        accent: "#10B981",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
};
