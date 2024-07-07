import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'date-fns': path.resolve(__dirname, 'node_modules/date-fns'),
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
