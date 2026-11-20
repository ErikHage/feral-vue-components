import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

// The library build: ESM only, with vue and vuetify left to the consuming app, so it shares
// the app's single copy of each. Vuetify's CSS is the app's to import too, as is this library's:
// the components' <style> blocks build into dist/index.css, exported as ./styles.css
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      entryRoot: 'src',
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: [/^vue($|\/)/, /^vuetify($|\/)/],
    },
    sourcemap: true,
    // The app's bundler minifies; shipping readable code keeps stack traces and diffs legible
    minify: false,
  },
});
