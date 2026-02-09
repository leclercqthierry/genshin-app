/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Thème Genshin (ajouté au fur et à mesure)
        primary: "var(--color-primary)",
        "primary-80": "var(--color-primary-80)",
        accent: "var(--color-accent)",
        "accent-glow": "var(--color-accent-glow)",
        muted: "var(--color-text-muted)",
      },
    },
  },
};

export default config;