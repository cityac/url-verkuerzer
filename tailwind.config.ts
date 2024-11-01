import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      '3xl': '1.75rem',
    },
    screens: {},
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'rgba(74, 78, 113, 1)',
        'clario-green-50': 'rgba(39, 178, 116, 0.7)',
        'clario-green-300': 'rgba(39, 178, 116, 1)',
        'clario-red-50': 'rgba(253, 239, 238, 1)',
        'clario-red-300': 'rgba(255, 128, 128, 1)',
        'clario-blue-50': 'rgba(112, 195, 255, 1)',
        'clario-blue-500': 'rgba(75, 101, 255, 1)',
        'clario-alice-blue': 'rgba(244, 249, 255, 1)',
        'clario-linen-blue': 'rgba(224, 237, 251, 0.72)',
        'clario-nebula-blue': 'rgba(75, 101, 255, 0.72)',
        'clario-dim-gray': 'rgba(108, 108, 108, 1)',
      },
    },
  },
  plugins: [],
}
export default config
