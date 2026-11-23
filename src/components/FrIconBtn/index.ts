import type { VBtn } from 'vuetify/components/VBtn';
import FrIconBtnComponent from './FrIconBtn.vue';

export { frIconBtnDefaults } from './defaults';

type VBtnProps = InstanceType<typeof VBtn>['$props'];

export interface FrIconBtnOwnProps {
  /** The icon shown, e.g. `mdi-pencil` */
  icon: string;
  /** What the button does, read out in place of the icon: `Edit Tomato` */
  label: string;
}

/**
 * A button showing only an icon: small, text, neutral, and named for screen readers by its
 * required `label`. It accepts VBtn's other props and events; `text` is left out, since the icon is
 * all it shows
 */
export const FrIconBtn = FrIconBtnComponent as unknown as new () => {
  $props: Omit<VBtnProps, 'icon' | 'text'> & FrIconBtnOwnProps;
  $slots: Record<never, never>;
};
