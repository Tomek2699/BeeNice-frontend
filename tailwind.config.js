/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./ScreensComponents/**/*.{js,jsx,ts,tsx}", ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryBg: '#fff2cc',
        secondary: '#ca8a04',
        mainButtonBg: '#ea9d3e',
        fieldColor: '#FEE3A2',
        borderColor: '#312f17',
        remove: '#ab7c07',
        edit: '#c99608',
        add: '#f5d018',
        tile: '#ffc30b',
        hiveBtn: '#e8ae0c',
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}