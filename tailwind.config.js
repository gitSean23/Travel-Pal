/** @type {import('tailwindcss').Config} */
const tailwindcss = require("tailwindcss");
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcss('./tailwind.js'),   require('autoprefixer')
],
}
