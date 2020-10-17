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
  },
  variants: {},
  plugins: [],
};
