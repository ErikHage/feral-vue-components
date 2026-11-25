<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  watch,
  type ComponentPublicInstance,
  type PropType,
  type VNode,
} from 'vue';
import { useDisplay, useTheme } from 'vuetify';
import { VApp } from 'vuetify/components/VApp';
import { VAppBar, VAppBarNavIcon } from 'vuetify/components/VAppBar';
import { VBtn } from 'vuetify/components/VBtn';
import { VContainer } from 'vuetify/components/VGrid';
import { VFooter } from 'vuetify/components/VFooter';
import { VMain } from 'vuetify/components/VMain';
import { VSpacer } from 'vuetify/components/VGrid';
import { VTextField } from 'vuetify/components/VTextField';
import { FrAppNavigationDrawer } from '../FrAppNavigationDrawer';
import type { FrAppNavigationItem, FrAppNavigationSection } from '../FrAppNavigationDrawer';
import { FrAppSettingsMenu } from '../FrAppSettingsMenu';
import { FrCommandPalette } from '../FrCommandPalette';
import type { FrCommandPaletteItem, FrCommandPaletteSource } from '../FrCommandPalette';
import type { FrCommandPaletteSourceItem } from '../FrCommandPalette/types';
import { FrSnackbarQueue } from '../FrSnackbarQueue';
import { FrThemeMenu } from '../FrThemeMenu';
import type { FrThemeMenuValue } from '../FrThemeMenu/options';
import {
  isTyping,
  readCollapsedSections,
  readDrawerRail,
  readSlashShortcut,
  readThemePreference,
  storageKeys,
} from './storage';
import type { FrAppShellCommand } from './types';

defineOptions({ name: 'FrAppShell' });

const props = defineProps({
  /** The app's name: in the drawer, and the window's title when the page has none */
  title: { type: String, required: true },
  /** A line under the app's name in the drawer */
  subtitle: { type: String, default: '' },
  /** The drawer's links, which the command palette searches too */
  sections: { type: Array as PropType<FrAppNavigationSection[]>, required: true },
  /** Where in localStorage the shell keeps the user's choices: `<storagePrefix>.theme`... */
  storagePrefix: { type: String, required: true },
  /** The `value` of the view shown */
  activeView: { type: String, required: true },
  /** The app's own actions, in the command palette; picking one is reported through `command` */
  commands: { type: Array as PropType<FrAppShellCommand[]>, default: () => [] },
  /** The drawer is always a rail */
  railLocked: { type: Boolean, default: false },
  /** The drawer is never a rail, and its sections don't collapse */
  fixedDrawer: { type: Boolean, default: false },
  /** Whether the drawer starts as a rail, until the user changes it */
  defaultRail: { type: Boolean, default: false },
  /** The footer stays at the foot of the window, rather than after the content */
  pinnedFooter: { type: Boolean, default: false },
  /**
   * Given, the toolbar holds a search box bound to it (`v-model:search`) for the view to filter
   * by, and `/` focuses it. Left out, the toolbar has a button that opens the command palette
   */
  search: { type: String, default: undefined },
  /** The search box's placeholder and name */
  searchLabel: { type: String, default: 'Search...' },
  /** Where the command palette asks for more results as the user types */
  searchSources: { type: Array as PropType<FrCommandPaletteSource[]>, default: () => [] },
  /** The window's title for the view, in place of its link's title */
  viewTitle: { type: String, default: '' },
});

const emit = defineEmits<{
  /** A link without `to` or `href` was picked, in the drawer or the command palette */
  'update:activeView': [value: string];
  /** The search box changed */
  'update:search': [value: string];
  /** One of `commands` was picked: its `value` */
  command: [value: string];
}>();

const slots = defineSlots<{
  /** The view: told which is active */
  default?: (scope: { activeView: string }) => VNode[];
  /** At the drawer's foot: told whether the drawer is a rail */
  'drawer-footer'?: (scope: { rail: boolean }) => VNode[];
  /** At the toolbar's start, after the menu button on a small screen */
  'toolbar-start'?: () => VNode[];
  /** In the middle of the toolbar */
  'toolbar-center'?: () => VNode[];
  /** Before the theme menu */
  'toolbar-actions'?: () => VNode[];
  /** In the settings menu, which is only there when this is given */
  settings?: () => VNode[];
  /** At the toolbar's end */
  toolbar?: () => VNode[];
  /** Below the view, or at the foot of the window with `pinnedFooter` */
  footer?: () => VNode[];
}>();

