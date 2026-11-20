<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VList's props on
  an imported FrList, and its own slots, with the item typed by the items given.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrList } from '../../src';

const plants = [
  { name: 'Tomato', plantId: 1, plantings: 3 },
  { name: 'Basil', plantId: 2, plantings: 1 },
];
</script>

<template>
  <fr-list lines="two" nav class="mb-4">Rows</fr-list>
  <fr-list :items="plants" item-title="name" item-value="plantId" density="comfortable">
    <template #title="{ item, title }">{{ item.name.toUpperCase() }} ({{ title }})</template>
    <template #append="{ item, isActive }">{{ item.plantings + 1 }} {{ isActive }}</template>
    <template #header="{ props }"><span v-bind="props" /></template>
  </fr-list>

  <!-- @vue-expect-error not one of VList's densities -->
  <fr-list density="tight" />
  <fr-list :items="plants">
    <template #prepend="{ item }">
      <!-- @vue-expect-error the item is a plant, which has no colour -->
      {{ item.colour }}
    </template>
  </fr-list>
  <fr-list>
    <!-- @vue-expect-error FrList's slots are its own: VList's item slot is not one -->
    <template #item>Row</template>
  </fr-list>
</template>
