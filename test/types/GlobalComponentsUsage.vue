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
  <!-- @vue-expect-error disabled is a boolean -->
  <fr-accordion-panel :disabled="'yes'" />
</template>
