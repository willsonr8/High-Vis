import type { Config } from "tailwindcss";
import { nextui } from '@nextui-org/react'

const config: { plugins: ReturnType<Plugin>[]; theme: { extend: {} }; darkMode: string; content: string[] } = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      "beacon": {
        extend: "dark",
        colors: {
          primary: {
            50: "#FEECFE",
            100: "#FDD5F9",
            200: "#FCADF9",
            300: "#F182F6",
            400: "#DD62ED",
            500: "#c031e2",
            600: "#9823C2",
            700: "#7318A2",
            800: "#520F83",
            900: "#3B096C",
          },
          focus: "#F182F6",
          secondary: {
            50: "#F0FCFF",
            100: "#E6FAFE",
            200: "#D7F8FE",
            300: "#C3F4FD",
            400: "#A5EEFD",
            500: "#7EE7FC",
            600: "#06B7DB",
            700: "#09AACD",
            800: "#0E8AAA",
            900: "#053B48",
          }
        }
      }
    }
  })],
};
export default config;
