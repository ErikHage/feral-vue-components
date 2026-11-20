<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrTimeline's
  props, and its slots typed by the records given. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrTimeline } from '../../src';

interface JournalEntry {
  entryId: number;
  entryDate: string;
  entry: string;
}

const day = ref<string | null>(null);
const entries: JournalEntry[] = [{ entryId: 1, entryDate: '2026-05-01', entry: 'Sowed' }];
</script>

<template>
  <fr-timeline v-model="day" :records="entries" :date-of="(entry) => entry.entryDate">
    <template #actions="{ day: shown, records }">{{ shown }}: {{ records.length }}</template>
    <template #day="{ records }">
      <p v-for="record in records" :key="record.entryId">{{ record.entry }}</p>
    </template>
    <template #empty>Nothing logged</template>
  </fr-timeline>

  <fr-timeline :records="entries" :date-of="(entry) => entry.entryDate">
    <template #day="{ records }">
      <!-- @vue-expect-error records are JournalEntry, which has no title -->
      {{ records[0]?.title }}
    </template>
  </fr-timeline>
  <!-- @vue-expect-error dateOf returns a date string, timestamp or Date -->
  <fr-timeline :records="entries" :date-of="(entry) => entry.entryId > 0" />
  <!-- @vue-expect-error records is required -->
  <fr-timeline :date-of="() => '2026-05-01'" />
</template>
