import solid from 'solid-start/vite';
import UnoCSS from 'unocss/vite';
import staticAdapter from 'solid-start-static';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import joinMacro, { joinMacroLoader } from './macro/join';
import prerenderRoutes from './prerender.json';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['fs/promises'],
    },
  },
  plugins: [
    joinMacroLoader,
    UnoCSS(),
    solid({
      babel: {
        plugins: [joinMacro],
      },
      adapter: staticAdapter(),
      prerenderRoutes,
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '#root': resolve(__dirname, '.'),
    },
  },
});
