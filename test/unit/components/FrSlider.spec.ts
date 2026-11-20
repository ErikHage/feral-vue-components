import { h } from 'vue';
import { VSlider } from 'vuetify/components';
import { FrSlider, frSliderDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrSlider', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VSlider, marked fr-slider', () => {
    const wrapper = mountWithVuetify(FrSlider);

    expect(wrapper.findAllComponents(VSlider)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-slider', 'fr-slider']));
  });

  it('is compact by default, and the caller can override it', () => {
    const plain = mountWithVuetify(FrSlider);
    const comfortable = mountWithVuetify(FrSlider, { props: { density: 'comfortable' } });

    expect(plain.findComponent(VSlider).props('density')).toBe('compact');
    expect(comfortable.findComponent(VSlider).props('density')).toBe('comfortable');
    expect(frSliderDefaults).toEqual({ density: 'compact' });
  });

  it('holds its value between min and max, and says so to assistive technology', () => {
    const wrapper = mountWithVuetify(FrSlider, { props: { modelValue: 30, min: 10, max: 90 } });

    expect(wrapper.find('[role="slider"]').attributes()).toMatchObject({
      'aria-valuemin': '10',
      'aria-valuemax': '90',
      'aria-valuenow': '30',
    });
  });

  it('reports a new value through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrSlider, {
      props: { modelValue: 30, step: 5 },
      attrs: { 'onUpdate:modelValue': onUpdate },
    });

    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' });

    expect(onUpdate).toHaveBeenLastCalledWith(35);
  });

  it('shows the label prop without a label slot, and draws no label area without either', () => {
    const labelled = mountWithVuetify(FrSlider, { props: { label: 'Spacing' } });
    const bare = mountWithVuetify(FrSlider);

    expect(labelled.find('.v-slider__label').text()).toBe('Spacing');
    expect(bare.find('.v-input__prepend').exists()).toBe(false);
  });

  it('shows the label slot in place of the label prop', () => {
    const wrapper = mountWithVuetify(FrSlider, {
      props: { label: 'Spacing' },
      slots: { label: () => h('em', 'Row spacing') },
    });

    expect(wrapper.find('.v-input__prepend em').text()).toBe('Row spacing');
    expect(wrapper.find('.v-slider__label').exists()).toBe(false);
  });

  it('puts the prepend and append slots either side', () => {
    const wrapper = mountWithVuetify(FrSlider, {
      slots: {
        prepend: () => h('i', { class: 'less' }),
        append: () => h('i', { class: 'more' }),
      },
    });

    expect(wrapper.find('.v-input__prepend .less').exists()).toBe(true);
    expect(wrapper.find('.v-input__append .more').exists()).toBe(true);
  });

  it("shows the thumb's value by default, and the thumb-label slot in its place, given it", () => {
    const plain = mountWithVuetify(FrSlider, {
      props: { modelValue: 40, step: 1, thumbLabel: 'always' },
    });
    const slotted = mountWithVuetify(FrSlider, {
      props: { modelValue: 40, step: 1, thumbLabel: 'always' },
      slots: {
        'thumb-label': ({ modelValue }: { modelValue: number }) => h('b', `${modelValue} cm`),
      },
    });

    expect(plain.find('.v-slider-thumb__label').text()).toBe('40');
    expect(slotted.find('.v-slider-thumb__label b').text()).toBe('40 cm');
  });

  it("shows each tick's label by default, and the tick-label slot in its place, given it", () => {
    const ticks = { 0: 'None', 50: 'Some', 100: 'Lots' };
    const plain = mountWithVuetify(FrSlider, { props: { ticks, showTicks: 'always' } });
    const slotted = mountWithVuetify(FrSlider, {
      props: { ticks, showTicks: 'always' },
      slots: {
        'tick-label': ({ tick, index }: { tick: { label?: string }; index: number }) =>
          h('span', `${index}: ${tick.label}`),
      },
    });

    expect(plain.findAll('.v-slider-track__tick-label').map((t) => t.text())).toEqual([
      'None',
      'Some',
      'Lots',
    ]);
    expect(slotted.findAll('.v-slider-track__tick-label').map((t) => t.text())).toEqual([
      '0: None',
      '1: Some',
      '2: Lots',
    ]);
  });

  it('passes VSlider props through', () => {
    const wrapper = mountWithVuetify(FrSlider, {
      props: { color: 'success', disabled: true, direction: 'vertical' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-input--disabled', 'v-input--vertical']),
    );
    expect(wrapper.findComponent(VSlider).props('color')).toBe('success');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrSlider, {
      attrs: { class: 'mt-4', 'data-test': 'spacing' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-slider', 'fr-slider', 'mt-4']));
    expect(wrapper.attributes('data-test')).toBe('spacing');
  });
});
