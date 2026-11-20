import type { VSheet } from 'vuetify/components/VSheet';
import FrSheetComponent from './FrSheet.vue';
import type { FrSheetPadding } from './padding';

export { frSheetDefaults } from './defaults';
export type { FrSheetPadding } from './padding';

type VSheetProps = InstanceType<typeof VSheet>['$props'];

/**
 * A Vuetify VSheet: a plain surface in the theme's colours, for a page's content or a panel. It
 * is rounded (`rounded="lg"`) and padded by default; `padding` is `'default'` (16px), `'small'`
 * (8px) or `'none'`. Every other VSheet prop (elevation, color, border, height...) passes through,
 * and the caller's wins
 */
export const FrSheet = FrSheetComponent as unknown as new () => {
  $props: VSheetProps & { padding?: FrSheetPadding };
  $slots: InstanceType<typeof VSheet>['$slots'];
};
