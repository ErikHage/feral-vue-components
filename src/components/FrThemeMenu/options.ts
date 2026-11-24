/** A theme the user can pick: `system` follows the device's light or dark preference */
export type FrThemeMenuValue = 'light' | 'dark' | 'system';

export interface FrThemeMenuOption {
  value: FrThemeMenuValue;
  title: string;
  icon: string;
}

/** FrThemeMenu's choices, in the order it lists them */
export const frThemeMenuOptions: readonly FrThemeMenuOption[] = [
  { value: 'light', title: 'Light', icon: 'mdi-white-balance-sunny' },
  { value: 'dark', title: 'Dark', icon: 'mdi-moon-waning-crescent' },
  { value: 'system', title: 'System', icon: 'mdi-monitor' },
];
