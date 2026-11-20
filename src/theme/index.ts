import type { ThemeDefinition, VuetifyOptions } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { mergeDeep } from '../utils/merge-deep';

// Colours not set here fall back to Vuetify's own dark or light theme, chosen by `dark`. The
// feral palette has not been designed yet, so for now that is all of them
export const feralDark: ThemeDefinition = {
  dark: true,
  colors: {},
};

export const feralLight: ThemeDefinition = {
  dark: false,
  colors: {},
};

/**
 * Vuetify options carrying the feral themes and the mdi icon set. Pass the result to
 * `createVuetify`; `overrides` is merged in deeply, so an app changes only what it names.
 * The app imports `vuetify/styles` and `@mdi/font/css/materialdesignicons.css` itself.
 */
export function createFeralVuetifyOptions(overrides: VuetifyOptions = {}): VuetifyOptions {
  const options: VuetifyOptions = {
    theme: {
      defaultTheme: 'feralDark',
      themes: { feralDark, feralLight },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
  };
  return mergeDeep(options, overrides);
}
