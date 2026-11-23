import type { VCard } from 'vuetify/components/VCard';

type VCardProps = InstanceType<typeof VCard>['$props'];

/** How every feral card looks unless the caller says otherwise. Structural only: no behaviour */
export const frCardDefaults = {
  variant: 'elevated',
  elevation: 2,
  rounded: 'lg',
} as const satisfies Partial<VCardProps>;

/**
 * What the buttons in a card's actions get unless the caller says otherwise: the theme's primary.
 * VCardActions already makes them text buttons. FrDialog's actions use it too
 */
export const frCardActionsDefaults = {
  VBtn: { color: 'primary' },
} as const;
