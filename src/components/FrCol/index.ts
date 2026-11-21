import type { VCol } from 'vuetify/components/VGrid';
import FrColComponent from './FrCol.vue';
import type { FrColPlacementProps, frColPlacementProps } from './placement';

export type { FrColAlignSelf } from './placement';

/** VCol's props, less the placement props FrCol declares as its own */
type VColProps = Omit<InstanceType<typeof VCol>['$props'], keyof typeof frColPlacementProps>;

/**
 * A Vuetify VCol whose default slot is the column's content. It takes `order` (also at sm and up,
 * `order-md`...) and `align-self`, and renders them as Vuetify's utility classes. Every other VCol
 * prop passes through. It sets no defaults
 */
export const FrCol = FrColComponent as unknown as new () => {
  $props: VColProps & FrColPlacementProps;
  $slots: InstanceType<typeof VCol>['$slots'];
};
