import type { VTreeview } from 'vuetify/components/VTreeview';
import FrTreeComponent from './FrTree.vue';

export { frTreeDefaults } from './defaults';

/**
 * A Vuetify VTreeview, compact by default: `items` with `children`, shown as rows that open to
 * show their children. Its slots (`prepend`, `title`, `subtitle`, `append`, `toggle`, `header`,
 * `footer`, `item`, `divider`, `subheader`, `no-data`) are passed on only when given, and get the
 * item, typed by the items given. It accepts everything VTreeview does, so it is typed as
 * VTreeview
 */
export const FrTree = FrTreeComponent as unknown as typeof VTreeview;
