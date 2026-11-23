<script setup lang="ts">
import { ref } from 'vue';

const open = ref<string[]>(['seeds']);
</script>

<template>
  <h2 class="text-headline-small mb-4">FrAccordion</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VExpansionPanels</code>, holding <code>FrAccordionPanel</code>s. Defaults:
    <code>variant="default"</code>, <code>elevation="2"</code>, <code>rounded="lg"</code>. Elevation
    reaches the panels from here.
  </p>
  <v-row>
    <v-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Defaults</h3>
      <fr-accordion>
        <fr-accordion-panel title="Seeds" text="Sow in March." />
        <fr-accordion-panel title="Harvest" text="Pick in August." />
        <fr-accordion-panel title="Compost" text="Turn it monthly." />
      </fr-accordion>
    </v-col>
    <v-col cols="12" md="6">
      <h3 class="text-body-large mb-2">Multiple, with v-model ({{ open.join(', ') || 'none' }})</h3>
      <fr-accordion v-model="open" multiple>
        <fr-accordion-panel value="seeds" title="Seeds" text="Sow in March." />
        <fr-accordion-panel value="harvest" title="Harvest" text="Pick in August." />
        <fr-accordion-panel value="compost" title="Compost" text="Turn it monthly." />
      </fr-accordion>
    </v-col>
    <v-col cols="12" md="6">
      <h3 class="text-body-large mb-2">variant="accordion"</h3>
      <fr-accordion variant="accordion">
        <fr-accordion-panel title="Seeds" text="Sow in March." />
        <fr-accordion-panel title="Harvest" text="Pick in August." />
      </fr-accordion>
    </v-col>
    <v-col cols="12" md="6">
      <h3 class="text-body-large mb-2">variant="popout", elevation="0"</h3>
      <fr-accordion variant="popout" elevation="0">
        <fr-accordion-panel title="Seeds" text="Sow in March." />
        <fr-accordion-panel title="Harvest" text="Pick in August." />
      </fr-accordion>
    </v-col>
  </v-row>
</template>
