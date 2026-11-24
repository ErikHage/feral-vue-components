import type { VNode } from 'vue';
import FrAppUserMenuComponent from './FrAppUserMenu.vue';

export interface FrAppUserMenuProps {
  /** The signed-in user's name: `Ada Lovelace` */
  name: string;
  /** A line under their name, such as their role */
  detail?: string;
}

export interface FrAppUserMenuSlots {
  /** The menu's rows under the user's name, usually FrListItems: Profile, Sign out */
  default?: () => VNode[];
}

/**
 * The signed-in user as an initials avatar in the toolbar (`Ada Lovelace` is `AL`). It opens a
 * menu headed by their name and `detail` over the host's rows. The caller's other attributes (an
 * id, say) go on the avatar button
 */
export const FrAppUserMenu = FrAppUserMenuComponent as unknown as new () => {
  $props: FrAppUserMenuProps & Record<string, unknown>;
  $slots: FrAppUserMenuSlots;
};
