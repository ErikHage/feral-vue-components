import type { VTextField } from 'vuetify/components/VTextField';
import FrTextFieldComponent from './FrTextField.vue';

export { frTextFieldDefaults } from './defaults';

/**
 * A Vuetify VTextField with the feral field defaults: solo, compact, rounded. It accepts every
 * VTextField prop and event; its icons come from props, as its slots are not passed on
 */
export const FrTextField = FrTextFieldComponent as unknown as new () => {
  $props: InstanceType<typeof VTextField>['$props'];
  $slots: Record<never, never>;
};
