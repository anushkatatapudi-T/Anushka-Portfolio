/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e0fbf9',
          100: '#bBF7F3',
          500: '#66FCF1',   // Electric Cyan Primary Accent
          600: '#45A29E',   // Deep Teal Accent
          700: '#2C7A7B',   // Dark Teal
          900: '#1F2833',   // Dark Slate
          cyan: '#66FCF1',  // Electric Cyan (#66FCF1)
          teal: '#45A29E',  // Deep Teal (#45A29E)
          accent: '#66FCF1',
          silver: '#C5C6C7' // Platinum Silver (#C5C6C7)
        },
        dark: {
          bg: '#0B0C10',       // Deep Midnight Black (#0B0C10)
          card: '#1F2833',     // Dark Slate Card (#1F2833)
          surface: '#1F2833',
          border: 'rgba(197, 198, 199, 0.2)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
