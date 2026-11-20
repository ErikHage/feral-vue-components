import type { VIcon } from 'vuetify/components/VIcon';
import FrIconComponent from './FrIcon.vue';

/**
 * A Vuetify VIcon. Name the icon in its default slot (`<fr-icon>mdi-sprout</fr-icon>`) or its
 * `icon` prop. It accepts everything VIcon does, so it is typed as VIcon. It sets no defaults
 */
export const FrIcon = FrIconComponent as unknown as typeof VIcon;
