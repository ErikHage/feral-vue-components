<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get
  FrAppNavigationDrawer's props, its four v-models and its footer slot.
  GlobalComponentsUsage.vue covers the global registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import { FrAppNavigationDrawer, type FrAppNavigationSection } from '../../src';

const sections: FrAppNavigationSection[] = [
  { items: [{ value: 'home', title: 'Home', icon: 'mdi-home' }] },
  {
    label: 'Garden',
    items: [
      { value: 'plants', title: 'Plants', subtitle: 'All', to: { name: 'plants' } },
      { value: 'docs', title: 'Docs', href: 'https://example.com' },
    ],
  },
];
const view = ref('home');
const rail = ref(false);
const open = ref(false);
const collapsed = ref<string[]>([]);
</script>

<template>
  <fr-app-navigation-drawer
    v-model:active-view="view"
    v-model:rail="rail"
    v-model:open="open"
    v-model:collapsed-sections="collapsed"
    title="Vigilant Harvest"
    subtitle="Garden planner"
    :sections="sections"
    :mobile="false"
    :collapsible="false"
  >
    <template #footer="{ rail: isRail }">{{ isRail ? 'R' : 'Footer' }}</template>
  </fr-app-navigation-drawer>

  <!-- @vue-expect-error title is required -->
  <fr-app-navigation-drawer :sections="sections" active-view="home" />
  <!-- @vue-expect-error an item needs a value and a title -->
  <fr-app-navigation-drawer
    title="App"
    active-view="home"
    :sections="[{ items: [{ title: 'Home' }] }]"
  />
  <!-- @vue-expect-error collapsed-sections is a list of labels -->
  <fr-app-navigation-drawer
    title="App"
    active-view="home"
    :sections="sections"
    collapsed-sections="Garden"
  />
  <fr-app-navigation-drawer title="App" active-view="home" :sections="sections">
    <!-- @vue-expect-error its only slot is footer -->
    <template #header>App</template>
  </fr-app-navigation-drawer>
</template>
