import { h, nextTick } from 'vue';
import { VTab, VTabs } from 'vuetify/components';
import { FrTabs, frTabsDefaults, type FrTabsOption, type FrTabsSlotScope } from '../../../src';
import { mountWithVuetify } from '../helpers/mount';

const options: FrTabsOption[] = [
  { title: 'To Start', value: 'planning' },
  { title: 'To Plant', value: 'propagation', prependIcon: 'mdi-sprout' },
  { title: 'Done', value: 'done', disabled: true },
];

describe('FrTabs', () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn');
  });

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('renders exactly one VTabs inside a div marked fr-tabs', () => {
    const wrapper = mountWithVuetify(FrTabs, { props: { options } });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes()).toEqual(['fr-tabs']);
    expect(wrapper.findAllComponents(VTabs)).toHaveLength(1);
  });

  it('builds a tab per option, in order, from objects', () => {
    const wrapper = mountWithVuetify(FrTabs, { props: { options } });
    const tabs = wrapper.findAllComponents(VTab);

    expect(tabs.map((tab) => tab.text())).toEqual(['To Start', 'To Plant', 'Done']);
    expect(tabs.map((tab) => tab.props('value'))).toEqual(['planning', 'propagation', 'done']);
    expect(tabs[1]!.find('.mdi-sprout').exists()).toBe(true);
    expect(tabs[2]!.props('disabled')).toBe(true);
  });

  it('uses a string option as both title and value', () => {
    const wrapper = mountWithVuetify(FrTabs, { props: { options: ['Details', 'History'] } });
    const tabs = wrapper.findAllComponents(VTab);

    expect(tabs.map((tab) => [tab.text(), tab.props('value')])).toEqual([
      ['Details', 'Details'],
      ['History', 'History'],
    ]);
  });

  it('is primary with fixed tabs by default, and the caller can override it', () => {
    const plain = mountWithVuetify(FrTabs, { props: { options } });
    const custom = mountWithVuetify(FrTabs, {
      props: { options, color: 'success', fixedTabs: false, grow: true },
    });

    expect(plain.findComponent(VTabs).props()).toMatchObject({
      color: 'primary',
      fixedTabs: true,
    });
    expect(custom.findComponent(VTabs).props()).toMatchObject({
      color: 'success',
      fixedTabs: false,
      grow: true,
    });
    expect(frTabsDefaults).toEqual({ color: 'primary', fixedTabs: true });
  });

  it('selects the first tab when v-model is empty, and reports it', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrTabs, {
      props: { options },
      attrs: { 'onUpdate:modelValue': onUpdate },
    });
    await nextTick();

    expect(onUpdate).toHaveBeenCalledWith('planning');
    expect(wrapper.findAllComponents(VTab)[0]!.classes()).toContain('v-tab--selected');
  });

  it('selects the tab v-model holds, and reports a clicked tab', async () => {
    const onUpdate = vi.fn();
    const wrapper = mountWithVuetify(FrTabs, {
      props: { options, modelValue: 'propagation' },
      attrs: { 'onUpdate:modelValue': onUpdate },
    });

    expect(wrapper.findAllComponents(VTab)[1]!.classes()).toContain('v-tab--selected');

    await wrapper.findAllComponents(VTab)[0]!.trigger('click');

    expect(onUpdate).toHaveBeenLastCalledWith('planning');
  });

  it('shows the default slot after the tabs, given the selected tab, and follows a click', async () => {
    const wrapper = mountWithVuetify(FrTabs, {
      props: { options: ['Details', 'History'] },
      slots: {
        default: ({ tab }: FrTabsSlotScope) => h('p', { class: 'body' }, `Showing ${tab}`),
      },
    });
    await nextTick();

    const content = wrapper.find('.fr-tabs > .v-tabs + .fr-tabs__content');
    expect(content.find('.body').text()).toBe('Showing Details');

    await wrapper.findAllComponents(VTab)[1]!.trigger('click');

    expect(wrapper.find('.fr-tabs__content .body').text()).toBe('Showing History');
  });

  it('draws no content div without a slot', () => {
    const wrapper = mountWithVuetify(FrTabs, { props: { options } });

    expect(wrapper.find('.fr-tabs__content').exists()).toBe(false);
  });

  it('puts class and style on the div, and every other attribute on the tabs', () => {
    const wrapper = mountWithVuetify(FrTabs, {
      props: { options, bgColor: 'surface-light', alignTabs: 'center' },
      attrs: { class: 'mb-4', style: 'max-width: 600px', 'data-test': 'plan', id: 'plan-tabs' },
    });
    const tabs = wrapper.find('.v-tabs');

    expect(wrapper.classes()).toEqual(['fr-tabs', 'mb-4']);
    expect(wrapper.attributes('style')).toBe('max-width: 600px;');
    expect(wrapper.attributes('data-test')).toBeUndefined();
    expect(tabs.attributes()).toMatchObject({ 'data-test': 'plan', id: 'plan-tabs' });
    expect(tabs.classes()).toEqual(
      expect.arrayContaining(['bg-surface-light', 'v-tabs--align-tabs-center']),
    );
    expect(tabs.classes()).not.toContain('mb-4');
  });
});
