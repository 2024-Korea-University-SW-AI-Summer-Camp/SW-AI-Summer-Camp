/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        gray: {
          "100": "#302a39",
          "200": "#211c26",
          "300": "#141217",
          "400": "#141119",
          "500": "#141118",
        },
        blueviolet: "#801ae6",
        dimgray: "#473d54",
        gainsboro: {
          "100": "#e6e8eb",
          "200": "#e4e0e8",
          "300": "#e1dfe3",
          "400": "#dddbdf",
        },
        thistle: "#ab9eb8",
        lightgray: "#d4d2d6",
        lightpurple: '#D8BFD8',
      },
      spacing: {},
      fontFamily: {
        "noto-serif": "'Noto Serif'",
        inter: "Inter",
      },
      borderRadius: {
        xl: "20px",
        "3xs": "10px",
        "4xl": "23px",
      },
    },
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      "3xl": "1.375rem",
      lg: "1.125rem",
      mid: "1.063rem",
      inherit: "inherit",
    },
    screens: {
      mq975: {
        raw: "screen and (max-width: 975px)",
      },
      mq950: {
        raw: "screen and (max-width: 950px)",
      },
      mq700: {
        raw: "screen and (max-width: 700px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
