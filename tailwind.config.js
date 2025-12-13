/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-orange': '#FF6B4A',
        'bg-light': '#E2E2E2',
        'bg-dark': '#0E0E0E',
        'bg-secondary-dark': '#1a1a1a',
        'text-dark': '#1a1a1a',
        'text-light': '#ffffff',
        'text-secondary': '#a0a0a0',
        'text-secondary-light': '#666666',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'serif': ['Libre Caslon Text', 'serif'],
        italiana: ['Italiana', 'serif'],
      },
    },
  },
  plugins: [],
}
