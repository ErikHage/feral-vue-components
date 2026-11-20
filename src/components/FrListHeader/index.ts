import type { VListSubheader } from 'vuetify/components/VList';
import FrListHeaderComponent from './FrListHeader.vue';

/**
 * A Vuetify VListSubheader: a heading between an FrList's rows. Its text is its default slot or
 * its `title`. It accepts everything VListSubheader does, so it is typed as VListSubheader. It
 * sets no defaults
 */
export const FrListHeader = FrListHeaderComponent as unknown as typeof VListSubheader;
