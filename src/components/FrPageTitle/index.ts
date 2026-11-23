import type { VNode } from 'vue';
import FrPageTitleComponent from './FrPageTitle.vue';

export interface FrPageTitleProps {
  /** The page's title */
  title: string;
  /** The title's element: `h1` unless the page has one already */
  tag?: string;
}

export interface FrPageTitleSlots {
  /** Buttons beside the title, on the right; they wrap below it when there isn't room */
  actions?: () => VNode[];
}

/**
 * A page's title, bold and scaled with the window, with an `actions` slot on the right that wraps
 * below it on a narrow screen
 */
export const FrPageTitle = FrPageTitleComponent as unknown as new () => {
  $props: FrPageTitleProps;
  $slots: FrPageTitleSlots;
};
