import type { VFadeTransition } from 'vuetify/components/transitions';
import FrFadeInComponent from './FrFadeIn.vue';

/**
 * Vuetify's fade transition with `appear`, so its content fades in on first render as well as
 * when it toggles. It accepts everything VFadeTransition does, so it is typed as VFadeTransition
 */
export const FrFadeIn = FrFadeInComponent as unknown as typeof VFadeTransition;
