<template>
  <h2 class="text-h5 mb-4">FrAccordionPanel</h2>
  <p class="text-medium-emphasis mb-6">
    A <code>VExpansionPanel</code> built from a <code>VExpansionPanelTitle</code> and a
    <code>VExpansionPanelText</code>. The title slot falls back to the <code>title</code> prop, the
    body is the default slot and falls back to <code>text</code>. No defaults of its own: it takes
    its look from the panels around it. Shown here inside a plain <code>v-expansion-panels</code>.
  </p>
  <v-expansion-panels>
    <fr-accordion-panel title="Props only" text="Title and text both come from props." />
    <fr-accordion-panel>
      <template #title="{ expanded }">
        <v-icon :icon="expanded ? 'mdi-folder-open' : 'mdi-folder'" class="mr-2" />
        Title slot ({{ expanded ? 'open' : 'closed' }})
      </template>
      The body is the default slot, so anything can go here.
      <v-btn class="ml-2" size="small" text="Even a button" />
    </fr-accordion-panel>
    <fr-accordion-panel title="Actions slot" text="The actions slot replaces the expand icon.">
      <template #actions="{ expanded }">
        <v-chip size="small" :text="expanded ? 'Hide' : 'Show'" />
      </template>
    </fr-accordion-panel>
    <fr-accordion-panel
      title="Custom icons"
      text="VExpansionPanel props pass straight through."
      expand-icon="mdi-plus"
      collapse-icon="mdi-minus"
    />
    <fr-accordion-panel title="Disabled" text="Never seen." disabled />
  </v-expansion-panels>
</template>
