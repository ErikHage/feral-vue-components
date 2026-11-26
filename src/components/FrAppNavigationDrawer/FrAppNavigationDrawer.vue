<script setup lang="ts">
import { computed, ref, watch, type PropType, type VNode } from 'vue';
import { VBtn } from 'vuetify/components/VBtn';
import { VDivider } from 'vuetify/components/VDivider';
import { VIcon } from 'vuetify/components/VIcon';
import { VList, VListItem } from 'vuetify/components/VList';
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer';
import { VTooltip } from 'vuetify/components/VTooltip';
import { VExpandTransition } from 'vuetify/components/transitions';
import { FrAppLogo } from '../FrAppLogo';
import type { FrAppNavigationItem, FrAppNavigationSection } from './types';

defineOptions({ name: 'FrAppNavigationDrawer' });

const props = defineProps({
  /** The app's name, beside the logo */
  title: { type: String, required: true },
  /** A line under the app's name */
  subtitle: { type: String, default: '' },
  /** The drawer's links, in groups */
  sections: { type: Array as PropType<FrAppNavigationSection[]>, required: true },
  /** The `value` of the item shown as the current page */
  activeView: { type: String, required: true },
  /** Collapsed to a rail of icons. Ignored when `mobile` */
  rail: { type: Boolean, default: false },
  /** A small screen: the drawer slides over the page, shown while `open` */
  mobile: { type: Boolean, default: false },
  /** Shown, on a small screen */
  open: { type: Boolean, default: false },
  /** Whether a wide screen's drawer offers to collapse to a rail */
  collapsible: { type: Boolean, default: true },
  /** The labels of the sections collapsed under their headings */
  collapsedSections: { type: Array as PropType<string[]>, default: () => [] },
});

const emit = defineEmits<{
  /** An item without `to` or `href` was picked: its `value` */
  'update:activeView': [value: string];
  /** The rail was collapsed (true) or expanded (false) */
  'update:rail': [value: boolean];
  /** A small screen's drawer was opened or closed */
  'update:open': [value: boolean];
  /** A section was collapsed or expanded: the labels now collapsed */
  'update:collapsedSections': [value: string[]];
}>();

defineSlots<{
  /** Below the links, at the drawer's foot: told whether the drawer is a rail */
  footer?: (scope: { rail: boolean }) => VNode[];
}>();

/** A small screen's drawer is never a rail */
const isRail = computed(() => props.rail && !props.mobile);

const collapsed = ref<string[]>([...props.collapsedSections]);
watch(
  () => props.collapsedSections,
  (value) => (collapsed.value = [...value]),
);

function isCollapsed(section: FrAppNavigationSection) {
  return Boolean(section.label) && collapsed.value.includes(section.label as string);
}

function toggleSection(section: FrAppNavigationSection) {
  const label = section.label as string;
  collapsed.value = isCollapsed(section)
    ? collapsed.value.filter((each) => each !== label)
    : [...collapsed.value, label];
  emit('update:collapsedSections', [...collapsed.value]);
}

/** A link item leaves the current page to the router; a small screen's drawer closes either way */
function pick(item: FrAppNavigationItem) {
  if (!item.to && !item.href) {
    emit('update:activeView', item.value);
  }
  if (props.mobile) {
    emit('update:open', false);
  }
}

function onEscape() {
  if (props.mobile) {
    emit('update:open', false);
  }
}
</script>

<!--
  The app's main navigation: the Feral logo and the app's name over its links, in sections whose
  headings collapse them. On a wide screen it is always there, and collapses to a 64px rail of
  icons, each with its name in a tooltip. On a small screen (`mobile`) it slides over the page
  while `open`, and closes on a pick, on Escape or on a click outside it. The caller's attributes
  land on the drawer