const theme = useTheme();
const { smAndDown: mobile } = useDisplay();
const router = getCurrentInstance()!.appContext.config.globalProperties.$router as
  { push: (to: unknown) => unknown } | undefined;
const keys = computed(() => storageKeys(props.storagePrefix));

const drawerRail = ref(readDrawerRail(props.storagePrefix, props.defaultRail));
const collapsedSections = ref(readCollapsedSections(props.storagePrefix));
const drawerOpen = ref(false);
const commandPaletteOpen = ref(false);
const slashShortcut = ref(readSlashShortcut(props.storagePrefix));
const isDark = computed(() => theme.current.value.dark);
const storedTheme = readThemePreference(props.storagePrefix);
/** Until the user picks one, the theme the app started in */
const themePreference = ref<FrThemeMenuValue>(storedTheme ?? (isDark.value ? 'dark' : 'light'));

const searchField = useTemplateRef<InstanceType<typeof VTextField>>('searchField');
const main = useTemplateRef<ComponentPublicInstance>('main');
const hostSearch = computed(() => props.search !== undefined);
const rail = computed(
  () => !mobile.value && !props.fixedDrawer && (drawerRail.value || props.railLocked),
);

const systemLight =
  typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: light)')
    : null;

/** The feral theme a preference shows: `system` follows the device, dark when it can't tell */
function themeName(preference: FrThemeMenuValue) {
  const light = preference === 'system' ? Boolean(systemLight?.matches) : preference === 'light';
  return light ? 'feralLight' : 'feralDark';
}

if (storedTheme) {
  theme.change(themeName(storedTheme));
}

const commandItems = computed<FrCommandPaletteItem[]>(() => {
  const items: FrCommandPaletteItem[] = props.sections.flatMap((section) =>
    section.items.map((item) => ({
      value: item.value,
      title: item.title,
      icon: item.icon,
      section: section.label ?? '',
      description: item.subtitle,
      to: item.to,
      href: item.href,
      type: 'nav',
    })),
  );
  for (const command of props.commands) {
    items.push({ section: 'ACTIONS', ...command, type: 'command' });
  }
  items.push({
    value: 'toggle-theme',
    title: isDark.value ? 'Light theme' : 'Dark theme',
    icon: isDark.value ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent',
    section: 'ACTIONS',
    type: 'action',
  });
  if (hostSearch.value) {
    items.push({
      value: 'toggle-slash-shortcut',
      title: slashShortcut.value
        ? 'Turn off the / search shortcut'
        : 'Turn on the / search shortcut',
      icon: 'mdi-keyboard-outline',
      section: 'ACTIONS',
      type: 'action',
    });
  }
  return items;
});

const windowTitle = document.title;

/** Names the window after the view: `<view> - <app>` */
function titleWindow() {
  const view = props.sections
    .flatMap((section) => section.items)
    .find((item) => item.value === props.activeView);
  const base = windowTitle || props.title;
  const name = props.viewTitle || view?.title;
  document.title = name && name !== base ? `${name} - ${base}` : base;
}

titleWindow();
watch(() => [props.sections, props.viewTitle], titleWindow);
watch(
  () => props.activeView,
  () => {
    titleWindow();
    void nextTick(focusView);
  },
);

/** On a small screen, a drawer closing with focus inside it sends focus back to its button */
watch(drawerOpen, (open) => {
  const focus = document.activeElement;
  const lost = focus === document.body || document.getElementById('app-nav')!.contains(focus);
  if (!open && mobile.value && lost) {
    void nextTick(() => document.getElementById('app-nav-toggle')?.focus());
  }
});

function mainElement() {
  return main.value!.$el as HTMLElement;
}

function focusMain() {
  mainElement().focus();
}

/** A new view takes focus at its heading, unless the user has already moved into it */
function focusView() {
  const element = mainElement();
  if (element.contains(document.activeElement) && document.activeElement !== element) {
    return;
  }
  const heading = element.querySelector('h1');
  if (heading) {
    heading.setAttribute('tabindex', '-1');
    heading.focus();
  } else {
    focusMain();
  }
}

function setDrawerRail(value: boolean) {
  drawerRail.value = value;
  localStorage.setItem(keys.value.drawerRail, String(value));
}

function setCollapsedSections(labels: string[]) {
  collapsedSections.value = labels;
  localStorage.setItem(keys.value.collapsedSections, JSON.stringify(labels));
}

function applyTheme(preference: FrThemeMenuValue) {
  themePreference.value = preference;
  localStorage.setItem(keys.value.theme, preference);
  theme.change(themeName(preference));
}

