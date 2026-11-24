import type { VNode } from 'vue';
import FrAppSettingsMenuComponent from './FrAppSettingsMenu.vue';

export interface FrAppSettingsMenuSlots {
  /** The menu's rows, usually FrListItems */
  default?: () => VNode[];
}

/**
 * The toolbar's settings menu: a cog button that opens the host's list items, and stays open when
 * one is clicked, so an item can open a dialog or toggle a setting in place. It has no props; the
 * caller's attributes (an id, say) go on the cog button
 */
export const FrAppSettingsMenu = FrAppSettingsMenuComponent as unknown as new () => {
  $props: Record<string, unknown>;
  $slots: FrAppSettingsMenuSlots;
};
