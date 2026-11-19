import type { VFileInput } from 'vuetify/components/VFileInput';

type VFileInputProps = InstanceType<typeof VFileInput>['$props'];

/**
 * How every feral file field looks unless the caller says otherwise. Structural only: no
 * behaviour. The feral field look, as FrAutocomplete's: solo, compact, rounded
 */
export const frFileFieldDefaults = {
  variant: 'solo',
  density: 'compact',
  rounded: 'lg',
} as const satisfies Partial<VFileInputProps>;
