import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga variables locales de .env si existen
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Prioriza la variable de entorno del sistema (Vercel) sobre la del archivo .env local
      // Esto asegura que la llave se lea correctamente en producción
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY)
    }
  };
});