import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const pathSrc = path.resolve(__dirname, './src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "${pathSrc}/assets/scss/variables";
        @import "${pathSrc}/assets/scss/mixins";
      `,
      },
    },
  },
});
