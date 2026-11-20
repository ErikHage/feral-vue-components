import type { VNode } from 'vue';
import type { VSwitch } from 'vuetify/components/VSwitch';
import FrToggleComponent from './FrToggle.vue';

export { frToggleDefaults } from './defaults';

type VSwitchInstance = InstanceType<typeof VSwitch>;
type VSwitchProps = VSwitchInstance['$props'];
// Vuetify doesn't export its slot types, so they are read off VSwitch's own $slots
type Scope<Name extends keyof VSwitchInstance['$slots']> = Parameters<
  NonNullable<VSwitchInstance['$slots'][Name]>
>[0];

export interface FrToggleSlots {
  /** The label's content, in place of the `label` prop: an icon, say. It stays clickable */
  label?: (scope: Scope<'label'>) => VNode[];
  /** Before the switch */
  prepend?: (scope: Scope<'prepend'>) => VNode[];
  /** After the switch and its label */
  append?: (scope: Scope<'append'>) => VNode[];
  /** Inside the thumb, in place of its icon. Gets the icon and the switch's state */
  thumb?: (scope: Scope<'thumb'>) => VNode[];
  /** On the track while on (with `inset`). Gets the switch's state */
  'track-true'?: (scope: Scope<'track-true'>) => VNode[];
  /** On the track while off (with `inset`). Gets the switch's state */
  'track-false'?: (scope: Scope<'track-false'>) => VNode[];
}

/**
 * A Vuetify VSwitch, compact by default: an on/off toggle. Its slots are `label`, `prepend`,
 * `append`, `thumb`, `track-true` and `track-false`. It accepts every VSwitch prop and event
 */
export const FrToggle = FrToggleComponent as unknown as new () => {
  $props: VSwitchProps;
  $slots: FrToggleSlots;
};
