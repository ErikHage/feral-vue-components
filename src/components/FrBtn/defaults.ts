import type { VBtn } from 'vuetify/components/VBtn';

type VBtnProps = InstanceType<typeof VBtn>['$props'];

/**
 * How every feral button looks unless the caller says otherwise. Structural only: no behaviour.
 * Only the corners change, to match the other components; buttons stay Vuetify's elevated. Icon
 * buttons skip it and stay round
 */
export const frBtnDefaults = {
  rounded: 'lg',
} as const satisfies Partial<VBtnProps>;
