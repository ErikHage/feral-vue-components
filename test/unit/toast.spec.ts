import { useToast } from '../../src';
import { toastAction, toastClears, toastQueue, type FrToast } from '../../src/utils/toast';

describe('useToast', () => {
  beforeEach(() => {
    toastQueue().value = [];
  });

  const queued = () => toastQueue().value as FrToast[];

  it('puts a toast on the queue, shown for 5 seconds', () => {
    useToast().show('Saved');

    expect(queued()).toEqual([{ text: 'Saved', color: undefined, timeout: 5000 }]);
    expect(toastAction(queued()[0])).toBeUndefined();
  });

  it.each([
    ['success', 'success'],
    ['info', 'info'],
    ['warning', 'warning'],
    ['danger', 'error'],
  ] as const)("draws a %s toast in Vuetify's %s colour", (tone, color) => {
    useToast()[tone]('Saved');

    expect(queued()[0]!.color).toBe(color);
  });

  it('takes a colour, any Vuetify one, and a timeout', () => {
    useToast().show('Planted', { color: 'teal', timeout: 2000 });
    useToast().show('Weeded', { color: 'neutral' });

    expect(queued()).toEqual([
      { text: 'Planted', color: 'teal', timeout: 2000 },
      { text: 'Weeded', color: undefined, timeout: 5000 },
    ]);
  });

  it('keeps a toast with an action until it is dismissed, unless given a timeout', () => {
    const action = { label: 'Undo', onClick: () => {} };
    useToast().warning('Deleted', { action });
    useToast().show('Moved', { action, timeout: 8000 });

    expect(queued().map((toast) => toast.timeout)).toEqual([-1, 8000]);
    expect(toastAction(queued()[0])).toBe(action);
    // A copy of the toast, as VSnackbarQueue's slots are given, keeps the action
    expect(toastAction({ ...queued()[0] })).toBe(action);
    // The action is keyed by a symbol, so it never reaches the snackbar as an attribute
    expect(Object.keys(queued()[0]!)).toEqual(['text', 'color', 'timeout']);
  });

  it('drops the toasts waiting, and counts the clear for the queue showing one', () => {
    const before = toastClears().value;
    useToast().show('Saved');
    useToast().show('Synced');
    useToast().clear();

    expect(queued()).toEqual([]);
    expect(toastClears().value).toBe(before + 1);
  });

  it('finds no action on a message that is not a toast object', () => {
    expect(toastAction('Saved')).toBeUndefined();
    expect(toastAction(null)).toBeUndefined();
  });

  it('adds to the queue rather than changing it, so watchers see each toast', () => {
    const before = toastQueue().value;
    useToast().show('Saved');

    expect(toastQueue().value).not.toBe(before);
  });
});
