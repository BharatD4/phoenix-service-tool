import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0a0e17",
        foreground: "#f8fafc",
        card: "#111827",
        primary: {
          DEFAULT: "#00f0ff",
          foreground: "#000000",
        },
        border: "#1f2937",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      boxShadow: {
        cyan: "0 0 20px -3px rgba(0, 240, 255, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;

