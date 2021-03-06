const colors = require('./node_modules/tailwindcss/colors');

module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
    options: {
      whitelist: ['button-link'],
    },
  },
  theme: {
    fontFamily: {
      body: ['Noto Sans JP', 'Arial', 'sans-serif'],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        gray: colors.gray,
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        teal: colors.teal,
        lime: colors.lime,
        orange: colors.orange,
      },
    },
  },
  variants: {},
  plugins: [],
};
