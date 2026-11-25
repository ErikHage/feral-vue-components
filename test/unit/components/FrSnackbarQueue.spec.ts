import { flushPromises } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { VSnackbar, VSnackbarQueue } from 'vuetify/components';
import { FrSnackbarQueue, frSnackbarQueueDefaults } from '../../../src';
import { useToast } from '../../../src';
import { toastQueue } from '../../../src/utils/toast';
import { mountWithVuetify } from '../helpers/mount';

type Message = string | { text: string; [prop: string]: unknown };

/**
 * A queue whose v-model a parent holds, as a page would, mounted empty and then given the
 * messages: VSnackbarQueue picks messages up when the array's length changes, not at mount.
 * Snackbars render in an overlay on body
 */
async function mountQueue(
  messages: Message[],
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
  attrs: Record<string, unknown> = {},
) {
  let wrapper: ReturnType<typeof mountWithVuetify> | undefined = undefined;
  wrapper = mountWithVuetify(
    FrSnackbarQueue as never,
    {
      props: {
        modelValue: [],
        'onUpdate:modelValue': (value: Message[]) =>
          wrapper?.setProps({ modelValue: value } as never),
        ...props,
      },
      slots,
      attrs,
      attachTo: document.body,
    } as never,
  );
  await wrapper.setProps({ modelValue: messages } as never);
  await settle();
  return wrapper;
}

async function settle() {
  await flushPromises();
  await nextTick();
}

const shown = () =>
  [
    ...document.querySelectorAll('.v-overlay-container .v-snackbar--active .v-snackbar__content'),
  ].map((content) => content.textContent?.trim());
const snackbar = () => document.querySelector('.v-overlay-container .v-snackbar')!;

