<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  useToast,
  type FrAppNavigationSection,
  type FrAppShellCommand,
  type FrCommandPaletteResult,
  type FrCommandPaletteSource,
} from '../../src';

const sections: FrAppNavigationSection[] = [
  { items: [{ value: 'home', title: 'Home', icon: 'mdi-home-outline' }] },
  {
    label: 'GARDEN',
    items: [
      { value: 'plants', title: 'Plants', subtitle: 'Everything growing', icon: 'mdi-leaf' },
      { value: 'plots', title: 'Plots', icon: 'mdi-vector-square' },
      { value: 'schedules', title: 'Activity schedules', icon: 'mdi-calendar-clock' },
    ],
  },
  {
    label: 'HELP',
    items: [
      {
        value: 'docs',
        title: 'Vuetify docs',
        icon: 'mdi-book-open-outline',
        href: 'https://vuetifyjs.com',
      },
    ],
  },
];

const plants = ['Genovese basil', 'Cherry tomato', 'Runner bean', 'Rainbow chard', 'Garlic'];

const commands: FrAppShellCommand[] = [
  { value: 'new-plant', title: 'New plant', icon: 'mdi-plus' },
  { value: 'water', title: 'Water everything', icon: 'mdi-watering-can-outline' },
];

/** A slow source, as a server would be */
const varieties: FrCommandPaletteSource = {
  section: 'VARIETIES',
  async search(query) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return plants
      .filter((plant) => plant.toLowerCase().includes(query.toLowerCase()))
      .map((plant) => ({ value: plant, title: plant, icon: 'mdi-sprout' }));
  },
  select: (result: FrCommandPaletteResult) => toast.info(`Opened ${result.title}`),
};

const toast = useToast();
const activeView = ref('home');
const search = ref('');
const searchBox = ref(true);
const pinnedFooter = ref(false);
const railLocked = ref(false);
const fixedDrawer = ref(false);

const title = computed(
  () =>
    sections.flatMap((section) => section.items).find((item) => item.value === activeView.value)
      ?.title,
);
const shown = computed(() =>
  plants.filter((plant) => plant.toLowerCase().includes(search.value.toLowerCase())),
);

function onCommand(value: string) {
  toast.success(value === 'water' ? 'Watered everything' : 'Started a new plant');
}
</script>

<template>
  <fr-app-shell
    v-model:active-view="activeView"
    title="Vigilant Harvest"
    subtitle="Playground"
    storage-prefix="playground-shell"
    :sections="sections"
    :commands="commands"
    :search-sources="[varieties]"
    :search="searchBox ? search : undefined"
    search-label="Filter plants..."
    :pinned-footer="pinnedFooter"
    :rail-locked="railLocked"
    :fixed-drawer="fixedDrawer"
    @update:search="(value: string) => (search = value)"
    @command="onCommand"
  >
    <template #default>
      <h1 class="text-headline-medium my-4">{{ title }}</h1>
      <p class="text-medium-emphasis mb-4">
        FrAppShell renders its own <code>v-app</code>, so this page goes without the playground's
        frame. Ctrl+K opens the command palette; <code>/</code> focuses the search box.
      </p>
      <fr-row>
        <fr-col cols="12" md="6">
          <h2 class="text-title-medium mb-2">Shell options</h2>
          <fr-toggle id="search-box" v-model="searchBox" label="Search box (v-model:search)" />
          <fr-toggle id="pinned-footer" v-model="pinnedFooter" label="Pinned footer" />
          <fr-toggle id="rail-locked" v-model="railLocked" label="Rail locked" />
          <fr-toggle id="fixed-drawer" v-model="fixedDrawer" label="Fixed drawer" />
        </fr-col>
        <fr-col cols="12" md="6">
          <h2 class="text-title-medium mb-2">Toasts</h2>
          <fr-btn
            id="toast-danger"
            class="mr-2 mb-2"
            color="error"
            text="Danger"
            @click="toast.danger('Could not save')"
          />
          <fr-btn
            id="toast-undo"
            class="mb-2"
            text="With Undo"
            @click="
              toast.show('Deleted the basil', {
                action: { label: 'Undo', onClick: () => toast.success('Restored the basil') },
              })
            "
          />
          <h2 class="text-title-medium mt-4 mb-2">
            Plants (filter: <span id="filter">{{ search || 'none' }}</span>)
          </h2>
          <ul id="plants" class="ms-6">
            <li v-for="plant in shown" :key="plant">{{ plant }}</li>
          </ul>
        </fr-col>
      </fr-row>
      <div style="height: 1200px" aria-hidden="true" />
    </template>
    <template #drawer-footer="{ rail }">
      <a
        href="#/fr-app-logo"
        class="d-block pa-4 text-body-small"
        :title="rail ? 'Back' : undefined"
      >
        {{ rail ? '←' : '← Back to the playground' }}
      </a>
    </template>
    <template #toolbar-start>
      <span class="text-title-medium">{{ title }}</span>
    </template>
    <template #toolbar-actions>
      <fr-btn
        id="add"
        icon="mdi-plus"
        variant="text"
        aria-label="New plant"
        @click="onCommand('new-plant')"
      />
    </template>
    <template #settings>
      <fr-list-item title="Notifications" prepend-icon="mdi-bell-outline" />
      <fr-list-item title="Units" prepend-icon="mdi-ruler" />
    </template>
    <template #footer>
      <div class="pa-4 text-body-small text-medium-emphasis">
        Vigilant Harvest · playground footer
      </div>
    </template>
  </fr-app-shell>
</template>
