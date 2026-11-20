import type { VNode } from 'vue';
import type { VTable } from 'vuetify/components/VTable';
import FrTableComponent from './FrTable.vue';

export { frTableDefaults } from './defaults';

type VTableProps = InstanceType<typeof VTable>['$props'];

export interface FrTableSlots {
  /** Above the table: a heading, a search field */
  top?: () => VNode[];
  /** The table's <caption>, first inside the <table> */
  caption?: () => VNode[];
  /** The table's rows: <thead>, <tbody>, <tfoot> */
  default?: () => VNode[];
  /** Below the table: totals, a link to more */
  bottom?: () => VNode[];
}

/**
 * A Vuetify VTable, compact by default: a plain HTML table, with its rows written in the default
 * slot, styled to the theme. Its slots are `top`, `caption`, the rows as the default slot, and
 * `bottom`. Every VTable prop passes through. For a table built from `items`, use FrDataTable
 */
export const FrTable = FrTableComponent as unknown as new () => {
  $props: VTableProps;
  $slots: FrTableSlots;
};
