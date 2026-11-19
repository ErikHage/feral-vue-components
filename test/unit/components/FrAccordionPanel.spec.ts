import { defineComponent, h, type Slots } from 'vue';
import {
  VExpansionPanel,
  VExpansionPanels,
  VExpansionPanelText,
  VExpansionPanelTitle,
} from 'vuetify/components';
import { FrAccordionPanel, type FrAccordionPanelTitleScope } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

/** A panel only works inside a group, so every test mounts one inside VExpansionPanels */
function mountPanel(
  props: Record<string, unknown> = {},
  slots: Record<string, (scope: FrAccordionPanelTitleScope) => unknown> = {},
  groupProps: Record<string, unknown> = {},
) {
  const Host = defineComponent({
    render: () =>
      h(VExpansionPanels, groupProps, () => h(FrAccordionPanel, props, slots as unknown as Slots)),
  });
  return mountWithVuetify(Host);
}

describe('FrAccordionPanel', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders one VExpansionPanel holding one title and one text', () => {
    const wrapper = mountPanel({ title: 'Seeds', text: 'Sow in March' });

    expect(wrapper.findAllComponents(VExpansionPanel)).toHaveLength(1);
    expect(wrapper.findAllComponents(VExpansionPanelTitle)).toHaveLength(1);
    expect(wrapper.findAllComponents(VExpansionPanelText)).toHaveLength(1);
  });

  it('renders the title and text props', () => {
    const wrapper = mountPanel(
      { title: 'Seeds', text: 'Sow in March', value: 'seeds' },
      {},
      {
        modelValue: ['seeds'],
      },
    );

    expect(wrapper.find('.v-expansion-panel-title').text()).toBe('Seeds');
    expect(wrapper.find('.v-expansion-panel-text').text()).toBe('Sow in March');
  });

  it('prefers the title and default slots over the props', () => {
    const wrapper = mountPanel(
      { title: 'Prop title', text: 'Prop text', value: 'p' },
      {
        title: () => h('b', { class: 'slot-title' }, 'Slot title'),
        default: () => h('p', { class: 'slot-body' }, 'Slot body'),
      },
      { modelValue: ['p'] },
    );

    expect(wrapper.find('.v-expansion-panel-title').text()).toBe('Slot title');
    expect(wrapper.find('.slot-body').text()).toBe('Slot body');
    expect(wrapper.text()).not.toContain('Prop');
  });

  it("passes the title's slot props to the title slot", async () => {
    const wrapper = mountPanel(
      {},
      { title: (scope) => h('span', { class: 'state' }, String(scope.expanded)) },
    );

    expect(wrapper.find('.state').text()).toBe('false');
    await wrapper.find('.v-expansion-panel-title').trigger('click');
    expect(wrapper.find('.state').text()).toBe('true');
  });

  it("keeps Vuetify's expand icon when no actions slot is given", () => {
    const wrapper = mountPanel({ title: 'Seeds', expandIcon: 'mdi-plus' });

    expect(wrapper.find('.v-expansion-panel-title__icon .mdi-plus').exists()).toBe(true);
  });

  it('replaces the icon with the actions slot, passing its slot props', () => {
    const wrapper = mountPanel(
      { title: 'Seeds' },
      { actions: (scope) => h('span', { class: 'act' }, String(scope.expanded)) },
    );

    expect(wrapper.find('.v-expansion-panel-title__icon .act').text()).toBe('false');
    expect(wrapper.find('.v-expansion-panel-title__icon .v-icon').exists()).toBe(false);
  });

  it('opens when the group selects its value', () => {
    const wrapper = mountPanel({ title: 'Seeds', value: 'seeds' }, {}, { modelValue: ['seeds'] });

    expect(wrapper.find('.v-expansion-panel').classes()).toContain('v-expansion-panel--active');
  });

  it('passes VExpansionPanel props through', () => {
    const wrapper = mountPanel({ title: 'Seeds', disabled: true, hideActions: true });

    expect(wrapper.findComponent(VExpansionPanel).props('disabled')).toBe(true);
    expect(wrapper.find('.v-expansion-panel').classes()).toContain('v-expansion-panel--disabled');
    expect(wrapper.find('.v-expansion-panel-title__icon').exists()).toBe(false);
  });

  it('passes through attributes and classes', () => {
    const wrapper = mountPanel({ class: 'plot-panel', 'data-test': 'panel', id: 'plot' });
    const panel = wrapper.find('.v-expansion-panel');

    expect(panel.classes()).toContain('plot-panel');
    expect(panel.attributes()).toMatchObject({ 'data-test': 'panel', id: 'plot' });
  });
});
