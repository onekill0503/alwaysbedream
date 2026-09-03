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
        // Full-bleed: sections span the viewport, held off the edge only by
        // each section's own px-5 / sm:px-6 / lg:px-8 padding. Line length
        // stays readable through the per-block caps (max-w-[60ch] etc.),
        // not through this shell.
        shell: '100%',
      },
    },
  },
  plugins: [],
}
