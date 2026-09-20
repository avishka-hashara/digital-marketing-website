/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bloom-dark': '#0F172A',
        'bloom-navy': '#1E293B',
        'bloom-light': '#F8FAFC',
        'bloom-coral': '#FF5E3A',
        'bloom-teal': '#00A896',
        'bloom-yellow': '#F4A261',
        'bloom-blue': '#2A9D8F',
        'bloom-soft-bg': '#F3F4F6'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
