import { createApp, defineComponent, h } from 'vue';
import {
  VAlert,
  VAutocomplete,
  VAvatar,
  VBadge,
  VBreadcrumbs,
  VBtn,
  VCard,
  VCheckbox,
  VChip,
  VChipGroup,
  VCol,
  VContainer,
  VExpansionPanel,
  VRow,
  VExpansionPanels,
} from 'vuetify/components';
import {
  FrAccordion,
  FrAccordionPanel,
  FrAlert,
  FrAutocomplete,
  FrAvatar,
  FrBadge,
  FrBreadcrumbs,
  FrBtn,
  FrCard,
  FrCheckbox,
  FrChip,
  FrChipGroup,
  FrCodeBlock,
  FrCol,
  FrContainer,
  FrRow,
} from '../../src';
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

  it('registers FrAlert globally, so <fr-alert> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-alert title="Global" />');

    expect(wrapper.findComponent(VAlert).exists()).toBe(true);
    expect(wrapper.find('.v-alert-title').text()).toBe('Global');
  });

  it('registers FrAutocomplete globally, so <fr-autocomplete> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-autocomplete label="Global" />');

    expect(wrapper.findComponent(VAutocomplete).exists()).toBe(true);
    expect(wrapper.find('.v-autocomplete').classes()).toContain('fr-autocomplete');
  });

  it('registers FrAvatar globally, so <fr-avatar> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-avatar text="EH" />');

    expect(wrapper.findComponent(VAvatar).exists()).toBe(true);
    expect(wrapper.find('.fr-avatar').text()).toBe('EH');
  });

  it('registers FrBadge globally, so <fr-badge> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-badge :content="3">Inbox</fr-badge>');

    expect(wrapper.findComponent(VBadge).exists()).toBe(true);
    expect(wrapper.find('.fr-badge .v-badge__badge').text()).toBe('3');
  });

  it('registers FrBreadcrumbs globally, so <fr-breadcrumbs> resolves in templates', () => {
    const wrapper = mountGlobal(`<fr-breadcrumbs :items="['Home', 'Tomato']" />`);

    expect(wrapper.findComponent(VBreadcrumbs).exists()).toBe(true);
    expect(wrapper.find('.fr-breadcrumbs .v-breadcrumbs-divider .mdi-chevron-right').exists()).toBe(
      true,
    );
  });

  it('registers FrBtn globally, so <fr-btn> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-btn text="Save" />');

    expect(wrapper.findComponent(VBtn).exists()).toBe(true);
    expect(wrapper.find('.fr-btn').text()).toBe('Save');
  });

  it('registers FrCheckbox globally, so <fr-checkbox> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-checkbox label="Global" />');

    expect(wrapper.findComponent(VCheckbox).exists()).toBe(true);
    expect(wrapper.find('.fr-checkbox label').text()).toBe('Global');
  });

  it('registers FrChip globally, so <fr-chip> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-chip text="Tomato" />');

    expect(wrapper.findComponent(VChip).exists()).toBe(true);
    expect(wrapper.find('.fr-chip').text()).toBe('Tomato');
  });

  it('registers FrChipGroup globally, so <fr-chip-group> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-chip-group column><fr-chip text="Tall" /></fr-chip-group>');

    expect(wrapper.findComponent(VChipGroup).exists()).toBe(true);
    expect(wrapper.find('.fr-chip-group .fr-chip').text()).toBe('Tall');
  });

  it('registers FrCodeBlock globally, so <fr-code-block> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-code-block>npm test</fr-code-block>');

    expect(wrapper.find('pre.fr-code-block').text()).toBe('npm test');
  });

  it('registers FrCol globally, so <fr-col> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-col cols="6">Global</fr-col>');

    expect(wrapper.findComponent(VCol).exists()).toBe(true);
    expect(wrapper.find('.fr-col').classes()).toContain('v-col--cols-6');
  });

  it('registers FrRow globally, so <fr-row> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-row justify="center"><fr-col>Global</fr-col></fr-row>');

    expect(wrapper.findComponent(VRow).exists()).toBe(true);
    expect(wrapper.find('.fr-row').classes()).toContain('justify-center');
  });

  it('registers FrContainer globally, so <fr-container> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-container fluid>Global</fr-container>');

    expect(wrapper.findComponent(VContainer).exists()).toBe(true);
    expect(wrapper.find('.fr-container').classes()).toContain('v-container--fluid');
  });

  it.each([
    ['FrAccordion', FrAccordion],
    ['FrAccordionPanel', FrAccordionPanel],
    ['FrAlert', FrAlert],
    ['FrAutocomplete', FrAutocomplete],
    ['FrAvatar', FrAvatar],
    ['FrBadge', FrBadge],
    ['FrBreadcrumbs', FrBreadcrumbs],
    ['FrBtn', FrBtn],
    ['FrCard', FrCard],
    ['FrCheckbox', FrCheckbox],
    ['FrChip', FrChip],
    ['FrChipGroup', FrChipGroup],
    ['FrCodeBlock', FrCodeBlock],
    ['FrCol', FrCol],
    ['FrContainer', FrContainer],
    ['FrRow', FrRow],
  ])('registers it under the name %s', (name, component) => {
    const app = createApp({ render: () => null }).use(FeralComponents);

    expect(app.component(name)).toBe(component);
  });
});
