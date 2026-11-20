import FrFormComponent from './FrForm.vue';

export type { FrFormSlotScope, FrFormValidationResult } from './types';

/**
 * A Vuetify VForm that never submits the page. Submitting it validates its fields and emits
 * `submit` with the result; `v-model` is whether they all pass. Its ref exposes `validate`,
 * `reset` and `resetValidation`
 */
export const FrForm = FrFormComponent;
