<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrCommandPalette's
  v-model:open, its items and sources, and its select event. GlobalComponentsUsage.vue covers the
  global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import {
  FrCommandPalette,
  type FrCommandPaletteItem,
  type FrCommandPaletteSource,
} from '../../src';

const open = ref(false);
const items: FrCommandPaletteItem[] = [
  { value: 'plants', title: 'Plants', section: 'Garden', icon: 'mdi-leaf', kind: 'nav' },
];
const sources: FrCommandPaletteSource[] = [
  {
    section: 'People',
    suggest: () => [{ value: 'ada', title: 'Ada' }],
    search: async (query) => [{ value: query, title: query, href: '/people' }],
    select: (result) => result.href,
  },
];
function onSelect(item: FrCommandPaletteItem) {
  return item.value;
}
</script>

<template>
  <fr-command-palette v-model:open="open" :items="items" :sources="sources" @select="onSelect" />

  <!-- @vue-expect-error an item needs a title -->
  <fr-command-palette :items="[{ value: 'plants' }]" />
  <!-- @vue-expect-error a source needs a section -->
  <fr-command-palette :sources="[{ suggest: () => [] }]" />
  <!-- @vue-expect-error a source answers with results, not strings -->
  <fr-command-palette :sources="[{ section: 'People', search: () => ['Ada'] }]" />
  <fr-command-palette>
    <!-- @vue-expect-error it has no slots -->
    <template #default>Search</template>
  </fr-command-palette>
</template>
