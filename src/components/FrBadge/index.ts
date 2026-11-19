import type { VNode } from 'vue';
import type { VBadge } from 'vuetify/components/VBadge';
import FrBadgeComponent from './FrBadge.vue';

type VBadgeProps = InstanceType<typeof VBadge>['$props'];

export interface FrBadgeSlots {
  /** What the badge sits on: an icon, an avatar, a button */
  default?: () => VNode[];
  /** The badge's own content, in place of its `content` or `icon` */
  badge?: () => VNode[];
}

/**
 * A Vuetify VBadge with its own slots: what it sits on as the default slot, and `badge`. It
 * accepts every VBadge prop. It sets no defaults
 */
export const FrBadge = FrBadgeComponent as unknown as new () => {
  $props: VBadgeProps;
  $slots: FrBadgeSlots;
};
