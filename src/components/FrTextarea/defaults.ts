import type { VTextarea } from 'vuetify/components/VTextarea';

type VTextareaProps = InstanceType<typeof VTextarea>['$props'];

/**
 * How every feral textarea looks unless the caller says otherwise. Structural only: no
 * behaviour. The feral field look, as FrSelect's: solo, compact, rounded
 */
export const frTextareaDefaults = {
  variant: 'solo',
  density: 'compact',
  rounded: 'lg',
} as const satisfies Partial<VTextareaProps>;
