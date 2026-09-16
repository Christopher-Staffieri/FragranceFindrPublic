
const flowbite = require("flowbite-react/tailwind");
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./index.html",
    flowbite.content(),
  ],
  dark: 'class',
  theme: {
    extend: {

    backgroundImage: {
      'light-mode-logo': "url('https://imgur.com/kpY2JeY')",
      'dark-mode-logo': "url('../public/LogoDarkMode.png')",
      'light-mode-text-logo': "url('/public/TextLogo.png')",
      'dark-mode-text-logo': "url('/public/DarkModeTextLogo.png')", 
    },

      colors: {

        light: {
          background: '#F4F5F7',
          surface: '#FFFFFF',
          primary: '#4A90E2',
          secondary: '#F45B69',
          text: {
            primary: '#2E2E2E',
            secondary: '#707070',
          },
          border: '#E1E1E1',
        },
        dark: {
          background: '#1E1F21',
          surface: '#2B2D30',
          primary: '#4A90E2',
          secondary: '#F45B69',
          text: {
            primary: '#ECECEC',
            secondary: '#A0A0A0',
          },
          border: '#393B3F',
        },
        gray: {
          100: '#F4F5F7',
          200: '#E1E1E1',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        blue: {
          500: '#4A90E2',
          600: '#3B82F6',
          700: '#2563EB',
        },
        red: {
          500: '#F45B69',
          600: '#DC2626',
          700: '#B91C1C',
        },



        text: "#2f2d2d",
        background: "#E6E6E6",
        primary: "#2373a9",
        secondary: '#bccee6',
        accent: {
          '50': '#FAF2F6', 
          '100': '#F7E6EF', 
          '200': '#EBC3D4', 
          '300': '#DEA0B5', 
          '400': '#C7657B', 
          // Primary
          '500': '#ad343e', 
          '600': '#9C2A33', 
          '700': '#821D23', 
          '800': '#691319', 
          '900': '#4F0A0F', 
          '950': '#330507'
        },
        // Dark Mode Colors
        textDark: '#D2D0CF',
        backgroundDark: {
          '50': '#F5F5F5', 
          '100': '#E8E8E8', 
          '200': '#C7C7C7', 
          '300': '#A3A3A3', 
          '400': '#5E5E5E', 
          // Primary
          '500': '#191919',  
          '600': '#171515', 
          '700': '#120D0D', 
          '800': '#0F0909', 
          '900': '#0A0505', 
          '950': '#080202'
        },
        // primaryDark: '#3626A7',
        primaryDark: {
          '50': '#F5FBFC', 
          '100': '#EDF9FC', 
          '200': '#D2EEF7', 
          '300': '#B6DFF0', 
          '400': '#83C5E6', 
          // Primary
          '500': '#56A6DC', 
          '600': '#458DC4', 
          '700': '#2F6BA3', 
          '800': '#1E5085', 
          '900': '#123563', 
          '950': '#071D40'
        },
        secondaryDark: {
          '50': '#EDF3F5', 
          '100': '#DFE9ED', 
          '200': '#B0C5D1', 
          '300': '#86A1B3', 
          '400': '#45607A', 
          '500': '#192B43', 
          '600': '#13243B', 
          '700': '#0E1B30', 
          '800': '#091429', 
          '900': '#050D1F', 
          '950': '#020714'
        },
        accentDark: {
          '50': '#FCF5F9', 
          '100': '#FAEBF2', 
          '200': '#F2CEDE', 
          '300': '#EBB2C6', 
          '400': '#DB7F93', 
          '500': '#CB525C', 
          '600': '#B8424C', 
          '700': '#992E35', 
          '800': '#7A1D24', 
          '900': '#5C1116', 
          '950': '#3B070A'
        },
        statusColors: {
          'approved': '#6ee293',
          'approvedDark': '#3FAB5E',
          'processing': '#f8c211',
        }

      }
    },
    variants: {
      extend: {
        backgroundImage: ['dark'],
      },
    },
  },
  plugins: [
    // require('flowbite/plugin')
    flowbite.plugin(),
  ],
}

