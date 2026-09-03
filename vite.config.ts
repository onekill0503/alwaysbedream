import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    // Nothing in src logs, but dependencies ship stray `console` calls that
    // survive minification otherwise.
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
  build: {
    // Matches tsconfig.app.json. The default target still down-levels syntax
    // (async/await, class fields, ??=) that every browser this site supports
    // runs natively, which only makes the output bigger.
    target: 'es2022',
    // The polyfill is dead weight for browsers that already speak
    // `<link rel="modulepreload">`, which is all of the es2022 target.
    modulePreload: { polyfill: false },
    // Anything below this rides along in the JS/CSS instead of costing a
    // round trip. favicon.svg and resume.pdf live in public/ and are
    // untouched by this.
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split by how often the code changes, not by feature: React and the
        // animation runtime are stable across deploys, so a returning visitor
        // re-downloads only the app chunk. All three are modulepreloaded from
        // index.html and fetched in parallel, so the extra requests cost
        // nothing on first load.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (
            id.includes('node_modules/framer-motion/') ||
            id.includes('node_modules/motion-dom/') ||
            id.includes('node_modules/motion-utils/')
          ) {
            return 'motion'
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'react'
          }
        },
      },
    },
  },
})
