import type { VListItem } from 'vuetify/components/VList';
import FrListItemComponent from './FrListItem.vue';

/**
 * A Vuetify VListItem: one row of an FrList. Its slots are VListItem's: `prepend` and `append`
 * either side, `title` and `subtitle` in place of their props, and the default slot under them.
 * It accepts everything VListItem does, so it is typed as VListItem. It sets no defaults
 */
export const FrListItem = FrListItemComponent as unknown as typeof VListItem;
