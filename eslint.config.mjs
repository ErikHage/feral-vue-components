import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import { vueTsConfigs, withVueTs } from '@vue/eslint-config-typescript';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default withVueTs(
  {
    ignores: ['dist/', 'coverage/'],
  },
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    // Every tag in a template is kebab-case, whether it's registered globally or imported
    rules: {
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        { registeredComponentsOnly: false },
      ],
      // FrDataTable's cell and header slots are named with a dot (#item.actions), as Vuetify's
      // are; without this the rule reads the dot as a directive modifier
      'vue/valid-v-slot': ['error', { allowModifiers: true }],
    },
  },
  {
    files: ['src/**', 'playground/**'],
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    files: ['test/**'],
    languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
    // Specs define small probe components beside the one under test
    rules: { 'vue/one-component-per-file': 'off' },
  },
  {
    files: ['*.config.*', 'scripts/**'],
    languageOptions: { globals: { ...globals.node } },
  },
  // Last, so formatting is Prettier's alone
  prettier,
);
