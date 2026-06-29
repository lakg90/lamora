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
        paper: "#F4EFE5",
        "paper-raised": "#FBF8F1",
        ink: "#1B2942",
        "ink-soft": "#2C3A55",
        brass: "#AE8B4C",
        line: "#D8CCB8",
        muted: "#6B665C",
        fjord: "#8DA6BE",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "2px",
        none: "0",
        sm: "1px",
        md: "2px",
        lg: "2px",
        full: "2px",
      },
      letterSpacing: {
        widest: "0.24em",
        wider: "0.18em",
        wide: "0.10em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
