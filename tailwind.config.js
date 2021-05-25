module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      "cf-orange": "#F5821F",
    },
    extend: {
      dropShadow: {
        "cf-orange": "0 10px 25px #F5821F",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
