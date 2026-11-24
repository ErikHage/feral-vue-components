import FrAppLogoComponent from './FrAppLogo.vue';

export interface FrAppLogoProps {
  /** Its width and height, in pixels: 18 unless given */
  size?: number;
}

/**
 * The Feral logo as an inline svg, near-black on a light theme and white on a dark one. A
 * placeholder rooster until the real logo is drawn. Decorative: it is hidden from screen readers
 */
export const FrAppLogo = FrAppLogoComponent as unknown as new () => {
  $props: FrAppLogoProps;
  $slots: Record<never, never>;
};
