import type { VNode } from 'vue';
import type { VContainer } from 'vuetify/components/VGrid';
import FrPageComponent from './FrPage.vue';

export interface FrPageSlots {
  /** Buttons beside the title, on the right */
  actions?: () => VNode[];
  /** The page's content, across the full width */
  default?: () => VNode[];
}

/**
 * A page: a fluid FrContainer holding an FrPageTitle (given a `title`, with the `actions` slot
 * beside it) and then the content. It takes VContainer's props, which go to the container
 */
export const FrPage = FrPageComponent as unknown as new () => {
  $props: InstanceType<typeof VContainer>['$props'] & { title?: string };
  $slots: FrPageSlots;
};
