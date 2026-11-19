<!--
  Never run: vue-tsc checks it during `npm run typecheck`. Nothing is imported here, so every
  <fr-*> tag resolves through the GlobalComponents types that FeralComponents' registration
  relies on. With an import in scope, the tag would resolve to the import instead
-->
<template>
  <fr-card title="Global" rounded="xl" />
  <fr-alert title="Global" type="info" />
  <fr-autocomplete :items="['Tomato', 'Basil']" label="Global" />
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
  <!-- @vue-expect-error disabled is a boolean -->
  <fr-accordion-panel :disabled="'yes'" />
</template>
