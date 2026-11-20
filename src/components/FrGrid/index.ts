import FrGridComponent from './FrGrid.vue';

export type { FrGridAlign, FrGridGap } from './types';

/**
 * A CSS grid: each child of its default slot is a cell. Columns are as many of at least
 * `min-item-width` (240px) as fit, up to `max-columns`, stretched to fill the row unless
 * `:stretch="false"`; or, with `weights` ([2, 1]), columns in those proportions, stacking into one
 * once the narrowest would be under `min-item-width`. `gap="small"` for 4px rather than 12px;
 * `min-row-height` and `uniform-rows` for the rows; `align` for the cells in a row
 */
export const FrGrid = FrGridComponent;
