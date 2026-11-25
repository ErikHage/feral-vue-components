<script setup lang="ts">
import { ref } from 'vue';
import type {
  FrCommandPaletteItem,
  FrCommandPaletteResult,
  FrCommandPaletteSource,
} from '../../src';

const open = ref(false);
const picked = ref('none');

const items: FrCommandPaletteItem[] = [
  { value: 'dashboard', title: 'Dashboard', icon: 'mdi-view-dashboard-outline' },
  { value: 'plots', title: 'Plots', section: 'Garden', icon: 'mdi-vector-square' },
  {
    value: 'plants',
    title: 'Plants',
    section: 'Garden',
    icon: 'mdi-leaf',
    description: '42 varieties',
  },
  { value: 'harvests', title: 'Harvests', section: 'Garden', icon: 'mdi-basket' },
  {
    value: 'journal',
    title: 'Journal',
    section: 'Recordkeeping',
    icon: 'mdi-book-open-page-variant',
  },
  {
    value: 'activity-log',
    title: 'Activity Log',
    section: 'Recordkeeping',
    icon: 'mdi-clipboard-list-outline',
  },
  {
    value: 'activity-schedules',
    title: 'Activity Schedules',
    section: 'Config',
    icon: 'mdi-calendar-clock',
  },
  { value: 'add-plant', title: 'Add a plant', section: 'ACTIONS', icon: 'mdi-plus' },
];

const varieties = ['Brandywine Tomato', 'Genovese Basil', 'Lacinato Kale', 'Sugar Snap Pea'];

/** A pretend server: suggests two recent varieties, and searches all of them after a delay */
const plantSource: FrCommandPaletteSource = {
  section: 'Varieties',
  suggest: () =>
    varieties.slice(0, 2).map((name) => ({ value: name, title: name, icon: 'mdi-history' })),
  search: (query) =>
    new Promise<FrCommandPaletteResult[]>((resolve) =>
      setTimeout(
        () =>
          resolve(
            varieties
              .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
              .map((name) => ({ value: name, title: name, icon: 'mdi-sprout' })),
          ),
        300,
      ),
    ),
};

function onSelect(item: FrCommandPaletteItem) {
  picked.value = `${item.title} (${String(item.type ?? 'item')})`;
}
</script>

<template>
  <h2 class="text-headline-small mb-4">FrCommandPalette</h2>
  <p class="text-medium-emphasis mb-6">
    A search over items and sources in a dialog at the top of the page. Every word typed must match
    an item's title, description or section; Up and Down move the highlight, Enter picks, Escape
    closes. The Varieties source suggests two recent ones, and answers a search after 300ms. Try
    <code>gar pl</code>, <code>acsch</code> or <code>basil</code>.
  </p>
  <div class="d-flex align-center ga-4">
    <fr-btn id="open-palette" text="Open" prepend-icon="mdi-magnify" @click="open = true" />
    <span class="text-medium-emphasis"
      >picked <span id="picked">{{ picked }}</span></span
    >
  </div>
  <fr-command-palette
    v-model:open="open"
    :items="items"
    :sources="[plantSource]"
    @select="onSelect"
  />
</template>
