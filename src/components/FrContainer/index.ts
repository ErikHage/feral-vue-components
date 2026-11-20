import type { VContainer } from 'vuetify/components/VGrid';
import FrContainerComponent from './FrContainer.vue';

/**
 * A Vuetify VContainer whose default slot is its content. It accepts everything VContainer does
 * (props and its one slot, passed straight through), so it is typed as VContainer. It sets no
 * defaults
 */
export const FrContainer = FrContainerComponent as unknown as typeof VContainer;
