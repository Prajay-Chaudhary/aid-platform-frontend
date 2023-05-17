module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {},
    fontFamily: {
      'sans': ['system-ui'],
    }

  },
  variants: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
