/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    colors: {
      backgroundTheme: "#21294C",
      textDarkGray: "#4E4E4E",
      textLightDark: "#4E4E4E",
      textLightGray: "#8D91A3",
      textDark: "#1B2124",
      backgroundLight: "#FFFFFF",
      backgroundDark: "#000000",
      tableBackground: "#0000A",
      tableBorder: "#0000000D",
      buttonDisabled: "#8D91A3",
      border: "#E4E5E9",
      errorText: "#FD6868",
      disabledPrimaryBtn: "#7F879E",
      disabledSecondaryBtn: "#CCCCCC",
      backgroundLightGreen: "#C8F2E1",
      backgroundDarkGreen: "#22D086",
      backgroundLightRed: "#FFD9D9",
      backgroundDarkRed: "#FD6868",
      backgroundLightYellow: "#FEEAC9",
      backgroundDarkYellow: "#FFAC2A",
      mainBackground: "#FAFAFA",
      backgroundModal: "#000000BF",
    },
    extend: {
      screens: {
        xs: "480px", // Extra small devices (phones)
        sm: "640px", // Small devices (tablets)
        md: "768px", // Medium devices (tablets in landscape)
        lg: "1024px", // Large devices (laptops)
        xl: "1280px", // Extra large devices (desktops)
        "2xl": "1536px", // 2x extra large devices (large desktops)
        "3xl": "1900px", // Custom breakpoint for very large screens
        "4xl": "2000px", // extra large screens
      },
    },
  },
  plugins: [],
};
