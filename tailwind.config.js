/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        color1: "#1f1f1f",
        color2: "#8c8c8c",
        color3: "#5c5c5c",
        color4: "#e6e6e6",
        color5: "#121212",
      },

      fontFamily: {
        dm: ["DMSans_400Regular"],
        dmBold: ["DMSans_700Bold"],
        dmSemi: ["DMSans_600SemiBold"],
        raleway: ["Raleway_400Regular"],
        ralewayBold: ["Raleway_700Bold"],
        ralewaySemi: ["Raleway_600SemiBold"],
      },
    },
  },
  plugins: [],
};
