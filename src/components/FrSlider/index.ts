import type { VNode } from 'vue';
import type { VSlider } from 'vuetify/components/VSlider';
import FrSliderComponent from './FrSlider.vue';

export { frSliderDefaults } from './defaults';

type VSliderInstance = InstanceType<typeof VSlider>;
type VSliderProps = VSliderInstance['$props'];
// Vuetify doesn't export its slot types, so they are read off VSlider's own $slots
type Scope<Name extends keyof VSliderInstance['$slots']> = Parameters<
  NonNullable<VSliderInstance['$slots'][Name]>
>[0];

export interface FrSliderSlots {
  /** The label's content, in place of the `label` prop */
  label?: (scope: Scope<'label'>) => VNode[];
  /** Before the slider, after its label: an icon, a button */
  prepend?: (scope: Scope<'prepend'>) => VNode[];
  /** After the slider: an icon, a button, the value */
  append?: (scope: Scope<'append'>) => VNode[];
  /** The bubble over the thumb (with `thumb-label`), in place of the value. Gets the value */
  'thumb-label'?: (scope: Scope<'thumb-label'>) => VNode[];
  /** Each tick's label (with `show-ticks` and `ticks`). Gets the tick and its index */
  'tick-label'?: (scope: Scope<'tick-label'>) => VNode[];
}

/**
 * A Vuetify VSlider, compact by default, with its content slots: `label`, `prepend`, `append`,
 * `thumb-label` and `tick-label`. It accepts every VSlider prop and event
 */
export const FrSlider = FrSliderComponent as unknown as new () => {
  $props: VSliderProps;
  $slots: FrSliderSlots;
};
