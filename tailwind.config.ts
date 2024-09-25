import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '320px',
      },
      fontFamily: {
        inter: ['inter'],
      },
      // stretch the grid so that footer is always at the bottom
      // even on pages with little content
      gridTemplateRows: {
        'auto-1fr': 'auto 1fr',
      },
      colors: {
        'radix-yellow': '#F1D157',
        'radix-red': '#C2513D',
        'content-dark': '#212A09',
        'radix-green': '#3DC251',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require('daisyui/src/theming/themes')['dark'],
          info: '#F1D157',
        },
      },
    ],
  },

  plugins: [require('daisyui')],
};
export default config;
