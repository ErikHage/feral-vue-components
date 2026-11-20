import type { VSwitch } from 'vuetify/components/VSwitch';

type VSwitchProps = InstanceType<typeof VSwitch>['$props'];

/**
 * How every feral toggle looks unless the caller says otherwise. Structural only: no behaviour.
 * Compact, as FrCheckbox and the feral fields are
 */
export const frToggleDefaults = {
  density: 'compact',
} as const satisfies Partial<VSwitchProps>;
