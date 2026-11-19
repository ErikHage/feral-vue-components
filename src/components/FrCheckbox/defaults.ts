import type { VCheckbox } from 'vuetify/components/VCheckbox';

type VCheckboxProps = InstanceType<typeof VCheckbox>['$props'];

/**
 * How every feral checkbox looks unless the caller says otherwise. Structural only: no
 * behaviour. Compact, as the feral fields are (see FrAutocomplete); a checkbox has no variant or
 * corners for the rest of the field defaults to apply to
 */
export const frCheckboxDefaults = {
  density: 'compact',
} as const satisfies Partial<VCheckboxProps>;
