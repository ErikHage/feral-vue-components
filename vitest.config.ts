import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/unit/**/*.spec.ts'],
    setupFiles: ['test/unit/setup.ts'],
    // Runs each file in its own VM context. Needed on Node 26, whose own localStorage global
    // (undefined without --localstorage-file) otherwise hides jsdom's
    pool: 'vmThreads',
    server: {
      deps: {
        // Vuetify imports its own CSS, which must go through Vite
        inline: ['vuetify'],
      },
    },
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['src/**/*.d.ts'],
      thresholds: { 100: true },
    },
  },
});
