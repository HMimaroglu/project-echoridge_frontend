/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep-forest base
        primary: {
          50: '#C7D1B5', // Mist neutral
          100: '#889176', // Stone shadow
          200: '#E6BC7F', // Warm limestone
          300: '#162714', // Evergreen shadow
          400: '#162714', // Evergreen shadow
          500: '#0A1C10', // Deep-forest base
          600: '#0A1C10',
          700: '#0A1C10',
          800: '#0A1C10',
          900: '#0A1C10',
        },
        // Nature accents
        secondary: {
          50: '#D4D819', // Chartreuse highlight
          100: '#D4D819',
          200: '#8BC53F', // Sunlit grass
          300: '#8BC53F',
          400: '#8BC53F',
          500: '#8BC53F',
          600: '#4A6B24', // Moss green
          700: '#4A6B24',
          800: '#4A6B24',
          900: '#4A6B24',
        },
        // Neutrals mapped to theme
        neutral: {
          50: '#C7D1B5', // Mist neutral
          100: '#889176', // Stone shadow
          200: '#E6BC7F', // Warm limestone
          300: '#889176',
          400: '#889176',
          500: '#889176',
          600: '#162714', // Evergreen shadow
          700: '#162714',
          800: '#0A1C10', // Deep-forest base
          900: '#0A1C10',
        },
      },
    },
  },
  plugins: [],
}