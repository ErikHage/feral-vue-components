import type { VAutocomplete } from 'vuetify/components/VAutocomplete';

type VAutocompleteProps = InstanceType<typeof VAutocomplete>['$props'];

/**
 * How every feral autocomplete looks unless the caller says otherwise. Structural only: no
 * behaviour. Solo and compact are what the feral apps already use on their fields
 */
export const frAutocompleteDefaults = {
  variant: 'solo',
  density: 'compact',
  rounded: 'lg',
} as const satisfies Partial<VAutocompleteProps>;
