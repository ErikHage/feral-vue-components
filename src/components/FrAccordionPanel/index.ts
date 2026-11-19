import type { VNode } from 'vue';
import type { VExpansionPanel, VExpansionPanelTitle } from 'vuetify/components/VExpansionPanel';
import FrAccordionPanelComponent from './FrAccordionPanel.vue';

type VExpansionPanelProps = InstanceType<typeof VExpansionPanel>['$props'];

/** What the title and actions slots receive: VExpansionPanelTitle's own slot props */
export type FrAccordionPanelTitleScope = Parameters<
  NonNullable<InstanceType<typeof VExpansionPanelTitle>['$slots']['default']>
>[0];

export interface FrAccordionPanelSlots {
  /** The title's content. Falls back to the `title` prop */
  title?: (scope: FrAccordionPanelTitleScope) => VNode[];
  /** Replaces the expand/collapse icon */
  actions?: (scope: FrAccordionPanelTitleScope) => VNode[];
  /** The panel's body. Falls back to the `text` prop */
  default?: () => VNode[];
}

/**
 * A Vuetify VExpansionPanel made of a VExpansionPanelTitle and a VExpansionPanelText. It accepts
 * every VExpansionPanel prop and event; its slots are its own: `title`, `actions` and the body as
 * the default slot
 */
export const FrAccordionPanel = FrAccordionPanelComponent as unknown as new () => {
  $props: VExpansionPanelProps;
  $slots: FrAccordionPanelSlots;
};
