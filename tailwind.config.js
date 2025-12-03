/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        dark: '#020617'
      },
      boxShadow: {
        glass: '0 18px 45px rgba(15, 23, 42, 0.45)'
      }
    }
  },
  plugins: []
};
