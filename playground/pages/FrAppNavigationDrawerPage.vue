<script setup lang="ts">
import { ref } from 'vue';
import type { FrAppNavigationSection } from '../../src';

const sections: FrAppNavigationSection[] = [
  { items: [{ value: 'dashboard', title: 'Dashboard', icon: 'mdi-view-dashboard-outline' }] },
  {
    label: 'Garden',
    items: [
      { value: 'plots', title: 'Plots', icon: 'mdi-vector-square' },
      { value: 'plants', title: 'Plants', subtitle: '42 varieties', icon: 'mdi-leaf' },
      { value: 'harvests', title: 'Harvests', icon: 'mdi-basket' },
    ],
  },
  {
    label: 'Recordkeeping',
    items: [
      { value: 'journal', title: 'Journal', icon: 'mdi-book-open-page-variant' },
      { value: 'stats', title: 'Stats', icon: 'mdi-chart-bar' },
    ],
  },
  {
    label: 'Help',
    items: [
      {
        value: 'vuetify',
        title: 'Vuetify docs',
        icon: 'mdi-open-in-new',
        href: 'https://vuetifyjs.com',
      },
    ],
  },
];

const activeView = ref('plants');
const rail = ref(false);
const mobile = ref(false);
const open = ref(false);
const collapsedSections = ref<string[]>(['Recordkeeping']);
</script>

<template>
  <h2 class="text-headline-small mb-4">FrAppNavigationDrawer</h2>
  <p class="text-medium-emphasis mb-6">
    The app's main navigation: the logo and the app's name over its links, in sections whose
    headings collapse them. Wide, it is permanent and collapses to a rail of icons; with
    <code>mobile</code> it slides over the page while open. The drawer here sits in its own layout,
    as it would in an app's <code>v-app</code>.
  </p>
  <div class="d-flex flex-wrap align-center ga-4 mb-4">
    <fr-toggle id="mobile" v-model="mobile" label="mobile" hide-details />
    <fr-btn
      v-if="mobile"
      id="open"
      :text="open ? 'Close' : 'Open'"
      prepend-icon="mdi-menu"
      @click="open = !open"
    />
    <span class="text-medium-emphasis">
      active <span id="active-view">{{ activeView }}</span>, rail <span id="rail">{{ rail }}</span>,
      collapsed
      <span id="collapsed">{{ collapsedSections.join(', ') || 'none' }}</span>
    </span>
  </div>
  <v-layout class="border rounded-lg overflow-hidden" style="height: 520px">
    <fr-app-navigation-drawer
      v-model:active-view="activeView"
      v-model:rail="rail"
      v-model:open="open"
      v-model:collapsed-sections="collapsedSections"
      title="Vigilant Harvest"
      subtitle="Garden planner"
      :sections="sections"
      :mobile="mobile"
    >
      <template #footer="{ rail: isRail }">
        <div class="pa-4 text-caption text-medium-emphasis text-center">
          {{ isRail ? 'v1' : 'Version 1.0.0' }}
        </div>
      </template>
    </fr-app-navigation-drawer>
    <v-main>
      <div class="pa-6">
        <p class="text-body-large">Page: {{ activeView }}</p>
      </div>
    </v-main>
  </v-layout>
</template>
