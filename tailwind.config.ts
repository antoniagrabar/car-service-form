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
          200: "#105096",
        },
        base: {
          100: "#1c1c1c",
          200: "#585757",
          300: "#969696",
          500: "#0000000A",
          600: "#ffffff",
        },
        light: {
          100: "#fefefe",
          200: "#f8f8f8",
          300: "#efefef",
        },
        error: "#EF4147",
      },
      borderRadius: {
        sm: "3px",
      },
      screens: {
        xs: "440px",
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
      },
    },
  },
  plugins: [],
};
export default config;