describe('FrSnackbarQueue', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  it('renders exactly one VSnackbarQueue, showing a message as a snackbar', async () => {
    const wrapper = await mountQueue(['Saved']);

    expect(wrapper.findAllComponents(VSnackbarQueue)).toHaveLength(1);
    expect(wrapper.findAllComponents(VSnackbar)).toHaveLength(1);
    expect(shown()).toEqual(['Saved']);
  });

  it('takes the messages off v-model as it queues them', async () => {
    const onUpdate = vi.fn();
    await mountQueue(['Saved'], { 'onUpdate:modelValue': onUpdate });

    expect(onUpdate).toHaveBeenCalledWith([]);
  });

  it('is rounded and dismissable by default', async () => {
    await mountQueue(['Saved']);

    expect(snackbar().querySelector('.v-snackbar__wrapper')!.classList).toContain('rounded-lg');
    expect(snackbar().querySelector('.v-snackbar__actions .v-btn')!.textContent).toBe('Dismiss');
    expect(frSnackbarQueueDefaults).toEqual({ rounded: 'lg', closable: true });
  });

  it('lets the caller override the defaults, and a message override the caller', async () => {
    await mountQueue([{ text: 'Frost tonight', rounded: 'xl', color: 'warning' }], {
      rounded: 0,
      closable: false,
      color: 'success',
    });
    await settle();
    const wrapper = snackbar().querySelector('.v-snackbar__wrapper')!;

    expect(wrapper.classList).toContain('rounded-xl');
    expect(wrapper.classList).toContain('bg-warning');
    expect(snackbar().querySelector('.v-snackbar__actions')).toBeNull();
  });

  it('shows one message at a time, dismissing it with the dismiss button', async () => {
    const onDismiss = vi.fn();
    await mountQueue([{ text: 'Saved', onDismiss }, 'Synced']);

    expect(shown()).toEqual(['Saved']);

    (snackbar().querySelector('.v-snackbar__actions .v-btn') as HTMLElement).click();
    await settle();

    expect(onDismiss).toHaveBeenCalledWith('dismissed');
  });

  it('gives the text and header slots the message, in place of its text', async () => {
    await mountQueue(
      [{ text: 'Saved', title: 'Tomato' }],
      {},
      {
        text: ({ item }: { item: { text: string } }) => h('em', `${item.text}!`),
        header: ({ item }: { item: { title: string } }) => h('strong', item.title),
      },
    );

    expect(snackbar().querySelector('.v-snackbar__content em')!.textContent).toBe('Saved!');
    expect(snackbar().querySelector('strong')!.textContent).toBe('Tomato');
  });

  it('puts the actions slot in place of the dismiss button, given props that dismiss', async () => {
    const onDismiss = vi.fn();
    await mountQueue(
      [{ text: 'Deleted', onDismiss }],
      {},
      {
        actions: ({ props }: { props: { onClick: () => void } }) =>
          h('button', { class: 'undo', ...props }, 'Undo'),
      },
    );

    expect(snackbar().querySelector('.v-snackbar__actions')!.textContent).toBe('Undo');
    (snackbar().querySelector('.undo') as HTMLElement).click();
    await settle();

    expect(onDismiss).toHaveBeenCalledWith('dismissed');
  });

  it('draws no actions without closable or an actions slot', async () => {
    await mountQueue(['Saved'], { closable: false });

    expect(snackbar().querySelector('.v-snackbar__actions')).toBeNull();
  });

  it('replaces the whole snackbar with the item slot, given the message', async () => {
    const wrapper = await mountQueue(
      ['Saved'],
      {},
      {
        item: ({ item }: { item: { text: string } }) =>
          h('div', { class: 'own' }, `Own: ${item.text}`),
      },
    );

    expect(wrapper.findAllComponents(VSnackbar)).toHaveLength(0);
    expect(document.querySelector('.own')!.textContent).toBe('Own: Saved');
  });

  it('dismisses every snackbar, shown and waiting, with clear() on its ref', async () => {
    const onUpdate = vi.fn();
    const onDismiss = vi.fn();
    const wrapper = await mountQueue([{ text: 'Saved', onDismiss }, 'Synced', 'Done'], {
      'onUpdate:modelValue': onUpdate,
    });

    (wrapper.vm as unknown as { clear: () => void }).clear();
    await settle();

    expect(onUpdate).toHaveBeenLastCalledWith([]);
    // It dismisses them one by one, 100ms apart, on timers
    await vi.waitFor(() => expect(onDismiss).toHaveBeenCalledWith('cleared'));
  });

  it('passes attributes through onto each snackbar', async () => {
    await mountQueue(['Saved'], { timeout: 2000, location: 'top' }, {}, { 'data-test': 'notices' });

    expect(snackbar().getAttribute('data-test')).toBe('notices');
    expect(snackbar().classList).toContain('v-snackbar--top');
  });

  it("styles the snackbars through content-class or a message's class, not its own class", async () => {
    await mountQueue(
      [{ text: 'Saved', class: 'saved' }],
      { contentClass: 'notice' },
      {},
      {
        class: 'lost',
      },
    );

    expect(snackbar().classList).toContain('saved');
    expect(snackbar().querySelector('.v-snackbar__wrapper')!.classList).toContain('notice');
    expect(document.querySelector('.lost')).toBeNull();
  });
});

