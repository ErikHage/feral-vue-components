import FrFieldGroupComponent from './FrFieldGroup.vue';

export type { FrFieldGroupSize } from './types';

/**
 * A label above a field: `label`, with an optional `icon`, a `required` mark, and a `description`
 * (or description slot) under it. `field-id` points the label at the one field it is for;
 * `box-id` wraps the content in a div with that id. `size="small"` makes the label smaller. Use
 * it directly only to label a group of fields, such as an hour and a minute picker; the single
 * fields build it in
 */
export const FrFieldGroup = FrFieldGroupComponent;
