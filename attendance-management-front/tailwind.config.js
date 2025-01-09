/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your React component files
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          500: '#800000',
          700: '#660000',
          800: '#4d0000',
        },
      },
    },
  },
  plugins: [],
};