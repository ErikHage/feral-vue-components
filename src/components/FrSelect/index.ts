import type { VNode } from 'vue';
import type { VSelect } from 'vuetify/components/VSelect';
import FrSelectComponent from './FrSelect.vue';

export { frSelectDefaults } from './defaults';

type VSelectProps = InstanceType<typeof VSelect>['$props'];

export interface FrSelectSlots<Item> {
  /** One row of the list: the content goes in the row's title. Gets the caller's own item */
  item?: (scope: { item: Item; index: number }) => VNode[];
  /** Shown in the list when there are no items, in place of `no-data-text` */
  'no-data'?: () => VNode[];
}

type FrSelectProps<Items extends readonly unknown[]> = Omit<VSelectProps, 'items'> & {
  items?: Items;
};

/**
 * A Vuetify VSelect with the feral defaults and its own slots: `item`, whose content goes in
 * a list row FrSelect renders, and `no-data`. It accepts every VSelect prop and
 * event, and types the item slot with the items given
 */
export const FrSelect = FrSelectComponent as unknown as new <
  Items extends readonly unknown[] = readonly unknown[],
>(
  props: FrSelectProps<Items>,
) => {
  $props: FrSelectProps<Items>;
  $slots: FrSelectSlots<Items[number]>;
};
