import { defineComponent, h, nextTick, ref } from 'vue';
import { VFadeTransition } from 'vuetify/components';
import { FrFadeIn } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

// Test Utils stubs transitions, which would hide what FrFadeIn does; these mounts use the real one
const real = { global: { stubs: { transition: false } } };

describe('FrFadeIn', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VFadeTransition around its slot, adding no element of its own', () => {
    const wrapper = mountWithVuetify(FrFadeIn, {
      ...real,
      slots: { default: () => h('p', { class: 'body' }, 'Harvest') },
    });

    expect(wrapper.findAllComponents(VFadeTransition)).toHaveLength(1);
    expect(wrapper.element.tagName).toBe('P');
    expect(wrapper.text()).toBe('Harvest');
  });

  it('fades its content in when it first renders', () => {
    const wrapper = mountWithVuetify(FrFadeIn, {
      ...real,
      slots: { default: () => h('p', 'Harvest') },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['fade-transition-enter-from', 'fade-transition-enter-active']),
    );
  });

  it('lets the caller turn appear off', () => {
    const wrapper = mountWithVuetify(FrFadeIn, {
      ...real,
      attrs: { appear: false },
      slots: { default: () => h('p', 'Harvest') },
    });

    expect(wrapper.classes()).not.toContain('fade-transition-enter-active');
  });

  it('fades content in and out as it toggles', async () => {
    const shown = ref(false);
    // In a <div>, so the wrapper's root stays put while FrFadeIn's content comes and goes
    const Host = defineComponent({
      render: () =>
        h('div', [h(FrFadeIn, () => (shown.value ? h('p', { class: 'body' }, 'Harvest') : null))]),
    });
    const wrapper = mountWithVuetify(Host, real);

    shown.value = true;
    await nextTick();
    expect(wrapper.find('.body').classes()).toContain('fade-transition-enter-active');

    shown.value = false;
    await nextTick();
    expect(wrapper.find('.body').classes()).toContain('fade-transition-leave-active');
  });

  it('passes VFadeTransition props through', () => {
    const wrapper = mountWithVuetify(FrFadeIn, {
      ...real,
      props: { mode: 'out-in', disabled: true },
      slots: { default: () => h('p', 'Harvest') },
    });

    expect(wrapper.findComponent(VFadeTransition).props()).toMatchObject({
      mode: 'out-in',
      disabled: true,
    });
    expect(wrapper.classes()).not.toContain('fade-transition-enter-active');
  });
});
