module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "@fullhuman/postcss-purgecss": {
      whitelist: ["focus:outline-none", "whitespace-nowrap", "ml-10"],
    },
  },
};
