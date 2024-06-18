import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Asegura que el servidor sea accesible externamente
    port: 5173,       // Especifica el puerto en el que se ejecuta tu aplicación
  },
})
