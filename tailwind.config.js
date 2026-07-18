/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      background: {
      primary: "var(--bg-primary)",
      secondary: "var(--bg-secondary)",
    },
    text: {
      primary: "var(--text-primary)",
      secondary: "var(--text-secondary)",
  },
      raduis:{
          'md':'16 px'

      }
    },
  },

  plugins: [],
};