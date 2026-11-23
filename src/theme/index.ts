import type { ThemeDefinition, VuetifyOptions } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { mergeDeep } from '../utils/merge-deep';

// The colours are Vuetify 4.3's own dark and light colours, written out so that a Vuetify upgrade
// can't recolour the feral apps. Every app gets the same palette from here; anything not named
// (the on- colours, the variables) still comes from Vuetify, chosen by `dark`
export const feralDark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#212121',
    'surface-bright': '#ccbfd6',
    'surface-light': '#424242',
    'surface-variant': '#c8c8c8',
    'on-surface-variant': '#000000',
    primary: '#2196F3',
    'primary-darken-1': '#277CC1',
    secondary: '#54B6B2',
    'secondary-darken-1': '#48A9A6',
    error: '#CF6679',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

export const feralLight: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#1867C0',
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
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
