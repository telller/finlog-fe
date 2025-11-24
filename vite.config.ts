import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': '/src',
    },
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['homeserver'],
  },
});
