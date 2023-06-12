import { defineConfig } from 'astro/config';
import electron from 'vite-plugin-electron';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  output: 'static',
  vite: {
    plugins: [electron([{
      // Main-Process entry file of the Electron App.
      entry: 'electron/main.ts'
    }, {
      entry: 'electron/preload.ts',
      onstart(options) {
        // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
        // instead of restarting the entire Electron App.
        options.reload();
      }
    }])]
  },
  integrations: [vue()]
});