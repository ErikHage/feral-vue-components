import type { VNode } from 'vue';
import type { VChip } from 'vuetify/components/VChip';
import FrChipComponent from './FrChip.vue';

type VChipProps = InstanceType<typeof VChip>['$props'];

/** What the default slot receives: VChip's own, which matters inside a chip group */
export type FrChipScope = Parameters<
  NonNullable<InstanceType<typeof VChip>['$slots']['default']>
>[0];

export interface FrChipSlots {
  /** The label, in place of the `text` prop. Gets the chip's selection state in a group */
  default?: (scope: FrChipScope) => VNode[];
  /** Before the label, in place of `prepend-icon` or `prepend-avatar` */
  prepend?: () => VNode[];
  /** After the label, in place of `append-icon` or `append-avatar` */
  append?: () => VNode[];
}

/**
 * A Vuetify VChip with its own slots: the label as the default slot, `prepend` and `append`. It
 * accepts every VChip prop and event. It sets no defaults, so it stays Vuetify's pill
 */
export const FrChip = FrChipComponent as unknown as new () => {
  $props: VChipProps;
  $slots: FrChipSlots;
};
