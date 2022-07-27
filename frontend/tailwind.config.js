/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'themeColor': '#0A8A8A',
        'themeColor2': '#41C1C1',
        'themeColor3' : '#EAF4F4',
      },
    },
  },
  plugins: [],
};
