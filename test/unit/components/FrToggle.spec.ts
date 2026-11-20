import { h } from 'vue';
import { VSwitch } from 'vuetify/components';
import { FrToggle, frToggleDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrToggle', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VSwitch, marked fr-toggle', () => {
    const wrapper = mountWithVuetify(FrToggle);

    expect(wrapper.findAllComponents(VSwitch)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-switch', 'fr-toggle']));
  });

  it('is compact by default, and the caller can override it', () => {
    const plain = mountWithVuetify(FrToggle);
    const comfortable = mountWithVuetify(FrToggle, { props: { density: 'comfortable' } });

    expect(plain.findComponent(VSwitch).props('density')).toBe('compact');
    expect(comfortable.findComponent(VSwitch).props('density')).toBe('comfortable');
    expect(frToggleDefaults).toEqual({ density: 'compact' });
  });

  it('is a checkbox labelled by its label, and reports a click through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrToggle, {
      props: { modelValue: false, label: 'Edit' },
      attrs: { 'onUpdate:modelValue': onUpdate },
    });
    const input = wrapper.find('input');

    expect(input.attributes()).toMatchObject({ type: 'checkbox', 'aria-label': 'Edit' });

    await input.setValue(true);

    expect(onUpdate).toHaveBeenLastCalledWith(true);
  });

  it('shows the label prop without a label slot, and the slot in its place', () => {
    const plain = mountWithVuetify(FrToggle, { props: { label: 'Edit' } });
    const slotted = mountWithVuetify(FrToggle, {
      props: { label: 'Edit' },
      slots: { label: () => h('i', { class: 'lock' }) },
    });

    expect(plain.find('label').text()).toBe('Edit');
    expect(slotted.find('label .lock').exists()).toBe(true);
    expect(slotted.find('label').text()).toBe('');
  });

  it('puts the prepend and append slots either side, and draws neither area without them', () => {
    const slotted = mountWithVuetify(FrToggle, {
      slots: {
        prepend: () => h('i', { class: 'off' }),
        append: () => h('i', { class: 'on' }),
      },
    });
    const plain = mountWithVuetify(FrToggle);

    expect(slotted.find('.v-input__prepend .off').exists()).toBe(true);
    expect(slotted.find('.v-input__append .on').exists()).toBe(true);
    expect(plain.find('.v-input__prepend').exists()).toBe(false);
    expect(plain.find('.v-input__append').exists()).toBe(false);
  });

  it("shows the thumb's icon without a thumb slot, and the slot in its place, given the state", () => {
    const plain = mountWithVuetify(FrToggle, {
      props: { trueIcon: 'mdi-check', modelValue: true },
    });
    const slotted = mountWithVuetify(FrToggle, {
      props: { modelValue: true },
      slots: {
        thumb: ({ model }: { model: { value: boolean } }) =>
          h('b', { class: 'state' }, model.value ? 'on' : 'off'),
      },
    });

    expect(plain.find('.v-switch__thumb .mdi-check').exists()).toBe(true);
    expect(slotted.find('.v-switch__thumb .state').text()).toBe('on');
  });

  it('puts the track slots on the track, and draws neither without them', () => {
    const slotted = mountWithVuetify(FrToggle, {
      props: { inset: true },
      slots: { 'track-true': () => h('span', 'ON'), 'track-false': () => h('span', 'OFF') },
    });
    const plain = mountWithVuetify(FrToggle, { props: { inset: true } });

    expect(slotted.find('.v-switch__track-true').text()).toBe('ON');
    expect(slotted.find('.v-switch__track-false').text()).toBe('OFF');
    expect(plain.find('.v-switch__track-true').exists()).toBe(false);
  });

  it('passes VSwitch props through', () => {
    const wrapper = mountWithVuetify(FrToggle, {
      props: { color: 'error', inset: true, disabled: true, hideDetails: true },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-switch--inset', 'v-input--disabled']),
    );
    expect(wrapper.find('.v-input__details').exists()).toBe(false);
    expect(wrapper.findComponent(VSwitch).props('color')).toBe('error');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrToggle, {
      attrs: { class: 'mt-2', 'data-test': 'edit' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-switch', 'fr-toggle', 'mt-2']));
    expect(wrapper.attributes('data-test')).toBe('edit');
  });
});
