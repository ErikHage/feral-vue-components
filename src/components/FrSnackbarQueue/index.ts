import type { VSnackbarQueue } from 'vuetify/components/VSnackbarQueue';
import FrSnackbarQueueComponent from './FrSnackbarQueue.vue';

export { frSnackbarQueueDefaults } from './defaults';

/**
 * A Vuetify VSnackbarQueue: push messages (strings, or objects such as `{ text, color, timeout }`)
 * onto its `v-model` array, and it shows them as snackbars one after another. Rounded and
 * dismissable by default. Its slots (`text`, `header`, `actions`, `item`) are given the message.
 * A ref exposes `clear()`. `class` and `style` reach no snackbar (VSnackbarQueue drops them): use
 * `content-class`, or a message's own `class`. It accepts everything VSnackbarQueue does, so it is typed as
 * VSnackbarQueue
 */
export const FrSnackbarQueue = FrSnackbarQueueComponent as unknown as typeof VSnackbarQueue;
