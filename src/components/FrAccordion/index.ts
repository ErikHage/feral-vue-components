import type { VExpansionPanels } from 'vuetify/components/VExpansionPanel';
import FrAccordionComponent from './FrAccordion.vue';

export { frAccordionDefaults } from './defaults';

/**
 * A Vuetify VExpansionPanels with the feral defaults, meant to hold FrAccordionPanels. It accepts
 * everything VExpansionPanels does (props, events and slots, all passed straight through), so it
 * is typed as VExpansionPanels
 */
export const FrAccordion = FrAccordionComponent as unknown as typeof VExpansionPanels;
