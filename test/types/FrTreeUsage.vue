<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VTreeview's
  props on an imported FrTree, and its slots typed by the items given. GlobalComponentsUsage.vue
  covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrTree } from '../../src';

interface Plot {
  id: number;
  title: string;
  crop?: string;
  children?: Plot[];
}

const plots: Plot[] = [{ id: 1, title: 'North bed', children: [{ id: 11, title: 'Row 1' }] }];
const opened = ref<number[]>([]);
</script>

<template>
  <fr-tree v-model:opened="opened" :items="plots" item-value="id" open-on-click>
    <template #title="{ item }">{{ item.title }}</template>
    <template #append="{ item }">{{ item.crop ?? '' }}</template>
    <template #no-data>No plots</template>
  </fr-tree>

  <fr-tree :items="plots" item-value="id">
    <template #title="{ item }">
      <!-- @vue-expect-error items are Plot, which has no name -->
      {{ item.name }}
    </template>
  </fr-tree>
  <!-- @vue-expect-error not one of VTreeview's densities -->
  <fr-tree density="tight" />
</template>
