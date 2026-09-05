/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        panel: "#0b1220",
        cyan: "#3ee0c8",
        ice: "#9fd8ff",
        signal: "#6ea8ff",
        gold: "#f5c16c",
        rose: "#ff6b9a",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        sans: ["Outfit", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(62, 224, 200, 0.18)",
        card: "0 24px 80px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
