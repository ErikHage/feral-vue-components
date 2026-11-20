import { h } from 'vue';
import { VProgressLinear } from 'vuetify/components';
import { FrProgressBar } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrProgressBar', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VProgressLinear, marked fr-progress-bar', () => {
    const wrapper = mountWithVuetify(FrProgressBar);

    expect(wrapper.findAllComponents(VProgressLinear)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-progress-linear', 'fr-progress-bar']),
    );
  });

  it('fills to its value, out of max, and says so to assistive technology', () => {
    const wrapper = mountWithVuetify(FrProgressBar, { props: { modelValue: 12, max: 48 } });

    expect(wrapper.attributes()).toMatchObject({
      role: 'progressbar',
      'aria-valuemin': '0',
      'aria-valuemax': '48',
      'aria-valuenow': '12',
    });
    expect(wrapper.find('.v-progress-linear__determinate').attributes('style')).toContain(
      'width: 25%',
    );
  });

  it('moves without a value when indeterminate', () => {
    const wrapper = mountWithVuetify(FrProgressBar, { props: { indeterminate: true } });

    expect(wrapper.find('.v-progress-linear__indeterminate').exists()).toBe(true);
    expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
  });

  it('shows its default slot over the bar, given the value and buffer as percentages', () => {
    const wrapper = mountWithVuetify(FrProgressBar, {
      props: { modelValue: 12, max: 48, bufferValue: 24, height: 20 },
      slots: {
        default: ({ value, buffer }: { value: number; buffer: number }) =>
          h('strong', `${value}% of ${buffer}%`),
      },
    });

    expect(wrapper.find('.v-progress-linear__content strong').text()).toBe('25% of 50%');
  });

  it('draws no content layer without a slot', () => {
    const wrapper = mountWithVuetify(FrProgressBar, { props: { modelValue: 40 } });

    expect(wrapper.find('.v-progress-linear__content').exists()).toBe(false);
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const bar = mountWithVuetify(FrProgressBar).findComponent(VProgressLinear);

    expect(bar.props()).toMatchObject({
      color: undefined,
      height: 4,
      max: 100,
      rounded: undefined,
      striped: false,
    });
  });

  it('passes VProgressLinear props through', () => {
    const wrapper = mountWithVuetify(FrProgressBar, {
      props: { modelValue: 40, color: 'success', height: 12, striped: true, rounded: true },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-progress-linear--striped', 'v-progress-linear--rounded']),
    );
    expect(wrapper.attributes('style')).toContain('height: 12px');
    expect(wrapper.find('.v-progress-linear__determinate').classes()).toContain('bg-success');
  });

  it('reports a new value when clicked, if clickable', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrProgressBar, {
      props: { modelValue: 0, clickable: true },
      attrs: { 'onUpdate:modelValue': onUpdate },
    });

    await wrapper.trigger('click');

    expect(onUpdate).toHaveBeenCalledOnce();
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrProgressBar, {
      attrs: { class: 'mb-2', 'data-test': 'harvest' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-progress-linear', 'fr-progress-bar', 'mb-2']),
    );
    expect(wrapper.attributes('data-test')).toBe('harvest');
  });
});
