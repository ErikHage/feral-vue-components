import type { VTable } from 'vuetify/components/VTable';

type VTableProps = InstanceType<typeof VTable>['$props'];

/**
 * How every feral table looks unless the caller says otherwise. Structural only: no behaviour.
 * Compact, as FrDataTable and the feral fields are
 */
export const frTableDefaults = {
  density: 'compact',
} as const satisfies Partial<VTableProps>;
