/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        green: { DEFAULT: "#006335", deep: "#04241A", 800: "#0A4A2E", 700: "#0C5836" },
        gold: { DEFAULT: "#C69A4C", light: "#E0C486" },
        paper: "#F5F3EC",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
