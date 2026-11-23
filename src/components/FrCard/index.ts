import type { VNode } from 'vue';
import type { VCard } from 'vuetify/components/VCard';
import FrCardComponent from './FrCard.vue';

export { frCardActionsDefaults, frCardDefaults } from './defaults';

type VCardProps = InstanceType<typeof VCard>['$props'];

export interface FrCardSlots {
  /** Replaces the title and subtitle, which otherwise come from their props */
  title?: () => VNode[];
  /** Before the title, in place of `prepend-icon` and `prepend-avatar` */
  prepend?: () => VNode[];
  /** After the title, in place of `append-icon` and `append-avatar` */
  append?: () => VNode[];
  /** The card's body, below the title: padded to line up with it, unless `flush` */
  default?: () => VNode[];
  /** Buttons along the bottom, pushed to the right */
  actions?: () => VNode[];
}

export interface FrCardOwnProps {
  /** Puts the body against the card's edges, for a table or a list; otherwise it is padded */
  flush?: boolean;
}

/**
 * A Vuetify VCard with the feral defaults and its own slots: `title`, `prepend` and `append`
 * beside it, the body as the default slot (padded, unless `flush`), and `actions`, whose buttons
 * are primary text buttons unless they say otherwise. It accepts every VCard prop and event
 */
export const FrCard = FrCardComponent as unknown as new () => {
  $props: VCardProps & FrCardOwnProps;
  $slots: FrCardSlots;
};
