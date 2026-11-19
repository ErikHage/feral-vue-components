import type { VExpansionPanels } from 'vuetify/components/VExpansionPanel';

type VExpansionPanelsProps = InstanceType<typeof VExpansionPanels>['$props'];

/**
 * How every feral accordion looks unless the caller says otherwise. Structural only: no
 * behaviour. VExpansionPanels hands elevation down to its panels, which is why FrAccordionPanel
 * carries no defaults of its own
 */
export const frAccordionDefaults = {
  variant: 'default',
  elevation: 2,
  rounded: 'lg',
} as const satisfies Partial<VExpansionPanelsProps>;
