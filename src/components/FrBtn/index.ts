import type { VNode } from 'vue';
import type { VBtn } from 'vuetify/components/VBtn';
import FrBtnComponent from './FrBtn.vue';

export { frBtnDefaults } from './defaults';

type VBtnProps = InstanceType<typeof VBtn>['$props'];

export interface FrBtnSlots {
  /** The label, in place of the `text` (or `icon`) prop */
  default?: () => VNode[];
  /** Before the label, in place of `prepend-icon` */
  prepend?: () => VNode[];
  /** After the label, in place of `append-icon` */
  append?: () => VNode[];
}

/**
 * A Vuetify VBtn with the feral defaults and its own slots: the label as the default slot,
 * `prepend` and `append`. It accepts every VBtn prop and event
 */
export const FrBtn = FrBtnComponent as unknown as new () => {
  $props: VBtnProps;
  $slots: FrBtnSlots;
};
