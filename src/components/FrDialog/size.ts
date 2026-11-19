/** How wide an FrDialog may grow. `max-width` overrides it */
export type FrDialogSize = 'small' | 'medium' | 'large';

/** The max width of each size: the three widths the feral apps' dialogs use */
export const frDialogWidths = {
  small: 500,
  medium: 600,
  large: 800,
} as const satisfies Record<FrDialogSize, number>;
