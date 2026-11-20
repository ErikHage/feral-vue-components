<!--
  Never run: vue-tsc checks it during `npm run typecheck`. Nothing is imported here, so every
  <fr-*> tag resolves through the GlobalComponents types that FeralComponents' registration
  relies on. With an import in scope, the tag would resolve to the import instead
-->
<template>
  <fr-card title="Global" rounded="xl" />
  <fr-alert title="Global" type="info" />
  <fr-autocomplete :items="['Tomato', 'Basil']" label="Global" />
  <fr-avatar text="EH" size="small" />
  <fr-badge :content="3">Inbox</fr-badge>
  <fr-breadcrumbs :items="['Home', 'Tomato']" />
  <fr-btn text="Save" color="primary" />
  <fr-checkbox label="Climbing" />
  <fr-chip text="Tomato" />
  <fr-chip-group column><fr-chip text="Tall" /></fr-chip-group>
  <fr-code-block>npm test</fr-code-block>
  <fr-container fluid>
    <fr-row spacing="none"><fr-col cols="6">Global</fr-col></fr-row>
  </fr-container>
  <fr-data-table :headers="[{ title: 'Name', key: 'name' }]" :items="[{ name: 'Tomato' }]">
    <template #item.name="{ item }">{{ item.name }}</template>
  </fr-data-table>
  <fr-dialog title="Global" closable>Body</fr-dialog>
  <fr-divider>or</fr-divider>
  <fr-fade-in><p>Fading</p></fr-fade-in>
  <fr-file-field label="Global" accept=".csv" />
  <fr-icon size="small">mdi-sprout</fr-icon>
  <fr-image src="/logo.png" alt="Logo" max-width="250" />
  <fr-list lines="two">Rows</fr-list>
  <fr-list-header sticky>Herbs</fr-list-header>
  <fr-list-item title="Basil" prepend-icon="mdi-leaf" to="/plants/2" />
  <fr-menu location="end" open-on-hover>Menu</fr-menu>
  <fr-progress-bar :model-value="40" color="success" />
  <fr-select :items="['Weekly']" label="Global" />
  <fr-skeleton type="heading, paragraph" />
  <fr-slider :model-value="40" label="Global" />
  <fr-form validate-on="submit"><fr-file-field label="In a form" /></fr-form>
  <fr-accordion rounded="xl" variant="inset">
    <fr-accordion-panel title="Global" text="Body" :value="2" />
  </fr-accordion>

  <!-- @vue-expect-error not one of VCard's variants -->
  <fr-card variant="not-a-variant" />
  <!-- @vue-expect-error not one of VExpansionPanels' variants -->
  <fr-accordion variant="not-a-variant" />
  <!-- @vue-expect-error not one of VAlert's types -->
  <fr-alert type="not-a-type" />
  <!-- @vue-expect-error not one of VAutocomplete's variants -->
  <fr-autocomplete variant="not-a-variant" />
  <!-- @vue-expect-error not one of VAvatar's variants -->
  <fr-avatar variant="not-a-variant" />
  <!-- @vue-expect-error content is a number or a string -->
  <fr-badge :content="{ count: 3 }" />
  <!-- @vue-expect-error density is one of VBreadcrumbs' densities -->
  <fr-breadcrumbs density="not-a-density" />
  <!-- @vue-expect-error not one of VBtn's variants -->
  <fr-btn variant="not-a-variant" />
  <!-- @vue-expect-error density is one of VCheckbox's densities -->
  <fr-checkbox density="not-a-density" />
  <!-- @vue-expect-error not one of VChip's variants -->
  <fr-chip variant="not-a-variant" />
  <!-- @vue-expect-error not one of VChipGroup's variants -->
  <fr-chip-group variant="not-a-variant" />
  <!-- @vue-expect-error align-self is one of VCol's alignments -->
  <fr-col align-self="sideways" />
  <!-- @vue-expect-error spacing is 'default' or 'none' -->
  <fr-row spacing="huge" />
  <!-- @vue-expect-error fluid is a boolean -->
  <fr-container :fluid="'yes'" />
  <!-- @vue-expect-error density is one of VDataTable's densities -->
  <fr-data-table density="not-a-density" />
  <!-- @vue-expect-error size is small, medium or large -->
  <fr-dialog size="huge" />
  <!-- @vue-expect-error not one of VDivider's variants -->
  <fr-divider variant="wavy" />
  <!-- @vue-expect-error group is a boolean -->
  <fr-fade-in :group="'yes'" />
  <!-- @vue-expect-error not one of VFileInput's variants -->
  <fr-file-field variant="not-a-variant" />
  <!-- @vue-expect-error v-model is the form's validity: a boolean or null -->
  <fr-form :model-value="'yes'" />
  <!-- @vue-expect-error start is a boolean -->
  <fr-icon :start="'yes'" />
  <!-- @vue-expect-error cover is a boolean -->
  <fr-image :cover="'yes'" />
  <!-- @vue-expect-error not one of VList's densities -->
  <fr-list density="tight" />
  <!-- @vue-expect-error sticky is a boolean -->
  <fr-list-header :sticky="'yes'" />
  <!-- @vue-expect-error not one of VListItem's variants -->
  <fr-list-item variant="wavy" />
  <!-- @vue-expect-error open-on-hover is a boolean -->
  <fr-menu :open-on-hover="'yes'" />
  <!-- @vue-expect-error indeterminate is a boolean -->
  <fr-progress-bar :indeterminate="'yes'" />
  <!-- @vue-expect-error not one of VSelect's variants -->
  <fr-select variant="not-a-variant" />
  <!-- @vue-expect-error loading is a boolean -->
  <fr-skeleton :loading="'yes'" />
  <!-- @vue-expect-error not one of VSlider's densities -->
  <fr-slider density="tight" />
  <!-- @vue-expect-error disabled is a boolean -->
  <fr-accordion-panel :disabled="'yes'" />
</template>
