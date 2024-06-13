import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
  resolve: {
    alias: {
      'react-big-calendar': 'react-big-calendar/lib',
    },
  },
  
})
