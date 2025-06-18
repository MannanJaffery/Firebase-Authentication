/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'grid-pattern': "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
      },
      backgroundSize:{
        'grid': '25px 25px',
      },

      fontFamily:{
        mono:['"Roboto Mono"' , '"monospace"']
      }

    },
  },
  plugins: [],
}
