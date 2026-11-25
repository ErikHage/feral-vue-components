import { shallowRef } from 'vue';
import { vuetifyColor } from './colors';

/** A button on a toast. Pressing it runs `onClick`, then dismisses the toast */
export interface FrToastAction {
  label: string;
  onClick: () => void;
}

export interface FrToastOptions {
  /** A tone (primary, success, info, warning, danger, neutral) or any Vuetify colour */
  color?: string;
  /** A button on the toast, such as Undo. A toast with one stays until it is dismissed */
  action?: FrToastAction;
  /** How long it shows, in milliseconds; -1 keeps it until it is dismissed */
  timeout?: number;
}

/** The key a toast carries its action under: a symbol, so it never reaches the snackbar as an attribute */
const ACTION = Symbol('FrToastAction');

/** A message on the app's queue, as FrSnackbarQueue shows it */
export interface FrToast {
  text: string;
  color?: string;
  timeout: number;
  [ACTION]?: FrToastAction;
}

const DEFAULT_TIMEOUT = 5000;

/** The app's one queue of toasts, shown by an FrSnackbarQueue that has no v-model of its own */
const queue = shallowRef<unknown[]>([]);

function show(
  text: string,
  { color, action, timeout = action ? -1 : DEFAULT_TIMEOUT }: FrToastOptions = {},
): void {
  const toast: FrToast = { text, color: vuetifyColor(color), timeout };
  if (action) {
    toast[ACTION] = action;
  }
  queue.value = [...queue.value, toast];
}

/**
 * The toast's action, if it has one. VSnackbarQueue hands its slots a copy of each message, which
 * keeps the symbol-keyed action, so this works on what a slot is given
 */
export function toastAction(toast: unknown): FrToastAction | undefined {
  return typeof toast === 'object' && toast !== null
    ? (toast as { [ACTION]?: FrToastAction })[ACTION]
    : undefined;
}

/**
 * Puts toasts on the app's queue, for the app's FrSnackbarQueue (one with no v-model) to show:
 * `show(text, options)`, or `success`, `info`, `warning` and `danger` for those colours
 */
export function useToast() {
  const toned = (color: string) => (text: string, options?: Omit<FrToastOptions, 'color'>) =>
    show(text, { ...options, color });
  return {
    show,
    success: toned('success'),
    info: toned('info'),
    warning: toned('warning'),
    danger: toned('danger'),
  };
}

/** The app's queue itself, for FrSnackbarQueue */
export function toastQueue() {
  return queue;
}
