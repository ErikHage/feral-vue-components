<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get VDataTable's
  props on an imported FrDataTable, and cell slots typed by the items, as the apps use them.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { FrDataTable } from '../../src';

const headers = [
  { title: 'Name', key: 'applicationName' },
  { title: '', key: 'actions', sortable: false },
];
const applications = [{ applicationId: 'a1', applicationName: 'Harvest' }];
</script>

<template>
  <fr-data-table :headers="headers" :items="applications" item-value="applicationId" loading>
    <template #item.actions="{ item, index }">{{ index }}: {{ item.applicationName }}</template>
    <template #header.applicationName="{ column }">{{ column.title }}!</template>
    <template #no-data>No applications</template>
    <template #loading>Loading applications</template>
    <template #top><h3>Applications</h3></template>
    <template #actions><button>Add</button></template>
  </fr-data-table>

  <!-- @vue-expect-error density is one of VDataTable's densities -->
  <fr-data-table density="not-a-density" />
  <fr-data-table :items="applications">
    <template #item.actions="{ item }">
      <!-- @vue-expect-error the cell slot is typed by the items, which have no 'owner' -->
      {{ item.owner }}
    </template>
  </fr-data-table>
</template>
