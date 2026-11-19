import { h } from 'vue';
import { VExpansionPanel, VExpansionPanels } from 'vuetify/components';
import { FrAccordion, FrAccordionPanel, frAccordionDefaults } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const panels = () => [
  h(FrAccordionPanel, { title: 'Seeds', text: 'Sow in March', value: 'seeds' }),
  h(FrAccordionPanel, { title: 'Harvest', text: 'Pick in August', value: 'harvest' }),
];

describe('FrAccordion', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VExpansionPanels', () => {
    const wrapper = mountWithVuetify(FrAccordion);

    expect(wrapper.findAllComponents(VExpansionPanels)).toHaveLength(1);
    expect(wrapper.classes()).toContain('v-expansion-panels');
  });

  it('applies the feral defaults', () => {
    const accordion = mountWithVuetify(FrAccordion).findComponent(VExpansionPanels);

    expect(accordion.props()).toMatchObject({ variant: 'default', elevation: 2, rounded: 'lg' });
    expect(frAccordionDefaults).toEqual({ variant: 'default', elevation: 2, rounded: 'lg' });
  });

  it.each([
    ['variant', 'popout'],
    ['elevation', 0],
    ['rounded', 0],
  ] as const)('lets the caller override %s', (prop, value) => {
    const accordion = mountWithVuetify(FrAccordion, { props: { [prop]: value } }).findComponent(
      VExpansionPanels,
    );

    expect(accordion.props(prop)).toBe(value);
  });

  it.each([
    [undefined, 'elevation-2'],
    [0, 'elevation-0'],
  ])('hands elevation %s down to its FrAccordionPanels', (elevation, expected) => {
    const wrapper = mountWithVuetify(FrAccordion, {
      props: elevation === undefined ? {} : { elevation },
      slots: { default: panels },
    });

    for (const shadow of wrapper.findAll('.v-expansion-panel__shadow')) {
      expect(shadow.classes()).toContain(expected);
    }
    expect(wrapper.findAll('.v-expansion-panel__shadow')).toHaveLength(2);
  });

  it('opens its panels from v-model and emits the change', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrAccordion, {
      props: { modelValue: 'seeds' },
      attrs: { 'onUpdate:modelValue': onUpdate },
      slots: { default: panels },
    });
    const [seeds, harvest] = wrapper.findAllComponents(VExpansionPanel);

    expect(seeds?.classes()).toContain('v-expansion-panel--active');
    await harvest?.find('.v-expansion-panel-title').trigger('click');

    expect(onUpdate).toHaveBeenLastCalledWith('harvest');
  });

  it('opens several panels at once with multiple', async () => {
    const wrapper = mountWithVuetify(FrAccordion, {
      props: { multiple: true },
      slots: { default: panels },
    });

    for (const title of wrapper.findAll('.v-expansion-panel-title')) {
      await title.trigger('click');
    }

    expect(wrapper.findAll('.v-expansion-panel--active')).toHaveLength(2);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountWithVuetify(FrAccordion, {
      attrs: { class: 'plot-accordion', 'data-test': 'accordion', id: 'plot' },
    });

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['v-expansion-panels', 'plot-accordion']),
    );
    expect(wrapper.attributes()).toMatchObject({ 'data-test': 'accordion', id: 'plot' });
  });

  it("forwards the default slot's scoped props", async () => {
    let next: (() => void) | undefined;
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrAccordion, {
      props: { modelValue: 'seeds', mandatory: true },
      attrs: { 'onUpdate:modelValue': onUpdate },
      slots: {
        default: (scope: { next: () => void }) => {
          next = scope.next;
          return panels();
        },
      },
    });

    next?.();
    await wrapper.vm.$nextTick();

    expect(onUpdate).toHaveBeenLastCalledWith('harvest');
  });
});
