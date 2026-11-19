<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VExpansionPanels' types on FrAccordion, both imported and as the global <fr-accordion>
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrAccordion, FrAccordionPanel } from '../../src';

const open = ref<string[]>([]);
</script>

<template>
  <FrAccordion v-model="open" variant="popout" multiple :elevation="0">
    <template #default="{ next }">
      <FrAccordionPanel title="Imported" value="a" @click="next" />
    </template>
  </FrAccordion>
  <fr-accordion rounded="xl" variant="inset">
    <fr-accordion-panel title="Global" text="Body" />
  </fr-accordion>

  <!-- @vue-expect-error not one of VExpansionPanels' variants -->
  <FrAccordion variant="not-a-variant" />
  <!-- @vue-expect-error not one of VExpansionPanels' variants, on the global registration -->
  <fr-accordion variant="not-a-variant" />
</template>
