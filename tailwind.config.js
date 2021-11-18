const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        light: colors.blue['300'],
        DEFAULT: colors.blue['500'],
        dark: colors.blue['700']
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
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        // Headings
        h1: { fontSize: theme('fontSize.5xl') },
        h2: { fontSize: theme('fontSize.4xl') },
        h3: { fontSize: theme('fontSize.3xl') },
        h4: { fontSize: theme('fontSize.2xl') },
        h5: { fontSize: theme('fontSize.1xl') },
        h6: { fontSize: theme('fontSize.lg') }
      })
    })
  ]
}
