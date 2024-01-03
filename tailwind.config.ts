import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
      colors: {
        'grey-100': "#7F7F7F",
        'grey-200': "#F4F4F4",
        "dark-100": "#181818",
        "primary": "#416184",
        "orange": "#FF5B19"
      },
      boxShadow: {
        "aside": "0px 4px 4px 0px #CCD2E3"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }), 
  ],
  variants: {
    scrollbar: ['rounded']
  }
}
export default config
