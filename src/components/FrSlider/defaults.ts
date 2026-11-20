import type { VSlider } from 'vuetify/components/VSlider';

type VSliderProps = InstanceType<typeof VSlider>['$props'];

/**
 * How every feral slider looks unless the caller says otherwise. Structural only: no behaviour.
 * Compact, as FrCheckbox is, so a slider lines up with the compact fields around it
 */
export const frSliderDefaults = {
  density: 'compact',
} as const satisfies Partial<VSliderProps>;
