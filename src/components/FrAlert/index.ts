import type { VNode } from 'vue';
import type { VAlert } from 'vuetify/components/VAlert';
import FrAlertComponent from './FrAlert.vue';

export { frAlertDefaults } from './defaults';

type VAlertProps = InstanceType<typeof VAlert>['$props'];

export interface FrAlertSlots {
  /** The alert's title. Falls back to the `title` prop */
  title?: () => VNode[];
  /** The alert's message, below the title. Falls back to the `text` prop */
  default?: () => VNode[];
}

/**
 * A Vuetify VAlert with the feral defaults and its own slots: `title`, and the message as the
 * default slot. It accepts every VAlert prop and event
 */
export const FrAlert = FrAlertComponent as unknown as new () => {
  $props: VAlertProps;
  $slots: FrAlertSlots;
};
