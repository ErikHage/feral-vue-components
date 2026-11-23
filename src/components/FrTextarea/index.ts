import type { VTextarea } from 'vuetify/components/VTextarea';
import FrTextareaComponent from './FrTextarea.vue';

export { frTextareaDefaults } from './defaults';

/**
 * A Vuetify VTextarea with the feral field defaults: solo, compact, rounded. It accepts every
 * VTextarea prop and event; its icons come from props, as its slots are not passed on
 */
export const FrTextarea = FrTextareaComponent as unknown as new () => {
  $props: InstanceType<typeof VTextarea>['$props'];
  $slots: Record<never, never>;
};
