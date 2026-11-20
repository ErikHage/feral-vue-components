import type { VRow } from 'vuetify/components/VGrid';
import FrRowComponent from './FrRow.vue';
import type { FrRowSpacing } from './spacing';

export type { FrRowSpacing } from './spacing';

type VRowProps = InstanceType<typeof VRow>['$props'];

/**
 * A Vuetify VRow whose default slot holds the columns. It takes `align` and `justify`, and
 * `spacing`: `'none'` removes the gutters, anything else keeps them and adds the `fr-row` class.
 * Every other VRow prop passes through
 */
export const FrRow = FrRowComponent as unknown as new () => {
  $props: VRowProps & { spacing?: FrRowSpacing };
  $slots: InstanceType<typeof VRow>['$slots'];
};
