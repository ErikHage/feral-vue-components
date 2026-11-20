import type { VNode } from 'vue';
import type { VCheckbox } from 'vuetify/components/VCheckbox';
import FrCheckboxComponent from './FrCheckbox.vue';

export { frCheckboxDefaults } from './defaults';

type VCheckboxProps = InstanceType<typeof VCheckbox>['$props'];

export interface FrCheckboxSlots {
  /** The label's content, in place of the `label` prop: a link, say. It stays clickable */
  label?: () => VNode[];
}

/**
 * A Vuetify VCheckbox with the feral defaults and its own `label` slot. It accepts every
 * VCheckbox prop and event
 */
export const FrCheckbox = FrCheckboxComponent as unknown as new () => {
  $props: VCheckboxProps;
  $slots: FrCheckboxSlots;
};
