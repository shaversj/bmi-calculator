import type { Config } from "tailwindcss";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blue: "#345FF6",
        gunmetal: "#253347",
        "dark-electric-blue": "#56E6E5",
        "pure-white": "#FFFFFF",
      },
      fontSize: {
        "heading-xl": ["64px", { lineHeight: "110%" }], // Inter Semibold
        "heading-l": ["48px", { lineHeight: "110%" }], // Inter Semibold
        "heading-m": ["24px", { lineHeight: "110%" }], // Inter Semibold
        "heading-s": ["20px", { lineHeight: "110%" }], // Inter Semibold
        "body-m": ["16px", { lineHeight: "150%" }], // Inter Regular
        "body-m-bold": ["16px", { lineHeight: "150%" }], // Inter Semibold
        "body-s": ["14px", { lineHeight: "150%" }], // Inter Regular
      },
      fontFamily: {
        interRegular: ["var(--font-inter-regular)"],
        interSemibold: ["var(--font-inter-semibold)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
