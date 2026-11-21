import type { VNode } from 'vue';
import type { VCard } from 'vuetify/components/VCard';
import FrCardComponent from './FrCard.vue';

export { frCardDefaults } from './defaults';

type VCardProps = InstanceType<typeof VCard>['$props'];

export interface FrCardSlots {
  /** Replaces the title and subtitle, which otherwise come from their props */
  title?: () => VNode[];
  /** Before the title, in place of `prepend-icon` and `prepend-avatar` */
  prepend?: () => VNode[];
  /** After the title, in place of `append-icon` and `append-avatar` */
  append?: () => VNode[];
  /** The card's body, below the title */
  default?: () => VNode[];
  /** Buttons along the bottom, pushed to the right */
  actions?: () => VNode[];
}

/**
 * A Vuetify VCard with the feral defaults and its own slots: `title`, `prepend` and `append`
 * beside it, the body as the default slot, and `actions`. It accepts every VCard prop and event
 */
export const FrCard = FrCardComponent as unknown as new () => {
  $props: VCardProps;
  $slots: FrCardSlots;
};