describe("FrSnackbarQueue without v-model, showing the app's toasts", () => {
  let warn: ReturnType<typeof vi.spyOn>;
  /** Every queue mounted, unmounted after each test: a queue left mounted would take the next test's toasts */
  let mounted: ReturnType<typeof mountWithVuetify>[] = [];

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
    toastQueue().value = [];
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    mounted.forEach((wrapper) => wrapper.unmount());
    mounted = [];
    document.body.innerHTML = '';
  });

  function mountShared(props: Record<string, unknown> = {}, slots: Record<string, unknown> = {}) {
    const wrapper = mountWithVuetify(
      FrSnackbarQueue as never,
      {
        props,
        slots,
        attachTo: document.body,
      } as never,
    );
    mounted.push(wrapper);
    return wrapper;
  }

  const alert = () => document.querySelector('.fr-snackbar-queue__alert')!;
  const buttons = () =>
    [...snackbar().querySelectorAll('.v-snackbar__actions .v-btn')].map((button) =>
      button.textContent?.trim(),
    );

  it('shows a toast put on the queue with useToast, in its colour', async () => {
    mountShared();
    useToast().success('Saved');
    await settle();

    expect(shown()).toEqual(['Saved']);
    expect(snackbar().querySelector('.v-snackbar__wrapper')!.classList).toContain('bg-success');
    expect(buttons()).toEqual(['Dismiss']);
    expect(snackbar().querySelector('.v-snackbar__content span')!.hasAttribute('aria-hidden')).toBe(
      false,
    );
    expect(alert().textContent).toBe('');
    expect(toastQueue().value).toEqual([]);
  });

  it('shows the toasts put on the queue before it mounted', async () => {
    useToast().info('Synced');
    useToast().warning('Frost tonight');
    mountShared();
    await settle();

    expect(shown()).toEqual(['Synced']);
    expect(toastQueue().value).toHaveLength(1);
  });

  it('draws a danger toast in the error colour, read out as an alert instead of its text', async () => {
    mountShared();
    useToast().danger('Could not save');
    await settle();

    expect(snackbar().querySelector('.v-snackbar__wrapper')!.classList).toContain('bg-error');
    expect(snackbar().querySelector('.v-snackbar__content span')!.getAttribute('aria-hidden')).toBe(
      'true',
    );
    expect(alert().getAttribute('role')).toBe('alert');
    expect(alert().textContent).toBe('Could not save');
  });

  it('reads out a danger toast put on the queue before it mounted', async () => {
    useToast().danger('Offline');
    mountShared();
    await settle();

    expect(shown()).toEqual(['Offline']);
    expect(alert().textContent).toBe('Offline');
  });

  it('reads out each danger toast as it is shown, not while it waits', async () => {
    const wrapper = mountShared();
    useToast().danger('Could not save');
    useToast().danger('Could not sync');
    await settle();

    expect(alert().textContent).toBe('Could not save');

    (snackbar().querySelector('.fr-snackbar-queue__close') as HTMLElement).click();
    await settle();
    // Test utils stub the leave transition, so the snackbar is told it has gone
    wrapper.findComponent(VSnackbar).vm.$emit('afterLeave');
    await settle();

    expect(shown()).toEqual(['Could not sync']);
    expect(alert().textContent).toBe('Could not sync');
  });

  it("puts a toast's action before the dismiss button, running it and dismissing the toast", async () => {
    const onClick = vi.fn();
    mountShared();
    useToast().show('Deleted the basil', { action: { label: 'Undo', onClick } });
    await settle();

    expect(buttons()).toEqual(['Undo', 'Dismiss']);

    (snackbar().querySelector('.fr-snackbar-queue__action') as HTMLElement).click();
    await settle();

    expect(onClick).toHaveBeenCalledOnce();
    expect(document.querySelector('.v-snackbar--active')).toBeNull();
  });

  it('leaves out the dismiss button when closable is false, keeping the action', async () => {
    mountShared({ closable: false });
    useToast().show('Deleted the basil', { action: { label: 'Undo', onClick: () => {} } });
    await settle();

    expect(buttons()).toEqual(['Undo']);
  });

  it("gives the caller's actions slot the toast in place of its buttons", async () => {
    mountShared(
      {},
      { actions: ({ item }: { item: { text: string } }) => h('span', { class: 'own' }, item.text) },
    );
    useToast().show('Deleted', { action: { label: 'Undo', onClick: () => {} } });
    await settle();

    expect(snackbar().querySelector('.v-snackbar__actions')!.textContent).toBe('Deleted');
  });

  it('reads out none of the toasts clear() takes off the queue unshown', async () => {
    const wrapper = mountShared();
    useToast().info('Saved');
    useToast().danger('Could not sync');
    await settle();

    (wrapper.vm as unknown as { clear: () => void }).clear();
    await settle();

    expect(toastQueue().value).toEqual([]);
    expect(alert().textContent).toBe('');
  });
});
