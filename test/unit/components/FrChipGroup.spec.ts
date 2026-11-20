import { h } from 'vue';
import { VChipGroup } from 'vuetify/components';
import { FrChip, FrChipGroup } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const chips = () =>
  ['tomato', 'basil', 'squash'].map((plant) => h(FrChip, { value: plant, text: plant }));

describe('FrChipGroup', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VChipGroup, marked fr-chip-group', () => {
    const wrapper = mountWithVuetify(FrChipGroup);

    expect(wrapper.findAllComponents(VChipGroup)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-chip-group', 'fr-chip-group']));
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const group = mountWithVuetify(FrChipGroup).findComponent(VChipGroup);

    expect(group.props()).toMatchObject({ column: false, filter: false, variant: 'tonal' });
  });

  it('holds its FrChips in its slot', () => {
    const wrapper = mountWithVuetify(FrChipGroup, { slots: { default: chips } });

    expect(wrapper.findAll('.fr-chip').map((chip) => chip.text())).toEqual([
      'tomato',
      'basil',
      'squash',
    ]);
  });

  it('selects through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrChipGroup, {
      props: { modelValue: 'basil' },
      attrs: { 'onUpdate:modelValue': onUpdate },
      slots: { default: chips },
    });

    expect(wrapper.find('.v-chip--selected').text()).toBe('basil');
    await wrapper.findAll('.fr-chip')[2]?.trigger('click');

    expect(onUpdate).toHaveBeenLastCalledWith('squash');
  });

  it('selects several with multiple', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrChipGroup, {
      props: { modelValue: ['basil'], multiple: true },
      attrs: { 'onUpdate:modelValue': onUpdate },
      slots: { default: chips },
    });

    await wrapper.findAll('.fr-chip')[0]?.trigger('click');

    expect(onUpdate).toHaveBeenLastCalledWith(['basil', 'tomato']);
  });

  it('hands color, variant and filter down to its FrChips', () => {
    const wrapper = mountWithVuetify(FrChipGroup, {
      props: { color: 'primary', variant: 'outlined', filter: true, modelValue: 'basil' },
      slots: { default: chips },
    });

    // Vuetify hands these down as defaults, which a chip's props() doesn't show; its classes do
    for (const chip of wrapper.findAll('.fr-chip')) {
      expect(chip.classes()).toContain('v-chip--variant-outlined');
    }
    expect(wrapper.find('.v-chip--selected').classes()).toContain('text-primary');
    expect(wrapper.find('.v-chip--selected .v-chip__filter').exists()).toBe(true);
  });

  it("passes the default slot's scope on", async () => {
    let next: (() => void) | undefined;
    const onUpdate = vi.fn();
    mountWithVuetify(FrChipGroup, {
      props: { modelValue: 'tomato', mandatory: true },
      attrs: { 'onUpdate:modelValue': onUpdate },
      slots: {
        default: (scope: { next: () => void }) => {
          next = scope.next;
          return chips();
        },
      },
    });

    next?.();
    await Promise.resolve();

    expect(onUpdate).toHaveBeenLastCalledWith('basil');
  });

  it('wraps its chips with column', () => {
    const wrapper = mountWithVuetify(FrChipGroup, { props: { column: true } });

    expect(wrapper.classes()).toContain('v-chip-group--column');
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrChipGroup, {
      attrs: { class: 'plot-tags', 'data-test': 'tags', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-chip-group', 'fr-chip-group', 'plot-tags']),
    );
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'tags', id: 'plot' });
  });
});
