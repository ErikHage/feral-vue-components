import type { VSpacer } from 'vuetify/components/VGrid';
import FrSpacerComponent from './FrSpacer.vue';

/**
 * A Vuetify VSpacer: an empty element that grows to fill the free space in a flex row, pushing
 * whatever follows it to the far end (a toolbar's buttons, a card's actions). It accepts everything
 * VSpacer does (`tag`), so it is typed as VSpacer. It sets no defaults
 */
export const FrSpacer = FrSpacerComponent as unknown as typeof VSpacer;
