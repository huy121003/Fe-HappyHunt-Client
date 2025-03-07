/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "flame-orange": "#FC6D26",
        "sunflower-yellow": "#FCA326",
      },
    },
  },
  plugins: [],
};
