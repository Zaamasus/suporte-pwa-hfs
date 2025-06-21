import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // No Render, não precisamos do path base do GitHub Pages
  const base = '/';
  
  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        scope: '/',
        includeAssets: ['favicon.ico', 'logo.svg', 'icons/**'],
        manifest: {
          name: 'HFS INFORMATICA',
          short_name: 'HFS',
          description: 'Sistema de gestão de chamados técnicos da HFS INFORMATICA',
          theme_color: '#6366f1',
          background_color: '#1a1b26',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/icons/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icons/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
          globIgnores: ['**/mockServiceWorker.js'],
        }
      })
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      host: '0.0.0.0',
      port: 5173
    },
  };
});
