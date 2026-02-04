import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures environment variables are properly injected
    __API_URL__: JSON.stringify(process.env.VITE_API_URL),
  },
})
