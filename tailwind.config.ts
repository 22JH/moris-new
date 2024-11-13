import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        maxSize: '1400px',
      },
      height: {
        desktopTopbar: '96px',
        mobileTopbar: '56px',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
        GmarketSans: ['var(--font-GmarketSans)'],
      },
      fontSize: {
        display1: ['40px', '52px'],
        display2: ['36px', '46px'],
        display3: ['28px', '38px'],
        h1: ['24px', '32px'],
        h2: ['22px', '30px'],
        h3: ['20px', '28px'],
        h4: ['18px', '26px'],
        h5: ['16px', '24px'],
        p1: ['14px', '20px'],
        c1: ['12px', '16px'],
        c0: ['11px', '14px'],
      },
      letterSpacing: {
        display1: '0px',
        display2: '0px',
        display3: '0px',
        h1: '0px',
        h2: '0px',
        h3: '0px',
        h4: '0px',
        h5: '0px',
        p1: '-0.3px',
        c1: '-0.3px',
        c0: '-0.3px',
      },
      colors: {
        'brown-100': '#cab6b6',
        'brown-200': '#b09392',
        'brown-300': '#8c6260',
        'brown-400': '#764341',
        'brown-500': '#541412',
        'brown-600': '#4c1210',
        'brown-700': '#2e0b0a',
        'brown-800': '#230808',

        'black-100': '#b0b0b0',
        'black-200': '#8a8a8a',
        'black-300': '#656565',
        'black-400': '#545454',
        'black-500': '#333333',
        'black-600': '#000000',
      },
    },
  },
  plugins: [],
};
export default config;
