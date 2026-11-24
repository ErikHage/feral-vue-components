import type { VNode } from 'vue';
import FrAppNavigationDrawerComponent from './FrAppNavigationDrawer.vue';
import type { FrAppNavigationSection } from './types';

export type { FrAppNavigationItem, FrAppNavigationSection } from './types';

export interface FrAppNavigationDrawerProps {
  /** The app's name, beside the logo */
  title: string;
  /** A line under the app's name */
  subtitle?: string;
  /** The drawer's links, in groups */
  sections: FrAppNavigationSection[];
  /** The `value` of the item shown as the current page */
  activeView: string;
  /** Collapsed to a rail of icons. Ignored when `mobile` */
  rail?: boolean;
  /** A small screen: the drawer slides over the page, shown while `open` */
  mobile?: boolean;
  /** Shown, on a small screen */
  open?: boolean;
  /** Whether a wide screen's drawer offers to collapse to a rail: true unless given */
  collapsible?: boolean;
  /** The labels of the sections collapsed under their headings */
  collapsedSections?: string[];
  'onUpdate:activeView'?: (value: string) => void;
  'onUpdate:rail'?: (value: boolean) => void;
  'onUpdate:open'?: (value: boolean) => void;
  'onUpdate:collapsedSections'?: (value: string[]) => void;
}

export interface FrAppNavigationDrawerSlots {
  /** Below the links, at the drawer's foot: told whether the drawer is a rail */
  footer?: (scope: { rail: boolean }) => VNode[];
}

/**
 * The app's main navigation: the Feral logo and the app's name over its links, in sections whose
 * headings collapse them. On a wide screen it is permanent and collapses to a rail of icons
 * (`v-model:rail`); with `mobile` it slides over the page while `v-model:open`. An item without
 * `to` or `href` reports itself through `v-model:active-view`
 */
export const FrAppNavigationDrawer = FrAppNavigationDrawerComponent as unknown as new () => {
  $props: FrAppNavigationDrawerProps & Record<string, unknown>;
  $slots: FrAppNavigationDrawerSlots;
};
