import type { VTooltip } from 'vuetify/components/VTooltip';
import FrTooltipComponent from './FrTooltip.vue';

/**
 * A Vuetify VTooltip. Bind its `activator` slot's `props` onto what it describes; its content is
 * the `text` prop, or the default slot in its place. It accepts everything VTooltip does, so it is
 * typed as VTooltip. It sets no defaults
 */
export const FrTooltip = FrTooltipComponent as unknown as typeof VTooltip;
