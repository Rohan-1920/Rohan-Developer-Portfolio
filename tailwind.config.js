/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: "#0B0B0B",
        surface: "#121212",
        "surface-hover": "#181818",
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
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
};
