<script setup lang="ts">
import { ref } from 'vue';

interface Plot {
  id: number;
  title: string;
  crop?: string;
  children?: Plot[];
}

const plots: Plot[] = [
  {
    id: 1,
    title: 'North bed',
    children: [
      { id: 11, title: 'Row 1', crop: 'Tomatoes' },
      { id: 12, title: 'Row 2', crop: 'Basil' },
    ],
  },
  { id: 2, title: 'Greenhouse', children: [{ id: 21, title: 'Bench', crop: 'Peppers' }] },
  { id: 3, title: 'Herb spiral', crop: 'Thyme' },
];
const tasks: Plot[] = [
  { id: 1, title: 'Sowing', children: [{ id: 11, title: 'Peas' }] },
  { id: 2, title: 'Harvest' },
];
const opened = ref<number[]>([]);
const search = ref('');
</script>

<template>
  <h2 class="text-headline-small mb-4">FrTree</h2>
  <p class="text-medium-emphasis mb-6">
    Wraps <code>VTreeview</code>. Default: <code>density="compact"</code>. Its slots are passed on
    only when given, and get the item.
  </p>
  <fr-row>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        Plots, open-on-click, append slot (opened: <span id="opened">{{ opened.join(', ') }}</span>)
      </h3>
      <fr-tree
        id="plots"
        v-model:opened="opened"
        :items="plots"
        item-value="id"
        open-on-click
        :search="search"
      >
        <template #append="{ item }">
          <fr-chip v-if="item.crop" size="small">{{ item.crop }}</fr-chip>
        </template>
        <template #no-data><p id="none" class="pa-4">No plots match</p></template>
      </fr-tree>
      <input
        id="search"
        v-model="search"
        placeholder="Search plots"
        class="mt-2 pa-1 border rounded"
      />
    </fr-col>
    <fr-col cols="12" md="6">
      <h3 class="text-body-large mb-2">
        A second tree, the same ids: overridden density="default"
      </h3>
      <fr-tree id="tasks" :items="tasks" item-value="id" density="default" />
    </fr-col>
  </fr-row>
</template>
