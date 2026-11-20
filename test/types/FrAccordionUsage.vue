<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  VExpansionPanels' types on an imported FrAccordion. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrAccordion, FrAccordionPanel } from '../../src';

const open = ref<string[]>([]);
</script>

<template>
  <fr-accordion v-model="open" variant="popout" multiple :elevation="0">
    <template #default="{ next }">
      <fr-accordion-panel title="Imported" value="a" @click="next" />
    </template>
  </fr-accordion>

  <!-- @vue-expect-error not one of VExpansionPanels' variants -->
  <fr-accordion variant="not-a-variant" />
</template>
