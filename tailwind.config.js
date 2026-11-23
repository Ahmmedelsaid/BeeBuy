/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff9e6",
          100: "#ffefb8",
          200: "#ffe08a",
          300: "#fdd05c",
          400: "#f7bd2e",
          500: "#e8a908",
          600: "#c78c05",
          700: "#9c6d06",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
