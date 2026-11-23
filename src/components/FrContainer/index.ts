import type { VContainer } from 'vuetify/components/VGrid';
import FrContainerComponent from './FrContainer.vue';

export { frContainerDefaults } from './defaults';

/**
 * A Vuetify VContainer whose default slot is its content. It accepts everything VContainer does
 * (props and its one slot, passed straight through), so it is typed as VContainer. It is fluid
 * by default: `:fluid="false"` brings back Vuetify's width for the breakpoint
 */
export const FrContainer = FrContainerComponent as unknown as typeof VContainer;
