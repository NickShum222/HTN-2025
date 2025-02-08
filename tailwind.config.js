/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Satoshi: ["Satoshi", "sans-serif"],
        Satoshibold: ["SatoshiBold", "sans-serif"],
        SatoshiMedium: ["SatoshiMedium", "sans-serif"],
        Satoshilight: ["SatoshiLight", "sans-serif"],
        SatoshiLightItalic: ["SatoshiLightItalic", "sans-serif"],
        SatoshiItalic: ["SatoshiItalic", "sans-serif"],
      },
      colors: {
        // primary: "#131425",
        primary: "#FAF5EB",
        // offWhite: "#F6F7F8",
        offWhite: "#223A60",
      },
      fontSize: {
        landingTitle: "clamp(24px, 9.028vw, 175px)",
        landingSub: "clamp(24px, 7.234vw, 125px)",
      },
    },
  },
  plugins: [],
};
