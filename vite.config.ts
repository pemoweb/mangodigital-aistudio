import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          servicios: path.resolve(__dirname, 'servicios/index.html'),
          disenoWeb: path.resolve(__dirname, 'servicios/diseno-web.html'),
          desarrolloWeb: path.resolve(__dirname, 'servicios/desarrollo-web.html'),
          seo: path.resolve(__dirname, 'servicios/seo.html'),
          marketingDigital: path.resolve(__dirname, 'servicios/marketing-digital.html'),
          branding: path.resolve(__dirname, 'servicios/branding.html'),
          hosting: path.resolve(__dirname, 'servicios/hosting.html'),
          dominios: path.resolve(__dirname, 'servicios/dominios.html'),
          mantenimientoWeb: path.resolve(__dirname, 'servicios/mantenimiento-web.html'),
          proyectos: path.resolve(__dirname, 'proyectos/index.html'),
          calculadora: path.resolve(__dirname, 'calculadora/index.html'),
          nosotros: path.resolve(__dirname, 'nosotros/index.html'),
          blog: path.resolve(__dirname, 'blog/index.html'),
          contacto: path.resolve(__dirname, 'contacto/index.html'),
          avisoLegal: path.resolve(__dirname, 'legal/aviso-legal.html'),
          privacidad: path.resolve(__dirname, 'legal/privacidad.html'),
          cookies: path.resolve(__dirname, 'legal/cookies.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
