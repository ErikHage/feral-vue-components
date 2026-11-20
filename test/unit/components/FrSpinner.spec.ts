import { h } from 'vue';
import { VProgressCircular } from 'vuetify/components';
import { FrSpinner } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrSpinner', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VProgressCircular, marked fr-spinner', () => {
    const wrapper = mountWithVuetify(FrSpinner);

    expect(wrapper.findAllComponents(VProgressCircular)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-progress-circular', 'fr-spinner']),
    );
  });

  it('spins without a value, announcing no value to assistive technology', () => {
    const wrapper = mountWithVuetify(FrSpinner);

    expect(wrapper.classes()).toContain('v-progress-circular--indeterminate');
    expect(wrapper.attributes('role')).toBe('progressbar');
    expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
  });

  it('shows a value given through v-model as a ring, not spinning', () => {
    const wrapper = mountWithVuetify(FrSpinner, { props: { modelValue: 40 } });

    expect(wrapper.classes()).not.toContain('v-progress-circular--indeterminate');
    expect(wrapper.attributes('aria-valuenow')).toBe('40');
  });

  it('shows a value given as model-value, as a template writes it, as a ring', () => {
    const wrapper = mountWithVuetify(FrSpinner, { attrs: { 'model-value': 25 } });

    expect(wrapper.classes()).not.toContain('v-progress-circular--indeterminate');
    expect(wrapper.attributes('aria-valuenow')).toBe('25');
  });

  it('spins while its value is null or undefined, and stops once one arrives', async () => {
    const pending = mountWithVuetify(FrSpinner, { props: { modelValue: null as never } });
    const wrapper = mountWithVuetify(FrSpinner, { props: { modelValue: undefined } });

    expect(pending.classes()).toContain('v-progress-circular--indeterminate');
    expect(wrapper.classes()).toContain('v-progress-circular--indeterminate');

    await wrapper.setProps({ modelValue: 60 });

    expect(wrapper.classes()).not.toContain('v-progress-circular--indeterminate');
    expect(wrapper.attributes('aria-valuenow')).toBe('60');
  });

  it("lets the caller's indeterminate win either way", () => {
    const still = mountWithVuetify(FrSpinner, { props: { indeterminate: false } });
    const spinning = mountWithVuetify(FrSpinner, {
      props: { modelValue: 40, indeterminate: 'disable-shrink' },
    });

    expect(still.classes()).not.toContain('v-progress-circular--indeterminate');
    expect(still.attributes('aria-valuenow')).toBe('0');
    expect(spinning.classes()).toEqual(
      expect.arrayContaining([
        'v-progress-circular--indeterminate',
        'v-progress-circular--disable-shrink',
      ]),
    );
  });

  it('shows its default slot in the middle, given the value', () => {
    const wrapper = mountWithVuetify(FrSpinner, {
      props: { modelValue: 40 },
      slots: { default: ({ value }: { value: number }) => h('strong', `${value}%`) },
    });

    expect(wrapper.find('.v-progress-circular__content strong').text()).toBe('40%');
  });

  it('draws no content layer without a slot', () => {
    const wrapper = mountWithVuetify(FrSpinner);

    expect(wrapper.find('.v-progress-circular__content').exists()).toBe(false);
  });

  it('passes VProgressCircular props through', () => {
    const wrapper = mountWithVuetify(FrSpinner, {
      props: { size: 100, width: 10, color: 'green' },
    });

    expect(wrapper.attributes('style')).toContain('width: 100px');
    expect(wrapper.classes()).toContain('text-green');
    expect(wrapper.find('.v-progress-circular__overlay').attributes('stroke-width')).toBeDefined();
    expect(wrapper.findComponent(VProgressCircular).props('width')).toBe(10);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrSpinner, {
      attrs: { class: 'mx-auto', 'data-test': 'loading' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-progress-circular', 'fr-spinner', 'mx-auto']),
    );
    expect(wrapper.attributes('data-test')).toBe('loading');
  });
});
