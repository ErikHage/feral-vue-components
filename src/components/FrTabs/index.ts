import type { VNode } from 'vue';
import type { VTabs } from 'vuetify/components/VTabs';
import FrTabsComponent from './FrTabs.vue';
import type { FrTabsOption, FrTabsSlotScope, FrTabsValue } from './types';

export { frTabsDefaults } from './defaults';
export type { FrTabsOption, FrTabsSlotScope, FrTabsValue } from './types';

// items is VTabs' own way to build tabs, and a window of content beside them: FrTabs builds its
// tabs from options and leaves the content to its default slot, so items is not offered
type VTabsProps = Omit<InstanceType<typeof VTabs>['$props'], 'items' | 'modelValue'>;

export interface FrTabsSlots {
  /** Below the tabs: the selected tab's content. Given the selected tab's value as `tab` */
  default?: (scope: FrTabsSlotScope) => VNode[];
}

/**
 * A Vuetify VTabs built from `options` (strings, or `{ title, value }`), with the selected tab's
 * value in `v-model` and the content below in the default slot, given that value as `tab`. By
 * default the tabs stretch across the row (`fixed-tabs`), in the theme's primary. `class` and `style` land
 * on the div around it all; every other VTabs prop passes through to the tabs
 */
export const FrTabs = FrTabsComponent as unknown as new () => {
  $props: VTabsProps & {
    options?: readonly FrTabsOption[];
    modelValue?: FrTabsValue;
    'onUpdate:modelValue'?: (value: FrTabsValue) => void;
  };
  $slots: FrTabsSlots;
};
