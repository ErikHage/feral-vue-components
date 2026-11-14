import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// A small app for seeing the components in a browser. It imports the library's source, not
// its build, so edits show up as they are made
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [vue()],
  server: {
    port: 5177,
    // Fail rather than drift to another port, so the URL is always the same
    strictPort: true,
  },
});
