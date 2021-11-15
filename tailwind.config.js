const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        DEFAULT: colors.blue
      },
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
