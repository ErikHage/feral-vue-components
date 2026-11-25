<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';
import {
  useToast,
  type FrAppNavigationSection,
  type FrAppShellCommand,
  type FrCommandPaletteSource,
} from '../src';
import { componentPages } from './pages';
import { shellOptions } from './shell';

const route = useRoute();
const toast = useToast();
// The shell's small-screen breakpoint, where the toolbar has room for the page's name alone
const { smAndDown } = useDisplay();

/** The app-shell parts get a section of their own, ahead of the other components */
const appShellParts = new Set([
  'FrAppShell',
  'FrAppLogo',
  'FrAppNavigationDrawer',
  'FrAppSettingsMenu',
  'FrAppUserMenu',
  'FrCommandPalette',
  'FrThemeMenu',
]);

const sections: FrAppNavigationSection[] = [
  {
    label: 'APP SHELL',
    items: componentPages
      .filter((page) => appShellParts.has(page.name))
      .map((page) => ({
        value: page.name,
        title: page.name,
        icon: 'mdi-application-outline',
        to: page.path,
      })),
  },
  {
    label: 'COMPONENTS',
    items: componentPages
      .filter((page) => !appShellParts.has(page.name))
      .map((page) => ({
        value: page.name,
        title: page.name,
        icon: 'mdi-puzzle-outline',
        to: page.path,
      })),
  },
];

const commands: FrAppShellCommand[] = [
  { value: 'toast', title: 'Show a toast', icon: 'mdi-message-outline' },
];

/** Finds a page by name in the command palette, as a server-backed search would */
const pageSource: FrCommandPaletteSource = {
  section: 'SOURCE',
  search: (query) =>
    componentPages
      .filter((page) => page.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map((page) => ({
        value: page.name,
        title: `${page.name} (from a source)`,
        icon: 'mdi-database-search-outline',
      })),
  select: (result) => toast.info(`The source was handed ${result.value}`),
};

/** The route's name is the page's component's name, which each link's value is */
const activeView = computed(() => String(route.name ?? ''));

/** The page's section, linking to its first page, then the page itself; the page alone on a small screen */
const crumbs = computed(() => {
  const section = sections.find((each) =>
    each.items.some((item) => item.value === activeView.value),
  );
  if (!section) return [];
  if (smAndDown.value) return [{ title: activeView.value }];
  return [
    { title: section.label === 'APP SHELL' ? 'App shell' : 'Components', to: section.items[0]!.to },
    { title: activeView.value },
  ];
});

function onCommand(value: string) {
  shellOptions.lastCommand = value;
  toast.success(`Ran the "${value}" command`);
}
</script>

<template>
  <fr-app-shell
    title="Feral components"
    subtitle="Playground"
    storage-prefix="feral-playground"
    :sections="sections"
    :active-view="activeView"
    :commands="commands"
    :search-sources="[pageSource]"
    :search="shellOptions.searchBox ? shellOptions.search : undefined"
    search-label="Search the page..."
    :pinned-footer="shellOptions.pinnedFooter"
    :rail-locked="shellOptions.railLocked"
    :fixed-drawer="shellOptions.fixedDrawer"
    @update:search="(value: string) => (shellOptions.search = value)"
    @command="onCommand"
  >
    <template #toolbar-start>
      <fr-breadcrumbs
        :items="crumbs"
        density="compact"
        class="pa-0 text-no-wrap overflow-hidden"
        style="min-width: 0"
      />
    </template>
    <router-view />
    <template #footer>
      <div class="px-8 py-3 text-body-small text-medium-emphasis">
        @feral-auth/vue-components playground
      </div>
    </template>
  </fr-app-shell>
</template>
