import type { VRow } from 'vuetify/components/VGrid';
import FrRowComponent from './FrRow.vue';
import type { frRowAlignmentProps, FrRowAlignmentProps } from './alignment';
import type { FrRowSpacing } from './spacing';

export type { FrRowAlign, FrRowAlignContent, FrRowJustify } from './alignment';
export type { FrRowSpacing } from './spacing';

/** VRow's props, less the alignment props FrRow declares as its own */
type VRowProps = Omit<InstanceType<typeof VRow>['$props'], keyof typeof frRowAlignmentProps>;

/**
 * A Vuetify VRow whose default slot holds the columns. It takes `align`, `justify` and
 * `align-content`, each also at sm and up (`align-md`...), and renders them as Vuetify's utility
 * classes; and `spacing`: `'none'` removes the gutters, anything else keeps them and adds the
 * `fr-row` class. Every other VRow prop passes through
 */
export const FrRow = FrRowComponent as unknown as new () => {
  $props: VRowProps & FrRowAlignmentProps & { spacing?: FrRowSpacing };
  $slots: InstanceType<typeof VRow>['$slots'];
};
