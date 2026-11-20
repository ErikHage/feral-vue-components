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
  VDataTable,
  VDialog,
  VDivider,
  VExpansionPanel,
  VRow,
  VExpansionPanels,
  VFadeTransition,
  VFileInput,
  VForm,
  VIcon,
  VImg,
  VList,
  VListSubheader,
  VListItem,
  VMenu,
  VProgressLinear,
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
  FrDataTable,
  FrDialog,
  FrDivider,
  FrFadeIn,
  FrFileField,
  FrForm,
  FrIcon,
  FrImage,
  FrList,
  FrListHeader,
  FrListItem,
  FrMenu,
  FrProgressBar,
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

  it('registers FrDataTable globally, so <fr-data-table> resolves in templates', () => {
    const wrapper = mountGlobal(
      `<fr-data-table :headers="[{ title: 'Name', key: 'name' }]" :items="[{ name: 'Tomato' }]" />`,
    );

    expect(wrapper.findComponent(VDataTable).exists()).toBe(true);
    expect(wrapper.find('.fr-data-table tbody td').text()).toBe('Tomato');
  });

  it('registers FrDialog globally, so <fr-dialog> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-dialog title="Global">Body</fr-dialog>');

    expect(wrapper.findComponent(VDialog).exists()).toBe(true);
  });

  it('registers FrDivider globally, so <fr-divider> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-divider>or</fr-divider>');

    expect(wrapper.findComponent(VDivider).exists()).toBe(true);
    expect(wrapper.find('.v-divider__content').text()).toBe('or');
  });

  it('registers FrFadeIn globally, so <fr-fade-in> resolves in templates', () => {
    const wrapper = mountGlobal('<div><fr-fade-in><p class="body">Fading</p></fr-fade-in></div>');

    expect(wrapper.findComponent(VFadeTransition).exists()).toBe(true);
    expect(wrapper.find('.body').text()).toBe('Fading');
  });

  it('registers FrFileField globally, so <fr-file-field> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-file-field label="Global" />');

    expect(wrapper.findComponent(VFileInput).exists()).toBe(true);
    expect(wrapper.find('.fr-file-field label').text()).toBe('Global');
  });

  it('registers FrForm globally, so <fr-form> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-form><p class="body">Fields</p></fr-form>');

    expect(wrapper.findComponent(VForm).exists()).toBe(true);
    expect(wrapper.find('form.fr-form .body').text()).toBe('Fields');
  });

  it('registers FrIcon globally, so <fr-icon> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-icon>mdi-sprout</fr-icon>');

    expect(wrapper.findComponent(VIcon).exists()).toBe(true);
    expect(wrapper.find('.fr-icon').classes()).toContain('mdi-sprout');
  });

  it('registers FrImage globally, so <fr-image> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-image src="/logo.png" alt="Logo" eager />');

    expect(wrapper.findComponent(VImg).exists()).toBe(true);
    expect(wrapper.find('.fr-image img').attributes('alt')).toBe('Logo');
  });

  it('registers FrList globally, so <fr-list> resolves in templates', () => {
    const wrapper = mountGlobal(`<fr-list :items="['Tomato']" />`);

    expect(wrapper.findComponent(VList).exists()).toBe(true);
    expect(wrapper.find('.fr-list .v-list-item-title').text()).toBe('Tomato');
  });

  it('registers FrListHeader globally, so <fr-list-header> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-list-header>Herbs</fr-list-header>');

    expect(wrapper.findComponent(VListSubheader).exists()).toBe(true);
    expect(wrapper.find('.fr-list-header').text()).toBe('Herbs');
  });

  it('registers FrListItem globally, so <fr-list-item> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-list-item title="Basil" />');

    expect(wrapper.findComponent(VListItem).exists()).toBe(true);
    expect(wrapper.find('.fr-list-item .v-list-item-title').text()).toBe('Basil');
  });

  it('registers FrMenu globally, so <fr-menu> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-menu><p class="body">Edit</p></fr-menu>');

    expect(wrapper.findComponent(VMenu).exists()).toBe(true);
  });

  it('registers FrProgressBar globally, so <fr-progress-bar> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-progress-bar :model-value="40" />');

    expect(wrapper.findComponent(VProgressLinear).exists()).toBe(true);
    expect(wrapper.find('.fr-progress-bar').attributes('aria-valuenow')).toBe('40');
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
    ['FrDataTable', FrDataTable],
    ['FrDialog', FrDialog],
    ['FrDivider', FrDivider],
    ['FrFadeIn', FrFadeIn],
    ['FrFileField', FrFileField],
    ['FrForm', FrForm],
    ['FrIcon', FrIcon],
    ['FrImage', FrImage],
    ['FrList', FrList],
    ['FrListHeader', FrListHeader],
    ['FrListItem', FrListItem],
    ['FrMenu', FrMenu],
    ['FrProgressBar', FrProgressBar],
    ['FrRow', FrRow],
  ])('registers it under the name %s', (name, component) => {
    const app = createApp({ render: () => null }).use(FeralComponents);

    expect(app.component(name)).toBe(component);
  });
});
