/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "blue-background": "#123043",
        "blue-background-secondary": "#143C55",
        "blue-foreground": "#246085",
        "yellow-bright": "#FFDD7E",
        "yellow-medium": "#FAB802",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
