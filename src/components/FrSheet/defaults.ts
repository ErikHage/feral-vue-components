import type { VSheet } from 'vuetify/components/VSheet';

type VSheetProps = InstanceType<typeof VSheet>['$props'];

/** How every feral sheet looks unless the caller says otherwise. Structural only: no behaviour */
export const frSheetDefaults = {
  rounded: 'lg',
} as const satisfies Partial<VSheetProps>;
