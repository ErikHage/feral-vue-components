import FrThemeMenuComponent from './FrThemeMenu.vue';
import type { FrThemeMenuValue } from './options';

export { frThemeMenuOptions, type FrThemeMenuOption, type FrThemeMenuValue } from './options';

export interface FrThemeMenuProps {
  /** The theme picked: `light`, `dark`, or `system` to follow the device */
  modelValue: FrThemeMenuValue;
  'onUpdate:modelValue'?: (value: FrThemeMenuValue) => void;
}

/**
 * A toolbar button showing the picked theme's icon, opening a menu of Light, Dark and System. Bind
 * it with `v-model`; it only reports the pick, and the host applies it. The caller's other
 * attributes (an id, say) go on the button
 */
export const FrThemeMenu = FrThemeMenuComponent as unknown as new () => {
  $props: FrThemeMenuProps & Record<string, unknown>;
  $slots: Record<never, never>;
};
