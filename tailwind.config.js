/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1890ff',
          light: '#40a9ff',
          dark: '#096dd9'
        },
        secondary: {
          DEFAULT: '#8c8c8c',
          light: '#bfbfbf',
          dark: '#595959'
        },
        success: {
          DEFAULT: '#52c41a',
          light: '#73d13d',
          dark: '#389e0d'
        },
        warning: {
          DEFAULT: '#faad14',
          light: '#ffc53d',
          dark: '#d48806'
        },
        error: {
          DEFAULT: '#f5222d',
          light: '#ff4d4f',
          dark: '#cf1322'
        }
      }
    }
  },
  safelist: [
    {
      pattern: /(bg|text|border)-(primary|secondary|success|warning|error)/,
      variants: ['hover', 'focus']
    },
    {
      pattern: /(bg|text|border)-(primary|secondary|success|warning|error)-(light|dark)/,
      variants: ['hover', 'focus']
    }
  ],
  plugins: []
}
