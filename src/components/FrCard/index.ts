import type { VCard } from 'vuetify/components/VCard';
import FrCardComponent from './FrCard.vue';

export { frCardDefaults } from './defaults';

/**
 * A Vuetify VCard with the feral defaults. It accepts everything VCard does (props, events and
 * slots, all passed straight through), so it is typed as VCard
 */
export const FrCard = FrCardComponent as unknown as typeof VCard;
