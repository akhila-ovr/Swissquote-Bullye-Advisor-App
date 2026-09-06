import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Nothing exotic — plain Vite + React. `npm run dev` to run, `npm run build` to
// produce a static `dist/` folder that any host can serve.
export default defineConfig({
  plugins: [react()],
})
