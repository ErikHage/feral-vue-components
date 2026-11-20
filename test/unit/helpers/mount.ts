import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import type { Component } from 'vue';
import { createVuetify, type VuetifyOptions } from 'vuetify';
import { createFeralVuetifyOptions } from '../../../src/theme';

/** Mounts with a real Vuetify, configured as an app using this library would configure it */
export function mountWithVuetify<C extends Component>(
  component: C,
  options: ComponentMountingOptions<C> = {},
  vuetifyOverrides: VuetifyOptions = {},
) {
  const vuetify = createVuetify(createFeralVuetifyOptions(vuetifyOverrides));
  return mount(component, {
    ...options,
    global: {
      ...options.global,
      plugins: [...(options.global?.plugins ?? []), vuetify],
    },
  });
}
