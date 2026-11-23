import type { VContainer } from 'vuetify/components/VGrid';

type VContainerProps = InstanceType<typeof VContainer>['$props'];

/**
 * How every feral container lays out unless the caller says otherwise. Structural only: no
 * behaviour. Fluid, so a page fills the width at every breakpoint, as vigilant-harvest-app chose
 * over Vuetify 4's cap (1000px at lg). `:fluid="false"` brings the cap back
 */
export const frContainerDefaults = {
  fluid: true,
} as const satisfies Partial<VContainerProps>;
