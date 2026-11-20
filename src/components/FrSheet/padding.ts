/** The space inside an FrSheet, around its content */
export type FrSheetPadding = 'default' | 'small' | 'none';

/** The Vuetify spacing class for each padding: 16px, 8px, or none */
export const frSheetPaddingClasses: Record<FrSheetPadding, string | undefined> = {
  default: 'pa-4',
  small: 'pa-2',
  none: undefined,
};
