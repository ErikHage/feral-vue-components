<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  useId,
  watch,
  type ComponentPublicInstance,
  type PropType,
} from 'vue';
import { VCard } from 'vuetify/components/VCard';
import { VDialog } from 'vuetify/components/VDialog';
import { VDivider } from 'vuetify/components/VDivider';
import {
  VList,
  VListItem,
  VListItemSubtitle,
  VListItemTitle,
  VListSubheader,
} from 'vuetify/components/VList';
import { VTextField } from 'vuetify/components/VTextField';
import { scoreMatch } from './score';
import type {
  FrCommandPaletteItem,
  FrCommandPaletteSource,
  FrCommandPaletteSourceItem,
} from './types';

defineOptions({ name: 'FrCommandPalette' });

const props = defineProps({
  /** Shown */
  open: { type: Boolean, default: false },
  /** What it searches: views, actions... */
  items: { type: Array as PropType<FrCommandPaletteItem[]>, default: () => [] },
  /** Where it asks for more results as the user types, such as a server's records */
  sources: { type: Array as PropType<FrCommandPaletteSource[]>, default: () => [] },
});

const emit = defineEmits<{
  /** Opened or closed */
  'update:open': [value: boolean];
  /** An item or a source's result was picked; the palette closes */
  select: [item: FrCommandPaletteItem];
}>();

const listId = `fr-command-palette-${useId()}`;
const query = ref<string | null>('');
const sourceResults = ref<FrCommandPaletteSourceItem[]>([]);
const activeValue = ref<string | null>(null);
const card = ref<ComponentPublicInstance | null>(null);
const searchInput = ref<InstanceType<typeof VTextField> | null>(null);
const itemRefs: Record<string, HTMLElement> = {};
let opener: HTMLElement | null = null;
/** Whether the user has moved the highlight since the search last changed */
let moved = false;

const trimmed = computed(() => (query.value ?? '').trim());

const dialogOpen = computed({
  get: () => props.open,
  set: (value: boolean) => emit('update:open', value),
});

const placeholder = computed(() => {
  const extra = props.sources
    .filter((source) => source.search)
    .map((source) => source.section.toLowerCase());
  return extra.length
    ? `Search views, actions, and ${extra.join(', ')}...`
    : 'Search views and actions...';
});

/** The items matching every word typed, best first; all of them, in order, when nothing is */
const itemResults = computed(() => {
  const terms = trimmed.value.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return props.items;
  return props.items
    .map((item) => {
      const fields = [item.title, item.description, item.section].map((field) =>
        (field ?? '').toLowerCase(),
      );
      let score = 0;
      for (const term of terms) {
        const best = Math.max(...fields.map((field) => scoreMatch(field, term)));
        if (best === 0) return null;
        score += best;
      }
      return { item, score };
    })
    .filter((scored) => scored !== null)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
});

/** Sources' suggestions lead an empty search; typed, the items' matches lead */
const flatResults = computed<FrCommandPaletteItem[]>(() =>
  trimmed.value
    ? [...itemResults.value, ...sourceResults.value]
    : [...sourceResults.value, ...itemResults.value],
);

const groupedResults = computed(() => {
  const groups = new Map<string, FrCommandPaletteItem[]>();
  for (const item of flatResults.value) {
    const label = item.section ?? '';
    groups.set(label, [...(groups.get(label) ?? []), item]);
  }
  return [...groups].map(([label, items]) => ({ label, items }));
});

const activeOptionId = computed(() => {
  const item = flatResults.value.find((result) => result.value === activeValue.value);
  return item ? optionId(item) : undefined;
});

const resultsAnnouncement = computed(() => {
  if (!props.open) return '';
  const count = flatResults.value.length;
  return count === 0 ? 'No matches found' : `${count} ${count === 1 ? 'result' : 'results'}`;
});

function firstValue() {
  return flatResults.value[0]?.value ?? null;
}

watch(
  () => props.open,
  (open) => {
    if (open) {
      opener = document.activeElement as HTMLElement | null;
      query.value = '';
      moved = false;
      activeValue.value = firstValue();
      void searchSources('');
    }
  },
  { immediate: true },
);

watch(query, (value) => {
  moved = false;
  activeValue.value = firstValue();
  void searchSources(value);
});

watch(flatResults, (results) => {
  if (!results.some((item) => item.value === activeValue.value)) {
    activeValue.value = firstValue();
  }
});

/** Asks every source at once; an answer to a search the user has since changed is dropped */
async function searchSources(value: string | null) {
  const asked = (value ?? '').trim();
  if (props.sources.length === 0) {
    sourceResults.value = [];
    return;
  }
  const answers = await Promise.all(
    props.sources.map(async (source, index) => {
      const ask = asked ? source.search : source.suggest;
      const results = (ask ? await ask.call(source, asked) : null) ?? [];
      return results.map((result): FrCommandPaletteSourceItem => ({
        value: `source-${index}:${result.value}`,
        title: result.title,
        description: result.description,
        icon: result.icon,
        section: source.section,
        type: 'result',
        source,
        result,
      }));
    }),
  );
  if (asked === trimmed.value) {
    sourceResults.value = answers.flat();
    // Suggestions arrive above the items: the highlight moves up to them unless the user moved it
    if (!moved) activeValue.value = firstValue();
  }
}

