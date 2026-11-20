import type { VSnackbarQueue } from 'vuetify/components/VSnackbarQueue';

type VSnackbarQueueProps = InstanceType<typeof VSnackbarQueue>['$props'];

/**
 * How every feral snackbar looks unless the caller or the message says otherwise. Rounded as the
 * other feral surfaces are, with a button to dismiss it
 */
export const frSnackbarQueueDefaults = {
  rounded: 'lg',
  closable: true,
} as const satisfies Partial<VSnackbarQueueProps>;
