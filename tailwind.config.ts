import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1B3A",
          50: "#F0F4FA",
          100: "#DCE5F3",
          200: "#B8CDE7",
          300: "#87A9D5",
          400: "#5281BE",
          500: "#3162A5",
          600: "#234B86",
          700: "#193867",
          800: "#12274A",
          900: "#0B1B3A",
          950: "#060F22",
        },
        gold: {
          DEFAULT: "#C9A24B",
          50: "#FAF6ED",
          100: "#F3EBD4",
          200: "#E6D6AA",
          300: "#D8BE7A",
          400: "#D0B05C",
          500: "#C9A24B",
          600: "#B38B38",
          700: "#916C28",
          800: "#725421",
          900: "#563E19",
        },
        cream: {
          DEFAULT: "#FBF6EA",
          50: "#FDFBF5",
          100: "#FBF6EA",
          200: "#F5ECD1",
          300: "#EDE0B3",
          400: "#E3CE8F",
          500: "#D4B867",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(11, 27, 58, 0.04)",
        card: "0 10px 30px -10px rgba(11, 27, 58, 0.08)",
        premium:
          "0 20px 40px -15px rgba(11, 27, 58, 0.12), 0 0 0 1px rgba(201, 162, 75, 0.15)",
        gold: "0 10px 25px -5px rgba(201, 162, 75, 0.25)",
        navy: "0 20px 45px -10px rgba(11, 27, 58, 0.35)",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
    },
  },
  plugins: [],
};

export default config;
