import type { Component, Plugin } from 'vue';
import { FrAccordion } from './components/FrAccordion';
import { FrAccordionPanel } from './components/FrAccordionPanel';
import { FrAlert } from './components/FrAlert';
import { FrAutocomplete } from './components/FrAutocomplete';
import { FrAvatar } from './components/FrAvatar';
import { FrBadge } from './components/FrBadge';
import { FrCard } from './components/FrCard';

export function createComponentsPlugin(components: Record<string, Component>): Plugin {
  return {
    install(app) {
      for (const [name, component] of Object.entries(components)) {
        app.component(name, component);
      }
    },
  };
}

/**
 * Registers every Fr* component globally, so `<fr-card>` works in any template without an
 * import. Named imports work without it.
 */
export const FeralComponents: Plugin = createComponentsPlugin({
  FrAccordion,
  FrAccordionPanel,
  FrAlert,
  FrAutocomplete,
  FrAvatar,
  FrBadge,
  FrCard,
});
