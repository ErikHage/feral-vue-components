import type { VSnackbarQueue } from 'vuetify/components/VSnackbarQueue';
import FrSnackbarQueueComponent from './FrSnackbarQueue.vue';

export { frSnackbarQueueDefaults } from './defaults';

/**
 * A Vuetify VSnackbarQueue: push messages (strings, or objects such as `{ text, color, timeout }`)
 * onto its `v-model` array, and it shows them as snackbars one after another. Without a
 * `v-model` it shows the app's toasts, put on its queue with `useToast()`: mount one such queue
 * per app. A toast's action shows as a button before the dismiss button, and a danger toast is
 * read out as an alert. Rounded and dismissable by default. Its slots (`text`, `header`,
 * `actions`, `item`) are given the message. A ref exposes `clear()`. `class` and `style` reach no snackbar (VSnackbarQueue drops them): use
 * `content-class`, or a message's own `class`. It accepts everything VSnackbarQueue does, so it is typed as
 * VSnackbarQueue
 */
export const FrSnackbarQueue = FrSnackbarQueueComponent as unknown as typeof VSnackbarQueue;
