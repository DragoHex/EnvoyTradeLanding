/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./brokers/**/*.html",
    "./docs/**/*.html",
    "./setup-guide/**/*.html",
    "./contact/**/*.html",
    "./terms/**/*.html",
    "./privacy/**/*.html",
    "./risk-disclosure/**/*.html",
    "./refund/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
          'surface-light': 'rgb(var(--color-surface-light-rgb) / <alpha-value>)',
          slate: '#44475b',
          accent: '#04b488',
          'accent-hover': '#06d896',
          border: 'rgb(var(--color-border-rgb) / <alpha-value>)',
          muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
          light: 'rgb(var(--color-text-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
