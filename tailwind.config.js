/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        novublue: {
          50: "#f0f7ff",
          100: "#e0effe",
          500: "#0284c7",
          600: "#0369a1",
          900: "#0c4a6e",
        },
        brand: {
          purple: "#7C3AED",
          indigo: "#4F46E5",
          cyan: "#06B6D4",
          emerald: "#10B981",
          dark: "#0F1117",
          card: "#161922",
          border: "#232836",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(124, 58, 237, 0.4)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    base: false,
  },
};
