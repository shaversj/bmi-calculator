import type { Config } from "tailwindcss";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      spacing: {
        "4.5": "1.125rem",
        "11.25": "2.813rem",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(290.1deg, #D6E6FE 0%, rgba(214, 252, 254, 0) 100%)",
      },
      borderRadius: {
        custom: "16px 999px 999px 16px",
      },
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1440px",
      },
      colors: {
        blue: "#345FF6",
        gunmetal: "#253347",
        "dark-electric-blue": "#5E6E85",
        "pure-white": "#FFFFFF",
      },
      fontSize: {
        "heading-xl": ["64px", { lineHeight: "110%" }], // Inter Semibold
        "heading-l": ["48px", { lineHeight: "110%" }], // Inter Semibold
        "heading-l-mobile": ["32px", { lineHeight: "110%" }], // Inter Semibold
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
