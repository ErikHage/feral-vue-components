import type { VSelect } from 'vuetify/components/VSelect';

type VSelectProps = InstanceType<typeof VSelect>['$props'];

/**
 * How every feral select looks unless the caller says otherwise. Structural only: no
 * behaviour. Solo and compact are what the feral apps already use on their fields
 */
export const frSelectDefaults = {
  variant: 'solo',
  density: 'compact',
  rounded: 'lg',
} as const satisfies Partial<VSelectProps>;
