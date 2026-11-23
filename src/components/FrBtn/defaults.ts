import type { VBtn } from 'vuetify/components/VBtn';

type VBtnProps = InstanceType<typeof VBtn>['$props'];

/**
 * How every feral button looks unless the caller says otherwise. Structural only: no behaviour.
 * The theme's primary, as the feral apps set on nearly every button, with the corners of the
 * other components; buttons stay Vuetify's elevated. `color="default"` gives a neutral button.
 * Icon buttons skip it: they stay round and neutral
 */
export const frBtnDefaults = {
  color: 'primary',
  rounded: 'lg',
} as const satisfies Partial<VBtnProps>;
