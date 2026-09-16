import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {   
    watch: {
      usePolling:true,
    },
    // this ensures that the browser opens upon server start
    // open: true,
    host:"0.0.0.0",
    // this sets a default port to 3000  
    port: 3000,

    strictPort: true
},
})
