import { h } from 'vue';
import { VBtn, VIcon } from 'vuetify/components';
import { FrBtn, frBtnDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrBtn', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VBtn, marked fr-btn', () => {
    const wrapper = mountWithVuetify(FrBtn);

    expect(wrapper.findAllComponents(VBtn)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-btn', 'fr-btn']));
  });

  it("applies the feral defaults, keeping Vuetify's elevated variant", () => {
    const btn = mountWithVuetify(FrBtn).findComponent(VBtn);

    expect(btn.props()).toMatchObject({ rounded: 'lg', variant: 'elevated' });
    expect(frBtnDefaults).toEqual({ rounded: 'lg' });
  });

  it.each([
    ['an icon name', 'mdi-sprout'],
    ['bare, as <fr-btn icon>', ''],
    ['true', true],
  ])("keeps an icon button Vuetify's circle, with icon %s", (_, icon) => {
    const btn = mountWithVuetify(FrBtn, { attrs: { icon } }).findComponent(VBtn);

    expect(btn.props('rounded')).toBeUndefined();
    expect(btn.classes()).toContain('v-btn--icon');
  });

  it('rounds a button whose icon is false like any other', () => {
    const btn = mountWithVuetify(FrBtn, { attrs: { icon: false } }).findComponent(VBtn);

    expect(btn.props('rounded')).toBe('lg');
  });

  it('lets the caller round an icon button too', () => {
    const btn = mountWithVuetify(FrBtn, {
      attrs: { icon: 'mdi-sprout', rounded: 'lg' },
    }).findComponent(VBtn);

    expect(btn.props('rounded')).toBe('lg');
  });

  it('lets the caller override rounded', () => {
    const btn = mountWithVuetify(FrBtn, { props: { rounded: 0 } }).findComponent(VBtn);

    expect(btn.props('rounded')).toBe(0);
  });

  it('shows the text prop without a default slot', () => {
    const wrapper = mountWithVuetify(FrBtn, { props: { text: 'Save' } });

    expect(wrapper.find('.v-btn__content').text()).toBe('Save');
  });

  it('shows the icon prop without a default slot', () => {
    const wrapper = mountWithVuetify(FrBtn, { props: { icon: 'mdi-sprout' } });

    expect(wrapper.find('.v-btn__content').findComponent(VIcon).exists()).toBe(true);
  });

  it('shows the default slot in place of the text', () => {
    const wrapper = mountWithVuetify(FrBtn, {
      props: { text: 'Prop' },
      slots: { default: () => h('b', { class: 'label' }, 'Save') },
    });

    expect(wrapper.find('.v-btn__content .label').text()).toBe('Save');
    expect(wrapper.text()).not.toContain('Prop');
  });

  it.each(['prepend', 'append'] as const)('shows the %s icon prop without the slot', (side) => {
    const wrapper = mountWithVuetify(FrBtn, { props: { [`${side}Icon`]: 'mdi-sprout' } });

    expect(wrapper.find(`.v-btn__${side} .mdi-sprout`).exists()).toBe(true);
  });

  it.each(['prepend', 'append'] as const)('shows the %s slot in place of its icon', (side) => {
    const wrapper = mountWithVuetify(FrBtn, {
      props: { [`${side}Icon`]: 'mdi-sprout', text: 'Save' },
      slots: { [side]: () => h('span', { class: 'mark' }, '*') },
    });

    expect(wrapper.find(`.v-btn__${side} .mark`).text()).toBe('*');
    expect(wrapper.find(`.v-btn__${side} .v-icon`).exists()).toBe(false);
  });

  it('renders no prepend or append area without an icon or slot', () => {
    const wrapper = mountWithVuetify(FrBtn, { props: { text: 'Save' } });

    expect(wrapper.find('.v-btn__prepend').exists()).toBe(false);
    expect(wrapper.find('.v-btn__append').exists()).toBe(false);
  });

  it('passes VBtn props through', () => {
    const wrapper = mountWithVuetify(FrBtn, {
      props: { text: 'Save', color: 'primary', size: 'small', variant: 'text', disabled: true },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'text-primary',
        'v-btn--size-small',
        'v-btn--variant-text',
        'v-btn--disabled',
      ]),
    );
  });

  it('emits click to the caller', async () => {
    const onClick = vi.fn();
    const wrapper = mountWithVuetify(FrBtn, { props: { text: 'Save' }, attrs: { onClick } });

    await wrapper.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrBtn, {
      attrs: { class: 'plot-btn', 'data-test': 'btn', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-btn', 'fr-btn', 'plot-btn']));
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'btn', id: 'plot' });
  });
});
