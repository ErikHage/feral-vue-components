import type { VTabs } from 'vuetify/components/VTabs';

type VTabsProps = InstanceType<typeof VTabs>['$props'];

/**
 * How every feral set of tabs looks unless the caller says otherwise. Structural only: no
 * behaviour. The selected tab and its slider in the theme's primary, and the tabs stretched across
 * the row, up to 300px each (`fixed-tabs`)
 */
export const frTabsDefaults = {
  color: 'primary',
  fixedTabs: true,
} as const satisfies Partial<VTabsProps>;
