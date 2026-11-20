import type { VNode } from 'vue';
import type { VList } from 'vuetify/components/VList';
import FrListComponent from './FrList.vue';

export { frListDefaults } from './defaults';

type VListInstance = InstanceType<typeof VList>;
type VListProps = VListInstance['$props'];
type VListSlots = VListInstance['$slots'];
// Vuetify doesn't export its slot types, so they are read off VList's own $slots
type Scope<Name extends keyof VListSlots> = Parameters<NonNullable<VListSlots[Name]>>[0];

/** What a row slot gets: Vuetify's scope for that part of the row, with the caller's own item */
export type FrListRowScope<Name extends 'title' | 'subtitle' | 'prepend' | 'append', Item> = Omit<
  Scope<Name>,
  'item'
> & { item: Item };

/** What a header, subheader or divider slot gets: the `props` to bind onto what it renders */
export type FrListPartScope = Scope<'header'>;

export interface FrListSlots<Item> {
  /** The rows, written out: FrListItem, FrListHeader, FrDivider. Without it, `items` are shown */
  default?: () => VNode[];
  /** A row's title, in place of its `title` */
  title?: (scope: FrListRowScope<'title', Item>) => VNode[];
  /** A row's subtitle, in place of its `subtitle` */
  subtitle?: (scope: FrListRowScope<'subtitle', Item>) => VNode[];
  /** Before a row's title: an icon or avatar */
  prepend?: (scope: FrListRowScope<'prepend', Item>) => VNode[];
  /** After a row's title: actions, a count */
  append?: (scope: FrListRowScope<'append', Item>) => VNode[];
  /** The row that opens an item with `children`: bind `props` onto an FrListItem */
  header?: (scope: FrListPartScope) => VNode[];
  /** An item of `type: 'subheader'`: bind `props` onto an FrListHeader */
  subheader?: (scope: FrListPartScope) => VNode[];
  /** An item of `type: 'divider'`: bind `props` onto an FrDivider */
  divider?: (scope: FrListPartScope) => VNode[];
}

type FrListProps<Items extends readonly unknown[]> = Omit<VListProps, 'items'> & {
  items?: Items;
};

/**
 * A Vuetify VList, compact by default. Write its rows in the default slot, or give it `items` and
 * customise their rows with the `title`, `subtitle`, `prepend` and `append` slots (and `header`,
 * `subheader`, `divider`), which get the item, typed by the items given. It accepts every VList
 * prop and event
 */
export const FrList = FrListComponent as unknown as new <
  Items extends readonly unknown[] = readonly unknown[],
>(
  props: FrListProps<Items>,
) => {
  $props: FrListProps<Items>;
  $slots: FrListSlots<Items[number]>;
};
