import type { VNode } from 'vue';
import type { VFileInput } from 'vuetify/components/VFileInput';
import FrFileFieldComponent from './FrFileField.vue';

export { frFileFieldDefaults } from './defaults';

type VFileInputInstance = InstanceType<typeof VFileInput>;

/** What the selection slot gets: the chosen files' names and their total size */
export type FrFileFieldSelectionScope = Parameters<
  NonNullable<VFileInputInstance['$slots']['selection']>
>[0];

export interface FrFileFieldSlots {
  /** How the chosen files show in the field, in place of their names or chips */
  selection?: (scope: FrFileFieldSelectionScope) => VNode[];
}

/**
 * A Vuetify VFileInput with the feral field defaults and its own `selection` slot. It accepts
 * every VFileInput prop and event
 */
export const FrFileField = FrFileFieldComponent as unknown as new () => {
  $props: VFileInputInstance['$props'];
  $slots: FrFileFieldSlots;
};
