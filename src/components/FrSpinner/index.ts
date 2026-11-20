import type { VProgressCircular } from 'vuetify/components/VProgressCircular';
import FrSpinnerComponent from './FrSpinner.vue';

/**
 * A Vuetify VProgressCircular that spins by default: `<fr-spinner />` is a loading spinner. Given
 * a value (`v-model` or `model-value`, 0 to 100), it shows that as a ring instead; `indeterminate`
 * from the caller always wins. Its default slot sits in the middle, given the `value`. It accepts
 * everything VProgressCircular does, so it is typed as VProgressCircular
 */
export const FrSpinner = FrSpinnerComponent as unknown as typeof VProgressCircular;
