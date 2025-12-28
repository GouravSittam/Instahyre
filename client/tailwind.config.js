/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brutal: {
          black: "#000000",
          white: "#FFFFFF",
          yellow: "#FFFF00",
          red: "#FF0000",
          blue: "#0000FF",
          green: "#00FF00",
          gray: {
            100: "#F5F5F5",
            200: "#E5E5E5",
            300: "#D4D4D4",
            400: "#A3A3A3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#171717",
          },
        },
      },
      fontFamily: {
        brutal: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["Space Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        brutal: "8px 8px 0px 0px #000000",
        "brutal-sm": "4px 4px 0px 0px #000000",
        "brutal-lg": "12px 12px 0px 0px #000000",
        "brutal-hover": "6px 6px 0px 0px #000000",
      },
      borderWidth: {
        3: "3px",
        5: "5px",
      },
    },
  },
  plugins: [],
};
