/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        TROX: ["TROX", "sans-serif"],
      },
      background: {
      primary: "var(--bg-primary)",
      secondary: "var(--bg-secondary)",
    },
    text: {
      primary: "var(--text-primary)",
      secondary: "var(--text-secondary)",
  },
      raduis:{
          'md':'16px'

      }
    },
  },

  plugins: [],
};