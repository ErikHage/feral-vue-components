import type { VTextField } from 'vuetify/components/VTextField';

type VTextFieldProps = InstanceType<typeof VTextField>['$props'];

/**
 * How every feral text field looks unless the caller says otherwise. Structural only: no
 * behaviour. The feral field look, as FrSelect's: solo, compact, rounded
 */
export const frTextFieldDefaults = {
  variant: 'solo',
  density: 'compact',
  rounded: 'lg',
} as const satisfies Partial<VTextFieldProps>;
