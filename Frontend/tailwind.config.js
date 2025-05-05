// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#FFED48', // Custom yellow color
      },
      fontFamily: {
        recoleta: ['Recoleta', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
