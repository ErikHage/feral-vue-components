import { createApp, defineComponent, h, nextTick } from 'vue';
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
  VLayout,
  VList,
  VListSubheader,
  VListItem,
  VMenu,
  VProgressLinear,
  VSelect,
  VSkeletonLoader,
  VSlider,
  VSpacer,
  VProgressCircular,
  VSheet,
  VTable,
  VTabs,
  VTextarea,
  VTextField,
  VSnackbarQueue,
  VSwitch,
  VTooltip,
  VTreeview,
} from 'vuetify/components';
import {
  FrAccordion,
  FrAccordionPanel,
  FrAlert,
  FrAppLogo,
  FrAppNavigationDrawer,
  FrAppSettingsMenu,
  FrAppShell,
  FrAppUserMenu,
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
  FrCommandPalette,
  FrContainer,
  FrDataTable,
  FrDialog,
  FrDivider,
  FrFadeIn,
  FrFileField,
  FrForm,
  FrIcon,
  FrIconBtn,
  FrImage,
  FrList,
  FrListHeader,
  FrListItem,
  FrMenu,
  FrPage,
  FrPageTitle,
  FrProgressBar,
  FrRow,
  FrSelect,
  FrSkeleton,
  FrSlider,
  FrSpacer,
  FrSpinner,
  FrSheet,
  FrTable,
  FrTabs,
  FrTextarea,
  FrTextField,
  FrThemeMenu,
  FrTimeline,
  FrSnackbarQueue,
  FrToggle,
  FrTooltip,
  FrTree,
  FrFieldGroup,
  FrGrid,
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
    return mountWithVuetify(
      defineComponent({ components: { VExpansionPanels, VLayout }, template }),
      {
        global: { plugins: [FeralComponents] },
      },
    );
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

  it('registers FrAppLogo globally, so <fr-app-logo> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-app-logo :size="22" />');

    expect(wrapper.find('svg.fr-app-logo').attributes('width')).toBe('22');
  });

  it('registers FrAppNavigationDrawer globally, so <fr-app-navigation-drawer> resolves', () => {
    const wrapper = mountGlobal(
      `<v-layout>
        <fr-app-navigation-drawer
          title="Global"
          active-view="home"
          :sections="[{ items: [{ value: 'home', title: 'Home' }] }]"
        />
      </v-layout>`,
    );

    expect(wrapper.find('nav#app-nav #nav-home').attributes('aria-current')).toBe('page');
  });

  it('registers FrCommandPalette globally, so <fr-command-palette> resolves', async () => {
    const wrapper = mountGlobal(
      `<fr-command-palette open :items="[{ value: 'home', title: 'Home' }]" />`,
    );
    await nextTick();

    expect(wrapper.findComponent({ name: 'FrCommandPalette' }).exists()).toBe(true);
    expect(document.querySelector('.fr-command-palette [role="option"]')?.textContent).toContain(
      'Home',
    );
    wrapper.unmount();
  });

  it('registers FrAppShell globally, so <fr-app-shell> resolves', () => {
    const wrapper = mountGlobal(
      `<fr-app-shell
        title="Global"
        storage-prefix="global"
        active-view="home"
        :sections="[{ items: [{ value: 'home', title: 'Home' }] }]"
      >View</fr-app-shell>`,
    );

    expect(wrapper.find('.fr-app-shell #app-main').text()).toBe('View');
    wrapper.unmount();
  });

  it('registers FrAppSettingsMenu globally, so <fr-app-settings-menu> resolves', () => {
    const wrapper = mountGlobal('<fr-app-settings-menu id="settings" />');

    expect(wrapper.find('button#settings').attributes('aria-label')).toBe('Settings');
  });

  it('registers FrAppUserMenu globally, so <fr-app-user-menu> resolves', () => {
    const wrapper = mountGlobal('<fr-app-user-menu name="Ada Lovelace" />');

    expect(wrapper.find('button').attributes('aria-label')).toBe('Account: Ada Lovelace');
  });

  it('registers FrThemeMenu globally, so <fr-theme-menu> resolves', () => {
    const wrapper = mountGlobal('<fr-theme-menu model-value="dark" />');

    expect(wrapper.find('button[aria-label="Theme"] .mdi-moon-waning-crescent').exists()).toBe(
      true,
    );
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

  it('registers FrIconBtn globally, so <fr-icon-btn> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-icon-btn icon="mdi-pencil" label="Edit" />');

    expect(wrapper.findComponent(VBtn).exists()).toBe(true);
    expect(wrapper.find('.fr-icon-btn').attributes('aria-label')).toBe('Edit');
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

  it('registers FrPage globally, so <fr-page> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-page title="Global">Content</fr-page>');

    expect(wrapper.findComponent(VContainer).exists()).toBe(true);
    expect(wrapper.find('.fr-page h1').text()).toBe('Global');
  });

  it('registers FrPageTitle globally, so <fr-page-title> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-page-title title="Global" />');

    expect(wrapper.find('.fr-page-title h1').text()).toBe('Global');
  });

  it('registers FrProgressBar globally, so <fr-progress-bar> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-progress-bar :model-value="40" />');

    expect(wrapper.findComponent(VProgressLinear).exists()).toBe(true);
    expect(wrapper.find('.fr-progress-bar').attributes('aria-valuenow')).toBe('40');
  });

  it('registers FrSelect globally, so <fr-select> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-select label="Global" />');

    expect(wrapper.findComponent(VSelect).exists()).toBe(true);
    expect(wrapper.find('.fr-select label').text()).toBe('Global');
  });

  it('registers FrSkeleton globally, so <fr-skeleton> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-skeleton type="heading" />');

    expect(wrapper.findComponent(VSkeletonLoader).exists()).toBe(true);
    expect(wrapper.find('.fr-skeleton .v-skeleton-loader__heading').exists()).toBe(true);
  });

  it('registers FrSlider globally, so <fr-slider> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-slider label="Global" />');

    expect(wrapper.findComponent(VSlider).exists()).toBe(true);
    expect(wrapper.find('.fr-slider .v-slider__label').text()).toBe('Global');
  });

  it('registers FrSpacer globally, so <fr-spacer> resolves in templates', () => {
    const wrapper = mountGlobal('<div class="d-flex"><fr-spacer /></div>');

    expect(wrapper.findComponent(VSpacer).exists()).toBe(true);
    expect(wrapper.find('.d-flex > .fr-spacer.v-spacer').exists()).toBe(true);
  });

  it('registers FrSpinner globally, so <fr-spinner> resolves in templates, spinning', () => {
    const wrapper = mountGlobal('<fr-spinner color="primary" />');

    expect(wrapper.findComponent(VProgressCircular).exists()).toBe(true);
    expect(wrapper.find('.fr-spinner.v-progress-circular--indeterminate').exists()).toBe(true);
  });

  it('registers FrSheet globally, so <fr-sheet> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-sheet padding="small">Global</fr-sheet>');

    expect(wrapper.findComponent(VSheet).exists()).toBe(true);
    expect(wrapper.find('.fr-sheet.pa-2.rounded-lg').text()).toBe('Global');
  });

  it('registers FrTable globally, so <fr-table> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-table><tbody><tr><td>Global</td></tr></tbody></fr-table>');

    expect(wrapper.findComponent(VTable).exists()).toBe(true);
    expect(wrapper.find('.fr-table table td').text()).toBe('Global');
  });

  it('registers FrTabs globally, so <fr-tabs> resolves in templates', () => {
    const wrapper = mountGlobal(`<fr-tabs :options="['Details', 'History']" />`);

    expect(wrapper.findComponent(VTabs).exists()).toBe(true);
    expect(wrapper.findAll('.fr-tabs .v-tab').map((tab) => tab.text())).toEqual([
      'Details',
      'History',
    ]);
  });

  it('registers FrTextField globally, so <fr-text-field> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-text-field label="Global" />');

    expect(wrapper.findComponent(VTextField).exists()).toBe(true);
    expect(wrapper.find('.fr-text-field label').text()).toBe('Global');
  });

  it('registers FrTextarea globally, so <fr-textarea> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-textarea label="Global" />');

    expect(wrapper.findComponent(VTextarea).exists()).toBe(true);
    expect(wrapper.find('.fr-textarea textarea').exists()).toBe(true);
  });

  it('registers FrTimeline globally, so <fr-timeline> resolves in templates', () => {
    const wrapper = mountGlobal(
      `<fr-timeline :records="['2026-05-01']" :date-of="(day) => day" />`,
    );

    expect(wrapper.find('.fr-timeline h2').text()).toBe('2026-05-01');
  });

  it('registers FrSnackbarQueue globally, so <fr-snackbar-queue> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-snackbar-queue :model-value="[]" />');

    expect(wrapper.findComponent(VSnackbarQueue).props('closable')).toBe(true);
  });

  it('registers FrToggle globally, so <fr-toggle> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-toggle label="Global" />');

    expect(wrapper.findComponent(VSwitch).exists()).toBe(true);
    expect(wrapper.find('.fr-toggle label').text()).toBe('Global');
  });

  it('registers FrTooltip globally, so <fr-tooltip> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-tooltip text="Global" location="top" />');

    expect(wrapper.findComponent(VTooltip).props()).toMatchObject({
      text: 'Global',
      location: 'top',
    });
  });

  it('registers FrTree globally, so <fr-tree> resolves in templates', () => {
    const wrapper = mountGlobal(`<fr-tree :items="[{ title: 'Global', value: 1 }]" />`);

    expect(wrapper.findComponent(VTreeview).exists()).toBe(true);
    expect(wrapper.find('.fr-tree .v-list-item-title').text()).toBe('Global');
  });

  it('registers FrFieldGroup globally, so <fr-field-group> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-field-group label="Global"><input /></fr-field-group>');

    expect(wrapper.find('.field-group > label').text()).toBe('Global');
  });

  it('registers FrGrid globally, so <fr-grid> resolves in templates', () => {
    const wrapper = mountGlobal('<fr-grid gap="small"><div class="cell">Global</div></fr-grid>');

    expect(wrapper.find('.fr-grid.ga-1 > .cell').text()).toBe('Global');
  });

  it.each([
    ['FrAccordion', FrAccordion],
    ['FrAccordionPanel', FrAccordionPanel],
    ['FrAlert', FrAlert],
    ['FrAppLogo', FrAppLogo],
    ['FrAppNavigationDrawer', FrAppNavigationDrawer],
    ['FrAppSettingsMenu', FrAppSettingsMenu],
    ['FrAppShell', FrAppShell],
    ['FrAppUserMenu', FrAppUserMenu],
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
    ['FrCommandPalette', FrCommandPalette],
    ['FrContainer', FrContainer],
    ['FrDataTable', FrDataTable],
    ['FrDialog', FrDialog],
    ['FrDivider', FrDivider],
    ['FrFadeIn', FrFadeIn],
    ['FrFileField', FrFileField],
    ['FrForm', FrForm],
    ['FrIcon', FrIcon],
    ['FrIconBtn', FrIconBtn],
    ['FrImage', FrImage],
    ['FrList', FrList],
    ['FrListHeader', FrListHeader],
    ['FrListItem', FrListItem],
    ['FrMenu', FrMenu],
    ['FrPage', FrPage],
    ['FrPageTitle', FrPageTitle],
    ['FrProgressBar', FrProgressBar],
    ['FrRow', FrRow],
    ['FrSelect', FrSelect],
    ['FrSkeleton', FrSkeleton],
    ['FrSlider', FrSlider],
    ['FrSpacer', FrSpacer],
    ['FrSpinner', FrSpinner],
    ['FrSheet', FrSheet],
    ['FrTable', FrTable],
    ['FrTabs', FrTabs],
    ['FrTextarea', FrTextarea],
    ['FrTextField', FrTextField],
    ['FrThemeMenu', FrThemeMenu],
    ['FrTimeline', FrTimeline],
    ['FrSnackbarQueue', FrSnackbarQueue],
    ['FrToggle', FrToggle],
    ['FrTooltip', FrTooltip],
    ['FrTree', FrTree],
    ['FrFieldGroup', FrFieldGroup],
    ['FrGrid', FrGrid],
  ])('registers it under the name %s', (name, component) => {
    const app = createApp({ render: () => null }).use(FeralComponents);

    expect(app.component(name)).toBe(component);
  });
});
