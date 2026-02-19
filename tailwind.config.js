/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#D5DAE1"
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235"
        },
        blue: {
          500: "#2b77e7"
        },
        ink: {
          DEFAULT: "#0F1117",
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#6C757D",
          700: "#495057",
          800: "#343A40",
          900: "#212529",
        },
        paper: {
          DEFAULT: "#FAFAFA",
          warm: "#F8F6F1",
          cool: "#F5F7FA",
        },
        accent: {
          DEFAULT: "#1A3A5C",
          light: "#2563EB",
          muted: "#64748B",
        }
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ['Poppins', "sans-serif"],
        inter: ['Inter', "sans-serif"],
        playfair: ['Playfair Display', "serif"],
        serif: ['Playfair Display', "Georgia", "serif"],
        sans: ['Inter', 'Work Sans', "sans-serif"],
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        institutional: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'institutional-lg': '0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08)',
        'doc': '0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1D2235',
            a: { color: '#2563EB' },
          }
        }
      }
    },
  },
  plugins: [],
}
