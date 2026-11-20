import { defineComponent, h } from 'vue';
import { VChip, VChipGroup } from 'vuetify/components';
import { FrChip, type FrChipScope } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

describe('FrChip', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VChip, marked fr-chip', () => {
    const wrapper = mountWithVuetify(FrChip);

    expect(wrapper.findAllComponents(VChip)).toHaveLength(1);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-chip', 'fr-chip']));
  });

  it("sets no defaults, so it keeps Vuetify's look", () => {
    const chip = mountWithVuetify(FrChip).findComponent(VChip);

    expect(chip.props()).toMatchObject({ variant: 'tonal', rounded: undefined, size: 'default' });
  });

  it('shows the text prop without a default slot', () => {
    const wrapper = mountWithVuetify(FrChip, { props: { text: 'Tomato' } });

    expect(wrapper.find('.v-chip__content').text()).toBe('Tomato');
  });

  it('shows the default slot in place of the text', () => {
    const wrapper = mountWithVuetify(FrChip, {
      props: { text: 'Prop' },
      slots: { default: () => h('b', { class: 'name' }, 'Tomato') },
    });

    expect(wrapper.find('.v-chip__content .name').text()).toBe('Tomato');
    expect(wrapper.text()).not.toContain('Prop');
  });

  it("passes the chip's selection state to the default slot inside a chip group", async () => {
    const Host = defineComponent({
      render: () =>
        h(VChipGroup, { modelValue: 'a' }, () => [
          h(
            FrChip,
            { value: 'a' },
            {
              default: (scope: FrChipScope) => h('span', { class: 'a' }, String(scope.isSelected)),
            },
          ),
          h(
            FrChip,
            { value: 'b' },
            {
              default: (scope: FrChipScope) => h('span', { class: 'b' }, String(scope.isSelected)),
            },
          ),
        ]),
    });
    const wrapper = mountWithVuetify(Host);

    expect(wrapper.find('.a').text()).toBe('true');
    expect(wrapper.find('.b').text()).toBe('false');
  });

  it.each(['prepend', 'append'] as const)('shows the %s icon prop without the slot', (side) => {
    const wrapper = mountWithVuetify(FrChip, {
      props: { [`${side}Icon`]: 'mdi-sprout', text: 'Tomato' },
    });

    expect(wrapper.find(`.v-chip__${side} .mdi-sprout`).exists()).toBe(true);
  });

  it.each(['prepend', 'append'] as const)('shows the %s slot in place of its icon', (side) => {
    const wrapper = mountWithVuetify(FrChip, {
      props: { [`${side}Icon`]: 'mdi-sprout', text: 'Tomato' },
      slots: { [side]: () => h('span', { class: 'mark' }, '*') },
    });

    expect(wrapper.find(`.v-chip__${side} .mark`).text()).toBe('*');
    expect(wrapper.find(`.v-chip__${side} .v-icon`).exists()).toBe(false);
  });

  it('renders no prepend or append area without an icon or slot', () => {
    const wrapper = mountWithVuetify(FrChip, { props: { text: 'Tomato' } });

    expect(wrapper.find('.v-chip__prepend').exists()).toBe(false);
    expect(wrapper.find('.v-chip__append').exists()).toBe(false);
  });

  it('passes VChip props through, closing through v-model', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrChip, {
      props: {
        text: 'Tomato',
        color: 'primary',
        size: 'small',
        variant: 'outlined',
        closable: true,
      },
      attrs: { 'onUpdate:modelValue': onUpdate },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['text-primary', 'v-chip--size-small', 'v-chip--variant-outlined']),
    );
    await wrapper.find('.v-chip__close').trigger('click');
    expect(onUpdate).toHaveBeenLastCalledWith(false);
  });

  it('emits click to the caller', async () => {
    const onClick = vi.fn();
    const wrapper = mountWithVuetify(FrChip, { props: { text: 'Tomato' }, attrs: { onClick } });

    await wrapper.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrChip, {
      attrs: { class: 'plot-chip', 'data-test': 'chip', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['v-chip', 'fr-chip', 'plot-chip']));
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'chip', id: 'plot' });
  });
});
