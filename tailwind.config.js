/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'cyan': '#04e0d5',
        'cyan-500': '#36c9c3',

        'card-light': '#fff',
        'txt-light': '#000',
        'sub-txt-light': '#666',
        'back-light': '#fafafa',
        'edge-light': '#e3e3e3',

        'card-dark': '#090e13',
        'txt-dark': '#fff',
        'sub-txt-dark': '#777e84',
        'back-dark': '#0c1116',
        'edge-dark': '#30363d',
      },
      boxShadow: {
        'normal': '0 0px 15px 15px rgba(0,0,0,0.06)',
        'hover': '0 20px 25px -5px rgba(0,0,0,0.1)',
        'line-shadow': '0px 0px 12px cyan'
      },
      borderRadius: {
        'circle': '50%'
      },
      height: {
        '70vh': '70vh',
        '92vh': '92vh',
      },
      animation: {
        'scanner-loop': 'scanner-loop 3s ease-in-out infinite',
        'float-up-down': 'float-up-down 3s infinite'
      },
      keyframes: {
        'scanner-loop': {
          '0%': { top: 0 },
          '50%': { top: '100%' },
          '100%': { top: 0 }
        },
        'float-up-down': {
          "0%": { transform: "translateY(-30px)" },
          "100%": { transform: "translateY(-30px)" },
          "50%": { transform: "translateY(30px)" }
        }
      }
    },
  },
  plugins: [],
}

