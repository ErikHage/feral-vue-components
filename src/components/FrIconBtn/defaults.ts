import type { VBtn } from 'vuetify/components/VBtn';

type VBtnProps = InstanceType<typeof VBtn>['$props'];

/**
 * How every feral icon button looks unless the caller says otherwise. Structural only: no
 * behaviour. A small text button, as an edit or delete in a table's row, neutral as FrBtn's icon
 * buttons are
 */
export const frIconBtnDefaults = {
  variant: 'text',
  size: 'small',
} as const satisfies Partial<VBtnProps>;
