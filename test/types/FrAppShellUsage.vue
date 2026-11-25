<!--
  Never run: vue-tsc checks it during `npm run typecheck`, to prove consumers get FrAppShell's
  props, events and slots on an imported FrAppShell. GlobalComponentsUsage.vue covers the global
  registration
-->
<script setup lang="ts">
import { ref } from 'vue';
import {
  FrAppShell,
  type FrAppNavigationSection,
  type FrAppShellCommand,
  type FrCommandPaletteSource,
} from '../../src';

const view = ref('plants');
const search = ref('');
const sections: FrAppNavigationSection[] = [
  { label: 'Garden', items: [{ value: 'plants', title: 'Plants', icon: 'mdi-leaf' }] },
];
const commands: FrAppShellCommand[] = [{ value: 'new-plant', title: 'New plant' }];
const sources: FrCommandPaletteSource[] = [{ section: 'Varieties', search: () => [] }];

function run(value: string) {
  return value.toUpperCase();
}
</script>

<template>
  <fr-app-shell
    v-model:active-view="view"
    v-model:search="search"
    title="Garden"
    subtitle="Plots and plants"
    storage-prefix="garden"
    :sections="sections"
    :commands="commands"
    :search-sources="sources"
    search-label="Search plants..."
    view-title="All plants"
    rail-locked
    pinned-footer
    @command="run"
  >
    <template #default="{ activeView }">{{ activeView.toUpperCase() }}</template>
    <template #drawer-footer="{ rail }">{{ rail ? '' : 'v1' }}</template>
    <template #toolbar-start>Start</template>
    <template #toolbar-center>Center</template>
    <template #toolbar-actions>Actions</template>
    <template #settings>Settings</template>
    <template #toolbar>End</template>
    <template #footer>Footer</template>
  </fr-app-shell>

  <!-- @vue-expect-error activeView is required -->
  <fr-app-shell title="Garden" storage-prefix="garden" :sections="sections" />
  <!-- @vue-expect-error a command needs a title -->
  <fr-app-shell
    title="Garden"
    storage-prefix="garden"
    active-view="plants"
    :sections="sections"
    :commands="[{ value: 'go' }]"
  />
</template>
