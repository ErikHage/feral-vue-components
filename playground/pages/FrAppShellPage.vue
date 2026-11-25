<script setup lang="ts">
import { useToast } from '../../src';
import { shellOptions } from '../shell';

const toast = useToast();

const usage = `<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { type FrAppNavigationSection, type FrAppShellCommand } from '@feral-auth/vue-components';

const route = useRoute();
const sections: FrAppNavigationSection[] = [
  { items: [{ value: 'home', title: 'Home', icon: 'mdi-home-outline', to: '/' }] },
  {
    label: 'GARDEN',
    items: [
      { value: 'plants', title: 'Plants', icon: 'mdi-leaf', to: '/plants' },
      { value: 'docs', title: 'Docs', icon: 'mdi-book-outline', href: 'https://example.com' },
    ],
  },
];
const commands: FrAppShellCommand[] = [{ value: 'new-plant', title: 'New plant' }];
const activeView = computed(() => String(route.name));
</${'script'}>

<template>
  <fr-app-shell
    title="Vigilant Harvest"
    storage-prefix="vigilant-harvest"
    :sections="sections"
    :active-view="activeView"
    :commands="commands"
    @command="run"
  >
    <router-view />
    <template #settings>
      <fr-list-item title="Notifications" prepend-icon="mdi-bell-outline" />
    </template>
  </fr-app-shell>
</template>`;

const toasts = `import { useToast } from '@feral-auth/vue-components';

const toast = useToast();
toast.success('Saved');
toast.danger('Could not save'); // read out as an alert
toast.show('Deleted the basil', { action: { label: 'Undo', onClick: restore } });`;

const views = `<!-- Links without \`to\` or \`href\` are views the app switches itself -->
<fr-app-shell v-model:active-view="view" ...>
  <plants-view v-if="view === 'plants'" />
</fr-app-shell>`;
</script>

<template>
  <h2 class="text-headline-small mb-4">FrAppShell</h2>
  <p class="text-medium-emphasis mb-6">
    The frame a feral app renders around its views, and the one this playground runs in: everything
    around this text is FrAppShell. It renders its own <code>v-app</code>, so it goes at the root of
    the app, in place of one.
  </p>

  <h3 class="text-title-medium mb-2">What it holds</h3>
  <ul class="ms-6 mb-6 text-body-medium">
    <li>
      <strong>The navigation drawer</strong> over <code>sections</code>: a rail of icons on a wide
      screen (the chevron by the app's name), sliding over the page from the menu button on a small
      one. Section headings collapse.
    </li>
    <li>
      <strong>A toolbar</strong> with a search, the theme menu, and a settings menu when the
      <code>settings</code> slot is given. Slots: <code>toolbar-start</code>,
      <code>toolbar-center</code>, <code>toolbar-actions</code> (before the theme menu),
      <code>toolbar</code> (at the end).
    </li>
    <li>
      <strong>The view</strong> in the default slot, told <code>{ activeView }</code>, and an
      optional <code>footer</code>, after the view or pinned with <code>pinned-footer</code>.
    </li>
    <li>
      <strong>The command palette</strong> on Ctrl+K (Cmd+K): the drawer's links,
      <code>commands</code> (reported through <code>command</code>), switching the theme, and
      <code>search-sources</code> asked as the user types.
    </li>
    <li><strong>The app's toasts</strong>, from <code>useToast()</code> anywhere in the app.</li>
  </ul>

  <h3 class="text-title-medium mb-2">Using it</h3>
  <p class="text-body-medium mb-2">
    With a router, give each link a <code>to</code> and the route's name as
    <code>active-view</code>; this playground does that. Picking a link, in the drawer or the
    palette, goes to its route.
  </p>
  <fr-code-block class="mb-4">{{ usage }}</fr-code-block>
  <p class="text-body-medium mb-2">
    Without one, links have no <code>to</code>, and picking one emits
    <code>update:activeView</code>:
  </p>
  <fr-code-block class="mb-4">{{ views }}</fr-code-block>
  <p class="text-body-medium mb-2">Toasts, from any component:</p>
  <fr-code-block class="mb-6">{{ toasts }}</fr-code-block>

  <h3 class="text-title-medium mb-2">Kept for the user</h3>
  <p class="text-body-medium mb-6">
    The rail, the collapsed sections, the theme and the <code>/</code> shortcut are kept in
    localStorage under <code>storage-prefix</code> (here <code>feral-playground.*</code>). The
    window is titled after the view, and a new view takes focus at its <code>h1</code>, or the view
    itself. Tab from the top of the page for the skip link.
  </p>

  <h3 class="text-title-medium mb-2">Try it on this playground's shell</h3>
  <fr-row>
    <fr-col cols="12" md="6">
      <fr-toggle
        id="search-box"
        v-model="shellOptions.searchBox"
        label="Search box (v-model:search; / focuses it)"
      />
      <fr-toggle id="pinned-footer" v-model="shellOptions.pinnedFooter" label="Pinned footer" />
      <fr-toggle id="rail-locked" v-model="shellOptions.railLocked" label="Rail locked" />
      <fr-toggle id="fixed-drawer" v-model="shellOptions.fixedDrawer" label="Fixed drawer" />
    </fr-col>
    <fr-col cols="12" md="6">
      <p class="text-body-medium mb-2">
        Search: <span id="search-value">{{ shellOptions.search || 'nothing typed' }}</span>
      </p>
      <p class="text-body-medium mb-4">
        Last command: <span id="last-command">{{ shellOptions.lastCommand || 'none yet' }}</span>
        (Ctrl+K, "Show a toast")
      </p>
      <fr-btn
        id="toast-undo"
        class="mr-2 mb-2"
        text="Toast with Undo"
        @click="
          toast.show('Deleted the basil', {
            action: { label: 'Undo', onClick: () => toast.success('Restored the basil') },
          })
        "
      />
      <fr-btn
        id="toast-danger"
        class="mb-2"
        color="error"
        text="Danger toast"
        @click="toast.danger('Could not save')"
      />
    </fr-col>
  </fr-row>
</template>
