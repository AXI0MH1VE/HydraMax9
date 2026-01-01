/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./OneDrive/Desktop/HyHive/index.html",
    "./OneDrive/Desktop/HyHive/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        axiom: {
          bg: '#020202',
          accent: '#06af6e',
          'accent-dark': '#048c58',
          'accent-light': '#08d084',
        },
      },
      fontFamily: {
        mono: ['Monaco', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 0.15s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            textShadow: '0 0 8px rgba(6, 175, 110, 0.9), 0 0 16px rgba(6, 175, 110, 0.6)',
          },
          '50%': {
            opacity: '0.8',
            textShadow: '0 0 4px rgba(6, 175, 110, 0.6), 0 0 8px rgba(6, 175, 110, 0.3)',
          },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
        },
      },
      boxShadow: {
        'axiom': '0 0 0 1px rgba(6, 175, 110, 0.35)',
        'axiom-lg': '0 0 0 2px rgba(6, 175, 110, 0.5)',
        'glow': '0 0 20px rgba(6, 175, 110, 0.4)',
      },
    },
  },
  plugins: [],
};
