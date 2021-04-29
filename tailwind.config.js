module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#14CC60",
      secondary: "#1D1D1B",
      white: "##EFF1F3",
    }),
    textColor: {
      primary: "#14CC60",
      secondary: "#1D1D1B",
      white: "#EFF1F3",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
