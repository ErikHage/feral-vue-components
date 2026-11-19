import type { FrAccordion } from './components/FrAccordion';
import type { FrAccordionPanel } from './components/FrAccordionPanel';
import type { FrAlert } from './components/FrAlert';
import type { FrAutocomplete } from './components/FrAutocomplete';
import type { FrCard } from './components/FrCard';

export { FrAccordion, frAccordionDefaults } from './components/FrAccordion';
export {
  FrAccordionPanel,
  type FrAccordionPanelSlots,
  type FrAccordionPanelTitleScope,
} from './components/FrAccordionPanel';
export { FrAlert, frAlertDefaults, type FrAlertSlots } from './components/FrAlert';
export {
  FrAutocomplete,
  frAutocompleteDefaults,
  type FrAutocompleteSlots,
} from './components/FrAutocomplete';
export { FrCard, frCardDefaults, type FrCardSlots } from './components/FrCard';
export { FeralComponents } from './plugin';
export { createFeralVuetifyOptions, feralDark, feralLight } from './theme';

// Types for the components FeralComponents registers, so `<fr-card>` type-checks in templates
declare module 'vue' {
  interface GlobalComponents {
    FrAccordion: typeof FrAccordion;
    FrAccordionPanel: typeof FrAccordionPanel;
    FrAlert: typeof FrAlert;
    FrAutocomplete: typeof FrAutocomplete;
    FrCard: typeof FrCard;
  }
}
