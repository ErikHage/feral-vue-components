import { h } from 'vue';
import { VCheckbox } from 'vuetify/components';
import { FrCheckbox, frCheckboxDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrCheckbox', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VCheckbox, marked fr-checkbox', () => {
    const wrapper = mountWithVuetify(FrCheckbox);

    expect(wrapper.findAllComponents(VCheckbox)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-checkbox', 'fr-checkbox']));
  });

  it('applies the feral defaults', () => {
    const checkbox = mountWithVuetify(FrCheckbox).findComponent(VCheckbox);

    expect(checkbox.props('density')).toBe('compact');
    expect(frCheckboxDefaults).toEqual({ density: 'compact' });
  });

  it('lets the caller override density', () => {
    const checkbox = mountWithVuetify(FrCheckbox, { props: { density: 'comfortable' } });

    expect(checkbox.findComponent(VCheckbox).props('density')).toBe('comfortable');
  });

  it('shows the label prop without a label slot', () => {
    const wrapper = mountWithVuetify(FrCheckbox, { props: { label: 'Climbing' } });

    expect(wrapper.find('label').text()).toBe('Climbing');
  });

  it('shows the label slot in place of the label prop, inside the label element', () => {
    const wrapper = mountWithVuetify(FrCheckbox, {
      props: { label: 'Prop' },
      slots: { label: () => h('a', { class: 'terms', href: '#terms' }, 'the terms') },
    });
    const label = wrapper.find('label');

    expect(label.find('.terms').text()).toBe('the terms');
    expect(label.attributes('for')).toBe(wrapper.find('input').attributes('id'));
    expect(wrapper.text()).not.toContain('Prop');
  });

  it('toggles through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrCheckbox, {
      props: { modelValue: false, label: 'Climbing' },
      attrs: { 'onUpdate:modelValue': onUpdate },
    });

    await wrapper.find('input').setValue(true);

    expect(onUpdate).toHaveBeenLastCalledWith(true);
  });

  it('adds its value to an array model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrCheckbox, {
      props: { modelValue: [1], value: 3 },
      attrs: { 'onUpdate:modelValue': onUpdate },
    });

    await wrapper.find('input').setValue(true);

    expect(onUpdate).toHaveBeenLastCalledWith([1, 3]);
  });

  it('passes VCheckbox props through', () => {
    const wrapper = mountWithVuetify(FrCheckbox, {
      props: { label: 'Climbing', disabled: true, hideDetails: true },
    });

    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    expect(wrapper.find('.v-input__details').exists()).toBe(false);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrCheckbox, {
      attrs: { class: 'plot-check', 'data-test': 'check' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-checkbox', 'fr-checkbox', 'plot-check']),
    );
    expect(wrapper.attributes('data-test')).toBe('check');
  });
});
