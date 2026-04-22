/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Nigerian flag green
        nigeria: {
          green: '#008751',
          'green-dark': '#005c36',
          'green-light': '#00a865',
          white: '#ffffff',
        },
        civic: {
          gold: '#C9A84C',
          'gold-light': '#F0D080',
          charcoal: '#1A1A2E',
          slate: '#2D3561',
          mist: '#F4F6F9',
          ink: '#0D1117',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'tick': 'tick 1s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'count-flip': 'countFlip 0.3s ease-in-out',
      },
      keyframes: {
        tick: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 135, 81, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(0, 135, 81, 0)' },
        },
        countFlip: {
          '0%': { transform: 'rotateX(90deg)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
