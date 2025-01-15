/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "!./src/**/*.{test,mock}.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
    fontSize: {
      10: "0.625rem",
      12: "0.75rem",
      14: "0.875rem",
      base: "1rem", // 16px
      20: "1.25rem",
      22: "1.375rem",
      24: "1.5rem",
      28: "1.75rem",
      32: "2rem",
      40: "2.5rem",
      48: "3rem",
      64: "4rem",
      72: "4.5rem",
    },
    lineHeight: {
      none: "1",
      120: "1.2",
      130: "1.3",
      140: "1.4",
      150: "1.5",
    },
    borderRadius: {
      xsmall: "0.5rem",
      minimal: "0.75rem",
      desktop: "1rem",
      mobile: "2rem",
      full: "9999px",
    },
    colors: {
      green: {
        100: "#f0faf7",
        200: "#d8f6ec",
        300: "#bcebdb",
        400: "#90e0c6",
        500: "#28c691",
        600: "#149067",
        700: "#0f6c4d",
        800: "#0d5a40",
        900: "#073324",
      },
      mono: {
        100: "#f5f6fa",
        200: "#e7e9f3",
        300: "#dadcec",
        400: "#c9cce4",
        500: "#a3a8bf",
        600: "#6f7594",
        700: "#4e567c",
        800: "#2d324d",
        900: "#1e2233",
      },
      orange: {
        100: "#fff3eb",
        200: "#fedec8",
        300: "#fec195",
        400: "#fea362",
        500: "#f38a3f",
        600: "#e56910",
        700: "#c25100",
        800: "#a54800",
        900: "#662a00",
      },
      primary: {
        100: "#f0f2fa",
        200: "#dee5fa",
        300: "#c7d5ff",
        400: "#abc0ff",
        500: "#7396ff",
        600: "#2257f5",
        700: "#1442cc",
        800: "#0c2a80",
        900: "#01103a",
      },
      grey: {
        100: "#ffffff",
        200: "#cccccc",
        300: "#f5f5f5",
        600: "#666666",
        700: "#4D4D4D",
        800: "#333333",
        900: "#000000",
      },
      red: {
        100: "#fff5f6",
        200: "#ffe5e5",
        300: "#f5b5b5",
        400: "#f57878",
        500: "#f54747",
        600: "#f51515",
        700: "#c20a0a",
        800: "#910808",
        900: "#660000",
      },
      yellow: {
        100: "#fffbed",
        200: "#fff2cc",
        300: "#ffe9a8",
        400: "#ffdf80",
        500: "#ffc847",
        600: "#ffb030",
        700: "#cc7e00",
        800: "#8f5600",
        900: "#704300",
      },
      black: "#0b0d16", // Text primary, dark mode background
      white: "#ffffff",
      current: "currentColor",
    },
    boxShadow: {
      global: "0 0 8px 0 rgba(11,13,22,0.08)",
      "elevation-01": "0 1px 10px 0 rgba(11,13,22,0.12)",
      "elevation-02": "0 8px 16px 0 rgba(11,13,22,0.14)",
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