function optionId(item: FrCommandPaletteItem) {
  return `${listId}-option-${flatResults.value.indexOf(item)}`;
}

/** Sends focus back to what opened the palette, unless the user has put it somewhere else */
function onClosed() {
  const focus = document.activeElement;
  const lost = !focus || focus === document.body || card.value?.$el.contains(focus);
  if (opener && document.contains(opener) && lost) {
    opener.focus();
  }
  opener = null;
}

function onOpened() {
  void nextTick(() => searchInput.value?.focus());
}

function setItemRef(el: Element | ComponentPublicInstance | null, value: string) {
  if (el) {
    itemRefs[value] = (el as ComponentPublicInstance).$el;
  }
}

/**
 * Moves the highlight down (1) or up (-1), wrapping around the ends. While there are results one
 * of them is always highlighted, since the flatResults watcher moves it off any that go
 */
function moveActive(direction: 1 | -1) {
  const results = flatResults.value;
  if (results.length === 0) return;
  const current = results.findIndex((item) => item.value === activeValue.value);
  const next = (current + direction + results.length) % results.length;
  moved = true;
  activeValue.value = results[next]!.value;
  void nextTick(() => itemRefs[activeValue.value!]?.scrollIntoView?.({ block: 'nearest' }));
}

function hover(item: FrCommandPaletteItem) {
  moved = true;
  activeValue.value = item.value;
}

function selectActive() {
  const item = flatResults.value.find((result) => result.value === activeValue.value);
  if (item) select(item);
}

function select(item: FrCommandPaletteItem) {
  emit('select', item);
  close();
}

function close() {
  dialogOpen.value = false;
}
</script>

<!--
  A search over the given items and sources, in a dialog at the top of the page. Words typed are
  scored against each item's title, description and section, and every word must match. Up and
  Down move the highlight (wrapping), Enter picks it, Escape closes (VDialog's own handling); a
  pick is reported through `select` and closes the palette. On closing, focus goes back to what opened it
-->
<template>
  <v-dialog
    v-model="dialogOpen"
    class="fr-command-palette"
    max-width="560"
    transition="dialog-top-transition"
    aria-label="Command palette"
    @after-enter="onOpened"
    @after-leave="onClosed"
  >
    <v-card ref="card" rounded="lg" class="pa-0">
      <v-text-field
        ref="searchInput"
        v-model="query"
        :placeholder="placeholder"
        role="combobox"
        aria-autocomplete="list"
        :aria-label="placeholder"
        :aria-expanded="String(flatResults.length > 0)"
        :aria-controls="flatResults.length > 0 ? listId : undefined"
        :aria-activedescendant="activeOptionId"
        prepend-inner-icon="mdi-magnify"
        variant="solo"
        flat
        hide-details
        clearable
        autofocus
        single-line
        density="comfortable"
        @keydown.down.prevent="moveActive(1)"
        @keydown.up.prevent="moveActive(-1)"
        @keydown.enter.prevent="selectActive"
      />
      <v-divider />
      <v-list
        v-if="flatResults.length > 0"
        :id="listId"
        role="listbox"
        aria-label="Results"
        density="compact"
        class="overflow-y-auto"
        style="max-height: 400px"
      >
        <div
          v-for="(group, groupIndex) in groupedResults"
          :key="group.label || 'default'"
          role="group"
          :aria-labelledby="group.label ? `${listId}-group-${groupIndex}` : undefined"
        >
          <v-list-subheader v-if="group.label" :id="`${listId}-group-${groupIndex}`">
            {{ group.label }}
          </v-list-subheader>
          <v-list-item
            v-for="item in group.items"
            :id="optionId(item)"
            :key="item.value"
            :ref="(el) => setItemRef(el, item.value)"
            role="option"
            class="fr-command-palette__item"
            tabindex="-1"
            :aria-selected="String(item.value === activeValue)"
            :prepend-icon="item.icon"
            :active="item.value === activeValue"
            @mouseenter="hover(item)"
            @click="select(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="item.description">
              {{ item.description }}
            </v-list-item-subtitle>
          </v-list-item>
        </div>
      </v-list>
      <div
        v-else
        class="fr-command-palette__empty pa-4 text-center text-medium-emphasis text-body-2"
      >
        No matches found
      </div>
      <div class="d-sr-only" aria-live="polite">{{ resultsAnnouncement }}</div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.fr-command-palette__item.v-list-item--active {
  box-shadow: inset 3px 0 0 rgb(var(--v-theme-primary));
}
</style>
