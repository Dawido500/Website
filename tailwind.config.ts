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
        dark: "#1A1A1A",
        anthrazit: "#2E2E2C",
        text: "#6B6862",
        warm: "#F5F2ED",
        white: "#FAFAF8",
        accent: "#5B7C72",
        "accent-light": "#8fbaa8",
      },
      fontFamily: {
        heading: ['"DM Serif Display"', "serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
