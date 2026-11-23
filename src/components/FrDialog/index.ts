import FrDialogComponent from './FrDialog.vue';

export { frDialogWidths, type FrDialogSize } from './size';

/**
 * A Vuetify VDialog laid out as a card: a header from `title`, `subtitle` and, when `closable`,
 * a close button; the default slot as the body; and along the bottom, the `actions` slot then
 * the buttons `cancel-text` and `confirm-text` build. Opens through its `activator` slot or
 * `v-model`
 */
export const FrDialog = FrDialogComponent;