function onSystemThemeChange() {
  if (themePreference.value === 'system') {
    theme.change(themeName('system'));
  }
}

function onGlobalKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault();
    commandPaletteOpen.value = true;
  } else if (
    event.key === '/' &&
    searchField.value &&
    slashShortcut.value &&
    !isTyping(event.target)
  ) {
    event.preventDefault();
    searchField.value.focus();
  }
}

function onCommandSelect(picked: FrCommandPaletteItem) {
  const item = picked as FrCommandPaletteItem & {
    type: 'nav' | 'command' | 'action' | 'result';
    to?: FrAppNavigationItem['to'];
    href?: string;
    source?: FrCommandPaletteSourceItem['source'];
    result?: FrCommandPaletteSourceItem['result'];
  };
  if (item.type === 'action' && item.value === 'toggle-theme') {
    applyTheme(isDark.value ? 'light' : 'dark');
  } else if (item.type === 'action') {
    slashShortcut.value = !slashShortcut.value;
    localStorage.setItem(keys.value.slashShortcut, String(slashShortcut.value));
  } else if (item.type === 'command') {
    emit('command', item.value);
  } else if (item.type === 'result') {
    if (item.source!.select) {
      item.source!.select(item.result!);
    } else if (item.result!.href) {
      window.open(item.result!.href, '_blank', 'noopener');
    }
  } else if (item.href) {
    window.open(item.href, '_blank', 'noopener');
  } else if (item.to) {
    void router?.push(item.to);
  } else {
    emit('update:activeView', item.value);
  }
}

onMounted(() => {
  systemLight?.addEventListener('change', onSystemThemeChange);
  window.addEventListener('keydown', onGlobalKeydown);
});

onBeforeUnmount(() => {
  systemLight?.removeEventListener('change', onSystemThemeChange);
  window.removeEventListener('keydown', onGlobalKeydown);
  // Gives the page back its own title, so a shell mounted after this one (a hot reload, say)
  // doesn't take the view's title as its base
  document.title = windowTitle;
});
</script>

<!--
  A feral app's frame: the navigation drawer, a toolbar with search, the theme and settings menus,
  the view, an optional footer, the app's toasts (useToast) and a command palette on Ctrl+K. The
  rail, the collapsed sections, the theme and the `/` shortcut are kept in localStorage under
  `storagePrefix`. A skip link leads to the view, which takes focus at its h1 when the active
  view changes, and the window is titled after the view
