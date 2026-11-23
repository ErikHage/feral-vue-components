import type { VAlert } from 'vuetify/components/VAlert';

type VAlertProps = InstanceType<typeof VAlert>['$props'];

/**
 * How every feral alert looks unless the caller says otherwise. Structural only: no behaviour.
 * Compact, as the feral fields and tables are
 */
export const frAlertDefaults = {
  variant: 'tonal',
  density: 'compact',
  rounded: 'lg',
} as const satisfies Partial<VAlertProps>;
