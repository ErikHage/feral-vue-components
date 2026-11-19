import type { VNode } from 'vue';
import type { VDataTable } from 'vuetify/components/VDataTable';
import FrDataTableComponent from './FrDataTable.vue';

export { frDataTableDefaults } from './defaults';

type VDataTableInstance = InstanceType<typeof VDataTable>;
type VDataTableProps = VDataTableInstance['$props'];
// Vuetify doesn't export its slot types, so they are read off VDataTable's own $slots
type AnyCellScope = Parameters<NonNullable<VDataTableInstance['$slots'][`item.${string}`]>>[0];

/** What a cell slot (`item.<key>`) gets: Vuetify's cell scope, with the caller's own item */
export type FrDataTableCellScope<Item> = Omit<AnyCellScope, 'item'> & { item: Item };

/** What a header slot (`header.<key>`) gets: Vuetify's own header scope */
export type FrDataTableHeaderScope = Parameters<
  NonNullable<VDataTableInstance['$slots'][`header.${string}`]>
>[0];

export type FrDataTableSlots<Item> = {
  /** One cell's content, for the column whose key follows `item.`: `#item.actions`, say */
  [key: `item.${string}`]: ((scope: FrDataTableCellScope<Item>) => VNode[]) | undefined;
  /** One header's content, for the column whose key follows `header.` */
  [key: `header.${string}`]: ((scope: FrDataTableHeaderScope) => VNode[]) | undefined;
} & {
  /** Shown in place of the rows when there are none, in place of `no-data-text` */
  'no-data'?: () => VNode[];
  /** Shown in place of the rows while `loading` with no rows yet, in place of `loading-text` */
  loading?: () => VNode[];
};

type FrDataTableProps<Items extends readonly unknown[]> = Omit<VDataTableProps, 'items'> & {
  items?: Items;
};

/**
 * A Vuetify VDataTable with the feral defaults, passing on the slots that fill a cell or header
 * (`item.<key>`, `header.<key>`) and `no-data` and `loading`. It accepts every VDataTable prop and
 * event, and types the cell slots' item by the items given
 */
export const FrDataTable = FrDataTableComponent as unknown as new <
  Items extends readonly unknown[] = readonly unknown[],
>(
  props: FrDataTableProps<Items>,
) => {
  $props: FrDataTableProps<Items>;
  $slots: FrDataTableSlots<Items[number]>;
};
