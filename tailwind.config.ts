import type { Config } from 'tailwindcss';

const config: Partial<Config> & { safelist: string[] } = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  safelist: [
    'animate-in',
    'animate-out',
    'animate-in-top-left',
    'animate-out-top-left',
    'animate-in-top-center',
    'animate-out-top-center',
    'animate-in-top-right',
    'animate-out-top-right',
    'animate-in-bottom-left',
    'animate-out-bottom-left',
    'animate-in-bottom-center',
    'animate-out-bottom-center',
    'animate-in-bottom-right',
    'animate-out-bottom-right',
    'animate-fade-in',
    'animate-fade-out',
    'animate-fade-in-down',
    'animate-fade-out-up',
    'animate-fade-in-up',
    'animate-fade-out-down',
    'animate-slide-in-top', 
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out forwards',
      },
    },
  },  
  plugins: [],
};

export default config;
