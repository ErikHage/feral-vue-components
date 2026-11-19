import { createApp, defineComponent, h } from 'vue';
import { VCard, VExpansionPanel, VExpansionPanels } from 'vuetify/components';
import { FrAccordion, FrAccordionPanel, FrCard } from '../../src';
import { createComponentsPlugin, FeralComponents } from '../../src/plugin';
import { mountWithVuetify } from './helpers/mount';

describe('createComponentsPlugin', () => {
  it('registers each component globally under its name', () => {
    const Dummy = defineComponent({ render: () => h('i') });
    const app = createApp({ render: () => null });

    app.use(createComponentsPlugin({ FrDummy: Dummy }));

    expect(app.component('FrDummy')).toBe(Dummy);
  });
});

describe('FeralComponents', () => {
  function mountGlobal(template: string) {
    // Only the Fr* components come from the plugin; Vuetify's are declared locally, as in an app
    return mountWithVuetify(defineComponent({ components: { VExpansionPanels }, template }), {
      global: { plugins: [FeralComponents] },
    });
  }

  it('registers FrCard globally, so <fr-card> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-card title="Global" />');

    expect(wrapper.findComponent(VCard).exists()).toBe(true);
    expect(wrapper.find('.v-card-title').text()).toBe('Global');
  });

  it('registers FrAccordionPanel globally, so <fr-accordion-panel> resolves in templates', () => {
    const wrapper = mountGlobal(
      '<v-expansion-panels><fr-accordion-panel title="Global" /></v-expansion-panels>',
    );

    expect(wrapper.findComponent(VExpansionPanel).exists()).toBe(true);
    expect(wrapper.find('.v-expansion-panel-title').text()).toBe('Global');
  });

  it('registers FrAccordion globally, so <fr-accordion> resolves in templates', () => {
    const wrapper = mountGlobal(
      '<fr-accordion><fr-accordion-panel title="Global" /></fr-accordion>',
    );

    expect(wrapper.findComponent(VExpansionPanels).classes()).toContain('rounded-lg');
    expect(wrapper.find('.v-expansion-panel-title').text()).toBe('Global');
  });

  it.each([
    ['FrAccordion', FrAccordion],
    ['FrAccordionPanel', FrAccordionPanel],
    ['FrCard', FrCard],
  ])('registers it under the name %s', (name, component) => {
    const app = createApp({ render: () => null }).use(FeralComponents);

    expect(app.component(name)).toBe(component);
  });
});
