import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: VitePWAOptions = {
  devOptions: {
    enabled: true,
    type: 'module'
  },
  includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
  manifest: {
    name: 'Remembit',
    short_name: 'Remembit',
    description: 'Remember your bits!',
    start_url: '/neocortex',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(pwaOptions)],
  envPrefix: 'REMEMBIT_',
  resolve: {
    alias: {
      '@components': `${path.resolve(__dirname, 'src')}/components`,
      '@composables': `${path.resolve(__dirname, 'src')}/composables`,
      '@views': `${path.resolve(__dirname, 'src')}/views`,
      '@store': `${path.resolve(__dirname, 'src')}/store`,
      '@assets': `${path.resolve(__dirname, 'src')}/assets`
    }
  }
});
