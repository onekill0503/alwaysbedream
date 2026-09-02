/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        mut: 'var(--mut)',
        fade: 'var(--fade)',
        line: 'var(--line)',
        paper: 'var(--paper)',
        panel: 'var(--panel)',
        accent: 'var(--red)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'Times', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        shell: '1180px',
      },
    },
  },
  plugins: [],
}
