import type { VNode } from 'vue';
import type { VBreadcrumbs } from 'vuetify/components/VBreadcrumbs';
import FrBreadcrumbsComponent from './FrBreadcrumbs.vue';

type VBreadcrumbsProps = InstanceType<typeof VBreadcrumbs>['$props'];

export interface FrBreadcrumbsSlots<Item> {
  /**
   * What goes between two items, in place of the chevron. Gets the item before it, as given in
   * `items`, and that item's index
   */
  divider?: (scope: { item: Item; index: number }) => VNode[];
}

type FrBreadcrumbsProps<Item> = Omit<VBreadcrumbsProps, 'items'> & { items?: readonly Item[] };

/**
 * A Vuetify VBreadcrumbs whose dividers are chevrons unless the caller gives a `divider` (text)
 * or a divider slot. It accepts every VBreadcrumbs prop, and types the divider slot by the items
 */
export const FrBreadcrumbs = FrBreadcrumbsComponent as unknown as new <Item = unknown>(
  props: FrBreadcrumbsProps<Item>,
) => {
  $props: FrBreadcrumbsProps<Item>;
  $slots: FrBreadcrumbsSlots<Item>;
};
