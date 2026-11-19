import type { VChipGroup } from 'vuetify/components/VChipGroup';
import FrChipGroupComponent from './FrChipGroup.vue';

/**
 * A Vuetify VChipGroup meant to hold FrChips. It accepts everything VChipGroup does (props,
 * events and its one slot, passed straight through), so it is typed as VChipGroup. It sets no
 * defaults
 */
export const FrChipGroup = FrChipGroupComponent as unknown as typeof VChipGroup;
