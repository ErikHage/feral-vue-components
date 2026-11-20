import type { VMenu } from 'vuetify/components/VMenu';
import FrMenuComponent from './FrMenu.vue';

/**
 * A Vuetify VMenu. Bind its `activator` slot's `props` onto what opens it; its default slot is
 * the menu, usually an FrList or FrCard. It accepts everything VMenu does, so it is typed as
 * VMenu. It sets no defaults
 */
export const FrMenu = FrMenuComponent as unknown as typeof VMenu;
