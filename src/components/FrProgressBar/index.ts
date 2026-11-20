import type { VProgressLinear } from 'vuetify/components/VProgressLinear';
import FrProgressBarComponent from './FrProgressBar.vue';

/**
 * A Vuetify VProgressLinear: a bar filled to its `v-model` (0 to `max`), or moving with
 * `indeterminate`. Its default slot sits over the bar, given the `value` and `buffer`. It accepts
 * everything VProgressLinear does, so it is typed as VProgressLinear. It sets no defaults
 */
export const FrProgressBar = FrProgressBarComponent as unknown as typeof VProgressLinear;
