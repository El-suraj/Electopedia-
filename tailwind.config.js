/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#061A12',
          900: '#0B3D2E',
          800: '#0F5240',
          700: '#146B52',
          600: '#1A8566',
          500: '#219A75',
          400: '#34B98A',
          300: '#5DCFAA',
          200: '#96E3C8',
          100: '#D0F5E8',
          50:  '#EDFAF4',
        },
        gold: {
          600: '#8A6A1A',
          500: '#A07D20',
          400: '#C9A84C',
          300: '#DEC07A',
          200: '#EDD9A8',
          100: '#F7EFD5',
          50:  '#FBF7EC',
        },
        ink: {
          900: '#0E1512',
          800: '#1C2720',
          700: '#2E3D36',
          600: '#3D5046',
          500: '#566B5E',
          400: '#718C7A',
          300: '#93A99F',
          200: '#B8C9C2',
          100: '#D8E5DF',
          50:  '#EDF4F0',
        },
        surface: {
          DEFAULT: '#FAFBFA',
          card:    '#FFFFFF',
          muted:   '#F2F6F4',
          border:  '#E4EDE8',
        }
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card':      '0 1px 3px 0 rgba(11,61,46,0.06), 0 4px 12px 0 rgba(11,61,46,0.06)',
        'card-hover':'0 2px 8px 0 rgba(11,61,46,0.08), 0 8px 24px 0 rgba(11,61,46,0.10)',
        'cta':       '0 4px 16px 0 rgba(11,61,46,0.20)',
        'cta-hover': '0 6px 24px 0 rgba(11,61,46,0.28)',
        'count':     '0 2px 8px 0 rgba(11,61,46,0.10)',
        'nav':       '0 -1px 0 0 #E4EDE8, 0 -8px 24px 0 rgba(11,61,46,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-up':    'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.35s cubic-bezier(0.22,1,0.36,1) forwards',
        'count-pop':  'countPop 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        'dot-pulse':  'dotPulse 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countPop: {
          '0%':   { transform: 'scale(0.88)', opacity: '0.6' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        dotPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':      { transform: 'scale(1.6)', opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
