import { h, nextTick } from 'vue';
import { VBtn, VDialog } from 'vuetify/components';
import { FrBtn, FrDialog, frDialogWidths } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

/** The dialog renders in an overlay Vuetify moves to document.body, so mount there and read it */
async function mountOpen(
  props: Record<string, unknown> = {},
  slots: Record<string, unknown> = {},
  attrs: Record<string, unknown> = {},
) {
  const wrapper = mountWithVuetify(FrDialog, {
    props: { modelValue: true, ...props } as never,
    slots: slots as never,
    attrs,
    attachTo: document.body,
  });
  await nextTick();
  return wrapper;
}

const card = () => document.querySelector('.v-overlay-container .v-card');
const overlay = () => document.querySelector('.v-overlay-container .v-dialog');

describe('FrDialog', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  it('renders one VDialog, marked fr-dialog, holding a card', async () => {
    const wrapper = await mountOpen();

    expect(wrapper.findAllComponents(VDialog)).toHaveLength(1);
    expect(overlay()?.classList).toContain('fr-dialog');
    expect(card()).not.toBeNull();
  });

  it('stays closed without a v-model, until its activator opens it', async () => {
    const wrapper = mountWithVuetify(FrDialog, {
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', { class: 'open', ...props }, 'Open'),
      },
      attachTo: document.body,
    });
    await nextTick();
    expect(card()).toBeNull();

    await wrapper.find('.open').trigger('click');
    await nextTick();

    expect(card()).not.toBeNull();
  });

  it('shows the title and subtitle in the header', async () => {
    await mountOpen({ title: 'Edit planting', subtitle: 'Tomato, bed 3' });

    expect(card()?.querySelector('.v-card-title')?.textContent).toBe('Edit planting');
    expect(card()?.querySelector('.v-card-subtitle')?.textContent).toBe('Tomato, bed 3');
  });

  it('renders no header without a title, subtitle or close button', async () => {
    await mountOpen();

    expect(card()?.querySelector('.v-card-item')).toBeNull();
  });

  it('leaves out whichever of the title and subtitle is missing', async () => {
    await mountOpen({ subtitle: 'Only a subtitle' });

    expect(card()?.querySelector('.v-card-title')).toBeNull();
    expect(card()?.querySelector('.v-card-subtitle')?.textContent).toBe('Only a subtitle');
  });

  it('puts the default slot in the card text', async () => {
    await mountOpen({}, { default: () => h('p', { class: 'body' }, 'Harvest it?') });

    expect(card()?.querySelector('.v-card-text .body')?.textContent).toBe('Harvest it?');
  });

  it('puts the actions slot after a spacer, and has no actions without it', async () => {
    await mountOpen({}, { actions: () => h('button', { class: 'save' }, 'Save') });
    const actions = card()?.querySelector('.v-card-actions');

    expect(actions?.firstElementChild?.classList).toContain('v-spacer');
    expect(actions?.querySelector('.save')?.textContent).toBe('Save');

    document.body.innerHTML = '';
    await mountOpen();
    expect(card()?.querySelector('.v-card-actions')).toBeNull();
  });

  it('has a close FrBtn when closable, which closes it through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = await mountOpen(
      { title: 'Edit', closable: true },
      {},
      { 'onUpdate:modelValue': onUpdate },
    );
    const close = wrapper.findAllComponents(FrBtn).at(0);

    expect(close?.findComponent(VBtn).props('icon')).toBe('$close');
    expect(card()?.querySelector('.v-card-item__append .fr-dialog__close')).not.toBeNull();
    expect(close?.attributes('aria-label')).toBe('Close');

    await close?.trigger('click');

    expect(onUpdate).toHaveBeenLastCalledWith(false);
  });

  it('closes itself with the close button when there is no v-model', async () => {
    const wrapper = mountWithVuetify(FrDialog, {
      props: { closable: true },
      slots: {
        activator: ({ props }: { props: Record<string, unknown> }) =>
          h('button', { class: 'open', ...props }, 'Open'),
      },
      attachTo: document.body,
    });
    await wrapper.find('.open').trigger('click');
    await nextTick();

    await wrapper.findComponent(FrBtn).trigger('click');
    await nextTick();

    expect(wrapper.findComponent(VDialog).props('modelValue')).toBe(false);
  });

  it('shows a header for a close button alone', async () => {
    await mountOpen({ closable: true });

    expect(card()?.querySelector('.v-card-item .fr-dialog__close')).not.toBeNull();
  });

  it('puts dividers under the header and above the actions', async () => {
    await mountOpen({ title: 'Edit', dividers: true }, { actions: () => h('button', 'Save') });
    const children = [...(card()?.children ?? [])].map((el) => el.classList[0]);

    expect(children.filter((c) => c !== 'v-card__loader' && c !== 'v-card__underlay')).toEqual([
      'v-card-item',
      'v-divider',
      'v-card-text',
      'v-divider',
      'v-card-actions',
    ]);
  });

  it('puts no divider where there is no header or no actions', async () => {
    await mountOpen({ dividers: true });

    expect(card()?.querySelector('.v-divider')).toBeNull();
  });

  it.each([
    ['small', 500],
    ['medium', 600],
    ['large', 800],
  ] as const)('caps a %s dialog at %ipx', async (size, width) => {
    const wrapper = await mountOpen({ size });

    expect(wrapper.findComponent(VDialog).props('maxWidth')).toBe(width);
    expect(frDialogWidths[size]).toBe(width);
  });

  it('is small by default, and max-width overrides the size', async () => {
    const plain = await mountOpen();
    expect(plain.findComponent(VDialog).props('maxWidth')).toBe(500);

    document.body.innerHTML = '';
    const wide = await mountOpen({ size: 'large', maxWidth: '50vw' });
    expect(wide.findComponent(VDialog).props('maxWidth')).toBe('50vw');
  });

  it('passes persistent and scrollable to the dialog, off by default', async () => {
    const plain = await mountOpen();
    expect(plain.findComponent(VDialog).props()).toMatchObject({
      persistent: false,
      scrollable: false,
    });

    document.body.innerHTML = '';
    const set = await mountOpen({ persistent: true, scrollable: true });
    expect(set.findComponent(VDialog).props()).toMatchObject({
      persistent: true,
      scrollable: true,
    });
  });

  it('sets its id on the card', async () => {
    await mountOpen({ id: 'edit-planting' });

    expect(card()?.id).toBe('edit-planting');
  });

  it('passes other VDialog props through', async () => {
    const wrapper = await mountOpen({}, {}, { fullscreen: true });

    expect(wrapper.findComponent(VDialog).props('fullscreen')).toBe(true);
    expect(overlay()?.classList).toContain('v-dialog--fullscreen');
  });
});
