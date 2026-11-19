import type { VCol } from 'vuetify/components/VGrid';
import FrColComponent from './FrCol.vue';

/**
 * A Vuetify VCol whose default slot is the column's content. It accepts everything VCol does
 * (props and its one slot, passed straight through), so it is typed as VCol. It sets no defaults
 */
export const FrCol = FrColComponent as unknown as typeof VCol;
