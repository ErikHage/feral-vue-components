import type { FrCard } from './components/FrCard';

export { FrCard, frCardDefaults } from './components/FrCard';
export { FeralComponents } from './plugin';
export { createFeralVuetifyOptions, feralDark, feralLight } from './theme';

// Types for the components FeralComponents registers, so `<fr-card>` type-checks in templates
declare module 'vue' {
  interface GlobalComponents {
    FrCard: typeof FrCard;
  }
}
