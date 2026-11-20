<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VTabs' props,
  FrTabs' options and its slot on an imported FrTabs. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrTabs, type FrTabsOption, type FrTabsValue } from '../../src';

const tab = ref<FrTabsValue>('planning');
const options: FrTabsOption[] = [
  'Details',
  { title: 'To Plant', value: 'propagation', prependIcon: 'mdi-sprout', disabled: false },
];
</script>

<template>
  <fr-tabs v-model="tab" :options="options" align-tabs="center" grow bg-color="surface-light">
    <template #default="{ tab: selected }">{{ selected }}</template>
  </fr-tabs>

  <!-- @vue-expect-error an option object needs a value -->
  <fr-tabs :options="[{ title: 'No value' }]" />
  <!-- @vue-expect-error not one of VTabs' alignments -->
  <fr-tabs align-tabs="middle" />
</template>
