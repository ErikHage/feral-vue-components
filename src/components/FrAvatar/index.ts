import type { VNode } from 'vue';
import type { VAvatar } from 'vuetify/components/VAvatar';
import FrAvatarComponent from './FrAvatar.vue';

type VAvatarProps = InstanceType<typeof VAvatar>['$props'];

export interface FrAvatarSlots {
  /** What the avatar shows, initials say, in place of its `image`, `icon` or `text` */
  default?: () => VNode[];
  /** The badge's content, a count say, when `badge` is set. Without it the badge is a dot */
  badge?: () => VNode[];
}

/**
 * A Vuetify VAvatar with its own slots: what it shows as the default slot, and `badge`. It
 * accepts every VAvatar prop. It sets no defaults, so it stays Vuetify's circle
 */
export const FrAvatar = FrAvatarComponent as unknown as new () => {
  $props: VAvatarProps;
  $slots: FrAvatarSlots;
};
