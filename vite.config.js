import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import reactIconsWi from 'react-icons/wi';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/WeatherFinder/",
  build: {
    rollupOptions: {
      external: [
        // ... other external dependencies
        reactIconsWi,
      ],
    },
  },
})
