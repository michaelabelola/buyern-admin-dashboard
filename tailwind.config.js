/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': colors.neutral,
        'secondary': colors.fuchsia
      },
      spacing: {
        '112': '28rem',
        '128': '32rem',
      }
    },
  },
  darkMode: ['class', '[data-mode="dark2"]'],
  plugins: [
  ],
}
