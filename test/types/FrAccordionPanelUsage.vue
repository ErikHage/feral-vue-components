<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VExpansionPanel's props on FrAccordionPanel, and its own slots, both imported and global
-->
<script setup lang="ts">
import { FrAccordionPanel } from '../../src';
</script>

<template>
  <v-expansion-panels>
    <FrAccordionPanel title="Imported" value="a" :disabled="false" expand-icon="mdi-plus">
      <template #title="{ expanded }">{{ expanded ? 'Open' : 'Closed' }}</template>
      <template #actions="{ expandIcon }">{{ expandIcon }}</template>
      Body
    </FrAccordionPanel>
    <fr-accordion-panel title="Global" text="Body" :value="2" />

    <!-- @vue-expect-error title is a string -->
    <FrAccordionPanel :title="42" />
    <!-- @vue-expect-error disabled is a boolean, on the global registration -->
    <fr-accordion-panel :disabled="'yes'" />
  </v-expansion-panels>
</template>
