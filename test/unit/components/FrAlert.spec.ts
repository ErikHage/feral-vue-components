import { h } from 'vue';
import { VAlert, VAlertTitle } from 'vuetify/components';
import { FrAlert, frAlertDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrAlert', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VAlert, marked fr-alert', () => {
    const wrapper = mountWithVuetify(FrAlert);

    expect(wrapper.findAllComponents(VAlert)).toHaveLength(1);
    expect(wrapper.find('.v-alert').classes()).toContain('fr-alert');
  });

  it('applies the feral defaults', () => {
    const alert = mountWithVuetify(FrAlert).findComponent(VAlert);

    expect(alert.props()).toMatchObject({ variant: 'tonal', density: 'compact', rounded: 'lg' });
    expect(frAlertDefaults).toEqual({ variant: 'tonal', density: 'compact', rounded: 'lg' });
  });

  it.each([
    ['variant', 'outlined'],
    ['density', 'default'],
    ['rounded', 0],
  ] as const)('lets the caller override %s', (prop, value) => {
    const alert = mountWithVuetify(FrAlert, { props: { [prop]: value } }).findComponent(VAlert);

    expect(alert.props(prop)).toBe(value);
  });

  it('renders the title and text props once each', () => {
    const wrapper = mountWithVuetify(FrAlert, {
      props: { title: 'Frost tonight', text: 'Cover the seedlings.' },
    });

    expect(wrapper.findAllComponents(VAlertTitle)).toHaveLength(1);
    expect(wrapper.find('.v-alert-title').text()).toBe('Frost tonight');
    expect(wrapper.find('.v-alert__content').text()).toBe('Frost tonightCover the seedlings.');
  });

  it('renders no title without a title prop or slot', () => {
    const wrapper = mountWithVuetify(FrAlert, { props: { text: 'Cover the seedlings.' } });

    expect(wrapper.findComponent(VAlertTitle).exists()).toBe(false);
  });

  it('prefers the title and default slots over the props', () => {
    const wrapper = mountWithVuetify(FrAlert, {
      props: { title: 'Prop title', text: 'Prop text' },
      slots: {
        title: () => h('b', { class: 'slot-title' }, 'Slot title'),
        default: () => h('p', { class: 'slot-body' }, 'Slot body'),
      },
    });

    expect(wrapper.find('.v-alert-title .slot-title').text()).toBe('Slot title');
    expect(wrapper.find('.v-alert__content .slot-body').text()).toBe('Slot body');
    expect(wrapper.text()).not.toContain('Prop');
  });

  it('puts the append slot beside the message, before the close button', () => {
    const wrapper = mountWithVuetify(FrAlert, {
      props: { text: 'Frost', closable: true },
      slots: { append: () => h('button', { class: 'undo' }, 'Undo') },
    });
    const alert = wrapper.find('.v-alert').element;
    const append = alert.querySelector('.v-alert__append');

    expect(append?.querySelector('.undo')?.textContent).toBe('Undo');
    expect(append?.nextElementSibling?.classList).toContain('v-alert__close');
  });

  it('renders no append area without the append slot', () => {
    const wrapper = mountWithVuetify(FrAlert, { props: { text: 'Frost' } });

    expect(wrapper.find('.v-alert__append').exists()).toBe(false);
  });

  it('passes VAlert props through', () => {
    const wrapper = mountWithVuetify(FrAlert, {
      props: { type: 'warning', closable: true, text: 'Frost' },
    });

    expect(wrapper.find('.v-alert').classes()).toContain('text-warning');
    expect(wrapper.find('.v-alert__prepend .v-icon').exists()).toBe(true);
    expect(wrapper.find('.v-alert__close').exists()).toBe(true);
  });

  it('closes through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrAlert, {
      props: { closable: true, text: 'Frost' },
      attrs: { 'onUpdate:modelValue': onUpdate },
    });

    await wrapper.find('.v-alert__close button').trigger('click');

    expect(onUpdate).toHaveBeenLastCalledWith(false);
  });

  it('passes through attributes and classes', () => {
    // VAlert's root is a transition. Test Utils stubs those, and the stub would keep the
    // attributes; a real Transition hands them on to the alert, so this test uses the real one
    const wrapper = mountWithVuetify(FrAlert, {
      attrs: { class: 'plot-alert', 'data-test': 'alert', id: 'plot' },
      global: { stubs: { transition: false } },
    });
    const alert = wrapper.find('.v-alert');

    expect(alert.classes()).toEqual(expect.arrayContaining(['fr-alert', 'plot-alert']));
    expect(alert.attributes()).toMatchObject({ 'data-test': 'alert', id: 'plot' });
  });
});
