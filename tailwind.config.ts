import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          50: "#F2FBFF",
          100: "#E7F4FA",
          200: "#47A5C9",
          300: "#093F60",
          400: "#09202E",
        },
        secondary: {
          50: "#ECE7FC",
          100: "#DBD0FA",
          200: "#AA88F1",
          300: "#8B57EB",
          400: "#442B73",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#FAFAFA",
          200: "#E9EDF1",
          250: "#E0E5E8",
          300: "#C7CCCF",
          400: "#C4CACE",
          500: "#9DA4A8",
          600: "#768085",
          700: "#636A6D",
          800: "#474E50",
          900: "#262B2D",
          1000: "#141718",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      fontSize: {
        h1: ["41px", "120%"],
        h2: ["32px", "120%"],
        h3: ["28px", "120%"],
        h4: ["25px", "120%"],
        h5: ["20px", "120%"],
        "h1-sb": ["41px", "120%"],
        "h2-sb": ["32px", "120%"],
        "h3-sb": ["28px", "120%"],
        "h4-sb": ["25px", "120%"],
        "h5-sb": ["20px", "120%"],
        "body-1": ["18px", "120%"],
        "body-2": ["16px", "120%"],
        "body-3": ["14px", "120%"],
        "body-4": ["13px", "120%"],
        "body-5": ["12px", "120%"],
        "body-1-sb": ["18px", "120%"],
        "body-2-sb": ["16px", "120%"],
        "body-3-sb": ["14px", "120%"],
        "body-4-sb": ["13px", "120%"],
        "body-5-sb": ["12px", "120%"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
