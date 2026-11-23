import type { VNode } from 'vue';
import type { VTable } from 'vuetify/components/VTable';
import FrTableComponent from './FrTable.vue';

export { frTableDefaults } from './defaults';

type VTableProps = InstanceType<typeof VTable>['$props'];

export interface FrTableSlots {
  /** In the header bar above the table, after the title: a search field, a filter */
  top?: () => VNode[];
  /** Buttons on the right of the header bar above the table */
  actions?: () => VNode[];
  /** The table's <caption>, first inside the <table> */
  caption?: () => VNode[];
  /** The table's rows: <thead>, <tbody>, <tfoot> */
  default?: () => VNode[];
  /** Below the table: totals, a link to more */
  bottom?: () => VNode[];
}

/**
 * A Vuetify VTable, compact by default: a plain HTML table, with its rows written in the default
 * slot, styled to the theme. A `title`, `top` and `actions` share one header bar above it, padded
 * as a card's title is. Its other slots are
 * `caption`, the rows as the default slot, and `bottom`. Every VTable prop passes through. For a table built from `items`, use FrDataTable
 */
export interface FrTableOwnProps {
  /** The table's heading, on the left of the header bar, in a card title's type */
  title?: string;
}

export const FrTable = FrTableComponent as unknown as new () => {
  $props: VTableProps & FrTableOwnProps;
  $slots: FrTableSlots;
};
