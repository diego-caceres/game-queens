import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          400: "#60a5fa",
        },
        red: {
          400: "#f87171",
        },
        green: {
          400: "#4ade80",
        },
        purple: {
          400: "#c084fc",
        },
        yellow: {
          300: "#fde047",
        },
        pink: {
          400: "#f472b6",
        },
        orange: {
          400: "#fb923c",
        },
        gray: {
          400: "#9ca3af",
          600: "#4b5563",
        },
        cyan: {
          400: "#22d3ee",
        },
        emerald: {
          400: "#34d399",
        },
      },
      animation: {
        "queen-to-crown": "queen-to-crown 0.8s ease-in-out forwards",
        "bounce-once": "bounce 1s ease-in-out 0.8s",
        "fade-in": "fade-in 0.5s ease-in-out forwards",
      },
      keyframes: {
        "queen-to-crown": {
          "0%": { transform: "scale(1) rotate(0deg)", opacity: "0.5" },
          "50%": { transform: "scale(1.5) rotate(180deg)", opacity: "0.8" },
          "100%": { transform: "scale(1) rotate(360deg)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
