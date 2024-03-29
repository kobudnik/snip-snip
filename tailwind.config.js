/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      sans: ['Trebuchet MS', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  daisyui: {
    themes: ['dark'],
  },
};
