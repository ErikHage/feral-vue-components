<script setup lang="ts">
import { ref } from 'vue';

interface JournalEntry {
  entryId: number;
  entryDate: string;
  entry: string;
}

const journal: JournalEntry[] = [
  { entryId: 1, entryDate: '2026-04-20', entry: 'Sowed tomatoes and peppers indoors.' },
  { entryId: 2, entryDate: '2026-05-02T07:30:00', entry: 'Potted on the tomatoes.' },
  { entryId: 3, entryDate: '2026-05-02T19:10:00', entry: 'Hardening off started.' },
  { entryId: 4, entryDate: '2026-05-03', entry: 'Planted out the first beans.' },
  { entryId: 5, entryDate: '2026-05-09', entry: 'Late frost warning: fleece on.' },
];
const day = ref<string | null>(null);
const edited = ref('');
</script>

<template>
  <h2 class="text-h5 mb-4">FrTimeline</h2>
  <p class="text-medium-emphasis mb-6">
    Modelled on vigilant-harvest-app's DayTimeline: the days with records, newest first, beside the
    shown day's records. <code>v-model</code> holds the day; the <code>day</code> and
    <code>actions</code> slots get the day and its records; <code>empty</code> shows without any.
  </p>

  <h3 class="text-subtitle-1 mb-2">
    As the journal uses it, with an actions button (day: <span id="day">{{ day }}</span>{{
      edited ? `, edit clicked for ${edited}` : ''
    }})
  </h3>
  <fr-card class="mb-6">
    <fr-timeline id="journal" v-model="day" :records="journal" :date-of="(e) => e.entryDate">
      <template #actions="{ day: shown, records }">
        <fr-btn
          id="edit"
          size="small"
          color="warning"
          prepend-icon="mdi-pencil"
          :text="`Edit ${records.length}`"
          @click="edited = shown"
        />
      </template>
      <template #day="{ records }">
        <p v-for="entry in records" :key="entry.entryId" class="journal-entry mb-2">
          {{ entry.entry }}
        </p>
      </template>
    </fr-timeline>
  </fr-card>

  <h3 class="text-subtitle-1 mb-2">No records: the empty slot</h3>
  <fr-card>
    <fr-timeline id="empty" :records="[]" :date-of="(e: JournalEntry) => e.entryDate">
      <template #empty><p id="empty-text">No entries yet.</p></template>
    </fr-timeline>
  </fr-card>
</template>
