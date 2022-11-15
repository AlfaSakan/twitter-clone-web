/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        15: "3.75rem",
        18: "4.5rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
