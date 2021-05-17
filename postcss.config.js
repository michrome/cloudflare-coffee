module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    purgecss: {
      whitelist: ["focus:outline-none", "whitespace-nowrap", "ml-10"],
    },
  },
};
