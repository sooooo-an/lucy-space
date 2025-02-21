import type { Config } from 'tailwindcss'
import Typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [Typography],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        warn: 'rgb(var(--color-warn) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'prj-mint': 'rgb(var(--color-prj-mint) / <alpha-value>)',
        'prj-pink': 'rgb(var(--color-prj-pink) / <alpha-value>)',
        'prj-blue': 'rgb(var(--color-prj-blue) / <alpha-value>)',
        'section-1': 'rgb(var(--color-section-1) / <alpha-value>)',
        'section-2': 'rgb(var(--color-section-2) / <alpha-value>)',
        'section-3': 'rgb(var(--color-section-3) / <alpha-value>)',
        'footer-bg': 'rgb(var(--color-footer-bg) / <alpha-value>)',
      },
    },
  },
}
export default config
