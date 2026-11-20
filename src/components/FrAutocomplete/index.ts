import type { VNode } from 'vue';
import type { VAutocomplete } from 'vuetify/components/VAutocomplete';
import FrAutocompleteComponent from './FrAutocomplete.vue';

export { frAutocompleteDefaults } from './defaults';

type VAutocompleteProps = InstanceType<typeof VAutocomplete>['$props'];

export interface FrAutocompleteSlots<Item> {
  /** One row of the list: the content goes in the row's title. Gets the caller's own item */
  item?: (scope: { item: Item; index: number }) => VNode[];
  /** Shown in the list when nothing matches, in place of `no-data-text` */
  'no-data'?: () => VNode[];
}

type FrAutocompleteProps<Items extends readonly unknown[]> = Omit<VAutocompleteProps, 'items'> & {
  items?: Items;
};

/**
 * A Vuetify VAutocomplete with the feral defaults and its own slots: `item`, whose content goes in
 * a list row FrAutocomplete renders, and `no-data`. It accepts every VAutocomplete prop and
 * event, and types the item slot with the items given
 */
export const FrAutocomplete = FrAutocompleteComponent as unknown as new <
  Items extends readonly unknown[] = readonly unknown[],
>(
  props: FrAutocompleteProps<Items>,
) => {
  $props: FrAutocompleteProps<Items>;
  $slots: FrAutocompleteSlots<Items[number]>;
};
