<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VExpansionPanel's props on an imported FrAccordionPanel, and its own slots.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrAccordionPanel } from '../../src';
</script>

<template>
  <v-expansion-panels>
    <fr-accordion-panel title="Imported" value="a" :disabled="false" expand-icon="mdi-plus">
      <template #title="{ expanded }">{{ expanded ? 'Open' : 'Closed' }}</template>
      <template #actions="{ expandIcon }">{{ expandIcon }}</template>
      Body
    </fr-accordion-panel>

    <!-- @vue-expect-error title is a string -->
    <fr-accordion-panel :title="42" />
  </v-expansion-panels>
</template>
