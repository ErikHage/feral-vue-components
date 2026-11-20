import type { VForm } from 'vuetify/components/VForm';

type VFormInstance = InstanceType<typeof VForm>;

/** What validating the form finds: whether every field passed, and each failing field's errors */
export type FrFormValidationResult = Awaited<ReturnType<VFormInstance['validate']>>;

/**
 * What the default slot gets: the form's state (`isValid`, `errors`, `isValidating`...) and its
 * `validate`, `reset` and `resetValidation`
 */
export type FrFormSlotScope = Parameters<NonNullable<VFormInstance['$slots']['default']>>[0];
