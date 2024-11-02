import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#004289",
          200: "#0F5096",
        },
        base: {
          100: "#1C1C1C",
          200: "#585757",
          300: "#969696",
          400: "#00000026",
          500: "#0000000A",
          600: "#ffffff",
        },
        bg: {
          100: "#FEFEFE",
          200: "#F8F8F8",
          300: "#EFEFEF",
        },
        error: "#EF4147",
      },
      borderRadius: {
        sm: "3px",
        md: "10px",
      },
      boxShadow: {
        radio: "0px 0px 0px 3px #00000014",
        input: "0px 0px 0px 2px #0000001A",
        lightError: " 0px 0px 0px 3px #FF2D2E33",
      },
      screens: {
        xs: "440px",
        sm: "540px",
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
      },
    },
  },
  plugins: [],
};
export default config;
