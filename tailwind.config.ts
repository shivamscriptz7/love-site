import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          25: "#fffbfc",
          50: "#fff5f7",
          100: "#ffe8ee",
          200: "#ffd0dd",
          300: "#ffa9c1",
          400: "#ff759c",
          500: "#f8447a",
          600: "#e42465",
          700: "#c11553",
          800: "#a01249",
          900: "#861344",
        },
        rose: {
          950: "#3d0a24",
        },
        plum: {
          50: "#f6f2fb",
          100: "#e8def6",
          400: "#7d5aa8",
          600: "#4a2c6e",
          700: "#3a2058",
          800: "#2a1642",
          900: "#1a0b2e",
          950: "#120720",
        },
        gold: {
          300: "#f5d896",
          400: "#f0c05e",
          500: "#e8a940",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        script: ["var(--font-script)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(248,68,122,0.15), transparent)",
        "night-glow":
          "radial-gradient(ellipse at 50% 30%, rgba(232,169,64,0.18), transparent 60%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out infinite 1.5s",
        flicker: "flicker 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(4deg)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.85", filter: "brightness(1.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(248,68,122,0.35)",
        "glow-gold": "0 0 40px rgba(232,169,64,0.35)",
        glass: "0 8px 32px rgba(134,19,68,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
