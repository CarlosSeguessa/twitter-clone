/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        primary: '#78a1d1',
        secondary: '#4c6684'
      },
      keyframes: {
        'open-menu-left-to-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'close-menu-right-to-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        'open-menu-left-to-right': 'open-menu-left-to-right 0.3s ease-in-out',
        'close-menu-right-to-left': 'close-menu-right-to-left 0.3s ease-in-out'
      }
    }
  },
  plugins: []
}
