/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{pug, html}"],
  theme: {
    extend: {
      height: {
        "screen-menu": "calc(100vh - 56px)",
      },
    },
  },
  plugins: [],
};
