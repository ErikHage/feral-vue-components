import type { VTreeview } from 'vuetify/components/VTreeview';

type VTreeviewProps = InstanceType<typeof VTreeview>['$props'];

/**
 * How every feral tree looks unless the caller says otherwise. Structural only: no behaviour.
 * Compact, as FrList is: a tree is a list of rows
 */
export const frTreeDefaults = {
  density: 'compact',
} as const satisfies Partial<VTreeviewProps>;
