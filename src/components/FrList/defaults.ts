import type { VList } from 'vuetify/components/VList';

type VListProps = InstanceType<typeof VList>['$props'];

/**
 * How every feral list looks unless the caller says otherwise. Structural only: no behaviour.
 * Compact, as the feral fields and tables are
 */
export const frListDefaults = {
  density: 'compact',
} as const satisfies Partial<VListProps>;
