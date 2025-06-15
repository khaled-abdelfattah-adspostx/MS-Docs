/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      colors: {
        // MomentScience brand colors (based on momentscience.com analysis)
        moment: {
          primary: '#2563EB', // Modern blue from their branding
          secondary: '#7C3AED', // Purple accent
          accent: '#06B6D4', // Cyan for highlights
          success: '#10B981', // Green for success states
          warning: '#F59E0B', // Amber for warnings
          error: '#EF4444', // Red for errors
          dark: '#0F172A', // Dark slate
          light: '#F8FAFC', // Light slate
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A'
          }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 102, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 102, 255, 0.8)' }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
