import type { FrAccordionPanel } from './components/FrAccordionPanel';
import type { FrCard } from './components/FrCard';

export {
  FrAccordionPanel,
  type FrAccordionPanelSlots,
  type FrAccordionPanelTitleScope,
} from './components/FrAccordionPanel';
export { FrCard, frCardDefaults } from './components/FrCard';
export { FeralComponents } from './plugin';
export { createFeralVuetifyOptions, feralDark, feralLight } from './theme';

// Types for the components FeralComponents registers, so `<fr-card>` type-checks in templates
declare module 'vue' {
  interface GlobalComponents {
    FrAccordionPanel: typeof FrAccordionPanel;
    FrCard: typeof FrCard;
  }
}
