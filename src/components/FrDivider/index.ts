import type { VDivider } from 'vuetify/components/VDivider';
import FrDividerComponent from './FrDivider.vue';

/**
 * A Vuetify VDivider. Its default slot, when given, is set in the middle of the line ("or",
 * say). It accepts everything VDivider does, so it is typed as VDivider. It sets no defaults
 */
export const FrDivider = FrDividerComponent as unknown as typeof VDivider;
