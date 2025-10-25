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
        brand: {
          'olive': '#a9bf04',     // rgb(169,191,4) - Vert olive
          'gold': '#f2c12e',      // rgb(242,193,46) - Jaune or
          'orange': '#f29727',    // rgb(242,151,39) - Orange
          'rust': '#bf4904',      // rgb(191,73,4) - Rouille
          'red': '#bf1304',       // rgb(191,19,4) - Rouge
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        heading: ['var(--font-farro)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        body: ['var(--font-raleway)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
