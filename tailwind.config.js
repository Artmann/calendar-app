/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      'black': '#000',
      'grayscale-30': '#F7F7FA',
      'grayscale-50': '#F1F2F6',
      'grayscale-400': '#BDBFC5',
      'grayscale-600': '#848793',
      'primary': '#017AFF',
      'white': '#FFF'
    },
    extend: {},
    fontSize: {
      '2xs': '0.6875rem',
      'sm': '0.8125rem'
    }
  },
  plugins: []
}
