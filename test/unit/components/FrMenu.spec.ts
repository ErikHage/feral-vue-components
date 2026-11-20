import { flushPromises } from '@vue/test-utils';
import { h, nextTick, type Ref } from 'vue';
import { VMenu } from 'vuetify/components';
import { FrMenu } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

type ActivatorScope = { isActive: boolean; props: Record<string, unknown> };

/** A menu opened by a button, its content a list of actions. It renders in an overlay on body */
function mountMenu(props: Record<string, unknown> = {}, attrs: Record<string, unknown> = {}) {
  return mountWithVuetify(FrMenu, {
    props: props as never,
    attrs,
    slots: {
      activator: ({ props: activatorProps, isActive }: ActivatorScope) =>
        h('button', { class: 'open', ...activatorProps }, isActive ? 'Close' : 'Actions'),
      default: ({ isActive }: { isActive: Ref<boolean> }) =>
        h('div', { class: 'actions' }, [
          h('button', { class: 'edit' }, 'Edit'),
          h('span', { class: 'state' }, String(isActive.value)),
          h('button', { class: 'dismiss', onClick: () => (isActive.value = false) }, 'Dismiss'),
        ]),
    },
    attachTo: document.body,
  });
}

const content = () => document.querySelector('.v-overlay-container .fr-menu .actions');
const menu = () => document.querySelector('.v-overlay-container .v-menu');

describe('FrMenu', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    document.body.innerHTML = '';
  });

  it('renders exactly one VMenu, marked fr-menu', async () => {
    const wrapper = mountMenu({ modelValue: true });
    await nextTick();

    expect(wrapper.findAllComponents(VMenu)).toHaveLength(1);
    expect(menu()?.classList).toContain('fr-menu');
  });

  it('renders the activator, with the props that open the menu', () => {
    const wrapper = mountMenu();

    expect(wrapper.find('.open').text()).toBe('Actions');
    expect(wrapper.find('.open').attributes('aria-expanded')).toBe('false');
    expect(content()).toBeNull();
  });

  it('opens on a click of its activator, showing the default slot given isActive', async () => {
    const wrapper = mountMenu();

    await wrapper.find('.open').trigger('click');
    await nextTick();

    expect(content()?.querySelector('.state')?.textContent).toBe('true');
    expect(wrapper.find('.open').text()).toBe('Close');
    expect(wrapper.find('.open').attributes('aria-expanded')).toBe('true');
  });

  it('closes when its content is clicked, and reports it through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountMenu({ modelValue: true }, { 'onUpdate:modelValue': onUpdate });
    await nextTick();

    (content()?.querySelector('.edit') as HTMLElement).click();
    await flushPromises();

    expect(onUpdate).toHaveBeenLastCalledWith(false);
    wrapper.unmount();
  });

  it("lets its content close it through the default slot's isActive", async () => {
    const onUpdate = vi.fn();
    const wrapper = mountMenu(
      { modelValue: true, closeOnContentClick: false },
      { 'onUpdate:modelValue': onUpdate },
    );
    await nextTick();

    (content()?.querySelector('.dismiss') as HTMLElement).click();
    await flushPromises();

    expect(onUpdate).toHaveBeenLastCalledWith(false);
    wrapper.unmount();
  });

  it("sets no defaults, so it keeps Vuetify's behaviour", () => {
    const wrapper = mountMenu();

    expect(wrapper.findComponent(VMenu).props()).toMatchObject({
      closeOnContentClick: true,
      openOnHover: false,
      location: undefined,
    });
  });

  it('passes VMenu props through', () => {
    const wrapper = mountMenu({ location: 'end', openOnHover: true, closeOnContentClick: false });

    expect(wrapper.findComponent(VMenu).props()).toMatchObject({
      location: 'end',
      openOnHover: true,
      closeOnContentClick: false,
    });
  });

  it('renders nothing of its own without slots', () => {
    const wrapper = mountWithVuetify(FrMenu, { attachTo: document.body });

    expect(wrapper.findComponent(VMenu).exists()).toBe(true);
    expect(menu()).toBeNull();
  });

  it('passes classes on to the menu', async () => {
    mountMenu({ modelValue: true }, { class: 'plot-actions' });
    await nextTick();

    expect(menu()?.classList).toContain('plot-actions');
  });
});
