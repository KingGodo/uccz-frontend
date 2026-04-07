/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["Source Sans 3",    "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Libre Baskerville", "Georgia",       "serif"],
      },
      colors: {
        brand: {
          DEFAULT: "rgb(54, 69, 99)",
          dark:    "rgb(40, 52, 76)",
          light:   "rgba(54, 69, 99, 0.08)",
        },
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-1px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(1px)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        shake: "shake 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

module.exports = config;