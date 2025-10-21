/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../**/*.{html,js}"], 
  theme: {
    fontFamily: {
      sans: ["Roboto"]
    },
    extend: {
      colors: {
        primary: "#598392",
        secondary: "#AEC3B0",
        surface1: "#124559",
        surface2: "#EFF6E0",
        surface3: "#01161E"
      }
    }
  }
};
