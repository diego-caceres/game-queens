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
    },
  },
  plugins: [],
} satisfies Config;
