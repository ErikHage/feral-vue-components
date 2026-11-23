<script setup lang="ts" generic="Item">
import { computed, type VNode, watch } from 'vue';
import { FrBtn } from '../FrBtn';
import { FrCol } from '../FrCol';
import { FrDivider } from '../FrDivider';
import { FrList } from '../FrList';
import { FrListItem } from '../FrListItem';
import { FrRow } from '../FrRow';
import { dayOf, daysApart, type FrTimelineDate } from './days';
import type { FrTimelineDayScope } from './types';

defineOptions({ name: 'FrTimeline' });

const props = defineProps<{
  /** Everything to place on the timeline, in any order */
  records: readonly Item[];
  /** A record's date: read as the local day it falls on. Records whose date can't be read are left out */
  dateOf: (record: Item) => FrTimelineDate;
}>();

/**
 * The day shown, as YYYY-MM-DD. When it names no day with records, the newest is shown, and
 * v-model told
 */
const model = defineModel<string | null>({ default: null });

defineSlots<{
  /** The shown day's content. Given the day and its records */
  day?: (scope: FrTimelineDayScope<Item>) => VNode[];
  /** Beside the day's heading: buttons that act on the day. Given the day and its records */
  actions?: (scope: FrTimelineDayScope<Item>) => VNode[];
  /** Shown instead when there are no records */
  empty?: () => VNode[];
}>();

const recordsByDay = computed(() => {
  const byDay: Record<string, Item[]> = {};
  for (const record of props.records) {
    const day = dayOf(props.dateOf(record));
    if (day) (byDay[day] ??= []).push(record);
  }
  return byDay;
});

// Newest first. YYYY-MM-DD sorts as text
const days = computed(() => Object.keys(recordsByDay.value).sort().reverse());

// The days, with a gap marked between two more than a day apart
const entries = computed(() =>
  days.value.flatMap((day, i) => {
    const next = days.value[i + 1];
    return next && daysApart(next, day) > 1
      ? [
          { day, gap: false },
          { day: `${day}-gap`, gap: true },
        ]
      : [{ day, gap: false }];
  }),
);

const shownDay = computed(() =>
  model.value && recordsByDay.value[model.value] ? model.value : (days.value[0] ?? null),
);

// Read only where a day is shown. days runs newest first, so older is the next one along
const shownIndex = computed(() => days.value.indexOf(shownDay.value!));
const olderDay = computed(() => days.value[shownIndex.value + 1] ?? null);
const newerDay = computed(() => (shownIndex.value > 0 ? days.value[shownIndex.value - 1]! : null));

watch(
  shownDay,
  (day) => {
    if (day !== model.value) model.value = day;
  },
  { immediate: true },
);
</script>

<!--
  A column of the days with records, newest first, beside the shown day's records, with Older and
  Newer buttons either side of its heading. Modelled on DayTimeline in vigilant-harvest-app. It adds
  nothing to the library's stylesheet, so the look is Vuetify's: the days are a nav FrList, the shown one active
  in the theme's primary, and heights are inline styles. The caller's attributes fall through
  onto the FrRow at the root
-->
<template>
  <fr-row class="fr-timeline">
    <fr-col
      cols="5"
      sm="4"
      md="3"
      xl="2"
      class="d-flex flex-column border-e"
      style="max-height: 70vh; overflow: hidden"
    >
      <fr-list nav class="flex-grow-1 overflow-y-auto" aria-label="Days">
        <template v-for="entry in entries" :key="entry.day">
          <fr-list-item v-if="entry.gap" title="..." class="text-center" disabled />
          <fr-list-item
            v-else
            :title="entry.day"
            :active="entry.day === shownDay"
            color="primary"
            @click="model = entry.day"
          />
        </template>
      </fr-list>
    </fr-col>

    <fr-col cols="7" sm="8" md="9" xl="10" class="pa-5 overflow-y-auto" style="max-height: 75vh">
      <div v-if="shownDay">
        <div class="d-flex flex-wrap justify-space-between align-center ga-2">
          <fr-btn
            variant="tonal"
            prepend-icon="mdi-chevron-left"
            text="Older"
            :disabled="!olderDay"
            @click="model = olderDay"
          />
          <div class="d-flex align-center ga-3">
            <h2 class="text-title-large">{{ shownDay }}</h2>
            <slot name="actions" :day="shownDay" :records="recordsByDay[shownDay]!" />
          </div>
          <fr-btn
            variant="tonal"
            append-icon="mdi-chevron-right"
            text="Newer"
            :disabled="!newerDay"
            @click="model = newerDay"
          />
        </div>
        <fr-divider class="my-4" />
        <slot name="day" :day="shownDay" :records="recordsByDay[shownDay]!" />
      </div>
      <slot v-else name="empty" />
    </fr-col>
  </fr-row>
</template>
