import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Esto inyecta la variable de entorno API_KEY en el código del navegador
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});