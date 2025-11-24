import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envDir = path.resolve(__dirname, 'envs');

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, envDir);
  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': env,
    },
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
};
