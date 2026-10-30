/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mogger: {
          charcoal: '#171A1D',
          neon: '#A6FF00',
          white: '#F5F7F2',
          silver: '#C7CDD1',
          dark: '#0c0e10',
          aeroSky: '#3a88e9',
          aeroAqua: '#00e5ff',
          aeroGreen: '#22c55e',
          glassBorder: 'rgba(255, 255, 255, 0.45)',
          glassBg: 'rgba(255, 255, 255, 0.22)',
          glassDark: 'rgba(15, 23, 42, 0.65)',
        }
      },
      fontFamily: {
        segoe: ['"Segoe UI"', 'Frutiger', 'Tahoma', 'Trebuchet MS', 'sans-serif'],
        mono: ['"Consolas"', '"Courier New"', 'monospace']
      },
      boxShadow: {
        'aero': '0 8px 32px 0 rgba(31, 38, 135, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
        'aero-button': 'inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)',
        'aero-neon': '0 0 20px rgba(166, 255, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
        'orb': 'inset -5px -5px 15px rgba(0,0,0,0.3), inset 5px 5px 15px rgba(255,255,255,0.8), 0 10px 25px rgba(0,180,255,0.4)',
        'vista-window': '0 20px 50px rgba(0, 30, 60, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.6) inset, 0 1px 0 rgba(255,255,255,0.9)'
      },
      backgroundImage: {
        'frutiger-gradient': 'linear-gradient(180deg, #1d72dd 0%, #46a2f7 35%, #76c7fd 55%, #c8f5b8 80%, #48b835 100%)',
        'glass-sheen': 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 51%, rgba(255,255,255,0.25) 100%)',
        'aero-header': 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 48%, rgba(200,240,255,0.05) 52%, rgba(255,255,255,0.3) 100%)',
        'aqua-pill': 'linear-gradient(180deg, #74e5ff 0%, #1da5e8 50%, #0076c4 51%, #1f94ea 100%)',
        'neon-pill': 'linear-gradient(180deg, #d4ff70 0%, #a6ff00 50%, #7ecc00 51%, #95f200 100%)',
        'metal-bevel': 'linear-gradient(135deg, #f0f3f6 0%, #dbe1e6 50%, #b8c1c8 51%, #e5eaf0 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'bubble-rise': 'bubbleRise 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 10px rgba(166,255,0,0.5))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(166,255,0,0.9))' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        bubbleRise: {
          '0%': { transform: 'translateY(100vh) scale(0.6)', opacity: '0' },
          '15%': { opacity: '0.8' },
          '85%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-10vh) scale(1.1)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