-->
<template>
  <v-app class="fr-app-shell">
    <a href="#app-main" class="fr-app-shell__skip-link" @click.prevent="focusMain">
      Skip to content
    </a>
    <fr-app-navigation-drawer
      v-model:open="drawerOpen"
      :title="title"
      :subtitle="subtitle"
      :sections="sections"
      :active-view="activeView"
      :rail="rail"
      :collapsible="!fixedDrawer"
      :mobile="mobile"
      :collapsed-sections="collapsedSections"
      @update:active-view="(view: string) => emit('update:activeView', view)"
      @update:rail="setDrawerRail"
      @update:collapsed-sections="setCollapsedSections"
    >
      <template v-if="slots['drawer-footer']" #footer="{ rail: isRail }">
        <slot name="drawer-footer" :rail="isRail" />
      </template>
    </fr-app-navigation-drawer>

    <v-app-bar
      color="background"
      :height="72"
      scroll-behavior="elevate"
      scroll-threshold="1"
      class="ps-4 pe-8"
    >
      <v-app-bar-nav-icon
        v-if="mobile"
        id="app-nav-toggle"
        aria-label="Menu"
        aria-controls="app-nav"
        :aria-expanded="String(drawerOpen)"
        variant="text"
        @click="drawerOpen = !drawerOpen"
      />
      <slot name="toolbar-start" />
      <div v-if="slots['toolbar-center']" class="fr-app-shell__toolbar-center">
        <slot name="toolbar-center" />
      </div>
      <v-spacer />
      <v-btn
        v-if="mobile"
        class="fr-app-shell__search-button"
        icon="mdi-magnify"
        variant="text"
        density="comfortable"
        aria-label="Search"
        @click="commandPaletteOpen = true"
      />
      <v-text-field
        v-else-if="hostSearch"
        id="app-search"
        ref="searchField"
        :model-value="search"
        :placeholder="searchLabel"
        :aria-label="searchLabel"
        :aria-keyshortcuts="slashShortcut ? '/' : undefined"
        prepend-inner-icon="mdi-magnify"
        variant="plain"
        bg-color="transparent"
        density="compact"
        hide-details
        single-line
        clearable
        class="fr-app-shell__search mr-2"
        :class="{ 'fr-app-shell__search--filled': Boolean(search) }"
        @update:model-value="(value: string | null) => emit('update:search', value ?? '')"
        @keyup.esc="emit('update:search', '')"
      >
        <template #append-inner>
          <button
            type="button"
            class="fr-app-shell__shortcut"
            aria-label="Open the command palette (Ctrl+K)"
            aria-keyshortcuts="Control+K"
            @click="commandPaletteOpen = true"
          >
            Ctrl+K
          </button>
        </template>
      </v-text-field>
      <v-btn
        v-else
        class="fr-app-shell__search-pill text-none mr-2"
        aria-keyshortcuts="Control+K"
        rounded="pill"
        variant="tonal"
        prepend-icon="mdi-magnify"
        @click="commandPaletteOpen = true"
      >
        Search...
        <span class="fr-app-shell__shortcut">Ctrl+K</span>
      </v-btn>
      <slot name="toolbar-actions" />
      <fr-theme-menu :model-value="themePreference" @update:model-value="applyTheme" />
      <fr-app-settings-menu v-if="slots.settings">
        <slot name="settings" />
      </fr-app-settings-menu>
      <slot name="toolbar" />
    </v-app-bar>

    <v-main id="app-main" ref="main" tabindex="-1" class="fr-app-shell__main">
      <v-container fluid class="px-8 pb-8 pt-0">
        <slot :active-view="activeView" />
      </v-container>
      <v-footer
        v-if="slots.footer && !pinnedFooter"
        id="app-footer"
        color="background"
        class="pa-0 flex-column align-stretch"
      >
        <slot name="footer" />
      </v-footer>
    </v-main>
    <v-footer
      v-if="slots.footer && pinnedFooter"
      id="app-footer"
      app
      color="background"
      class="pa-0 flex-column align-stretch"
    >
      <slot name="footer" />
    </v-footer>

    <fr-snackbar-queue />

    <fr-command-palette
      v-model:open="commandPaletteOpen"
      :items="commandItems"
      :sources="searchSources"
      @select="onCommandSelect"
    />
  </v-app>
</template>

<style scoped>
.fr-app-shell__skip-link {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 2000;
  padding: 8px 16px;
  border-radius: 4px;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  transform: translateY(-200%);
}
.fr-app-shell__skip-link:focus {
  transform: none;
}
.fr-app-shell__main:focus,
.fr-app-shell__main :deep(h1:focus) {
  outline: none;
}
.fr-app-shell__search-pill {
  letter-spacing: normal;
}
.fr-app-shell__shortcut {
  margin-left: 12px;
  opacity: 0.75;
  font-size: 0.75rem;
  white-space: nowrap;
}
.fr-app-shell__toolbar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.fr-app-shell__search {
  flex: 0 0 auto;
  width: 200px;
  height: 36px;
  padding: 0 12px;
  border-radius: 9999px;
  background-color: rgba(var(--v-theme-on-surface), 0.12);
  font-size: 0.875rem;
  font-weight: 500;
  transition: width 0.2s;
}
@media (prefers-reduced-motion: reduce) {
  .fr-app-shell__search {
    transition: none;
  }
}
.fr-app-shell__search:focus-within,
.fr-app-shell__search--filled {
  width: 320px;
}
.fr-app-shell__search :deep(.v-input__control),
.fr-app-shell__search :deep(.v-field) {
  height: 36px;
  font: inherit;
  letter-spacing: inherit;
}
.fr-app-shell__search :deep(.v-field__input) {
  min-height: 36px;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
}
.fr-app-shell__search :deep(.v-field__input::placeholder) {
  color: inherit;
  opacity: 1;
}
.fr-app-shell__search :deep(.v-field__prepend-inner),
.fr-app-shell__search :deep(.v-field__append-inner),
.fr-app-shell__search :deep(.v-field__clearable) {
  align-items: center;
  padding-top: 0;
}
.fr-app-shell__search :deep(.v-field__prepend-inner > .v-icon) {
  font-size: 18px;
  opacity: 1;
  margin-inline: -3px 6px;
}
.fr-app-shell__search .fr-app-shell__shortcut {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}
</style>

<style>
/* For an app's own svg icons, in its links or slots: sized and aligned as an mdi icon is */
.fr-app-shell-svg-icon {
  display: inline-flex;
  width: 1em;
  height: 1em;
}

.fr-app-shell-svg-icon > svg {
  width: 100%;
  height: 100%;
}
</style>
