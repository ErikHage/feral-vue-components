import type { VDataTable } from 'vuetify/components/VDataTable';

type VDataTableProps = InstanceType<typeof VDataTable>['$props'];

/**
 * How every feral data table looks unless the caller says otherwise. Structural only: no
 * behaviour. Compact, as the feral fields are, and rows highlight under the mouse
 */
export const frDataTableDefaults = {
  density: 'compact',
  hover: true,
} as const satisfies Partial<VDataTableProps>;