-->
<template>
  <v-navigation-drawer
    id="app-nav"
    class="fr-app-navigation-drawer"
    aria-label="Main"
    color="surface"
    :border="0"
    :permanent="!props.mobile"
    :temporary="props.mobile"
    :model-value="!props.mobile || props.open"
    :width="isRail ? 64 : 240"
    :retain-focus="props.mobile"
    @update:model-value="(value: boolean) => emit('update:open', value)"
    @keydown.esc="onEscape"
  >
    <div v-if="!isRail" class="fr-app-navigation-drawer__brand">
      <div class="fr-app-navigation-drawer__mark"><fr-app-logo :size="24" /></div>
      <div class="fr-app-navigation-drawer__name">
        <span class="fr-app-navigation-drawer__title">{{ props.title }}</span>
        <span v-if="props.subtitle" class="fr-app-navigation-drawer__subtitle">
          {{ props.subtitle }}
        </span>
      </div>
      <v-btn
        v-if="!props.mobile && props.collapsible"
        icon
        size="x-small"
        variant="text"
        class="fr-app-navigation-drawer__collapse flex-shrink-0"
        style="opacity: var(--v-medium-emphasis-opacity)"
        aria-label="Collapse navigation"
        aria-expanded="true"
        @click="emit('update:rail', true)"
      >
        <v-icon size="small">mdi-chevron-left</v-icon>
      </v-btn>
    </div>
    <button
      v-else
      type="button"
      class="fr-app-navigation-drawer__brand fr-app-navigation-drawer__brand--rail"
      aria-label="Expand navigation"
      aria-expanded="false"
      @click="emit('update:rail', false)"
    >
      <fr-app-logo :size="28" />
    </button>

    <v-list
      nav
      slim
      density="compact"
      class="fr-app-navigation-drawer__nav"
      :class="{ 'fr-app-navigation-drawer__nav--rail': isRail }"
    >
      <template
        v-for="(section, sectionIndex) in props.sections"
        :key="section.label || `section-${sectionIndex}`"
      >
        <v-divider v-if="isRail && sectionIndex > 0" class="my-2 mx-2" />
        <button
          v-else-if="!isRail && section.label"
          type="button"
          class="fr-app-navigation-drawer__section text-caption font-weight-medium"
          :aria-expanded="!isCollapsed(section)"
          :aria-controls="`app-nav-section-${sectionIndex}`"
          @click="toggleSection(section)"
        >
          <span :id="`app-nav-section-${sectionIndex}-label`">{{ section.label }}</span>
          <v-icon
            size="16"
            class="fr-app-navigation-drawer__section-chevron"
            :class="{
              'fr-app-navigation-drawer__section-chevron--collapsed': isCollapsed(section),
            }"
          >
            mdi-chevron-down
          </v-icon>
        </button>
        <v-expand-transition>
          <div
            v-show="isRail || !isCollapsed(section)"
            :id="`app-nav-section-${sectionIndex}`"
            role="group"
            :aria-labelledby="
              !isRail && section.label ? `app-nav-section-${sectionIndex}-label` : undefined
            "
          >
            <v-list-item
              v-for="item in section.items"
              :id="`nav-${item.value}`"
              :key="item.value"
              :aria-label="item.title"
              :role="item.to || item.href ? undefined : 'link'"
              :aria-current="props.activeView === item.value ? 'page' : undefined"
              :active="props.activeView === item.value || undefined"
              :prepend-icon="item.icon"
              :to="item.to"
              :exact="Boolean(item.to)"
              :href="item.href"
              :target="item.href ? '_blank' : undefined"
              :rel="item.href ? 'noopener noreferrer' : undefined"
              :title="isRail ? '' : item.title"
              :subtitle="isRail ? '' : item.subtitle"
              rounded="0"
              color="primary"
              class="fr-app-navigation-drawer__item"
              @click="pick(item)"
            >
              <v-tooltip v-if="isRail" activator="parent" location="end">
                {{ item.title }}
              </v-tooltip>
            </v-list-item>
          </div>
        </v-expand-transition>
      </template>
    </v-list>

    <template v-if="$slots.footer" #append>
      <slot name="footer" :rail="isRail" />
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
.fr-app-navigation-drawer :deep(.v-navigation-drawer__content) {
  scrollbar-width: none;
}

.fr-app-navigation-drawer__brand {
  display: flex;
  align-items: center;
  height: 72px;
  padding: 0 24px;
}

.fr-app-navigation-drawer__brand--rail {
  justify-content: center;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}

.fr-app-navigation-drawer__mark {
  display: flex;
  justify-content: center;
  flex: 0 0 40px;
}

.fr-app-navigation-drawer__name {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  margin-left: 12px;
  font-family: Inter, sans-serif;
  line-height: 1.15;
}

.fr-app-navigation-drawer__title {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fr-app-navigation-drawer__subtitle {
  font-size: 0.75rem;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.fr-app-navigation-drawer__nav {
  padding: 8px 0;
}

.fr-app-navigation-drawer__nav:not(.fr-app-navigation-drawer__nav--rail)
  .fr-app-navigation-drawer__item {
  padding-inline: 32px 24px;
}

.fr-app-navigation-drawer__nav--rail .fr-app-navigation-drawer__item {
  display: flex;
  justify-content: center;
  padding-inline: 0;
}

.fr-app-navigation-drawer__nav--rail .fr-app-navigation-drawer__item :deep(.v-list-item__spacer),
.fr-app-navigation-drawer__nav--rail .fr-app-navigation-drawer__item :deep(.v-list-item__content) {
  display: none;
}

.fr-app-navigation-drawer__section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 32px 4px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  color: rgb(var(--v-theme-icon, 117, 117, 117));
}

.fr-app-navigation-drawer__section:first-child {
  padding-top: 0;
}

.fr-app-navigation-drawer__brand--rail:focus-visible,
.fr-app-navigation-drawer__item:focus-visible,
.fr-app-navigation-drawer__section:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: -2px;
  border-radius: 4px;
}

.fr-app-navigation-drawer__section-chevron {
  opacity: 0;
  transition:
    opacity 0.15s,
    transform 0.2s;
}

@media (prefers-reduced-motion: reduce) {
  .fr-app-navigation-drawer__section-chevron {
    transition: none;
  }
}

.fr-app-navigation-drawer__section:hover .fr-app-navigation-drawer__section-chevron,
.fr-app-navigation-drawer__section:focus-visible .fr-app-navigation-drawer__section-chevron,
.fr-app-navigation-drawer__section-chevron--collapsed {
  opacity: 0.8;
}

.fr-app-navigation-drawer__section-chevron--collapsed {
  transform: rotate(-90deg);
}

.fr-app-navigation-drawer__item {
  min-height: 40px;
  margin-bottom: 2px;
}

.fr-app-navigation-drawer__item.v-list-item--active {
  background-color: rgb(var(--v-theme-background));
  box-shadow: inset 3px 0 0 rgb(var(--v-theme-primary));
}

.fr-app-navigation-drawer__item.v-list-item--active :deep(.v-list-item__overlay) {
  opacity: 0;
}
</style>
