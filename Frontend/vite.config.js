import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // ✅ added

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000, // Set dev server port to 3000
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ added
    },
  },
})
