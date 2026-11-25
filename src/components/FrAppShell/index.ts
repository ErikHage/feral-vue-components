import type { VNode } from 'vue';
import type { FrAppNavigationSection } from '../FrAppNavigationDrawer';
import type { FrCommandPaletteSource } from '../FrCommandPalette';
import FrAppShellComponent from './FrAppShell.vue';
import type { FrAppShellCommand } from './types';

export type { FrAppShellCommand } from './types';

export interface FrAppShellProps {
  /** The app's name: in the drawer, and the window's title when the page has none */
  title: string;
  /** A line under the app's name in the drawer */
  subtitle?: string;
  /** The drawer's links, which the command palette searches too */
  sections: FrAppNavigationSection[];
  /** Where in localStorage the shell keeps the user's choices: `<storagePrefix>.theme`... */
  storagePrefix: string;
  /** The `value` of the view shown */
  activeView: string;
  /** The app's own actions, in the command palette; picking one is reported through `command` */
  commands?: FrAppShellCommand[];
  /** The drawer is always a rail */
  railLocked?: boolean;
  /** The drawer is never a rail, and its sections don't collapse */
  fixedDrawer?: boolean;
  /** Whether the drawer starts as a rail, until the user changes it */
  defaultRail?: boolean;
  /** The footer stays at the foot of the window, rather than after the content */
  pinnedFooter?: boolean;
  /**
   * Given, the toolbar holds a search box bound to it (`v-model:search`) for the view to filter
   * by, and `/` focuses it. Left out, the toolbar has a button that opens the command palette
   */
  search?: string;
  /** The search box's placeholder and name */
  searchLabel?: string;
  /** Where the command palette asks for more results as the user types */
  searchSources?: FrCommandPaletteSource[];
  /** The window's title for the view, in place of its link's title */
  viewTitle?: string;
  /** A link without `to` or `href` was picked, in the drawer or the command palette */
  'onUpdate:activeView'?: (value: string) => void;
  /** The search box changed */
  'onUpdate:search'?: (value: string) => void;
  /** One of `commands` was picked: its `value` */
  onCommand?: (value: string) => void;
}

export interface FrAppShellSlots {
  /** The view: told which is active */
  default?: (scope: { activeView: string }) => VNode[];
  /** At the drawer's foot: told whether the drawer is a rail */
  'drawer-footer'?: (scope: { rail: boolean }) => VNode[];
  /** At the toolbar's start, after the menu button on a small screen */
  'toolbar-start'?: () => VNode[];
  /** In the middle of the toolbar */
  'toolbar-center'?: () => VNode[];
  /** Before the theme menu */
  'toolbar-actions'?: () => VNode[];
  /** In the settings menu, which is only there when this is given */
  settings?: () => VNode[];
  /** At the toolbar's end */
  toolbar?: () => VNode[];
  /** Below the view, or at the foot of the window with `pinnedFooter` */
  footer?: () => VNode[];
}

/**
 * A feral app's frame, rendering its own `v-app`: FrAppNavigationDrawer over `sections`, a toolbar
 * with a search (a box bound with `v-model:search`, or a button opening the command palette), the
 * theme menu and an optional settings menu, the view in the default slot, an optional footer, the
 * app's toasts (FrSnackbarQueue with useToast) and FrCommandPalette on Ctrl+K, searching the links,
 * `commands` and `searchSources`. The rail, collapsed sections, theme and `/` shortcut are kept in
 * localStorage under `storagePrefix`. Picking a link emits `update:activeView`, or for a link with
 * `to` goes there with the app's router
 */
export const FrAppShell = FrAppShellComponent as unknown as new () => {
  $props: FrAppShellProps;
  $slots: FrAppShellSlots;
};
